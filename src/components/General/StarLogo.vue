<template>
  <div class="h100 w100">
    <img v-if="gstar" :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/gstar.svg" alt="">
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