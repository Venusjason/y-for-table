<template>
  <div id="app">
    <SimpleForm />
    <SimpleIviewform />
    <TableList />
  </div>
</template>

<script>
import SimpleForm from './examples/SimpleForm'
import SimpleIviewform from './examples/SimpleIviewform'
import TableList from './examples/TableList'

export default {
  name: 'App',
  components: {
    SimpleForm,
    SimpleIviewform,
    TableList,
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
