from fastapi import HTTPException


def check_ownership(resource, user):
    if user.role == "admin":
        return True

    if resource.owner_id != user.id:
        raise HTTPException(status_code = 403, detail = "Not authorized")
