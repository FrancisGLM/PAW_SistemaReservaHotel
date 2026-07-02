# Configuración y Puesta en Marcha del Backend (Sistema de Reservas)

¡Hola! Este documento está diseñado para que el equipo de desarrollo Frontend pueda levantar el servidor backend localmente sin problemas tras hacer `pull`.

## 1. Requisitos de Instalación
Para que el proyecto compile y ejecute, asegúrate de tener instalado en tu máquina:
- **Java JDK 17** (Verifica con `java -version` en tu terminal).
- **MySQL Server** (Puede ser XAMPP, MySQL nativo o Docker).

## 2. Configuración de Base de Datos (Resolución de Conflictos)
Durante la fusión de ramas, se determinó que **el Backend funciona exclusivamente sobre MySQL**, descartando la configuración de PostgreSQL que el equipo Frontend tenía en su archivo `docker-compose.yml`. Para que el backend corra en tu entorno, tienes dos opciones:

### Opción A: Usar Docker (Recomendada y ya configurada)
En la raíz del proyecto ahora existe un archivo `docker-compose.yml` unificado. Solo debes abrir una terminal en la raíz y ejecutar:
`docker-compose up -d`
Esto levantará un contenedor de MySQL 8.0 en el puerto `3307` con la base de datos `hotel_reservas` y las credenciales `hotel_user` / `hotel_pass` listas para usarse. (Si usas esta opción, no debes cambiar nada en `application.properties`).

### Opción B: Usar MySQL Local (XAMPP, nativo, etc.)
Si no tienes Docker, debes modificar tu entorno local o el archivo `application.properties`:
1. **Puerto MySQL**: Por defecto, la app busca MySQL en el puerto `3307`. Cámbialo en la línea `spring.datasource.url` al `3306` si usas XAMPP.
2. **Crear la Base de Datos**: Crea una base de datos vacía llamada exactamente: `hotel_reservas`. Spring Data JPA (`ddl-auto=update`) creará las tablas automáticamente.
3. **Usuario y Contraseña**: Cambia las credenciales en `application.properties` por tu usuario local (usualmente `root`) y tu contraseña (usualmente vacía `""`).

## 3. Elementos Omitidos por el `.gitignore`
Debido a las buenas prácticas del `.gitignore`, no se han subido las carpetas de compilación ni configuración personal de IDEs. **Esto es completamente normal.** 
- No te asustes si no ves la carpeta `build/` o `.gradle/`.
- Al ejecutar el proyecto por primera vez, Gradle descargará todas las dependencias (`spring-boot-starter-web`, `security`, `jpa`, `mysql-connector`, `java-jwt`, `lombok`) y generará esas carpetas automáticamente.

## 4. Levantar el Servidor
Abre una terminal en la carpeta `backend/reservas-backend/` y ejecuta:

- En **Windows**: `.\gradlew.bat bootRun`
- En **Mac/Linux**: `./gradlew bootRun`

Si ves el arte ASCII de Spring y el mensaje *"Started ReservasBackendApplication in X seconds"*, el servidor está corriendo en `http://localhost:8080`.

## 5. Notas para la Integración con el Frontend
Antes de empezar a conectar la interfaz, ten en cuenta estos dos detalles importantes del flujo de trabajo:

1. **CORS (Puertos)**: Por seguridad, el backend está configurado para aceptar peticiones *únicamente* desde `http://localhost:5173` (puerto por defecto de Vite). Si tu frontend corre en otro puerto (ej. `3000`), tendrás un error de CORS en la consola del navegador. Si esto ocurre, avísame para añadir tu puerto al archivo `CorsConfig.java`.
2. **Base de Datos Vacía (Seeding)**: Al levantar el proyecto, la base de datos no tendrá información. Para empezar a probar, deberás usar Postman/ThunderClient y hacer un `POST` a `/auth/register` (es un endpoint público libre) para crearte un usuario con rol `ADMIN`. Luego inicia sesión, toma tu Token JWT, y úsalo para crear Hoteles y Habitaciones para poder renderizarlos en el Front.

## 6. Estado del Backend
- Todo el backend cumple al 100% con la rúbrica académica (Reglas de negocio, Seguridad JWT, Manejo de errores).
- Existe un endpoint de prueba inicial para saber que todo está OK: `POST /auth/register`.
