
# API de Gestión de Usuarios de Moodle

## Descripción
Esta API maneja la creación, actualización y obtención de usuarios en una instancia de Moodle, permitiendo además la gestión de matriculaciones.

## Funcionalidades
- **Creación de usuarios:** Permite registrar nuevos usuarios en el sistema de Moodle.
- **Actualización de usuarios:** Ofrece la capacidad de actualizar datos de usuarios existentes.
- **Gestión de matriculaciones:** Administra las inscripciones de los usuarios en cursos específicos.

## Características

- Creación de usuarios en Moodle junto con sus respectivas matriculaciones.
- Actualización de los detalles del usuario.
- Consulta de usuarios y sus cursos matriculados.
- Manejo de roles y asignaciones a cursos y grupos.

## Requisitos

- Node.js versión 12.x o superior
- npm (Normalmente viene con Node.js)
- Acceso a una instancia de Moodle con las capacidades de API habilitadas

## Configuración

Antes de iniciar, asegúrate de configurar las variables de entorno necesarias:

- `MOODLE_TOKEN`: El token de servicio web para acceder a la API de Moodle.
- `MOODLE_URL`: La URL base de tu instancia de Moodle.

Puedes configurar estas variables en un archivo `.env` en la raíz de tu proyecto:

MOODLE_TOKEN=yourmoodletokenhere
MOODLE_URL=https://yourmoodleinstance.com

## Contacto
Para más información o soporte, contactar a:

- **Nombre:** Hector Arismendi
- **Email:** [hector.arismendi@funiber.org](mailto:hector.arismendi@funiber.org)

## Versionado
Esta documentación corresponde a la versión 1.0.0 de la API.

## Uso
La API se consume enviando solicitudes HTTP a los endpoints definidos. Cada acción sobre los usuarios o las matriculaciones está representada por una ruta específica y requiere datos en formato JSON.

## Ejemplos
Se proveen ejemplos de uso en la documentación interactiva accesible mediante la interfaz de Swagger, después de la autenticación adecuada.
