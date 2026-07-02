# Sistema de Reserva de Hotel 🏨

Este repositorio contiene un proyecto Full Stack desarrollado como evaluación final académica. El sistema permite la gestión de reservas de un hotel o cadena hotelera, administrando habitaciones, huéspedes, reservas y servicios adicionales mediante una arquitectura estructurada y segura.

## 📝 Descripción del Sistema

La aplicación está diseñada bajo una arquitectura cliente-servidor, exponiendo una **API REST** segura en el backend y consumiéndola a través de una **Single Page Application (SPA)** en el frontend.

---

## 🛠️ Stack Tecnológico Obligatorio

El proyecto exige estrictamente el uso de las siguientes tecnologías y herramientas:

### Backend (API REST)

- **Lenguaje:** Java 17
- **Framework:** Spring Boot (3.x)
- **Persistencia:** Spring Data JPA / Hibernate
- **Base de Datos:** MySQL o PostgreSQL
- **Seguridad:** Spring Security con **JWT** (JSON Web Tokens) y contraseñas cifradas con `BCryptPasswordEncoder`.
- **Patrón de Arquitectura:** Desarrollo riguroso en capas (`Entity` → `Repository` → `Service` → `Controller` → `DTO`).

### Frontend (SPA)

- **Librería/Framework:** React 18+ (Preferiblemente inicializado con Vite)
- **Enrutamiento:** React Router (Protección de rutas según rol del JWT)
- **Llamadas HTTP:** `fetch` o `axios` (Se recomienda Axios para la configuración de interceptores del token).
- **Almacenamiento de Sesión:** `localStorage` o `sessionStorage`.
- **Estilos:** Uso de un framework CSS a libre elección (Ej: Tailwind CSS, Bootstrap, Material UI) o CSS puro para asegurar interfaces modernas y adaptables.

---

## 🚀 Cómo Levantar el Proyecto Completo (Full Stack)

Debido a la naturaleza de un proyecto Full Stack, **debes tener 3 componentes corriendo simultáneamente** en tu máquina para que la aplicación funcione de extremo a extremo.

Sigue estos 3 pasos (cada paso requiere una pestaña de terminal diferente):

### 1. Levantar la Base de Datos (MySQL)
La base de datos almacena toda la información persistente. Si estás utilizando Docker (recomendado):
- Abre una terminal en la **raíz del proyecto**.
- Ejecuta: `docker-compose up -d`
- *(Asegúrate de que el contenedor `hotel_db_mysql` esté corriendo en verde).*

### 2. Levantar el Backend (API Spring Boot)
Este es el "cerebro" (valida contraseñas, genera JWTs y procesa las reservas). **No corre en Docker**, debe lanzarse de forma nativa asegurándote de usar **Java 17**.
- Abre una **nueva** terminal y entra a la carpeta del backend: `cd backend/reservas-backend`
- Ejecuta (Windows): `.\gradlew.bat bootRun`
- Ejecuta (Mac/Linux): `./gradlew bootRun`
- *(Espera a ver el banner de Spring y el mensaje de que está corriendo en el puerto `8080`).*

### 3. Levantar el Frontend (React/Vite)
Esta es la interfaz gráfica que consumirá al Backend.
- Abre una **tercera** terminal y entra a la carpeta del frontend: `cd frontend`
- Instala las dependencias (solo la primera vez): `npm install`
- Levanta el servidor de desarrollo: `npm run dev`
- *(Abre tu navegador en `http://localhost:5173` y disfruta de la aplicación).*
