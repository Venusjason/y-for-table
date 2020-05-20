<template>
  <div id="app">
    <SimpleForm v-if="isShow" />
    <SimpleIviewform v-if="isShow" />
    <TableList v-if="isShow" />
    <BaseForm />
  </div>
</template>

<script>
import SimpleForm from './examples/SimpleForm'
import SimpleIviewform from './examples/SimpleIviewform'
import TableList from './examples/TableList'
import BaseForm from './vue/examples/index'

export default {
  name: 'App',
  components: {
    SimpleForm,
    SimpleIviewform,
    TableList,
    BaseForm,
  },
  data() {
    return {
      isShow: false
    }
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
