# Proyecto CRUD Angular & Nest.js

Este proyecto está dividido en dos partes principales:

1. **Backend**: Implementado con Nest.js.
2. **Frontend**: Implementado con Angular.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- [Visual Studio Code](https://code.visualstudio.com/).
- [Node.js](https://nodejs.org) (versión 22 o superior).
- [npm](https://www.npmjs.com/) (incluido con Node.js).
- [Angular CLI](https://angular.dev/tools/cli) (para ejecutar el frontend 19.2.1 o superior).
- Puedes comprobar la compatibilidad de las versiones de Angular [aquí](https://angular.dev/reference/versions)

```bash
npm install -g @angular/cli
```

## Pasos para levantar el proyecto

### 1. Levantar el Backend (Nest.js)

Navega a la carpeta del backend:

```bash
cd backend
npm i
npm run start:dev
```

### 2. Levantar el Frontend (Angular)

Navega a la carpeta del frontend:

```bash
cd frontend
npm i
ng serve
```

### 2. Acceso al proyecto

Una vez ambos servicios estén levantados, puedes acceder al proyecto desde tu navegador.

1. **Frontend:** http://localhost:4200
2. **Backend:** http://localhost:3000
3. **Backend SWAGGER:** http://localhost:3000/api-docs/

---

### TAREA: CRUD utilizando **Nest.js** como backend en Angular

#### Objetivo:

Desarrollar una aplicación web utilizando **Angular** con funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) usando **Nest.js** como backend.

#### Descripción General

Esta aplicación permite gestionar un inventario de coches de forma estructurada y eficiente. Está diseñada para concesionarios, gestores de flotas o cualquier entidad que necesite registrar vehículos con múltiples variantes o unidades asociadas.

#### 🧠 Concepto Principal

La aplicación se basa en un modelo jerárquico:

Coche principal (CreateCar): Representa un modelo de coche con una marca y un modelo.
Detalles del coche (CarDetails): Cada coche principal puede tener múltiples unidades físicas asociadas, cada una con sus propios datos como matrícula, kilometraje, precio, disponibilidad, etc.
Esto permite, por ejemplo, registrar un modelo de coche como "Toyota Corolla" y luego añadir varias unidades disponibles en stock, cada una con sus características específicas.

#### Requerimientos del Proyecto:

1. **Configuración del entorno de desarrollo**:

   - Configurar **Prettier** para formateo automático del código.
   - Configurar **ESLint** para análisis estático de código.
   - Configurar **Karma** para que sea necesario un 80% de code coverage.
   - Configurar **GitHub** para aplicar una template a la hora de realizar las pull request.
   - Configurar **Husky** para hooks pre-commit que aseguren que el código está bien formateado y cumple con las reglas establecidas.
   - Seguir el flujo de trabajo **GitFlow** para la gestión de ramas y commits.

2. **Estilos**:

   - Utilizar estilos propios (css/scss).
   - No está permitido usar librerías de componentes externos (como Material, PrimeNG, etc.).
   - No existe un diseño predefinido para la aplicación, siéntete libre de crear la interfaz a tu gusto. Puedes revisar el diseño en la carpeta "diseño ejemplo" pero es orientativo sobre la funcionalidad, no debes replicarlo.

&nbsp;

<h1 style="font-size: 30px;">A continuación, ponemos una serie de prácticas sugeridas para realizar el proyecto. Son orientativas, no tienes por qué ir paso a paso con lo indicado si así lo consideras.</h1>

### **Práctica 1: Configuración Inicial**

1. Hacer un [fork](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) del repositorio.
2. [Proteger la rama main](https://docs.github.com/es/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) para que no se pueda realizar commits directamente, solo a partir de Pull Request.
3. Crear una rama `feat/initial-project` para configurar los proyectos y lanzar una Pull Request.
4. Crea una plantilla para realizar las Pull Request (diseño libre).
5. Configurar [Prettier](https://prettier.io/docs/install), [ESLint](https://www.npmjs.com/package/@angular-eslint/eslint-plugin#:~:text=ESLint%20plugin%20for%20Angular%20applications%2C%20following%20https%3A%2F%2Fangular.dev%2Fstyle-guide.%20Latest,in%20your%20project%20by%20running%20%60npm%20i%20%40angular-eslint%2Feslint-plugin%60.) y [Husky](https://typicode.github.io/husky/get-started.html) en el frontend.
6. Instalar el [CDK de Angular](https://www.npmjs.com/package/@angular/cdk).

---

### **Práctica 2: Crear un botón reutilizable**

Deberemos crear una [directiva](https://angular.dev/guide/directives/attribute-directives) que se usará sobre los botones/links con el objetivo de que mantengan un estilo uniforme sobre toda la aplicación.

Podemos utilizar la directiva de la forma que la usa Angular Material con el componente [button](https://material.angular.io/components/button/overview).

--

### **Práctica 3: Crear la Estructura de la Tabla**

1. Crear una nueva rama `feat/home-page`.
2. Crear el [componente](https://angular.dev/guide/components) inicial `HomeComponent` y configurar como la [ruta inicial](https://angular.dev/guide/routing).
3. Crear un componente `TableComponent` con la siguiente estructura:

   > (Opcional) Breadcrumb en la parte superior para manejar la navegación (ver práctica 6).

   - **Botón en la parte superior** dirige a la vista de Creación.
   - **Campo ID**. Tendrá un link que redirige a la vista de detalle.
   - **Campo Marca**
   - **Campo Modelo**
   - **Campo Total**
   - **Campo Acciones**:
     <br> Se compone de dos acciones:

     > Editar: Abre una vista con un formulario.
     > &nbsp;

     > Eliminar: Muestra una ventana modal de confirmación.

     - (Opcional) Utilizar un menu contextual para mostrar las opciones.
       Tienes la opción de utilizar el [Menu](https://material.angular.io/cdk/menu/examples) del cdk de Angular o crear tu propio componente.

4. Subir los cambios y abrir una Pull Request.

---

### **Práctica 4 (Opcional): Implementar breadcrumb para la navegación**

1. Crear una nueva rama `feat/breadcrumb`.
2. Crear un componente breadcrumb que reciba:
   - url.
   - label.
3. Manejar la funcionalidad de la navegación.
4. Subir los cambios y abrir una Pull Request.

<strong> Si decides no utilizar un breadcrumb deberás manejar la navegación para volver a la tabla desde el detalle de la forma que veas mas adecuada. </strong>

---

### **Práctica 5: Conexión Angular y Nest.js**

Para que la API funcione correctamente, es necesario almacenar en el `localStorage` un token de autenticación (ya que no vamos a desarrollar un login, porque se sale del objetivo de la práctica).  
Este token debe utilizarse en cada petición como un **Bearer Token** en la cabecera `Authorization`.

### **Instrucciones:**

1. Abre la consola del navegador (`F12`) y accede a la pestaña **Application**.
2. En la sección **Local Storage**, selecciona el dominio de la aplicación.
3. Añade una nueva clave con el siguiente formato:

   - **Clave:** `auth-token`
   - **Valor:** `"mock-token"`

   También puedes hacerlo mediante la consola ejecutando:

   ```javascript
   localStorage.setItem("auth-token", "mock-token");
   ```

4. Crear una nueva rama `feat/api-integration`.
5. Configurar en el frontend un [servicio](https://angular.dev/tutorials/first-app/09-services) Angular (`CarsService`) para manejar las peticiones al backend:
   - `getCars`: Llama al endpoint `GET /cars`.
   - `getCarById`: Llama al endpoint `GET /cars/:id`.
   - `createCar`: Llama al endpoint `POST /cars`.
   - `updateCar`: Llama al endpoint `PUT /cars/:id`.
   - `deleteCar`: Llama al endpoint `DELETE /cars/:id`.
6. Configurar en el frontend un servicio Angular (`BrandsService`) para manejar las peticiones al backend:
   - `getBrands`: Llama al endpoint `GET /brands`.
   - `getModelByBrand`: Llama al endpoint `GET /brands/:brandId/models`.
7. Actualizar el componente `TableComponent` para obtener los datos de los servicios y mostrarlos en la tabla.
8. Ten en cuenta el [swagger](http://localhost:3000/api-docs/) que tenemos a la hora de validar los datos antes de enviarlo al backend.
9. Subir los cambios y abrir una Pull Request.

---

### **Práctica 6: Crear HTTP Interceptor**

#### **Requisitos previos**

Antes de comenzar, asegúrate de haber completado la **Práctica 4** y de que el token de autenticación está almacenado en el `localStorage`.

Implementa un [interceptor](https://angular.dev/guide/http/interceptors) para añadir el token en cada petición realizada al backend.

---

### **Práctica 7: Crear Pantallas de Detalle, Edición y Nuevo Item**

1. Crear una nueva rama `feat/car-details`.
2. **Pantalla de Detalle**:

   - Crear un componente `CarDetailsComponent`.
   - Configurar una ruta dinámica como para leer el id desde la ruta `cars/:id`.
   - Mostrar los datos del coche obtenidos del backend.
   - Cuando se muestre el campo mileage usaremos un pipe para ver 2 decimales.
   - Crear un [pipe personalizado](https://angular.dev/tutorials/learn-angular/24-create-a-pipe), y junto al campo de mileage controlaremos 3 estados: Nuevo / Kilómetro 0 / Ocasión.

     - Si el mileage es 0, mostraremos un tag verde que ponga "Nuevo"
     - Si es mileage menor a 100km, mostraremos un tag azul que ponga "Km 0"
     - El resto, mostraremos un tag amarillo que ponga "Ocasión"

   - Cuando se muestre el campo de price usaremos el pipe currency.

---

### **Práctica 8: Crear Pantalla Nuevo Item**

1. Crear una nueva rama `feat/create-car`.
2. **Pantalla de Creación**:

   - Configurar una ruta como `cars/create`.
   - Implementar un formulario reactivo para crear nuevos coches (se necesitará el uso de FormArray para el carDetails).
   - Para las brands y model deberás rellenar la información con sus endpoint correspondientes (recuerda que ambos `select` están relacionados, por lo que deberás controlarlo correctamente).
   - El `select` de las monedas deberá ser con un formato válido para el backend (no es un campo libre).
   - Documentación [formularios reactivos](https://angular.dev/guide/forms/reactive-forms). Es una documentación muy extensa, se recomienda leerlo tranquilamente antes de comenzar a realizar el formulario. Conocer conceptos como los `formControl`, `formGroup`, `formArray`, `validaciones`, etc. antes de comenzar a crear el formulario.

---

<h1 style="color: red;">**Debes tener en cuenta todas las validaciones del backend**</h1>

- manufactureYear debe ser como máximo el año actual y como mínimo el año 1900.
- registrationDate no puede ser anterior a manufactureYear.
- Respetar el formato de licensePlate.
- Respetar los valores posibles de currency (comprobar los valores en el swagger).
- No olvides revisar el swagger para comprobar el resto de validaciones (requeridos, valores máximos, etc.).
- Si te encuentras algún error no indicado aquí, revisa el mensaje de error del endpoint correspondiente.

---

### **Práctica 9: Crear Pantalla Edit Item**

1. Crear una nueva rama `feat/edit-car`.
2. **Pantalla de Edición**:
   - Configurar una ruta dinámica como `cars/edit/:id`.
   - Usar el formulario reactivo con datos pre cargados del backend.
   - Recuerda que debe funcionar igual que la creación (se recomienda usar el mismo formulario que hiciste para la creación).

---

### **Práctica 10: Implementar Funcionalidad de Eliminar con Modal**

1. Crear una nueva rama `feat/delete-car`.
2. Crear un componente modal reutilizable (o utilizar el [Dialog](https://material.angular.io/cdk/dialog/overview) del cdk de Angular).
3. Conectar el modal al botón "Eliminar" en la tabla para que realize la llamada a su servicio correspondiente.
4. Subir los cambios y abrir una Pull Request.

---

### **Práctica 11: Manejo de Errores y Mensajes**

1. Crear una nueva rama `feat/error-handling`.
2. Crear un servicio Angular para mostrar [notificaciones](https://material.angular.io/cdk/overlay/overview) utilizando el CDK:
   - Definir métodos para mostrar mensajes de éxito, error e información.
3. Manejar errores en todas las operaciones de los servicio (siéntete libre de utilizar la estrategia que veas más correcta y escalable).
4. Mostrar notificaciones con mensajes claros para cada tipo de error.
5. Subir los cambios y abrir una Pull Request.

---

### **Práctica 12: Loaders**

1. Crear una nueva rama `feat/loader`.
2. Crear un componente loader (diseño libre):
3. Manejar la implementación y ver la mejor forma de utilizarlo (como si fuera un overlay, en cada componente, ...).
4. (Opcional): Puedes realizarlo a traves de un interceptor
5. Subir los cambios y abrir una Pull Request.

---

### **Práctica 13: Finalización y Documentación**

1. Crear una nueva rama `feat/documentation`.
2. Crear un archivo `CONTRIBUTING.md` con normas de contribución (puedes investigar proyectos públicos para organizarte):
   - Flujo de trabajo GitFlow.
   - Convenciones de commits (feat, fix, refactor, etc.).
   - Proceso de revisión de código (Pull Requests).
3. Subir los cambios y abrir una Pull Request.

---

### Todos los nombres de componentes, métodos, variables, etc. deberán estar en ingles.

### Documenta todo lo que que consideres necesario y aporte valor. Evita describir lo que hace el código línea a línea. Busca que sea un código auto explicativo, orienta la documentación utilizando formato [JSDoc](https://jsdoc.app/).

### Se trata de un proyecto en versión 19, por lo que se valorará la elección de las últimas funcionalidades (standalone components, nuevo template flow, signals, etc.) pero no es requisito obligatorio.

### BONUS: Conseguir un 80% de code coverage.

### Recomendamos seguir el [coding style guide](https://angular.dev/style-guide) propuesto por Angular para el desarrollo de este proyecto.
