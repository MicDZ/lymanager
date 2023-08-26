<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>

</template>

<script>
export default {
  data() {
    return {
      name: ""
    }
  },
  props: {
    taskGroup: null,
    taskID: null,
  },
  methods: {
  }
}
</script>


<style scoped>

</style>