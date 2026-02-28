# 📋 Acerca de este proyecto

Sistema robusto de autenticación y control de acceso basado en **JWT (JSON Web Tokens)** con arquitectura RBAC (Role-Based Access Control). Diseñado para gestionar de manera eficiente y segura la identidad de usuarios, sus roles y permisos dentro de la aplicación.

<br>

# 🛠️ Stack tecnológico
<div align="center">

  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
  ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

<br>

# ⚙️ Arquitectura RBAC / MER

### 📑 Modelo Entidad-Relación (MER)

Si quieres ver las propiedades de las entidades, puedes ir a este sitio: [MER completo](https://dbdiagram.io/d/Auth-API-6994d895bd82f5fce2fc2687).

<div align="center">
  <img src="./public/MER.png" alt="RBAC / MER" width="1000" height="400">
</div>

### 🔄 Flujo de autenticación
<div align="center">
  <img src="./public/FlujoDeTokens.png" alt="RBAC / MER" width="1000" height="400">
</div>

### 🔑 Composición de los TOKENS

**TOKEN ACCESS:**
```json
{
  "userID":"1",
  "roleId":"1",
  "iat": 1516239022,
  "exp": 1516242622 
}
```

**TOKEN REFRESH:**
```json
{
  "userId": 1,
  "token": "hash_aleatorio_muy_largo",
}
```

**Json del cliente al logearse**
```json
{
  "userID":"1",
  "name":"jesus francisco cortez torres",
  "email":"jesus@gmail.com",
  "role":{
    "roleId":"1",
    "name":"administrador"
  },
  "permissions":[
    {
    "name_module":"inventario",
      "permissions":["read","update"]
    },
    {
    "name_module":"ventas",
      "permissions":["read","update","delete","create"]
    }
  ],
  "tokens":{
    "token_access":"ABCGDxs283...",
    "token_refresh":"ABCGDxs283..."
  }
}
```

### ⌨️ Codigo de la Base de datos

Puedes ver el codigo de la base de datos [📍Aqui](https://github.com/RitoTorri/AuthAPI/blob/master/database/DB.sql)

<br>

# 🌟 Características Especiales

* **RBAC Dinámico:** Control total basado en roles y permisos.
* **Auto-Seed de Permisos:** ⚡ Al registrar un nuevo módulo, el sistema vincula automáticamente los permisos de CRUD correspondientes en la DB.
* **Seguridad:** Implementación de Refresh Tokens y Rate Limiting.

<br>

# 🔧 Configuración inicial

### 📦 Instalación:
```bash
# Clona el repositorio
git clone https://github.com/RitoTorri/AuthAPI

# Entra al directorio
cd AuthAPI

# Instala las dependencias
npm install
```

### ⚠️ Importante:
Si el proyecto es ejecutado de manera local, Recuerda crear la base de datos primero en PostgreSQL.

### 🔐 Variables de entorno (.env):
Debes renombrar `.env.example` a `.env` y configurar:

**Generales:**
- `PORT=` - Puerto de la aplicación
- `API_RATE_LIMIT_MAX` - Límite de peticiones por ventana de tiempo
- `API_RATE_LIMIT_WINDOW` - Ventana de tiempo (15 min en ms)
- `TOKEN_ACCESS` - Llave secreta para tokens JWT
- `TOKEN_ACCESS_REFRESH` - Llave para refresh tokens

**Base de datos:**
- `DB_HOST` - IMPORTANTE: usa el nombre del servicio Docker o localhost si se ejecuta en local
- `DB_PORT` - Puerto PostgreSQL
- `DB_NAME` - Nombre de la base de datos
- `DB_USERNAME` - Usuario
- `DB_PASSWORD` - Contraseña

**Frontend:**
- `FRONTEND_URL` - URL del frontend para CORS

<br>

# 🚀 Ejecución

### 🐳 En Docker (producción):
```bash
# SOLO PRODUCCIÓN
# Construir imagen
docker compose -f docker-compose.yml build

# Ejecutar contenedores
docker compose -f docker-compose.yml up
```

### 💻 En local (desarrollo):

```bash
# SOLO DESARROLLO
# Modo hot-reload
npm run start:dev
```

### 📄 Documentación

Para ver la documentación de la API REST, visite la siguiente URL:

```bash
http://localhost:PUERTO/docs
```
