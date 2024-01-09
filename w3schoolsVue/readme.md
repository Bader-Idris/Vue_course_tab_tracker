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

## v-slot

we use `v-slot` directive to refer to **named slots**, its job is to distinguish slots to not clone them as when using bare **slots**.

we easily use the name attribute similar to req.body.name for forms:

```vue
<!-- SlotComp.vue -->
<h3>Component</h3>
<div>
  <slot name="topSlot"></slot>
</div>
<div>
  <slot name="bottomSlot"></slot>
</div>
```

to Call tended slot we use its name as: `v-slot:tendedSlot`

```vue
<!-- in App.vue -->
<h1>App.vue</h1>
<p>The component has two div tags with one slot in each.</p>
<slot-comp v-slot:bottomSlot>'Hello!'</slot-comp>
<!-- ☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝☝ -->
```

we can make the unnamed slots as default ones, view:

```vue
<!-- in App.vue -->
<slot-comp v-slot:default>'Default slot'</slot-comp>
```

Or we can name it with any name and let it plain, so it becomes the default one, but this used approach is cleaner to use from others!

### v-slot in `<template>`

this is an example, which is same as before but with a template element:

> App.vue:

```vue
<h1>App.vue</h1>
<p>The component has two div tags with one slot in each.</p>
<slot-comp>
  <template v-slot:bottomSlot>
    <h4>To the bottom slot!</h4>
    <p>This p tag and the h4 tag above are directed to the bottom slot with the v-slot directive used on the template tag.</p>
  </template>
  <p>This goes into the default slot</p>
</slot-comp>
```

> SlotComp.vue:

```vue
<h3>Component</h3>
<div>
  <slot></slot>
</div>
<div>
  <slot name="bottomSlot"></slot>
</div>
```

> v-slot: === #

the v-slot shortcut is simply `#`, so these both are the same:

```vue
<slot-comp v-slot:topSlot>'Hello!'</slot-comp>
<slot-comp #topSlot>'Hello!'</slot-comp>
```

Remember, to get the named slot, use either of those ☝

### scoped slot

A scoped slot can send data from an array by using `v-for`
to send data through a scoped slot from an array we use the for in loop to get all indexes as:

```vue
<!-- SlotComp.vue -->
<template>
  <slot
    v-for="x in foods"
    :key="x.name"
    :foodName="x.name"
    :foodDesc="x.desc"
    :foodUrl="x.url"
  ></slot>
  <!-- those three foodThings are used to get the array data from down below -->
</template>

<script>
  export default {
    data() {
      return {
        foods: [
          { name: 'Apple', desc: 'Apples are a type of fruit that grow on trees.', url: 'img_apple.svg' },
          { name: 'Pizza', desc: 'Pizza has a bread base with tomato sauce, cheese, and toppings on top.', url: 'img_pizza.svg' },
          { name: 'Rice', desc: 'Rice is a type of grain that people like to eat.', url: 'img_rice.svg' },
          { name: 'Fish', desc: 'Fish is an animal that lives in water.', url: 'img_fish.svg' },
          { name: 'Cake', desc: 'Cake is something sweet that tastes good but is not considered healthy.', url: 'img_cake.svg' }
       ]
      }
    }
  }
</script>
```

```vue
<!-- App.vue -->
<slot-comp v-slot="food">
  <hr>
  <h2>{{ food.foodName }}<img :src=food.foodUrl></h2>
  <p>{{ food.foodDesc }}</p>
</slot-comp>
```

#### named scoped slots

To use named scoped slots we need to name the slots inside the component with the 'name' attribute.
And to receive data from a named slot we need to refer to that name in the parent where we use the component, with the `v-slot` directive, or shorthand `#`. as:

`SlotComp.vue`:

```vue
<template>
  <slot
    name="leftSlot"
    :text="leftText"
  ></slot>
  <slot
    name="rightSlot"
    :text="rightText"
  ></slot>
</template>

<script>
  export default {
    data() {
      return {
        leftText: 'This text belongs to the LEFT slot.',
        rightText: 'This text belongs to the RIGHT slot.'
      }
    }
  }
</script>
```

`App.vue`:

```vue
<slot-comp #leftSlot="leftProps">
  <div>{{ leftProps.text }}</div>
</slot-comp>
<slot-comp #rightSlot="rightProps">
  <div>{{ rightProps.text }}</div>
</slot-comp>
```

Alternatively, we can create the component one time, with two different `"template"` tags, each `"template"` tag referring to a different slot.

`as`:

```vue
<slot-comp>

  <template #leftSlot="leftProps">
    <div>{{ leftProps.text }}</div>
  </template>

  <template #rightSlot="rightProps">
    <div>{{ rightProps.text }}</div>
  </template>

</slot-comp>
```

##### exercise:

```vue
Local data in a component is sent from a slot with `v-bind`,
and it can be received in the parent with
`v-slot`.

CompOne.vue:
<slot `v-bind`:lclData="data"></slot>

App.vue:
<comp-one `v-slot`:"dataFromSlot">
  <h2>{{ dataFromSlot.lclData }}</h2>
</comp-one>
```

## Dynamic Components

We can use this with flipping cards, it's gotta be awesome for them! 🔴

**Dynamic Components** can be used to flip through pages within your page, like tabs in your browser, with the use of the 'is' attribute

to represent the active dynamic component we use the element: `<component></component>` and we tie it with a value through the vue attribue: `is` and bind it as:

```vue
<component :is="activeComp"></component>
```

this is an example:

```vue
<!-- App.vue -->
<template>
  <h1>Dynamic Components</h1>
  <p>App.vue switches between which component to show.</p>
  <button @click="toggleValue = !toggleValue">Switch component</button>
  <component :is="activeComp"></component>
</template>

<script>
  export default {
    data () {
      return {
        toggleValue: true
      }
    },
    computed: {
      activeComp() {
        if(this.toggleValue) {
          return 'comp-one'
        }
        else {
          return 'comp-two'
        }
      }
    }
  }
</script>

<style>
  #app {
    width: 350px;
    margin: 10px;
  }
  #app > div {
    border: solid black 2px;
    padding: 10px;
    margin-top: 10px;
  }
</style>


<!-- CompOne.vue -->
<template>
    <div>
        <h2>One!</h2>
        <p>This is component one.</p>
    </div>
</template>

<script></script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>


<!-- CompTwo.vue -->
<template>
    <div>
        <h2>Two!</h2>
        <p>This is component two.</p>
    </div>
</template>

<script></script>

<style scoped>
    div {
        background-color: lightpink;
    }
</style>
```

```js
// main.js
import { createApp } from 'vue'

import App from './App.vue'
import CompOne from './components/CompOne.vue'
import CompTwo from './components/CompTwo.vue'

const app = createApp(App)
app.component('comp-one', CompOne)
app.component('comp-two', CompTwo)
app.mount('#app')
```

to keep data preserved we use the `<keepAlive></keepAlive>`, check this good exercise for it in w3School [site:](https://www.w3schools.com/vue/showvue.php?filename=demo_dynamicComp3_4)

> 👾🔴 Change the FrontEndMentor's paying page to meet up with this features!!🔴👾

### keep alive element

All components inside the `<KeepAlive>` tag will be kept alive by default.

but we can exclude attributes using this:

```vue
<KeepAlive include="CompOne">
    <component :is="activeComp"></component>
</KeepAlive>
<!-- or -->
<KeepAlive exclude="CompOne">
    <component :is="activeComp"></component>
</KeepAlive>
```

But we need to give the components names with the `name` option: as putting it into the return vue method:

```vue
<!-- in CompOne.vue -->
<script>
  export default {
    //🔴 we added this name obj key🔴
    name: 'CompOne',
    data () {
      return {
        imgSrc: 'img_question.svg'
      }
    }
  }
</script>
```

and in the App.vue template we make it as:

```vue
  <KeepAlive include="CompOne">
    <component :is="activeComp"></component>
  </KeepAlive>
```

#### adding many conditions of include/exclude

to do as titled we can separate them with commas, view:

```vue
<!-- App.vue -->
<template>
  <h1>Dynamic Components</h1>
  <button @click="compNbr++">
    Next component
  </button>
  <KeepAlive include="CompOne,CompThree">
    <component :is="activeComp"></component>
  </KeepAlive>
</template>
```

#### limit how many components to handle in BOM with max

With `<KeepAlive :max="2">`, the browser will only remember 
the user input of the last two visited components.

```vue
<!-- App.vue -->
<template>
  <h1>Dynamic Components</h1>
  <label><input type="radio" name="rbgComp" v-model="compName" :value="'comp-one'"> One</label>
  <label><input type="radio" name="rbgComp" v-model="compName" :value="'comp-two'"> Two</label>
  <label><input type="radio" name="rbgComp" v-model="compName" :value="'comp-three'"> Three</label>
  <!-- this :max="2" is what we need-->
  <KeepAlive :max="2">
    <component :is="activeComp"></component>
  </KeepAlive>
</template>
```

## Vue Teleport

The Vue `<Teleport>` tag is used to move content to a different place in the DOM structure.

and we need to use the attribute `to=""` to set the importing point

example:

```vue
<Teleport to="body">
  <p>Hello!</p>
</Teleport>
```

so we use css notation to get the value of `to` attribute as when using `document.querySelector()` in JS

even after sending those elements and append them into tended DOM, their scripts and styles still work well.

## Vue HTTP Requests

they pronounce normal fetching, this is a simple example:

```vue
<!-- App.vue -->
<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
    <pre v-if="data">{{ data }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async fetchData() {
      const response = await fetch("file.txt");
      this.data = await response.text();
    }
  }
};
</script>
```

file.txt

```txt
any string Yo
```

main.js:

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
app.mount('#app')
```

and at last they used axios library to simplify it.

## Vue Template Refs

When the `ref` attribute is set on an HTML tag, the resulting DOM element is added to the `$refs` object.

We can use the `ref` attribute and the `$refs` object in Vue as an alternative to methods in plain JavaScript like `getElementById()` or `querySelector()`.

### The 'ref' Attribute and The '$refs' Object

this is an example of it:

```vue
<template>
  <h1>Example</h1>
  <p>Click the button to put "Hello!" as the text in the green p element.</p>
  <button @click="changeVal">Change Text</button>
  <p ref="pEl">This is the initial text</p>
</template>

<script>
  export default {
    methods: {
      changeVal() {
        // this is the invoking object to replace p.innerHTML above
        this.$refs.pEl.innerHTML = "Hello!";
      }
    }
  }
</script>
```

## Vue Lifecycle Hooks

Every time a component reaches a new stage in its lifecycle, a specific function runs, and we can add code to that function. Such functions are called lifecycle hooks, because we can "hook" our code into that stage.

there are 14 lifecycle hooks in vue, OMG

beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
beforeUnmount
unmounted
errorCaptured
renderTracked
renderTriggered
activated
deactivated
serverPrefetch

view [at:](https://www.w3schools.com/vue/vue_lifecycle-hooks.php)

this 14 method lifecycle is an enormous topic, [view it here](https://www.w3schools.com/vue/vue_lifecycle-hooks.php)

### beforeCreate hook

this hook happens before the component gets initialized

### created hook

We should avoid trying to access DOM elements from the `created` lifecycle hook, because DOM elements are not accessible until the component is `mounted`.

The `created` lifecycle hook can be used to fetch data with HTTP requests, or set up initial data values. Like in the example below, the data property 'text' is given an initial value

### beforeMount

it happens just before the component is added to the DOM.

we should avoid accessing DOM before the app is mounted, because it will not get it!

> so don't rely on any of mentioned hooks for innerHTMLs

### mounted hook

Below is an example that is perhaps more useful: To put the cursor inside the input field after the form component is mounted, so the user can just start typing.

```vue
<!-- CompOne.vue -->
<template>
  <h2>Form Component</h2>
  <p>When this component is added to the DOM tree, the mounted() function is called, and we put the cursor inside the input element.</p>
  <form @submit.prevent>
    <label>
      <p>
        Name: <br>
        <input type="text" ref="inpName">
      </p>
    </label>
    <label>
      <p>
        Age: <br>
        <input type="number">
      </p>
    </label>
    <button>Submit</button>
  </form>
  <p>(This form does not work, it is only here to show the mounted lifecycle hook.)</p>
</template>

<script>
  export default {
    mounted() {
      this.$refs.inpName.focus();
    }
  }
</script>
```

### beforeUpdate hook

I can use this and `created` and **beforeMount()** bito says, to put the loader when fetching data!

### updated hook

like a function happens each time you use a toggle bottom, if true/false!

make sure not to use what causes infinite loops in while loop as this one:

```js
updated() {
  this.text += "hi, ";
}
```

### beforeUnmount Hook

It is called just before a component is removed from the DOM.

an example of it:

```vue
<!-- CompOne.vue -->
<script>
export default {
  beforeUnmount() {
    alert("beforeUnmount: The text inside the p-tag is: " + this.$refs.pEl.innerHTML);
  }
}
</script>
```

```vue
<!-- App.vue -->
<template>
  <h1>The 'beforeUnmount' Lifecycle Hook</h1>
  <p>As we can see in the alert box, the text inside the p-tag is still accessible in the 'beforeUnmount' hook, right before the 'unmount' hook.</p>
  <button @click="this.activeComp = !this.activeComp">{{ btnText }}</button>
  <div>
    <comp-one v-if="activeComp"></comp-one>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeComp: true
    }
  },
  computed: {
    btnText() {
      if(this.activeComp) {
        return 'Remove component'
      }
      else {
        return 'Add component'
      }
    }
  }
}
</script>

<style scoped>
  div { border: dashed black 1px; border-radius: 10px; padding: 20px; margin: 10px; width: 400px; background-color: lightgreen;
  }
</style>
```

the alert happens on clicking and before the html el is removed

### unmounted hook

It is called after a component is removed from the DOM

> This hook can for example be used to remove event listeners or cancelling timers or intervals.

### errorCaptured hook

it is called when an error happens in a child/descendant component.

as using a non existing $refs, view:

```vue
<!-- app.vue -->
<script>
export default {
  errorCaptured() {
    alert("An error occurred");
  }
}
</script>

<!-- in CompOne.vue -->
<template>
    <h2>Component</h2>
    <p>This is the component</p>
    <button @click="generateError">Generate Error</button>
</template>

<script>
export default {
  methods: {
    generateError() {
      this.$refs.objEl.innerHTML = "hi";
    }
  }
}
</script>
```

### *renderTracked* and *renderTriggered* Lifecycle Hooks

The `renderTracked` hook runs when a render function is set to track, or monitor, a reactive component. The `renderTracked` hook usually runs when a reactive component is initialized.

The `renderTriggered` hook runs when such a tracked reactive component changes, and therefore triggers a new render, so that the screen gets updated with the latest changes.

> A **reactive component** is a component that can change.

> A **render function** is a function compiled by Vue that keeps track of reactive components. When a reactive component changes, the render function is triggered and re-renders the application to the screen.

**The renderTracked and renderTriggered hooks are meant to be used in debugging, and are only available in development mode.**


### activated and deactivated Hooks

similar to `mounted` but with `<keepAlive>` element and **cached data!**

so if we have both mounted() and activated, mounted will run once, and then it'll be cached with our activated lifecycle hook, see:

```vue
<script>
export default {
  mounted() {
    console.log("mounted");
    const liEl = document.createElement("li");
    liEl.innerHTML = "mounted";
    this.$refs.olEl.appendChild(liEl);
    // this'll run once
  },
  activated() {
    console.log("activated");
    const liEl = document.createElement("li");
    liEl.innerHTML = "activated";
    this.$refs.olEl.appendChild(liEl);
    // 🔴 then any triggering of same Fn will run this 🔴
  }
}
</script>
```

### serverPrefetch Hook

The 'serverPrefetch' hook is only called during server-side rendering (SSR).

> Explaining and creating an example for the 'serverPrefetch' hook would require a relatively long introduction and setup, and that is beyond the scope of this tutorial.

## Vue Provide/Inject

`Provide/Inject` is a way to share data as an alternative to passing data using props.

so, provide == export(), inject == require(), but it's used with bigger projects than using `props`.

check the files after I changed their content!

## Vue Routing

**Routing** in Vue is used to navigate the Vue application, and it happens on the client side (in the browser) without full page reload, which results in a faster user experience.

it's similar to dynamic components

> We build SPAs (Single Page Applications) with Vue, which means that our application only contains one *.html file. And that means we cannot direct people to other*.html files to show them different content on our page.

but with vue routing we can fix that issue allowing express to work well with vue, as for url routes

> we need to install vue-router

as: `npm install vue-router@4`

### Update main.js

To use routing we must create a router, and we do that in the main.js file.

```js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import FoodItems from './components/FoodItems.vue'
import AnimalCollection from './components/AnimalCollection.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/animals', component: AnimalCollection },
        { path: '/food', component: FoodItems },
    ]
});

const app = createApp(App)

app.use(router);
// app.component('food-items', FoodItems);
// app.component('animal-collection', AnimalCollection);

app.mount('#app')
```

To change the content on our page with the new router, we need to remove the dynamic component in the previous example and use the `<router-view>` component instead.

see:

```vue
<template>
  <p>Choose what part of this page you want to see:</p>
  <button @click="activeComp = 'animal-collection'">Animals</button>
  <button @click="activeComp = 'food-items'">Food</button><br>
  <div>
    <router-view></router-view>
    <!-- <component :is="activeComp"></component> -->
  </div>
</template>
```

We can replace the buttons with the `<router-link>` component because that works better with the router.
