# Configuración y Puesta en Marcha del Backend (Sistema de Reservas)

¡Hola! Este documento está diseñado para que el equipo de desarrollo Frontend pueda levantar el servidor backend localmente sin problemas tras hacer `pull`.

## 1. Requisitos de Instalación
Para que el proyecto compile y ejecute, asegúrate de tener instalado en tu máquina:
- **Java JDK 17** (Verifica con `java -version` en tu terminal).
- **MySQL Server** (Puede ser XAMPP, MySQL nativo o Docker).

## 2. Configuración de Base de Datos y Resolución de Entornos
Durante la fusión de ramas, se determinó que **el Backend funciona exclusivamente sobre MySQL**, descartando la configuración de PostgreSQL que el equipo Frontend tenía en su archivo `docker-compose.yml`. Para que el backend corra en tu entorno, tienes dos opciones:

### Opción A: Usar Docker (Recomendada y ya configurada)
En la raíz del proyecto existe un archivo `docker-compose.yml` unificado. Abre una terminal en la raíz y ejecuta:
`docker-compose up -d`
Esto levantará un contenedor de MySQL 8.0 en el puerto `3307` con la base de datos `hotel_reservas` y las credenciales listas para usarse. No debes cambiar nada en `application.properties`.

### Opción B: Usar MySQL Local (XAMPP, nativo, etc.)
Si no usas Docker, debes ajustar tu `application.properties`:
1. **Puerto MySQL**: La app busca MySQL en el puerto `3307`. Cámbialo al `3306` si usas XAMPP.
2. **Crear la Base de Datos**: Crea una base de datos vacía llamada exactamente: `hotel_reservas`.
3. **Credenciales**: Cambia las credenciales en `application.properties` por tu usuario y contraseña local.

## 3. Elementos Omitidos por el `.gitignore`
Debido a las buenas prácticas de git, no se han subido las carpetas de compilación ni configuración local (`.idea`, `.vscode`, `node_modules`, `build/`). **Esto es completamente normal.** 
- Al ejecutar el proyecto Java por primera vez, Gradle descargará todas las dependencias (`spring-boot-starter-web`, `security`, `jpa`, `mysql-connector`, `java-jwt`) y generará las carpetas automáticamente.
- Igualmente, recuerda correr `npm install` en la carpeta `frontend/` para recuperar los paquetes de React.

## 4. Inyección de Datos Masiva (Seed)
**¡ATENCIÓN!** Para que la interfaz de usuario se vea real, funcione el sistema de precios dinámicos y los filtros de la barra lateral cobren vida, **debes poblar la base de datos** con los datos semilla.

El archivo generador `seed.py` en la raíz del proyecto crea un script SQL (`seed.sql`) que contiene más de 60 hoteles realistas con distribución variada de estrellas. Además, de forma automática, **le asocia a cada hotel 1 habitación aleatoria** con precios, capacidades y tipos lógicos (Estandar, Económica o Premium) asegurando que el cálculo de precios del Frontend funcione.

Una vez que tengas el servidor Java corriendo y las tablas creadas (Hibernate lo hace automático), debes inyectar los datos. Puedes ejecutar el script `seed.py` (usando Python) para generar un `seed.sql` fresco con habitaciones aleatorias, o usar el archivo SQL que ya está en la raíz. Abre tu terminal en la **raíz del proyecto** y, si usaste Docker, ejecuta este comando para importar los datos:
```bash
docker exec -i hotel_db_mysql mysql -u hotel_user -photel_pass hotel_reservas < seed.sql
```
*(Si no usas Docker, puedes simplemente abrir el archivo `seed.sql` en tu cliente SQL como DBeaver o phpMyAdmin y ejecutar el script allí).*

## 5. Levantar el Servidor
Abre una terminal en la carpeta `backend/reservas-backend/` y ejecuta:

- En **Windows**: `.\gradlew.bat bootRun`
- En **Mac/Linux**: `./gradlew bootRun`

Si ves el arte ASCII de Spring y el mensaje *"Started ReservasBackendApplication"*, el servidor está corriendo en `http://localhost:8080`.

## 6. Notas de Integración Activas
- **Mapeo Real de Atributos**: Ya no usamos Mocks. Todo el frontend está leyendo las imágenes y amenidades de forma dinámica y calculada (`axiosConfig.js`) basadas en la información que escupe la base de datos.
- **Perfil de Usuario**: El registro de usuarios (`/auth/register`) ahora requiere y guarda el `nombreCompleto`. Asegúrate de que el frontend lo envíe correctamente, el backend lo inyectará en el JWT para que la UI principal lo renderice con nombre y apellido.
- **CORS (Puertos)**: El backend acepta peticiones *únicamente* desde `http://localhost:5173`. Si tu frontend corre en otro puerto, tendrás error de CORS. Ajusta tu puerto en Vite o avisa para añadirlo en `CorsConfig.java`.
