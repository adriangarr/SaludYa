# SaludYa - Sistema de Gestión de Citas Médicas

## Descripción del proyecto

SaludYa es una aplicación web desarrollada para optimizar la gestión de citas médicas en consultorios y centros de atención pequeños. El sistema permite a los pacientes consultar horarios disponibles y agendar citas médicas de manera sencilla, mientras que los médicos pueden gestionar su disponibilidad y visualizar su agenda diaria.

## Problema que resuelve

Muchos consultorios pequeños gestionan las citas médicas de forma manual, generando desorganización, pérdida de información y dificultades en la atención de los pacientes.

SaludYa permite digitalizar el proceso de agendamiento y administración de citas, mejorando la eficiencia del servicio.

## Funcionalidades implementadas

### Pacientes

* Registro de usuario.
* Inicio de sesión.
* Consulta de disponibilidad médica.
* Agendamiento de citas.
* Visualización de citas programadas.
* Cancelación de citas.

### Médicos

* Inicio de sesión.
* Gestión de disponibilidad.
* Visualización de agenda médica.
* Consulta de pacientes agendados.

## Arquitectura General

Frontend:

* React
* Vite
* CSS

Backend:

* Node.js
* Express.js

Base de Datos:

* MongoDB Atlas

Despliegue:

* Frontend: Vercel
* Backend: Render

## Tecnologías utilizadas

* React
* Vite
* JavaScript
* Node.js
* Express
* MongoDB Atlas
* Mongoose
* GitHub
* GitHub Actions
* Jest
* Supertest

## Instalación local

### Clonar repositorio

git clone https://github.com/adriangarr/SaludYa.git

### Backend

cd backend

npm install

Crear archivo .env

MONGO_URI=mongodb://admin:S%40ludYa2026@ac-lcjhrpo-shard-00-00.mpkamrz.mongodb.net:27017,ac-lcjhrpo-shard-00-01.mpkamrz.mongodb.net:27017,ac-lcjhrpo-shard-00-02.mpkamrz.mongodb.net:27017/saludya?ssl=true&replicaSet=atlas-x4dg54-shard-0&authSource=admin&appName=Cluster0

PORT=5000

Ejecutar:

npm run dev

### Frontend

cd frontend

npm install

npm run dev

## Pruebas

Ejecutar:

npm test

Cobertura:

npm run test:coverage

## Producción

Backend desplegado en Render.

Frontend desplegado en Vercel.

## Autor

Sergio Garrido
Proyecto Ibero Americana
