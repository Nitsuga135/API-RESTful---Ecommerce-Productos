# API RESTful - Ecommerce Productos

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Architecture](https://img.shields.io/badge/Architecture-MVC%20%2B%20DAO-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

API REST desarrollada en **Node.js** utilizando **Express** y **MongoDB** para la gestión de productos de un ecommerce.

Este proyecto implementa una arquitectura **MVC + DAO** que separa la lógica de negocio, el manejo de peticiones HTTP y el acceso a datos.

El objetivo del proyecto es practicar y demostrar conocimientos en:

* desarrollo de APIs REST
* arquitectura backend escalable
* manejo de persistencia de datos
* separación de responsabilidades
* uso de variables de entorno
* preparación de proyectos para despliegue

---

# Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Joi (validación de datos)
* Nodemon (entorno de desarrollo)

---

# Arquitectura del proyecto

El proyecto sigue el patrón **MVC + DAO (Data Access Object)**.

Esto permite desacoplar la lógica del sistema y facilitar el mantenimiento o cambio del sistema de persistencia.

### Capas del proyecto

**Controller**

Responsable de manejar las peticiones HTTP y devolver respuestas al cliente.

**Service**

Contiene la lógica de negocio del sistema.

**DAO (Data Access Object)**

Encapsula el acceso a los datos y permite cambiar la persistencia sin modificar la lógica del sistema.

**Model**

Interacción directa con la base de datos.

---

# Estructura del proyecto

```
project-root
│
├── config
│   └── config.js
│
├── controllers
│   └── productos.js
│
├── servicios
│   └── productos.js
│
├── model
│   ├── DAO
│   │   └── ModelMongoDB.js
│   │
│   └── DBMongo.js
│
├── server.js
├── package.json
├── .env
└── README.md
```

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/tuusuario/apirestfull.git
```

Entrar en la carpeta del proyecto

```bash
cd apirestfull
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MODO_PERSISTENCIA=MONGODB
PORT=8080
STRCNX=mongodb_connection_string
BASE=ecommerce
```

Estas variables permiten configurar:

* modo de persistencia
* puerto del servidor
* cadena de conexión a MongoDB
* nombre de la base de datos

---

# Ejecución del proyecto

Modo desarrollo

```bash
npm run dev
```

Modo producción

```bash
npm start
```

Servidor disponible en

```
http://localhost:8080
```

---

# Endpoints de la API

### Obtener todos los productos

```
GET /api/productos
```

---

### Obtener producto por ID

```
GET /api/productos/:id
```

---

### Crear producto

```
POST /api/productos
```

Ejemplo de body:

```json
{
  "nombre": "Producto ejemplo",
  "precio": 100,
  "stock": 10
}
```

---

### Actualizar producto

```
PUT /api/productos/:id
```

---

### Eliminar producto

```
DELETE /api/productos/:id
```

---

# Persistencia

La aplicación permite cambiar el tipo de persistencia mediante la variable:

```
MODO_PERSISTENCIA
```

Opciones disponibles:

```
MEM
FILE
MONGODB
```

Actualmente el proyecto está configurado para utilizar **MongoDB**.

---

# Buenas prácticas implementadas

* Arquitectura **MVC + DAO**
* Uso de **variables de entorno**
* Separación de responsabilidades
* Manejo de errores en las capas del sistema
* Exclusión de archivos sensibles mediante `.gitignore`
* Preparado para despliegue en servicios cloud

---

# Dependencias principales

```
express
mongodb
joi
```

Dependencias de desarrollo

```
nodemon
```

---

# Autor

Agustin Giraldez

---

# Notas

Algunos valores del README fueron dejados como ejemplos para permitir la adaptación del proyecto según el entorno donde se despliegue.

Los siguientes datos deben ser completados según el entorno del usuario:

* URL real del repositorio
* cadena de conexión a MongoDB
* posible URL de deploy de la API
* endpoints adicionales en caso de ampliar el proyecto
