<template>
  <router-link :class="{
    'dark_mode': dark
  }" to="/">
    <h1>
      GOLDENS
    </h1>
  </router-link>
</template>

<script>
export default {

  props: {
    dark: {
      type: Boolean
    }
  }

}
</script>

<style scoped lang="scss">

  a {
    text-decoration: none;
    margin-left: 20px;
  }

  .dark_mode {
    letter-spacing: 1px;
  
    h1 {
      color: #fff;
    }
  }

</style>