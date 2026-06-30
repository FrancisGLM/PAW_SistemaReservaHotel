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
