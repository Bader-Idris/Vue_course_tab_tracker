<template>
  <h3>Todo List</h3>
  <p>In this example, there are three elements on the root level of the component so we use v-bind="$attrs" to define
    which element should receive the fallthrough style attribute that gives green background-color.</p>
  <ul>
    <todo-item v-for="x in items" :key="x" :item-name="x" style="background-color: lightgreen;" />
  </ul>
  <input placeholder="Add things to do here" v-model="newItem" @keydown.enter="addItem">
  <button @click="addItem">Add</button>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      items: ['Buy apples', 'Make pizza', 'Mow the lawn']
    };
  },
  methods: {
    addItem() {
      this.items.push(this.newItem);
      this.newItem = '';
    }
  }
}
</script>

<style>
ul {
  width: 150px;
  list-style-type: none;
  padding-left: 10px;
}
</style>