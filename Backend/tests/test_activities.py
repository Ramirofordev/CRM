from .test_auth import create_user, login_user, auth_headers, client, get_email

def create_opportunity_for_user(token):
    # Create customer
    email = get_email()
    res = client.post("/customers/", json = {
        "name": "Client",
        "email": email
    }, headers = auth_headers(token))

    customer_id = res.json()["id"]

    # Create opportunity
    res = client.post("/opportunities/", json = {
        "title": "Venta",
        "customer_id": customer_id
    }, headers = auth_headers(token))

    return res.json()["id"]

def test_user_cannot_access_other_activity():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    opportunity_id = create_opportunity_for_user(token_a)

    res = client.post("/activities/", json = {
        "title": "Call",
        "opportunity_id": opportunity_id
    }, headers = auth_headers(token_a))

    activity_id = res.json()["id"]
    
    # User B
    email_b = get_email()
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.get(f"/activities/{activity_id}", headers = auth_headers(token_b))

    assert res.status_code == 403

def test_user_only_sees_own_activities():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    opportunity_id = create_opportunity_for_user(token_a)

    client.post("/activities/", json = {
        "title": "Call",
        "opportunity_id": opportunity_id
    }, headers = auth_headers(token_a))

    res = client.get("/activities/", headers = auth_headers(token_a))

    assert len(res.json()) == 1

    # User B
    email_b = get_email()
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.get("/activities/", headers = auth_headers(token_b))
    assert len(res.json()) == 0