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
  ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

<br>

# ⚙️ Arquitectura RBAC / MER

**Modelo Entidad-Relación (MER)** del sistema de autenticación y control de acceso basado en roles (RBAC). El diseño garantiza escalabilidad, mantenibilidad y un control de acceso preciso siguiendo las mejores prácticas de seguridad.

<div align="center">
  <img src="./public/MER.png" alt="RBAC / MER" width="1000" height="400">
</div>

## Project setup

```bash
$ npm install
```

# 🚀 Como ejecutar el proyecto

Este servicio esta diseñado para se ejecutado en docker. Por lo tanto, para poder ejecutarlo primero debes de llenar los datos del archivo `.env.example`, cambiar el nombre del archivo a `.env` y luego ejecutar los siguientes comandos:

### 💻 Desarrollo
```bash

# Para construir la imagen de docker
npm run start:docker:dev:build

# Para ejecutar el servicio en modo desarrollo
npm run start:docker:dev:run

```