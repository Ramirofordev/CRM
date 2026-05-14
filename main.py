import os
import subprocess

import uvicorn


def run_migrations():
    subprocess.run(["alembic", "upgrade", "head"], check=True)


if __name__ == "__main__":
    run_migrations()
    uvicorn.run("app.main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
