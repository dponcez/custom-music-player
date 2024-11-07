# Music Player 🎶

> **NOTE**: the audio files in (.mp3) format and image files in (.png) format used in this project are for entertainment purposes only, solely for creating the _Music Player_.
> All rights reserved to the music correspond to each artist and/or the record label.

## Technologies

- HTML
- CSS
- JavaScript

## Development Environment

- VSCode

### Project Structure

```
└── 📁custom-music-player
    └── 📁assets
        └── 📁audio
            └── 21-questions.mp3
            └── all-eyez-on-me.mp3
            └── all-the-stars.mp3
            └── finally.mp3
            └── go-crazy.mp3
            └── good-things.mp3
            └── private-show.mp3
            └── regulate.mp3
            └── shot-clock.mp3
            └── slippin.mp3
        └── 📁figma
            └── mockup-dark-mode.png
            └── mockup-light-mode.png
            └── wireframe.png
        └── 📁images
            └── dark-bg-theme.png
            └── light-bg-theme.png
            └── poster-1.png
            └── poster-10.png
            └── poster-2.png
            └── poster-3.png
            └── poster-4.png
            └── poster-5.png
            └── poster-6.png
            └── poster-7.png
            └── poster-8.png
            └── poster-9.png
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

### JSDoc

_JavaScript Documentation_ or (_JSDoc_) is a JavaScript documentation that uses tags to describe additional information about parameters and their return value, like so.

- __@function__ is a tag used to refers to a function.
- __@description__ is a tag used to indicates a detailed infomation about a function.
- __@param__ is a tag used in function and method documentation to be describe the parameters that are passed to functions.
- __@returns__ is a tag used to describe the return value of a function.

__Basic syntaxis:__

```js
  /**
   * 
   * Description of the function
   * @param { type } nameOfParam: description of parameter
  */

 function myFunction(nameOfParam){
  // code goes here
 }
```

__Explanation__

- @function: refers to a function and usually used in conjunction with the function name.
- @description: indicates detailed information about the functions, variables, classes or methods that are documented.
- @param: indicates that a parameter is being described.
- { type }: specifies the data type of parameter, for example (string, number, object) etc.
- nameOfParam: is the name of parameter.
- description: a brief description of the purpose of the parameter.

__Example__

```js
  /**
   * 
   * @function sum
   * @description: calculate the sum of two numbers
   * @param { number } a: return the value of a
   * @param { number } b: return the value of b
   * @returns { number } return the sum of a and b
  */

  function sum(a, b){
    return a + b
  }
```

The following functions described below use JSDoc tags to discribe the purpose of each function and the parameters these function receive.

### Debounce

The ```debounce()``` function forces a function to wait a few times before running the execution and preventing from being called several times.

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

### Format time

The ```formatTime``` function allows you to get the time from current format.

```js
const formatTime = (time) => {
  const hour = Math.floor(~~(time / 3600));
  const minutes = Math.floor(~~(time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  let output = "";

  //.... 
}
```

More information about this function and how to use it, go to [formatTime function](https://github.com/lkopacz/egghead-react-a11y-audio-player) and follow the steps: 

1. Swtich to branch section
2. Choose the branch 09-mute-states
3. Select code section
4. Go to folder (__src__)
5. Next, go to foler (__Components__)
6. Choose the file (__audio-player.js__)

Owner: [Lindsey Kopacz](https://github.com/lkopacz)