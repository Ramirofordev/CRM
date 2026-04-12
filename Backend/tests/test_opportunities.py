from .test_auth import create_user, login_user, auth_headers, client, get_email

def create_customer_for_user(token):
    email = get_email()
    res = client.post("/customers/", json = {
        "name": "Cliente",
        "email": email
    }, headers = auth_headers(token))

    return res.json()["id"]

def test_user_cannot_access_other_opportunity():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    customer_id = create_customer_for_user(token_a)

    res = client.post("/opportunities/", json = {
        "title": "Sell A",
        "customer_id": customer_id
    }, headers = auth_headers(token_a))

    opportunity_id = res.json()["id"]

    # User B
    email_b = get_email()
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.get(f"/opportunities/{opportunity_id}", headers = auth_headers(token_b))

    assert res.status_code == 404

def test_user_can_access_own_opportunity():
    email = get_email()
    create_user(email, "123")
    token = login_user(email, "123")

    customer_id = create_customer_for_user(token)

    res = client.post("/opportunities/", json = {
        "title": "Sell A",
        "customer_id": customer_id
    }, headers = auth_headers(token))

    opportunity_id = res.json()["id"]

    res = client.get(f"/opportunities/{opportunity_id}", headers = auth_headers(token))

    assert res.status_code == 200

def test_user_only_sees_own_opportunities():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    customer_id = create_customer_for_user(token_a)

    client.post("/opportunities/", json = {
        "title": "Sell A",
        "customer_id": customer_id
    }, headers = auth_headers(token_a))

    res = client.get("/opportunities/", headers = auth_headers(token_a))
    assert len(res.json()) == 1

    # User B
    email_b = get_email()
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.get("/opportunities/", headers = auth_headers(token_b))
    assert len(res.json()) == 0