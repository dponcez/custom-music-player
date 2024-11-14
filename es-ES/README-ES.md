# 🎶 Reproductor de Música Personalizado

> **NOTA**: este proyecto es una aplicación de música personalizada y no tiene relación con ningún sello discográfico o compañía musical. El propósito de este proyecto es únicamente para entretenimiento.
> Los derechos de autor de las canciones e imágenes utilizadas en este proyecto pertenecen a sus respectivos dueños.

## Entorno de Desarrollo
----

__Tecnologías__

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

__Editor de código fuente__

- [VSCode](https://code.visualstudio.com)

__Herramienta__

- [GIT](https://git-scm.com)

### Estructura del Proyecto
----

```
└── 📁custom-music-player
    └── 📁assets
        └── 📁audio
        └── 📁figma
        └── 📁images
    └── 📁css
        └── main.css
    └── 📁hooks
        └── theme.js
    └── 📁js
        └── script.js
    └── 📁json
        └── index.json
    └── 📁modules
        └── custom_functions.js
        └── player.js
        └── template.js
    └── 📁utils
        └── debounce.js
        └── formatTime.js
    └── .gitignore
    └── favicon.ico
    └── index.html
    └── README.md
```

### ¿Qué es JSDoc?
----

[JSDoc](https://jsdoc.app) es una documentación de JavaScript que utiliza etiquetas para describir información adicional sobre los parámetros y su valor de retorno, y también es una poderosa herramienta para documentar el código JavaScript.

No solo ayudan a otros desarrolladores a comprender cómo usar su código, sino que también pueden usarse para generar documentación automática.

Algunas de las ventajas de utilizar etiquetas JSDoc son:

- Mejora la legibilidad del código.
- Hace que el código sea más fácil de entender para otros desarrolladores.
- Permite la generación automática de documentación.
- Ayuda a detectar errores e inconsistencias en el código.
- Mejorar la colaboración en equipo.
<small style="font-size: .65rem">[META]</small>

Algunas de las etiquetas JSDoc más comunes son: 

- @function
- @description 
- @param
- @returns

__Sintaxis básica:__

```js
  /**
   * 
   * Descripción de la función
   * @param { tipo } nameOfParam: descripción del parámetro
  */

 function miFuncion(nombreDeParam){
  // el código va aquí
 }
```

__Explicación__

- __@function__: se refiere a una función y generalmente se usa junto con el nombre de la función.
- __@description__: indica información detallada sobre las funciones, variables, clases o métodos que están documentados.
- __@param__: es una etiqueta utilizada en la documentación de funciones y métodos para describir los parámetros que se pasan a las funciones.
- __{ tipo }__: especifica el tipo de datos del parámetro, por ejemplo (cadena, número, objeto), etc.
- __@returns__: es una etiqueta utilizada para describir el valor de retorno de una función.
- __nameOfParam__: es el nombre del parámetro.

__Ejemplo__

```js
  /**
   * 
   * @function suma
   * @description: calcula la suma de dos números
   * @param { número } a: devuelve el valor de a
   * @param { número } b: devuelve el valor de b
   * @returns { número } devuelve la suma de a y b
  */

  function suma(a, b){
    return a + b
  }
```

Las siguientes funciones que se describen a continuación utilizan etiquetas JSDoc para describir el propósito de cada función y los parámetros que reciben.

El JSDoc no está disponible en los ejemplos siguientes, pero puede verlos en el repositorio.

### Debounce
----

La función ```debounce()``` fuerza a una función a esperar unas cuantas veces antes de ser ejecutada y evitar que sea llamada varias veces.

```js
  export function debounce(fun, wait, immediate){
    let timer;
    let later = () => {
      if(!immediate){
        func.apply(this, arguments)
      }
    }

    return (...args) => {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(later, wait);

      const callNow = immediate && !timer;
      if(callNow){
        func.apply(context, args)
      }
    }
  }
```

### Format Time
----

La función ```formatTime``` le permite obtener la hora del formato actual.

```js
const formatTime = (time) => {
  const hour = Math.floor(~~(time / 3600));
  const minutes = Math.floor(~~(time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  let output = "";

  //.... 
}
```

Más información sobre esta función y cómo usarla, vaya a [función formatTime](https://github.com/lkopacz/egghead-react-a11y-audio-player) y siga los pasos:

1. Cambiar de rama <i class="fa-solid fa-code-branch"></i> (branch)
2. Elige la rama <i class="fa-solid fa-code-branch"></i> 09-mute-states
3. Elige la sección "código" <i class="fa-solid fa-code"></i>
4. Ir a la carpeta <i class="fa-regular fa-folder"></i> (__src__)
5. A continuación, vaya a la carpeta <i class="fa-regular fa-folder"></i> (__Components__)
6. Elija el archivo <i class="fa-regular fa-file"></i> (__audio-player.js__)

Propietario: [Lindsey Kopacz](https://github.com/lkopacz).

### Cambiar a Reproductor de Música Personalizado
----

__Uso__

Para utilizar este reproductor de música, debes abrir tu entorno de desarrollo, en este caso VSCode y acceder al archivo index.html, una vez en el archivo, presiona el botón "Mostrar vista previa", que se encuentra en la parte superior derecha del index.html, esto hará que el proyecto se abra en una nueva ventana, al lado derecho de su archivo index.html, una vez allí podrá usar el reproductor.

__Características__

Es un reproductor de música, con una interfaz de usuario atractiva, también puedes cambiar el tema de claro a oscuro con el botón en la parte superior derecha.
Además, el reproductor contiene las siguientes funcionalidades:

- Reproducir la canción actual.
- Retroceder o avanzar una canción durante "n" segundos.
- Cambia de música pulsando los botones de avance y/o retroceso.
- Elige una canción al azar.
- Subir o bajar el volumen.
- Ver el tiempo de duración y/o tiempo transcurrido.

__Requisitos__

- Disponer de un entorno de desarrollo.
- No es necesario tener conexión a internet para utilizar el reproductor, pero es posible que se cambie el tipo de fuente e iconos, ya que se utilizan enlaces externos.

### Licencia
----

Este proyecto es distrubuido bajo la licencia __MIT__. Visita la [LICENCIA](../LICENSE) para más información.

<p>&copy; 2024, Damian Ponce</p>

### Traducción
----

Versión en Inglés:

- [us-English](../README.md)