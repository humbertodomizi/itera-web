# PymesApp

PymesApp es un monorepo con una API REST y dos dashboards web:

| Proyecto            | Ruta                   | Puerto dev | Responsabilidad                                                                                              |
| ------------------- | ---------------------- | ---------: | ------------------------------------------------------------------------------------------------------------ |
| API                 | `api/`                 |     `3000` | Backend multi-tenant, autenticacion, reglas de negocio y persistencia PostgreSQL                             |
| Dashboard merchants | `dashboard-merchants/` |     `5173` | Panel operativo para el comercio: ventas, productos, clientes, proveedores, entregas, promociones y finanzas |
| Dashboard admin     | `dashboard-admin/`     |     `5174` | Panel interno/admin: usuarios, finanzas por merchant y configuracion de perfil                               |

El sistema esta construido alrededor de tenants. Cada comercio es un `Tenant`; los usuarios `OWNER` operan el dashboard merchant y los usuarios `ADMIN` acceden al dashboard admin.

## Stack

| Capa            | Tecnologia                                                                        |
| --------------- | --------------------------------------------------------------------------------- |
| Runtime API     | Node.js 24                                                                        |
| Backend         | Express 5, TypeScript ESM                                                         |
| DB/ORM          | PostgreSQL, Prisma 7 con `@prisma/adapter-pg`                                     |
| Validacion      | Zod                                                                               |
| Auth            | JWT, bcrypt, roles `OWNER` y `ADMIN`                                              |
| Observabilidad  | Sentry opcional, `pino-http`                                                      |
| Frontend        | React 19, Vite 8, TypeScript                                                      |
| UI              | Tailwind CSS 4, componentes propios estilo shadcn/ui, Radix Popover, lucide-react |
| Estado frontend | Zustand persistido y estado local por pagina                                      |
| Graficos/PDF    | Recharts, jsPDF                                                                   |
| Tests API       | Vitest, Supertest                                                                 |
| Tooling         | pnpm, Docker Compose, Husky, lint-staged, Prettier                                |

## Estructura Del Monorepo

```txt
pymesapp/
├── api/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   └── src/
│       ├── app.ts
│       ├── router.ts
│       ├── server.ts
│       ├── lib/
│       ├── middleware/
│       ├── modules/
│       └── tests/
├── dashboard-merchants/
│   └── src/
│       ├── components/
│       ├── features/
│       ├── lib/api/
│       ├── router/
│       ├── store/
│       └── types/
├── dashboard-admin/
│   └── src/
│       ├── components/
│       ├── features/
│       ├── lib/api/
│       ├── router/
│       ├── store/
│       └── types/
├── docker-compose.dev.yml
├── scripts/
│   ├── setup-dev-env.sh
│   └── prisma-migrate-dev.sh
└── AGENTS.md
```

Nota importante: cada app tiene su propio `package.json` y lockfile. No hay workspace pnpm declarado en la raiz; corre comandos desde la carpeta del proyecto correspondiente.

## Setup Local

### Opcion recomendada: Docker Compose

```bash
./scripts/setup-dev-env.sh
```

Esto levanta PostgreSQL, API, dashboard merchants y dashboard admin. Tambien genera Prisma Client, aplica migraciones, ejecuta seed y prepara la DB de tests.

URLs locales:

| Servicio            | URL                     |
| ------------------- | ----------------------- |
| API                 | `http://localhost:3000` |
| Dashboard merchants | `http://localhost:5173` |
| Dashboard admin     | `http://localhost:5174` |

Flags utiles:

```bash
./scripts/setup-dev-env.sh --api
./scripts/setup-dev-env.sh --frontend
./scripts/setup-dev-env.sh --admin
./scripts/setup-dev-env.sh --skip-seed
```

### Credenciales seed

El seed crea el tenant `demo`.

| Rol            | Email                   | Password   |
| -------------- | ----------------------- | ---------- |
| Merchant owner | `merchant@pymesapp.com` | `demo1234` |
| Admin          | `admin@pymesapp.com`    | `demo1234` |

### Variables de entorno

No copies secretos reales al README ni a commits. La API espera, como minimo:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
MAX_IMAGE_UPLOAD_BYTES=5242880

R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=...
R2_PUBLIC_URL=...

SENTRY_DSN=...
```

Los frontends esperan:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## Comandos

### Raiz

```bash
pnpm install
pnpm prepare
```

La raiz solo contiene Husky, lint-staged y Prettier.

### API

```bash
cd api
pnpm install
pnpm dev
pnpm build
pnpm start
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm db:migrate:dev
pnpm db:migrate:deploy
pnpm db:generate
pnpm db:studio
pnpm db:seed
```

Detalles:

| Comando                  | Uso                                                |
| ------------------------ | -------------------------------------------------- |
| `pnpm dev`               | Nodemon + tsx con `.env`                           |
| `pnpm build`             | `prisma generate` + `tsc`                          |
| `pnpm start`             | `prisma migrate deploy` + `node dist/server.js`    |
| `pnpm test`              | Vitest contra DB de test                           |
| `pnpm db:migrate:dev`    | Crear/aplicar migracion en desarrollo              |
| `pnpm db:migrate:deploy` | Aplicar migraciones existentes                     |
| `pnpm db:generate`       | Regenerar cliente Prisma en `src/generated/prisma` |

### Dashboards

```bash
cd dashboard-merchants
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

```bash
cd dashboard-admin
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## API

### Patron De Diseño

La API usa una arquitectura modular por feature con capas explicitas:

```txt
request
  -> router.ts
  -> middleware/auth.ts
  -> *.controller.ts
  -> *.schema.ts
  -> *.service.ts
  -> *.repository.ts
  -> Prisma/PostgreSQL
```

Cada modulo de negocio sigue esta convencion:

| Archivo           | Responsabilidad                                                     |
| ----------------- | ------------------------------------------------------------------- |
| `*.controller.ts` | Leer params/query/body, validar input, elegir status HTTP y delegar |
| `*.schema.ts`     | Esquemas Zod para payloads de entrada                               |
| `*.service.ts`    | Reglas de negocio, seguridad por tenant, calculos y transacciones   |
| `*.repository.ts` | Queries Prisma. Idealmente sin reglas de negocio                    |

Este patron permite agregar features copiando una estructura conocida y mantiene separadas validacion, negocio y persistencia.

### Bootstrap

| Archivo                          | Responsabilidad                                                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `src/instrument.ts`              | Inicializa Sentry si existe `SENTRY_DSN`                                                                                    |
| `src/app.ts`                     | Express app, Helmet, CORS, JSON parser, pino, rate-limit, `/health`, `/api/v1`, Sentry error handler y error handler propio |
| `src/server.ts`                  | `listen()` con `PORT` y `HOST`                                                                                              |
| `src/router.ts`                  | Mapa central de rutas y middlewares por rol                                                                                 |
| `src/lib/db.ts`                  | PrismaClient singleton con adapter PG                                                                                       |
| `src/lib/jwt.ts`                 | `signToken` y `verifyToken`                                                                                                 |
| `src/middleware/auth.ts`         | `requireAuth` y `requireRole`                                                                                               |
| `src/middleware/errorHandler.ts` | Respuestas uniformes para Zod, HTTP errors y errores no controlados                                                         |

### Autenticacion, Roles Y Tenant

El login acepta email/password y puede resolver el tenant por email si no llega `x-tenant-slug`. El API client igualmente envia `x-tenant-slug` cuando lo tiene persistido.

El JWT contiene:

```ts
{
  userId: string
  tenantId: string
  role: string
}
```

Reglas clave:

| Regla                             | Detalle                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| No confiar en `tenantId` del body | El `tenantId` sale siempre de `req.user.tenantId`                                                 |
| Merchant access                   | Rutas operativas usan `requireRole(['OWNER'])`                                                    |
| Admin access                      | Rutas admin usan `requireRole(['ADMIN'])`                                                         |
| Perfil                            | `/auth/me` sirve para usuarios autenticados; `/auth/admin/me` agrega guardia `ADMIN` desde router |
| Sesion expirada                   | Los frontends hacen logout y redirigen a `/login` ante `401`                                      |

### Modelo De Datos

Entidades principales en `api/prisma/schema.prisma`:

| Modelo          | Proposito                                                          |
| --------------- | ------------------------------------------------------------------ |
| `Tenant`        | Comercio/organizacion. Agrupa usuarios y datos operativos          |
| `User`          | Usuario con rol `OWNER` o `ADMIN`; email unico por tenant          |
| `Product`       | Catalogo, stock, precios, margen, categorias, proveedores e imagen |
| `Customer`      | Clientes del comercio                                              |
| `Supplier`      | Proveedores y categorias asociadas                                 |
| `Sale`          | Venta con items, totales, pago, estado y datos de entrega          |
| `SaleItem`      | Lineas de venta, con producto opcional para preservar historico    |
| `Promotion`     | Combo/promocion con descuento                                      |
| `PromotionLine` | Productos y cantidades de una promocion                            |
| `Expense`       | Egresos del negocio                                                |
| `Delivery`      | Entrega asociada 1:1 a una venta                                   |

Enums importantes:

| Enum             | Valores                                           |
| ---------------- | ------------------------------------------------- |
| `UserRole`       | `ADMIN`, `OWNER`                                  |
| `PaymentMethod`  | `CASH`, `CARD`, `TRANSFER`                        |
| `SaleStatus`     | `COMPLETED`, `CANCELLED`                          |
| `DeliveryType`   | `PICKUP`, `DELIVERY`                              |
| `DeliveryStatus` | `PENDING`, `IN_TRANSIT`, `DELIVERED`, `CANCELLED` |

### Modulos

| Modulo          | Rutas base           | Responsabilidad                                                  |
| --------------- | -------------------- | ---------------------------------------------------------------- |
| `auth`          | `/auth`              | Registro, login, perfil, cambio de password                      |
| `dashboard`     | `/dashboard/summary` | KPIs merchant, bajo stock, ventas, top productos/clientes        |
| `products`      | `/products`          | CRUD, categorias, stock, proveedores, imagen                     |
| `customers`     | `/customers`         | CRUD y paginacion                                                |
| `suppliers`     | `/suppliers`         | CRUD, categorias y relacion con productos                        |
| `sales`         | `/sales`             | Crear/cancelar ventas, descontar/restaurar stock, entrega        |
| `promotions`    | `/promotions`        | CRUD de combos con lineas de productos                           |
| `expenses`      | `/expenses`          | CRUD de egresos merchant                                         |
| `deliveries`    | `/deliveries`        | Listado y actualizacion de entregas                              |
| `uploads`       | `/uploads`           | Presigned URLs para Cloudflare R2 y reporte de errores de upload |
| `users`         | `/users`             | CRUD admin de usuarios                                           |
| `admin-finance` | `/admin/finance`     | Finanzas vistas por admin para un merchant owner                 |

### Rutas Principales

Todas las rutas bajo `/api/v1`, salvo `/health`.

```txt
GET    /health

POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/auth/me
GET    /api/v1/auth/admin/me
PATCH  /api/v1/auth/me
POST   /api/v1/auth/password

GET    /api/v1/dashboard/summary

GET    /api/v1/products
GET    /api/v1/products?page=1&limit=25&search=...&categories=a,b
GET    /api/v1/products/categories
GET    /api/v1/products/:id
POST   /api/v1/products
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id
POST   /api/v1/products/:id/stock

GET    /api/v1/customers
GET    /api/v1/customers?page=1&limit=25&search=...
GET    /api/v1/customers/:id
POST   /api/v1/customers
PATCH  /api/v1/customers/:id
DELETE /api/v1/customers/:id

GET    /api/v1/suppliers
GET    /api/v1/suppliers?page=1&limit=25&search=...
GET    /api/v1/suppliers/:id
POST   /api/v1/suppliers
PATCH  /api/v1/suppliers/:id
DELETE /api/v1/suppliers/:id

GET    /api/v1/sales
GET    /api/v1/sales?page=1&limit=25&search=...
GET    /api/v1/sales/:id
POST   /api/v1/sales
POST   /api/v1/sales/:id/cancel
PATCH  /api/v1/sales/:id/delivery-status

GET    /api/v1/promotions
GET    /api/v1/promotions/:id
POST   /api/v1/promotions
PATCH  /api/v1/promotions/:id
DELETE /api/v1/promotions/:id

GET    /api/v1/expenses
GET    /api/v1/expenses/:id
POST   /api/v1/expenses
PATCH  /api/v1/expenses/:id
DELETE /api/v1/expenses/:id

GET    /api/v1/deliveries
GET    /api/v1/deliveries/:id
PATCH  /api/v1/deliveries/:id

POST   /api/v1/uploads/presign
POST   /api/v1/uploads/client-error

GET    /api/v1/users
GET    /api/v1/users?page=1&limit=25&search=...
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

GET    /api/v1/admin/finance/merchants
GET    /api/v1/admin/finance?merchantUserId=...&period=month
POST   /api/v1/admin/finance/expenses?merchantUserId=...
DELETE /api/v1/admin/finance/expenses/:id?merchantUserId=...
```

### Reglas De Negocio A Preservar

| Area                | Regla                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| Productos           | `code` es unico por tenant. El backend acepta `margin` y `profitMargin`; persiste `margin`            |
| Precio de venta     | Se calcula como `Math.round(costPrice * (1 + margin / 100))` en UI y servicios relacionados           |
| Stock               | No puede quedar negativo. `adjustStock` rechaza decrementos invalidos                                 |
| Ventas              | Validan existencia y stock de productos antes de crear                                                |
| Ventas              | Codigo generado por dia: `V-YYYYMMDD-###`                                                             |
| Ventas              | La creacion descuenta stock dentro de una transaccion                                                 |
| Ventas con delivery | Si `deliveryType` es `DELIVERY`, se crea un `Delivery` asociado                                       |
| Cancelacion         | Cambia venta a `CANCELLED`; si aplica, cancela delivery y restaura stock                              |
| Promociones         | Deben tener al menos una linea; calculan precio original/final desde productos                        |
| Admin finance       | El admin elige un usuario `OWNER`; ventas y egresos se filtran por `userId` del merchant seleccionado |
| Uploads             | Solo imagenes JPEG, PNG, WebP o AVIF; tamano maximo controlado por `MAX_IMAGE_UPLOAD_BYTES`           |
| Ultimo admin        | No se puede eliminar ni degradar al ultimo usuario `ADMIN`                                            |

### Tests

Los tests viven en `api/src/tests`. Usan Vitest + Supertest contra Express sin levantar un server HTTP real.

Patron:

| Archivo           | Responsabilidad                                                             |
| ----------------- | --------------------------------------------------------------------------- |
| `setup.global.ts` | Carga `.env.test`, crea DB de test si falta y corre `prisma migrate deploy` |
| `setup.ts`        | Desconecta Prisma al terminar                                               |
| `helpers.ts`      | `registerAndLogin`, `authed`, factories y limpieza de DB                    |
| `*.test.ts`       | Cobertura por modulo                                                        |

El config desactiva paralelismo de archivos (`fileParallelism: false`) para evitar conflictos al limpiar la DB.

## Dashboard Merchants

### Responsabilidad

`dashboard-merchants` es el panel operativo diario para el usuario `OWNER`.

Rutas:

| Ruta             | Pagina                                   | Uso                                                              |
| ---------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `/login`         | `features/auth/LoginPage.tsx`            | Login y recuperacion de sesion                                   |
| `/dashboard`     | `features/dashboard/DashboardPage.tsx`   | KPIs, ventas, bajo stock, top productos/clientes                 |
| `/clientes`      | `features/customers/CustomersPage.tsx`   | CRUD clientes, busqueda, paginacion, crear venta desde cliente   |
| `/productos`     | `features/products/ProductsPage.tsx`     | CRUD productos, categorias, proveedores, upload de imagen, stock |
| `/ventas`        | `features/sales/SalesPage.tsx`           | Crear/cancelar ventas, promociones, tickets PDF, delivery        |
| `/entregas`      | `features/deliveries/DeliveriesPage.tsx` | Gestion simple de entregas desde ventas                          |
| `/proveedores`   | `features/suppliers/SuppliersPage.tsx`   | CRUD proveedores y productos asociados                           |
| `/promociones`   | `features/promotions/PromotionsPage.tsx` | Combos/promociones y productos inline                            |
| `/finanzas`      | `features/finance/FinancePage.tsx`       | Ventas, egresos, graficos y periodos                             |
| `/configuracion` | `features/settings/SettingsPage.tsx`     | Perfil, avatar, branding local y password                        |

### Patron De Diseño Frontend

El dashboard merchant usa una arquitectura feature-first:

```txt
src/
  router/          rutas React Router
  components/
    layout/        shell de app: sidebar, topbar, private route
    ui/            primitivas reutilizables
  features/        paginas por dominio
  lib/api/         cliente HTTP y wrappers por recurso
  store/           Zustand persistido y estado global pequeno
  types/           contratos compartidos de UI
```

Flujo de datos:

```txt
Pagina feature
  -> hook/estado local
  -> lib/api/<resource>.ts
  -> apiFetch()
  -> API REST
```

Decisiones actuales:

| Decision            | Detalle                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| Estado remoto       | Se carga en cada pagina con `useEffect`; no hay React Query                                                |
| Estado local        | Formularios, modales, busqueda, paginacion y loading viven dentro de la pagina                             |
| Estado global       | Zustand para auth, branding, notificaciones y contexto de venta                                            |
| Auth persistida     | `useAuthStore` persiste en localStorage bajo la key `auth`                                                 |
| Proteccion de rutas | `PrivateRoute` verifica token y, si falta `user`, llama `/auth/me`                                         |
| API client          | `apiFetch` agrega `Content-Type`, `x-tenant-slug` y `Authorization`                                        |
| Adaptadores         | Algunos wrappers normalizan enums del backend a minusculas (`CASH` -> `cash`) y `margin` -> `profitMargin` |
| Uploads             | Primero pide `/uploads/presign`, luego hace `PUT` directo a R2 y devuelve `publicUrl`                      |
| UI                  | Componentes propios (`Modal`, `ConfirmDialog`, `Pagination`, `ToastContainer`, etc.) con clases Tailwind   |

Nota: `src/store/appStore.ts` y `src/lib/seed.ts` conservan un modelo seed/local de una etapa anterior. Hoy la mayoria de features ya consumen API real; si se toca estado global, verificar si ese store sigue siendo necesario o si solo queda como soporte para `saleContext` y helpers.

### Estilo Visual

El patron visual es un dashboard operacional minimalista:

| Elemento        | Descripcion                                                                |
| --------------- | -------------------------------------------------------------------------- |
| Tokens          | Definidos en `src/index.css` con Tailwind 4 `@theme`                       |
| Color principal | Amarillo marca `#ece209` sobre tinta negra                                 |
| Superficies     | `surface` gris claro, `panel` blanco, bordes suaves                        |
| Layout          | Sidebar responsive colapsable en desktop y drawer en mobile                |
| Movimiento      | Fade-in simple por pagina (`page-enter`) y transiciones cortas             |
| Componentes     | Estilo shadcn/ui, pero mayormente copiados/propios y adaptados al proyecto |
| Branding        | `brandingStore` permite aplicar colores runtime via CSS variables          |

## Dashboard Admin

### Responsabilidad

`dashboard-admin` es el panel interno para usuarios `ADMIN`.

Rutas:

| Ruta             | Pagina                               | Uso                                                           |
| ---------------- | ------------------------------------ | ------------------------------------------------------------- |
| `/login`         | `features/auth/LoginPage.tsx`        | Login y validacion de rol admin                               |
| `/users`         | `features/users/UsersPage.tsx`       | CRUD de usuarios `ADMIN` y `OWNER`, avatar y password         |
| `/finanzas`      | `features/finance/FinancePage.tsx`   | Seleccionar merchant y ver/gestionar finanzas de ese merchant |
| `/configuracion` | `features/settings/SettingsPage.tsx` | Perfil, avatar, branding local y password                     |
| `/settings`      | redirect                             | Redirige a `/configuracion`                                   |

### Patron De Diseño Frontend

El admin comparte el mismo patron del dashboard merchant:

```txt
Pagina admin
  -> estado local / Zustand auth
  -> lib/api/<resource>.ts
  -> apiFetch()
  -> rutas ADMIN del backend
```

Diferencias clave:

| Area                | Detalle                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------- |
| Auth persistida     | Zustand persiste bajo `admin-auth`, separado del merchant                                    |
| Verificacion de rol | Login llama `/auth/login` y luego `/auth/admin/me`; si el token no es admin se muestra error |
| Rutas backend       | Usa `/users`, `/admin/finance/*`, `/auth/admin/me`, `/auth/me`, `/auth/password`             |
| Finanzas admin      | Primero carga `/admin/finance/merchants`; luego consulta por `merchantUserId` y `period`     |
| UI                  | Mismo shell, tokens, sidebar/topbar y componentes base, pero con navegacion reducida         |

### Estilo Visual

El admin reutiliza el mismo sistema visual que merchants para mantener continuidad:

| Elemento    | Descripcion                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| Sidebar     | Colapsable desktop, drawer mobile                                                            |
| Topbar      | Titulo de pagina segun ruta                                                                  |
| Tokens      | Mismos `--color-brand`, `--color-ink`, `--color-surface`, `--color-panel`                    |
| Componentes | `Modal`, `ConfirmDialog`, `Pagination`, `ToastContainer`, `SearchableCombobox`, color picker |
| Branding    | `brandingStore` separado bajo `admin-branding`                                               |

## Componentes UI Compartidos Por Patron

Los dashboards no comparten codigo por paquete, pero tienen patrones y componentes casi paralelos:

| Componente           | Uso                          |
| -------------------- | ---------------------------- |
| `Modal`              | Formularios grandes/pequenos |
| `ConfirmDialog`      | Confirmaciones destructivas  |
| `Pagination`         | Tablas paginadas             |
| `ToastContainer`     | Feedback de exito/error      |
| `SearchableCombobox` | Select con busqueda          |
| `popover`            | Base Radix Popover           |
| `color-picker`       | Branding local               |

En `dashboard-merchants` hay componentes adicionales: `Badge`, `ActionMenu`, `ProductImage`, `NotificationBell`, `BriefModal`.

Si agregas o actualizas componentes shadcn/ui, usa el MCP scoped correcto segun `AGENTS.md`:

| Proyecto              | MCP shadcn         |
| --------------------- | ------------------ |
| `dashboard-admin`     | `shadcn-admin`     |
| `dashboard-merchants` | `shadcn-merchants` |

No usar un shadcn generico para installs en este monorepo.

## Flujo Para Agregar Una Feature

### En API

1. Agregar/editar modelo en `api/prisma/schema.prisma` si hace falta.
2. Crear migracion con `pnpm db:migrate:dev`.
3. Regenerar cliente con `pnpm db:generate`.
4. Crear modulo en `api/src/modules/<feature>/`.
5. Definir Zod schemas en `*.schema.ts`.
6. Implementar repository solo con queries Prisma.
7. Implementar service con reglas de negocio y `tenantId` desde JWT.
8. Implementar controller con parsing, status codes y `next(err)`.
9. Registrar rutas y roles en `api/src/router.ts`.
10. Agregar tests en `api/src/tests/<feature>.test.ts`.

### En Dashboard

1. Agregar tipos en `src/types/index.ts` si son compartidos.
2. Crear wrapper API en `src/lib/api/<feature>.ts`.
3. Exportarlo desde `src/lib/api/index.ts`.
4. Crear pagina en `src/features/<feature>/<FeaturePage>.tsx`.
5. Registrar ruta en `src/router/index.tsx`.
6. Agregar item de navegacion en `components/layout/Sidebar.tsx`.
7. Usar componentes UI existentes antes de crear nuevos.
8. Mantener loading/error/empty states y feedback con toast.

## Validacion Y Calidad

Antes de cerrar cambios, preferir:

```bash
cd api && pnpm test
cd dashboard-merchants && pnpm build
cd dashboard-admin && pnpm build
```

Para cambios visuales o de flujo no cubiertos por tests, levantar el dev server relevante y validar en browser real con Playwright MCP, tal como indica `AGENTS.md`.

## Convenciones Para Futuros Agentes

| Tema                | Convencion                                                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Docs actuales       | Para cambios no triviales en React, Vite, Node, Express, Prisma, Zod, Tailwind, Vitest, React Router o Zustand, consultar Context7 MCP si esta disponible |
| Patrones existentes | Preferir los patrones ya presentes antes de introducir librerias nuevas                                                                                   |
| Multi-tenant        | Nunca aceptar `tenantId` del cliente para operaciones merchant                                                                                            |
| Roles               | Confirmar si la feature es `OWNER`, `ADMIN` o compartida antes de registrar rutas                                                                         |
| Enums               | Backend usa mayusculas; UI suele usar minusculas para pago/estado. Revisar normalizadores                                                                 |
| Paginacion          | Si `page` esta presente, API devuelve `{ data, total, page, limit, totalPages }`; sin `page`, varios endpoints devuelven array                            |
| Formularios         | Hay mezcla de `react-hook-form + zod` y formularios controlados manuales. Seguir el patron de la pagina vecina                                            |
| Estilos             | Mantener tokens en `index.css` y clases Tailwind; evitar estilos inline salvo CSS variables/runtime                                                       |
| Uploads             | No subir binarios al API; usar presigned URL y `PUT` directo a R2                                                                                         |
| Secrets             | No imprimir ni documentar valores reales de `.env`                                                                                                        |
| Git                 | No revertir cambios ajenos; revisar `git status` antes de editar si hay duda                                                                              |

## Notas Y Riesgos Conocidos

| Nota                                                                    | Impacto                                                                                      |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Los READMEs internos de los dashboards son los templates de Vite        | El README raiz es la fuente de contexto mas completa                                         |
| `api/README.md` menciona comandos antiguos como `db:push`/`db:migrate`  | Ver `api/package.json` para scripts reales                                                   |
| `dashboard-*/src/App.css` conserva estilos del template                 | Parece no ser parte central del UI actual                                                    |
| `dashboard-merchants/src/store/appStore.ts` conserva seed local         | Revisar antes de basar features nuevas ahi                                                   |
| La API tiene tests; los dashboards no tienen suite de tests configurada | Para UI, validar con build y browser real                                                    |
| `admin-finance` filtra por `userId` del merchant owner                  | Si en el futuro un tenant tiene multiples owners o vendedores, revisar agregacion financiera |
