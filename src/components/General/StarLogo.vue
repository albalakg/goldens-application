<template>
  <div class="h100 w100">
    <img loading="lazy" v-if="colored" :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/gstarColored.svg" alt="">
    <img loading="lazy" v-else="gstar" :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/gstar.svg" alt="">
  </div>
</template>

<script>
export default {

  props: {
    opacity: {
      type: Number,
      default: 1
    },
    
    colored: {
      type: Boolean,
      default: false
    },
    
    gstar: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style scoped lang="scss">

  img {
    height: 100%;
    width: 100%;
  }

</style>