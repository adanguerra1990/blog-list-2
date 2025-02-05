# Blog List Application

Este proyecto es una aplicación de lista de blogs construida con Node.js. Permite a los usuarios crear, leer, actualizar y eliminar blogs.

## Características

- Crear un nuevo blog
- Leer blogs existentes
- Actualizar blogs
- Eliminar blogs

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- React
- Redux

## Instalación

1. Clona el repositorio:
     ```bash
     git clone https://github.com/tu-usuario/blog-list.git
     ```
2. Navega al directorio del proyecto:
     ```bash
     cd blog-list
     ```
3. Instala las dependencias del servidor:
     ```bash
     npm install
     ```
4. Navega al directorio del cliente:
     ```bash
     cd client
     ```
5. Instala las dependencias del cliente:
     ```bash
     npm install
     ```
6. Inicia la aplicación:
     ```bash
     npm run dev

## Uso

1. Inicia el servidor:
     ```bash
     npm start
     ```
2. Inicia la aplicación cliente:
     ```bash
     cd client
     npm start
     ```

La aplicación estará disponible en `http://localhost:5173`.

## Conexión a la API

Para conectarse a la API, utiliza la siguiente URL: `https://blog-backend-ackl.onrender.com/api/blogs`. Puedes realizar peticiones HTTP a esta URL para interactuar con los blogs.

Ejemplo de una petición GET para obtener todos los blogs:
```bash
curl https://blog-backend-ackl.onrender.com/api/blogs
```
El código fuente de la API está disponible en el siguiente repositorio de GitHub: [https://github.com/adanguerra1990/blog-backend](https://github.com/adanguerra1990/blog-backend).

## Contribuir

1. Haz un fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`)
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.