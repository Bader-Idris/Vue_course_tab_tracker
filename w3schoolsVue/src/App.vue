<template>
  <h2>Re-usable Slot Cards</h2>
  <p>We create card-like div boxes from the foods array.</p>
  <p>We also create a card-like footer by reusing the same component.</p>
  <div id="wrapper">
    <slot-comp v-for="x in foods">
      <img v-bind:src="x.url">
      <h4>{{ x.name }}</h4>
    </slot-comp>
  </div>
  <div id="wrapper">
    <slot-comp>
      <!-- because it's empty, it uses the fall back from the component in SlotComp.vue -->
    </slot-comp>
  </div>
  <footer>
    <slot-comp>
      <h3>Footer</h3>
    </slot-comp>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      foods: [
        { name: 'Apple', url: 'img_apple.svg' },
        { name: 'Pizza', url: 'img_pizza.svg' },
        { name: 'Rice', url: 'img_rice.svg' },
        { name: 'Fish', url: 'img_fish.svg' },
        { name: 'Cake', url: 'img_cake.svg' }
      ]
    }
  }
}
</script>

<style>
#wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#wrapper>div {
  background-color: lightgreen;
}

footer>div {
  background-color: lightpink;
}

#wrapper img {
  display: block;
  margin: 20% auto 0;
  width: 60%;
}

h3,
h4:not(.fall-back) {
  text-align: center;
}</style>