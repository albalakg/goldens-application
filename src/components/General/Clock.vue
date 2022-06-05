<template>
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 4.125C9.66797 4.125 4.125 9.66797 4.125 16.5C4.125 23.332 9.66797 28.875 16.5 28.875C23.332 28.875 28.875 23.332 28.875 16.5C28.875 9.66797 23.332 4.125 16.5 4.125Z" stroke="#fff" stroke-width="3" stroke-miterlimit="10"/>
    <path d="M16.5 8.25V17.5312H22.6875" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
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