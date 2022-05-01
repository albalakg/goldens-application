<template>
  <svg @click="submit()" width="47" height="48" viewBox="0 0 47 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="23.5534" cy="23.5817" r="22.7267" fill="#31353D" fill-opacity="0.5" stroke="white" stroke-width="1.43665"/>
    <path d="M31.1218 22.2651C32.193 22.8518 32.193 24.3906 31.1218 24.9774L20.8107 30.6252C19.7802 31.1896 18.5216 30.4439 18.5216 29.269L18.5216 17.9734C18.5216 16.7985 19.7802 16.0528 20.8107 16.6173L31.1218 22.2651Z" fill="white"/>
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

  .dark_heart path{
    stroke: #16588F;
  }

  .filled_heart {
    fill: #fff;
  }

</style>