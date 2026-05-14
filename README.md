# CRM MVP

CRM full stack en fase de desarrollo para gestionar clientes, oportunidades comerciales y actividades de seguimiento. El proyecto mantiene una arquitectura simple y extensible: backend con FastAPI y SQLAlchemy, frontend con React y Vite.

## Visión General

El flujo principal del sistema es:

```text
Usuario -> Cliente -> Oportunidad -> Actividad -> Seguimiento comercial
```

Funcionalidades actuales:

- Registro y login de usuarios con JWT.
- Gestión de clientes por usuario.
- Gestión de oportunidades vinculadas a clientes.
- Pipeline de oportunidades con estados: `LEAD`, `CONTACTED`, `PROPOSAL`, `WON`, `LOST`.
- Gestión de actividades vinculadas a cliente u oportunidad.
- Dashboard frontend con métricas, actividades recientes y estado del pipeline.
- Protección de datos por ownership: cada usuario solo accede a sus recursos.

## Stack

Backend:

- Python 3.11
- FastAPI
- SQLAlchemy
- Pydantic
- JWT con `python-jose`
- Pytest

Frontend:

- React 19
- Vite
- React Router
- Axios
- Tailwind CSS
- Recharts
- Lucide React
- dnd-kit

## Estructura

```text
app/                     Backend FastAPI
  controllers/           Rutas HTTP
  services/              Reglas de negocio y autorización
  repositories/          Acceso a base de datos
  models/                Modelos SQLAlchemy
  schemas/               DTOs Pydantic
  core/                  Seguridad y dependencias
  db/                    Sesión y base SQLAlchemy

tests/                   Tests backend con Pytest

crm-frontend/            Frontend Vite React
  src/api/               Cliente Axios y recursos API
  src/components/        Componentes reutilizables
  src/pages/             Pantallas principales
  src/routes/            Rutas protegidas
  src/layout/            Layout principal
```

## Arquitectura Backend

El backend sigue el patrón:

```text
Controller -> Service -> Repository -> Database
```

- Controllers: reciben requests, validan dependencias y delegan.
- Services: contienen reglas de negocio, ownership y transiciones.
- Repositories: encapsulan queries y persistencia.
- Schemas: validan entrada y salida HTTP.
- Models: definen tablas SQLAlchemy.

## Variables De Entorno

Backend (`.env` en la raíz):

```env
DATABASE_URL=sqlite:///./crm.db
SECRET_KEY=change-me
CORS_ORIGINS=http://localhost:5173
ENV=development
```

Notas:

- Si `DATABASE_URL` no está definido, usa `sqlite:///./crm.db`.
- En producción, `SECRET_KEY` debe estar definido.
- `CORS_ORIGINS` acepta varios origins separados por coma.
- `SKIP_CREATE_ALL=1` desactiva `Base.metadata.create_all()` al importar `app.main`.

Frontend (`crm-frontend/.env`):

```env
VITE_API_URL=http://localhost:8000
```

Hay un ejemplo en `crm-frontend/.env.example`.

## Ejecutar Backend

Desde la raíz del repo:

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs:

```text
http://localhost:8000/docs
```

## Ejecutar Frontend

Desde `crm-frontend/`:

```bash
npm install
npm run dev
```

Frontend local:

```text
http://localhost:5173
```

## Verificación

Backend, desde la raíz:

```bash
pytest -q
```

Frontend, desde `crm-frontend/`:

```bash
npm run lint
npm run build
```

Estado actual verificado:

- `pytest -q`: pasa.
- `npm run lint`: pasa.
- `npm run build`: pasa con warning de chunk grande de Vite.

## Endpoints Principales

Auth:

- `POST /auth/register`
- `POST /auth/login`

Customers:

- `POST /customers/`
- `GET /customers/`
- `GET /customers/{customer_id}`
- `PUT /customers/{customer_id}`
- `DELETE /customers/{customer_id}`

Opportunities:

- `POST /opportunities/`
- `GET /opportunities/`
- `GET /opportunities/{opportunity_id}`
- `PUT /opportunities/{opportunity_id}`
- `PATCH /opportunities/{opportunity_id}/status`
- `DELETE /opportunities/{opportunity_id}`

Activities:

- `POST /activities/`
- `GET /activities/`
- `GET /activities/{activity_id}`
- `GET /activities/customer/{customer_id}`
- `GET /activities/opportunity/{opportunity_id}`
- `PUT /activities/{activity_id}`
- `PATCH /activities/{activity_id}/status`
- `DELETE /activities/{activity_id}`

## Notas De Desarrollo

- Las rutas de colección usan trailing slash: `/customers/`, `/opportunities/`, `/activities/`.
- El token JWT se guarda en `localStorage` con la clave `token`.
- El frontend redirige a `/login` cuando una respuesta API devuelve `401`.
- Importar `app.main` puede crear tablas si `SKIP_CREATE_ALL` no está activo.
- El archivo `crm.db` es local de desarrollo y puede cambiar al correr tests o servidor con SQLite.

## Roadmap Próximo

- Mejorar responsive y accesibilidad de modales/tablas.
- Añadir fixtures de test con base aislada.
- Añadir manejo visual de errores en frontend en lugar de `alert`/`confirm`.
- Añadir paginación/filtros para clientes, oportunidades y actividades.

## Producción

Stack recomendado sin costo inicial:

- Frontend: Vercel o Netlify.
- Backend: Render o Koyeb.
- Base de datos: Supabase PostgreSQL.

Variables de entorno del backend:

```env
ENV=production
DATABASE_URL=postgresql://postgres:<password>@<supabase-host>:5432/postgres
SECRET_KEY=<strong-random-secret>
CORS_ORIGINS=https://<frontend-domain>
SKIP_CREATE_ALL=1
```

Variables de entorno del frontend:

```env
VITE_API_URL=https://<backend-domain>
```

El comando de arranque de producción ejecuta las migraciones antes de levantar la API:

```bash
alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

El endpoint `GET /health` permite validar que la API este activa.
