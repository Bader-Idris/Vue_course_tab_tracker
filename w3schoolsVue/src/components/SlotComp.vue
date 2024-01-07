<template>
  <div>
    <slot>
      <h4 class="fall-back">This is fallback content</h4>
    </slot>
  </div>
</template>

<script></script>

<style scoped>
div {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  flex-basis: 150px;
  border-radius: 10px;
  border: solid black 2px;
  margin: 10px;
  padding: 0 10px 0;
}
.fall-back {
  background-color: lightpink;
  margin: 0 20px;
  /* we can get it here, or in the main file */
}
div:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>