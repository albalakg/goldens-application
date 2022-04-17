<template>
  <div class="h100 w100">
    <img v-if="colored" :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/gstarColored.svg" alt="">
    <img v-else-if="gstar" :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/gstar.svg" alt="">
    <img v-else :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/star.svg" alt="">
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