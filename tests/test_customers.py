from .test_auth import create_user, login_user, auth_headers, client, get_email


def test_user_cannot_access_other_customer():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    email_client_a = get_email()
    res = client.post("/customers/", json = {
        "name": "Cliente A",
        "email": email_client_a
    }, headers = auth_headers(token_a))

    customer_id = res.json()["id"]

    email_b = get_email()
    # User B
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.get(f"/customers/{customer_id}", headers = auth_headers(token_b))

    assert res.status_code == 403

def test_user_can_access_own_customer():
    email_a = get_email()
    create_user(email_a, "123")
    token = login_user(email_a, "123")

    email_client_a = get_email()
    res = client.post("/customers/", json = {
        "name": "Cliente A",
        "email": email_client_a
    }, headers = auth_headers(token))

    customer_id = res.json()["id"]

    res = client.get(f"/customers/{customer_id}", headers = auth_headers(token))

    assert res.status_code == 200

def test_user_only_sees_own_customers():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    email_client_a = get_email()
    client.post("/customers/", json = {
        "name": "Cliente A",
        "email": email_client_a
    }, headers = auth_headers(token_a))

    res = client.get("/customers/", headers = auth_headers(token_a))

    assert len(res.json()) == 1

    email_b = get_email()
    # User B
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.get("/customers/", headers = auth_headers(token_b))

    assert len(res.json()) == 0

def test_user_cannot_update_other_customer():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    email_client_a = get_email()
    res = client.post("/customers/", json = {
        "name": "Cliente A",
        "email": email_client_a
    }, headers = auth_headers(token_a))

    customer_id = res.json()["id"]

    # User B 
    email_b = get_email()
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    email_hack = get_email()
    res = client.put(f"/customers/{customer_id}", json = {
        "name": "Hack",
        "email": email_hack
    }, headers = auth_headers(token_b))

    assert res.status_code == 403

def test_user_cannot_delete_other_customer():
    # User A
    email_a = get_email()
    create_user(email_a, "123")
    token_a = login_user(email_a, "123")

    email_client_a = get_email()
    res = client.post("/customers/", json = {
        "name": "Cliente A",
        "email": email_client_a
    }, headers = auth_headers(token_a))

    customer_id = res.json()["id"]

    # User B
    email_b = get_email()
    create_user(email_b, "123")
    token_b = login_user(email_b, "123")

    res = client.delete(f"/customers/{customer_id}", headers = auth_headers(token_b))

    assert res.status_code == 403