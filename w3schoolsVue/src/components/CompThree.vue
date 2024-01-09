<template>
  <div :style="{ backgroundColor: bgColor }">
    <h2>Component Three</h2>
    <p>Choose a new background-color:</p>
    <input type="color" v-model="bgColor">
    <strong>{{ this.bgColor }}</strong>
  </div>
</template>

<script>
export default {
  name: 'CompThree',
  data() {
    return {
      bgColor: ''
    }
  }
}
</script>

<style></style>