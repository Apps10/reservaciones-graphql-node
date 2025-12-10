# 📌 Reservaciones GraphQL Node

Una API de reservaciones de propiedades desarrollada en **Node.js**, usando **GraphQL**, **Sequelize**, **MySQL** y autenticación JWT. Permite a los usuarios gestionar propiedades, reservas y fechas bloqueadas de manera segura.

---

## 🛠 Tecnologías

- **Backend:** Node.js, TypeScript, GraphQL, Apollo Server
- **Base de datos:** MySQL
- **ORM:** Sequelize
- **Autenticación:** JWT
- **Testing:** Jest
- **Otras herramientas:** Redis (para WebSockets), bcrypt (para hashing de contraseñas)

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/Apps10/reservaciones-graphql-node.git
cd reservaciones-graphql-node
```

2. Instalar dependencias:

```bash
npm install
```

3. copia el archivo .env.example a .env en la raíz del proyecto con las siguientes variables:

```
DB_HOST=localhost
DB_NAME=nombre_de_tu_base
DB_USER=usuario
DB_PASSWORD=contraseña
JWT_SECRET=tu_secreto_jwt
PORT=4000
```

4. Levantar la base de datos MySQL

```bash
  docker-compose -f docker-mysql.yml up -d
```

5. Levanta el servidor

```bash
  npm run start:dev
```


### 🚀 URL por defecto de GraphQL Playground: http://localhost:4000/graphql

### 📝 Funcionalidades

#### Usuarios

Registro y login de usuarios con JWT.

Roles: visitante, propietario.

Consulta de perfil con token.

#### Propiedades

Crear, actualizar, eliminar propiedades (solo propietarios).

Consultar todas las propiedades de un usuario.

#### Reservas

Crear reservas para propiedades.

Consultar reservas por fecha y estado.

Validación para evitar fechas bloqueadas o reservas sobrepuestas.

#### Fechas bloqueadas

Crear fechas bloqueadas para propiedades (solo propietario).

Evitar solapamientos con reservas confirmadas.

### 🔧 Tests

Se usan tests unitarios con Jest.

Para correr los tests:

npm run test


⚠️ Notas importantes

Actualmente, Sequelize sincroniza las tablas con force: true en desarrollo, lo que borra los datos al reiniciar el servidor. Ajustar para producción.

Middleware incluido para validación de token y roles.

La API siempre retorna errores de GraphQL estandarizados usando GraphQLHandlerException.

### 📂 Estructura del proyecto
```bash
/src
  /config       -> Configuración de DB y entorno
  /interfaces   -> Interfaces de User, Property, Booking
  /models       -> Modelos Sequelize
  /repositories -> Repositorios Sequelize
  /services     -> Lógica de negocio
  /resolvers    -> GraphQL resolvers
  /middleware   -> Middlewares de validación
  /utils        -> Utilidades (JWT, hash)
  /tests        -> Tests unitarios
```
