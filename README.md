# API E-commerce Backend

API REST desarrollada con **Node.js, Express y Prisma ORM** como backend para un sistema de e-commerce. La arquitectura está separada por capas (controllers, services, routes, middlewares y utils), con integración a múltiples bases de datos y servicios externos.

---

## Descripción

La aplicación implementa un backend completo para un e-commerce con gestión de usuarios, autenticación, productos, carrito de compras, wishlist, órdenes y reseñas. Incluye documentación completa de API con Swagger/OpenAPI 3.0.

**Características principales:**

- Autenticación segura con JWT en cookies HTTP-only
- Control de roles de usuario (USER, ADMIN)
- Gestión completa de productos con imágenes
- Carrito de compras persistente con estados
- Sistema de wishlist con MongoDB
- Sistema de reviews/reseñas con validación
- Sistema de órdenes con checkout
- Documentación interactiva con Swagger
- Integración con Cloudinary para almacenamiento de imágenes
- Prisma ORM para PostgreSQL/Supabase
- MongoDB para modelos auxiliares (reviews, wishlist, logs)
- Rate limiting en endpoints críticos
- Validación centralizada de datos
- Manejo robusto de errores

---

## Funcionalidades

### Autenticación & Usuarios

- ✅ Registro de usuarios con validación
- ✅ Login con generación de JWT (HTTP-only cookie)
- ✅ Middleware de autenticación por token
- ✅ Control de acceso por roles (USER, ADMIN)
- ✅ Obtención de perfil de usuario
- ✅ Actualización de rol (solo ADMIN)
- ✅ Rate limiting en endpoints de auth

### Gestión de Productos

- ✅ Crear productos (solo ADMIN)
- ✅ Listado de productos
- ✅ Obtener detalle de producto
- ✅ Actualizar producto (solo ADMIN)
- ✅ Eliminar producto (solo ADMIN)
- ✅ Subida de imágenes mediante Cloudinary
- ✅ Validación de campos obligatorios

### Carrito de Compras

- ✅ Obtener carrito activo (auto-crea si no existe)
- ✅ Obtener carrito por ID
- ✅ Añadir productos al carrito
- ✅ Actualizar cantidad de producto
- ✅ Eliminar producto del carrito
- ✅ Vaciar carrito
- ✅ Estados del carrito: ACTIVE, CHECKED_OUT

### Wishlist (MongoDB)

- ✅ Añadir producto a favoritos
- ✅ Eliminar producto de favoritos
- ✅ Listar productos guardados por usuario
- ✅ Verificar si producto está en favoritos

### Reseñas/Reviews (MongoDB)

- ✅ Crear reseña de producto
- ✅ Obtener reseñas del usuario
- ✅ Obtener reseñas de un producto
- ✅ Actualizar reseña
- ✅ Eliminar reseña
- ✅ Validación: ratings 1-5, un usuario una reseña por producto

### Órdenes

- ✅ Crear orden desde carrito
- ✅ Obtener órdenes del usuario
- ✅ Obtener detalle de orden
- ✅ Historial de compras

### Seguridad & Middlewares

- ✅ Autenticación con JWT en cookies
- ✅ Validación centralizada de requests
- ✅ Manejo robusto de errores HTTP
- ✅ Control de roles por endpoint
- ✅ Rate limiting global y por endpoint
- ✅ Helmet para headers de seguridad
- ✅ CORS configurado para desarrollo y producción

---

## Tecnologías Utilizadas

### Core

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web

### Bases de Datos

- **Prisma ORM** - ORM para PostgreSQL/Supabase
- **MongoDB** - Base de datos NoSQL (reviews, wishlist, logs)
- **PostgreSQL** - Base de datos relacional principal

### Autenticación & Seguridad

- **JWT** - JSON Web Tokens
- **bcrypt** - Hash de contraseñas
- **cookie-parser** - Manejo de cookies
- **helmet** - Headers de seguridad
- **express-rate-limit** - Rate limiting

### Almacenamiento & Upload

- **Cloudinary** - Almacenamiento de imágenes en la nube
- **Multer** - Middleware para upload de archivos

### Documentación & Testing

- **Swagger/OpenAPI 3.0** - Documentación interactiva
- **swagger-jsdoc** - Generación de specs OpenAPI desde comentarios
- **swagger-ui-express** - Interfaz web de Swagger
- **Jest** - Framework de testing

---

## Estructura del Proyecto

```bash
projectBackEnd/
├── prisma/
│   ├── migrations/
│   │   └── 20260729164906_init/
│   │       └── migration.sql
│   ├── migration_lock.toml
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── cloudinary.js      # Configuración de Cloudinary
│   │   ├── env.js             # Variables de entorno
│   │   ├── mongo.js           # Conexión MongoDB
│   │   ├── multer.js          # Configuración de upload
│   │   ├── prismaClient.js    # Cliente Prisma
│   │   └── swagger.js         # Configuración OpenAPI 3.0
│   │
│   ├── controllers/
│   │   ├── auth.controller.js       # Registro, login, logout
│   │   ├── cart.controller.js       # Gestión de carrito
│   │   ├── order.controller.js      # Órdenes y checkout
│   │   ├── products.controller.js   # Productos
│   │   ├── review.controllers.js    # Reseñas
│   │   ├── server.controller.js     # Health checks
│   │   ├── users.controller.js      # Usuarios
│   │   └── wishlist.controller.js   # Favoritos
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js       # Autenticación JWT
│   │   ├── errorHandler.middleware.js # Manejo de errores
│   │   ├── requireRole.middleware.js  # Control de roles
│   │   └── validate.middleware.js     # Validación de datos
│   │
│   ├── models/
│   │   ├── adminLog.model.js    # Logs de admin (MongoDB)
│   │   ├── review.model.js      # Modelo de reviews (MongoDB)
│   │   └── wishlist.model.js    # Modelo de wishlist (MongoDB)
│   │
│   ├── routes/
│   │   ├── auth.routes.js       # Rutas de autenticación
│   │   ├── cart.routes.js       # Rutas de carrito
│   │   ├── index.routes.js      # Rutas raíz
│   │   ├── orders.routes.js     # Rutas de órdenes
│   │   ├── products.routes.js   # Rutas de productos
│   │   ├── review.routes.js     # Rutas de reseñas
│   │   ├── users.routes.js      # Rutas de usuarios
│   │   └── wishlist.routes.js   # Rutas de favoritos
│   │
│   ├── services/
│   │   ├── auth.service.js        # Lógica de autenticación
│   │   ├── cart.service.js        # Lógica de carrito
│   │   ├── cloudinary.service.js  # Integración Cloudinary
│   │   ├── order.service.js       # Lógica de órdenes
│   │   ├── products.service.js    # Lógica de productos
│   │   ├── review.service.js      # Lógica de reseñas
│   │   ├── users.service.js       # Lógica de usuarios
│   │   └── wishlist.service.js    # Lógica de wishlist
│   │
│   ├── utils/
│   │   ├── common.utils.js    # Funciones auxiliares comunes
│   │   └── errors.utils.js    # Manejador de errores
│   │
│   ├── app.js          # Configuración de Express
│   └── server.js       # Punto de entrada
│
├── .gitignore
├── .env.example        # Variables de entorno de ejemplo
├── package.json
├── package-lock.json
├── prisma.config.js
└── README.md
```

---

## Arquitectura

El proyecto sigue una **arquitectura en capas** bien definida:

```
Request HTTP
    ↓
Routes (routing y parámetros)
    ↓
Middlewares (autenticación, validación)
    ↓
Controllers (orquestación)
    ↓
Services (lógica de negocio)
    ↓
Database (Prisma/MongoDB)
    ↓
Response JSON
```

### Capas del Proyecto

| Capa            | Responsabilidad                         |
| --------------- | --------------------------------------- |
| **Routes**      | Definición de endpoints y métodos HTTP  |
| **Middlewares** | Autenticación, validación, autorización |
| **Controllers** | Orquestación de requests/responses      |
| **Services**    | Lógica de negocio y transacciones       |
| **Utils**       | Funciones auxiliares reutilizables      |
| **Config**      | Configuración de servicios externos     |

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto. Puedes usar `.env.example` como referencia.

### Variables Obligatorias

```bash
# =====================================================================
# SERVIDOR
# =====================================================================
PORT=3000
NODE_ENV="development"

# =====================================================================
# BASE DE DATOS - PostgreSQL (Prisma)
# =====================================================================
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/ecommerce"
DIRECT_URL="postgresql://usuario:contraseña@db.supabase.co:5432/postgres"

# =====================================================================
# BASE DE DATOS - MongoDB
# =====================================================================
MONGO_URI="mongodb+srv://usuario:contraseña@cluster.mongodb.net/ecommerce"

# =====================================================================
# AUTENTICACIÓN - JWT
# =====================================================================
JWT_SECRET="tu-secreto-super-secreto-y-seguro-aqui"

# =====================================================================
# ALMACENAMIENTO - Cloudinary
# =====================================================================
CLOUDINARY_CLOUD_NAME="tu-cloud-name"
CLOUDINARY_API_KEY="tu-api-key"
CLOUDINARY_API_SECRET="tu-api-secret"

# =====================================================================
# CORS - Orígenes permitidos (OPCIONAL, separados por comas)
# =====================================================================
# Por defecto: http://localhost:3000, http://127.0.0.1:3000,
#              http://localhost:5173, http://127.0.0.1:5173
# Para personalizar:
# CORS_ORIGINS="http://localhost:5173,http://localhost:3000,https://tu-dominio.com"
```

### Detalles de Configuración

| Variable                  | Descripción                                     | Ejemplo                                          |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| **PORT**                  | Puerto del servidor                             | `3000`                                           |
| **NODE_ENV**              | Entorno (development, production, test)         | `development`                                    |
| **DATABASE_URL**          | URL PostgreSQL para desarrollo                  | `postgresql://user:pass@localhost/db`            |
| **DIRECT_URL**            | URL PostgreSQL para producción (Supabase)       | `postgresql://user:pass@db.supabase.co/db`       |
| **MONGO_URI**             | URI MongoDB (Atlas o local)                     | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| **JWT_SECRET**            | Secreto para firmar tokens (mín. 32 caracteres) | `supersecretkey123456789abcdefghij`              |
| **CLOUDINARY_CLOUD_NAME** | Nombre de cuenta Cloudinary                     | `tu-cloud`                                       |
| **CLOUDINARY_API_KEY**    | API Key de Cloudinary                           | `123456789`                                      |
| **CLOUDINARY_API_SECRET** | API Secret de Cloudinary                        | `abc123def456`                                   |
| **CORS_ORIGINS**          | URLs permitidas (opcional, separadas por comas) | `http://localhost:5173,https://example.com`      |

---

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/joacocaturelli/projectBackEnd.git
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con tus valores
```

### 4. Ejecutar migraciones de Prisma

```bash
# Migrar base de datos
npx prisma migrate dev

# O resetear DB (CUIDADO - elimina datos)
npx prisma migrate reset
```

### 5. Iniciar el servidor

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## Documentación de la API

### Swagger/OpenAPI

La API está completamente documentada con **Swagger/OpenAPI 3.0**.

Una vez iniciado el servidor, acceder a:

```
http://localhost:3000/api/docs
```

#### Características de la Documentación:

- ✅ **30+ endpoints documentados** - Todos los endpoints con descripción completa
- ✅ **Schemas reutilizables** - 18 esquemas OpenAPI definidos
- ✅ **Seguridad documentada** - Cookie authentication con JWT
- ✅ **Ejemplos realistas** - Valores de ejemplo en todos los campos
- ✅ **Códigos HTTP completos** - 200, 201, 400, 401, 403, 404, 409, 429, 500
- ✅ **Validaciones especificadas** - Restricciones y campos obligatorios

### Endpoints Disponibles

#### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

#### Productos

- `GET /api/products` - Listar todos
- `GET /api/products/{id}` - Detalle
- `POST /api/products` - Crear (ADMIN)
- `PUT /api/products/{id}` - Actualizar (ADMIN)
- `DELETE /api/products/{id}` - Eliminar (ADMIN)

#### Carrito

- `GET /api/cart` - Obtener carrito del usuario
- `GET /api/cart/{cartId}` - Obtener carrito por ID
- `POST /api/cart/items` - Añadir producto
- `DELETE /api/cart/items` - Eliminar producto
- `POST /api/cart/checkout` - Hacer el checkout (Crear una orden)

#### Reviews

- `GET /api/reviews` - Mis reseñas
- `GET /api/products/{productId}/reviews` - Reseñas de producto
- `POST /api/products/{productId}/reviews` - Crear reseña
- `PUT /api/reviews/{productId}` - Actualizar reseña
- `DELETE /api/reviews/{productId}` - Eliminar reseña

#### Wishlist

- `GET /api/wishlist` - Obtener la lista de favoritos
- `POST /api/wishlist/add/{productId}` - Añadir a favoritos
- `DELETE /api/wishlist/{productId}` - Eliminar de favoritos

#### Órdenes

- `GET /api/orders` - Obtener mis órdenes
- `GET /api/orders/{orderId}` - Detalle de orden

#### Usuarios

- `GET /api/users/profile` - Obtener perfil de usuario autenticado
- `GET /api/users` - Obtener todos los usuarios (ADMIN)
- `GET /api/users/{userId}` - Obtener usuario (ADMIN)
- `PUT /api/users/{userId}` - Actualizar rol (ADMIN)
- `DELETE /api/users/{userId}` - Eliminar usuario (ADMIN)

#### Server

- `GET /` - Estado del servidor
- `GET /health` - Salud del servidor

---

## Patrones y Convenciones

### Respuestas API

Todas las respuestas siguen el patrón:

**Éxito (2xx):**

```json
{
  "ok": true,
  "data": {
    /* objeto o array */
  }
}
```

**Error (4xx, 5xx):**

```json
{
  "ok": false,
  "error": "Descripción del error"
}
```

### Códigos de Error

| Código | Tipo          | Significado                          |
| ------ | ------------- | ------------------------------------ |
| 400    | BAD_INPUT     | Datos de entrada incorrectos         |
| 400    | MISSING_INPUT | Faltan datos obligatorios            |
| 401    | WRONG_CRED    | Email o contraseña incorrectos       |
| 401    | NO_TOKEN      | Sin sesión o token inválido/expirado |
| 401    | UNAUTHORIZED  | Usuario sin rol requerido            |
| 404    | NOT_FOUND     | Recurso no encontrado                |
| 409    | CONFLICT      | Recurso ya existe                    |
| 429    | RATE_LIMIT    | Demasiadas peticiones                |
| 500    | BAD_ERROR     | Error interno del servidor           |

### Validaciones

- Email válido y único
- Contraseña mínimo 8 caracteres
- Ratings 1-5 (en reviews)
- Stock no negativo
- Un usuario una reseña por producto
- Autenticación requerida en rutas protegidas

---

## Despliegue

### Render (Producción)

El proyecto se encuentra desplegado en **Render**:

👉 **[https://backend-e-commerce-keoz.onrender.com](https://backend-e-commerce-keoz.onrender.com)**

Documentación Swagger en producción:

👉 **[https://backend-e-commerce-keoz.onrender.com/api/docs](https://backend-e-commerce-keoz.onrender.com/api/docs)**

### Pasos para desplegar

1. Hacer push a rama main/deploy
2. Render se conecta automáticamente con el repositorio
3. Las migraciones se ejecutan automáticamente
4. El servidor se reinicia con los cambios

---

## Seguridad

### Medidas Implementadas

- ✅ JWT en cookies HTTP-only (no accesible por JavaScript)
- ✅ Helmet para headers de seguridad
- ✅ CORS configurado para dominios específicos
- ✅ Password hashing con bcrypt
- ✅ Rate limiting en endpoints críticos
- ✅ Validación centralizada de inputs
- ✅ Control de roles por endpoint
- ✅ Variables de entorno para secretos

### CORS Dinámico

CORS está configurado de forma flexible mediante variable de entorno `CORS_ORIGINS`:

**Valores por defecto (desarrollo):**

```javascript
[
  "http://localhost:3000", // Backend local
  "http://127.0.0.1:3000", // Backend local (IP)
  "http://localhost:5173", // Frontend Vite local
  "http://127.0.0.1:5173", // Frontend Vite local (IP)
];
```

**Personalizar en `.env`:**

```bash
# Para desarrollo (por defecto, puede omitirse)
CORS_ORIGINS="http://localhost:5173,http://localhost:3000"

# Para producción
CORS_ORIGINS="https://mi-app.com,https://www.mi-app.com"

# Múltiples orígenes (desarrollo + producción)
CORS_ORIGINS="http://localhost:5173,http://localhost:3000,https://mi-app.com"
```

**Sin variable `CORS_ORIGINS`:** Usa los valores por defecto de desarrollo.

---

## Manejo de Errores

El proyecto implementa un manejador centralizado de errores con una estructura consistente:

### ErrorHandler Middleware

- Captura todas las excepciones
- Mapea códigos de error internos a HTTP
- Responde con formato JSON standarizado
- Logs en servidor

### Tipos de Errores Soportados

- Errores de validación (400)
- Errores de autenticación (401)
- Errores de autorización (403)
- Errores de recurso no encontrado (404)
- Errores de conflicto (409)
- Errores de servidor (500)

---

## Performance & Scalability

### Optimizaciones

- Índices en base de datos
- Lazy loading de relaciones con Prisma
- Caching en variables de entorno
- Rate limiting en endpoints críticos
- Validación temprana para fallar rápido

### Escalabilidad

- Arquitectura modular y desacoplada
- Base de datos normalizada (Prisma)
- Servicios independientes
- Fácil de agregar nuevas rutas/controllers

---

## Aprendizajes & Lecciones

### Backend Development

- Arquitectura backend modular con Express
- Separación en capas (controllers/services/routes)
- Prisma ORM para PostgreSQL
- MongoDB para datos no relacionales
- Autenticación con JWT y cookies HTTP-only
- Control de roles y permisos

### API Design

- Diseño de APIs REST profesional
- Documentación con Swagger/OpenAPI 3.0
- Manejo centralizado y consistente de errores
- Validación robusta de inputs
- Ejemplos realistas en documentación

### DevOps & Deployment

- Variables de entorno sensibles
- Migraciones de base de datos
- Despliegue en Render
- Rate limiting y seguridad

---

## Soporte

Para reportar bugs o solicitar features, crear un issue en el repositorio.

---

## Licencia

Este proyecto está bajo la licencia ISC.

---

## Autor

**Joaquín Caturelli**

- GitHub: [@joacocaturelli](https://github.com/joacocaturelli)
