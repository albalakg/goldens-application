<template>
  <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0V2.8H2.66667C1.20925 2.8 0 4.06971 0 5.6V25.2C0 26.7303 1.20925 28 2.66667 28H21.3333C22.7908 28 24 26.7303 24 25.2V5.6C24 4.06971 22.7908 2.8 21.3333 2.8H20V0H17.3333V2.8H6.66667V0H4ZM2.66667 5.6H21.3333V8.4H2.66667V5.6ZM2.66667 11.2H21.3333V25.2H2.66667V11.2ZM12 15.4V22.4H18.6667V15.4H12Z" fill="#16588F"/>
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