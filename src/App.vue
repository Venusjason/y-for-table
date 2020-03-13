<template>
  <div id="app">
    <SimpleForm />
    <SimpleIviewform />
  </div>
</template>

<script>
import SimpleForm from './examples/SimpleForm'
import SimpleIviewform from './examples/SimpleIviewform'

export default {
  name: 'App',
  components: {
    SimpleForm,
    SimpleIviewform
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
