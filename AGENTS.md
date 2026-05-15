# Repository Instructions

## Structure
- Backend FastAPI app is rooted at `app/`; entrypoint is `app/main.py` and imports all routers before calling `Base.metadata.create_all(bind=engine)`.
- Frontend is a separate Vite React app in `crm-frontend/`; run frontend commands from that directory, not the repo root.
- Backend follows the controller -> service -> repository split under `app/controllers`, `app/services`, and `app/repositories`.

## Backend Commands
- Install backend deps from the repo root: `pip install -r requirements.txt`.
- Run the API from the repo root: `uvicorn app.main:app --reload`.
- Run all backend tests from the repo root: `pytest -q`.
- Run a focused backend test: `pytest tests/test_customers.py -q` or `pytest tests/test_customers.py::test_user_can_access_own_customer -q`.

## Backend Gotchas
- `DATABASE_URL` defaults to `sqlite:///./crm.db`; importing `app.main` creates tables immediately, so tests and local runs can mutate/create `crm.db` in the repo root unless `DATABASE_URL` is set.
- `SECRET_KEY` defaults to `testsecretkey`; no code currently loads `.env`, so set env vars in the shell before running commands if needed.
- API collection routes use trailing slashes in controllers and tests, for example `/customers/`, `/opportunities/`, and `/activities/`.
- Tests share helpers and a global `TestClient` from `tests/test_auth.py`; user emails are randomized with UUIDs instead of DB cleanup.

## Frontend Commands
- Use the frontend lockfile/package manager in `crm-frontend/`: `npm install`.
- Start dev server: `npm run dev` from `crm-frontend/`.
- Build: `npm run build` from `crm-frontend/`.
- Lint: `npm run lint` from `crm-frontend/`.

## Frontend Gotchas
- The Axios client in `crm-frontend/src/api/client.js` has a hard-coded production Railway `baseURL`; there is no Vite env override yet.
- Auth token is read from `localStorage` key `token` and attached as `Authorization: Bearer <token>` by the Axios interceptor.
- Existing ESLint config enables React hooks recommended rules, including `react-hooks/set-state-in-effect`; current code has lint failures from that rule and unused variables.

## Verification Notes
- `npm run build` in `crm-frontend/` succeeds, but Vite warns that the main JS chunk is larger than 500 kB.
- If `pytest -q` fails with `ModuleNotFoundError: No module named 'fastapi'`, install `requirements.txt` in the active Python environment first.
