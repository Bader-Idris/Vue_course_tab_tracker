# w3schools lessons

> scaling up section

after I learned about the main four object Fns in vue framework, I arrived at this section, scaling up, which is about connecting the front app with a server side as node

an important step to initialize this basic mock project we can do it easily by npm, with this cmd: `npm init vue@latest`

main 4 object Fns were: `data()`, `methods`, `computed`, and `watch`; each has its own distinguishes.

and we learned about directives:
    `v-bind` alias: `:`
    `v-on` alias: `@` as `v-on:submit`, event DOM listener
    `v-model`, as `Obj Fn`, as using both `:` and `@` together. e.i: `<input ... v-model="itemNumber">`
    `v-if`, and its else, else-if; creates a Fn when `true`
    `v-show`, displays a hidden created el when `true`
    `v-for` does a for in loop as `<li v-for="x in manyFoods">{{ x }}</li>`

and we learned a little about `{{ rendered value }}` and `<template></template>` which includes html content

we also learned about connecting them together with dozens of examples, and we learned about vue css binding and its 4 approaches to do so.

## Single File Components (SFCs) with whatnot

to make the first full stack app simple, we answer to all but not the project's name as `no` after `npm init vue@latest`.

then it asks us to `npm install` then `npm run dev`, basically because `vite` is installed in that package and it runs the app with `vite build`.

> the main important file is `src/main.js`

this is the link [to it](https://www.w3schools.com/vue/vue_scale-up.php).

### App.vue and first project set

In the same example project folder, find the "App.vue" file and open it. Like all other *.vue files, "App.vue" contains three parts: a `<script>` part, a `<template>` part and a `<style>` part.

we'll put all of our code within that file, app.vue

remove all prior content from it then initiate it with these:

```vue
<script></script>
<template></template>
<style></style>
```

### clean both assets && components in src DIR

make app.vue as:

```vue
<template>
  <h1>{{ message }}</h1>
</template>

<script>
export default {
  data() {
    return {
      message: 'This is some text'
    };
  }
};
</script>

<style></style>
```

and make main.js as:

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

changes were immediate, was that because of `diffing algorithm` or because of using `vite`?

## Components

we can decompose content and isolate it from other methods with components.

we can make our own components or use built-in ones as: `<Teleport>` and `<KeepAlive>`

we're creating `components/FoodItem.vue` component, check it out!

commonly, we use the `PascalCase` convention with components' names

after we created our first component we change the main.js latest line, and we made it as this after all:

```js
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

so, we chained the function with a variable: it was `createApp(App).mount('#app')`;

then we include the FoodList.vue component return the call back function to invoke it as.

```js
import { createApp } from 'vue'

import App from './App.vue'
import FoodItem from './components/FoodItem.vue'//this one

const app = createApp(App)
app.component('food-item', FoodItem)//and this one
// this component is set to the first param in it, so in app.vue we invoke it as <food-item> inside <template> tag
app.mount('#app')
```
