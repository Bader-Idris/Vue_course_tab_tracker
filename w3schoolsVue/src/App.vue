<template>
  <h1>Dynamic Components</h1>
  <p>With &lt;KeepAlive :max="2"&gt; only the last two visited components will remember the user input.</p>
  <label><input type="radio" name="rbgComp" v-model="compName" :value="'comp-one'"> One</label>
  <label><input type="radio" name="rbgComp" v-model="compName" :value="'comp-two'"> Two</label>
  <label><input type="radio" name="rbgComp" v-model="compName" :value="'comp-three'"> Three</label>
  <KeepAlive :max="2">
    <component :is="compName"></component>
  </KeepAlive>
</template>

<script>
export default {
  data() {
    return {
      compName: 'comp-one'
    }
  }
}
</script>

<style>
#app {
  width: 350px;
  margin: 10px;
}

#app>div {
  border: solid black 2px;
  padding: 10px;
  margin-top: 10px;
}

h2 {
  text-decoration: underline;
}

label {
  display: inline-block;
  padding: 5px;
}

label:hover {
  cursor: pointer;
}</style>