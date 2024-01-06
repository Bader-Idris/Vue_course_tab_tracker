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

## vue props

> With props we can pass data to the components via custom attributes to the component tag.

simply as adding html attributes we can add these props to distinguish elements.

adding to prior `App.vue` file divs as:

```vue
<food-item food-name="Apples"/>
<food-item food-name="Rice"/>
```

then we need to receive data inside the component as

```vue
<!-- FoodList.vue -->
<script>
  export default {
    props: [// as using data prop
      'foodName'
    ]
  }
</script>
```

> because js doesn't understand kebab-case for our vue props we use camelCase, and vue gets that automatically

**vite hint: Files in the public directory are served at the root path.**

we can make a props required argument as in mongo, making its type as object then doing this:

```vue
<script>
  export default {
    // props: ['foodName','foodDesc','isFavorite']
    props: {
      foodName: {//🔴 this is the required one 🔴
        type: String,
        required: true
      },
      foodDesc: String,
      isFavorite: Boolean
    }
  }
</script>
```

> if we see warnings, we need to know that app.vue is the parent element for the component!

### we can also set a default value for our props with:

```vue
<!-- in FoodList.vue > foodDesc key -->
foodDesc: {
  type: String,
  required: false,
  default: 'This is the default description.'
}
```

### validator Fns

under the default we can add this validator to check if true/false.

```js
// FoodItem.vue:
validator: function(value) {
  if ( 20<value.length && value.length<50 ) return true;
  else return false;
}
```

vue scope for components prevent changing props values in nested after creating them in the app.vue `parent El` as declaring values in a function, you can't get those variables out of it.

## $emit() and emit event

to capture variables from children to their parent, we can use the built-in method `$emit()`

> *props* send from parent to children, and *$emit()* does the opposite

why $emit is important: because In a larger project the data might come from a database we have connection to in App.vue, and we want a change happening from the component to make a change in the database, so we need to communicate back to the parent from the child component.

in app.vue, this is what listents to the created $emit() in FoodList component file:

```vue
<!-- app.vue > line 13 -->
@toggle-favorite="receiveEmit"

<!-- FoodList.vue line 23 > $emit Fn -->
this.$emit('toggle-Favorite');
```

then we need to invoke it in the main vue file: **app.vue**.

## Fallthrough Attributes

A component can be called with attributes that are not declared as props, and they will simply fall through to the root element in the component.

> Typical attributes used to fall through are `class`, `style` and `v-on`.

we'll change all code to create a simple todo app with fallthrough attrs.

this is how to many many elements with root level of the component:

```vue
<!-- TodoItem.vue -->
<template>
  <div class="pinkBall"></div>
  <!-- this one with $attrs 👇 -->
  <li v-bind="$attrs">{{ itemName }}</li>
  <div class="pinkBall"></div>
</template>
```

so, with one we can easily do prior html work as: `<comp-name class='hi-babe'></comp-name>`

### Scoped Styling

instead of using globally styling as when importing a big css file, we can use the `scope` attribute to invoke limited styles in our tended component!

> as: `<style scoped>`

and that comes because of this issue:
**CSS written inside the `<style>` tag in any `*.vue` file works globally.**

so to limit the styles of a simple selected element as using `p {}`, to make it exclusive to our component we simply use: `<style scoped>` instead of `<style>` as this in `compOne.vue` with many comps

```vue
<style scoped>
  p {
    background-color: pink;
    width: 150px;
  }
</style>
```

## Local components vs Global ones

importing components from `main.js` makes them all accessible through `*.vue`, as in this `main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'
import CompOne from './components/CompOne.vue'
import CompTwo from './components/CompTwo.vue'
const app = createApp(App)
app.component('comp-one', CompOne)
app.component('comp-two', CompTwo)
app.mount('#app')
```

> we can limit that with doing this:

```vue
<!-- to include it in a sub *.vue file as express routing  in the <script> element -->

<script>
// this is the 1-2 file main.js
import { createApp } from 'vue'
 
import App from './App.vue'
import CompTwo from './components/CompTwo.vue'
const app = createApp(App)
app.component('comp-two', CompTwo)
app.mount('#app')
// so, we've removed compOne from here
</script>

<script>
// this is the 2-2 file App.vue
// in a script as this one:
import CompOne from './components/CompOne.vue';
export default {
  components: {
    'comp-one': CompOne
  }
}
</script>
```

## Slots

We use **slots** in Vue to send content from the parent into the `<template>` of a child component.

so instead of invoking the bare component name as:

```vue
<template>
  <slot-comp />
</template>
```

we'll be adding data inside that element as an html el. view:

```vue
<template>
  <slot-comp>Hello World!</slot-comp>
</template>
```

to get that content and receive it, we need to invoke it through this vue el/tag: `<slot>` inside the component. as this:

```vue
<!-- SlotComp.vue -->
<template>
  <div>  
    <p>SlotComp.vue</p>
    <slot></slot>
  </div>
</template>
```
