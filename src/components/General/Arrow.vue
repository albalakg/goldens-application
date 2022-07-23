<template>
  <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg" @click="submit()">
    <path d="M7.88774 0.789062L0.908203 7.11934L7.88774 13.4496L9.34857 12.0952L4.90115 8.06152H18.633V6.17716H4.90115L9.34857 2.14345L7.88774 0.789062Z" fill="white"/>
  </svg>
</template>

<script>
export default {

  methods: {
    submit() {
      this.$emit('submit')
    }
  }

}
</script>

<style scoped lang="scss">

</style>