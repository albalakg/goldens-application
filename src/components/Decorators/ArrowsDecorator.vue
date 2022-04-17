<template>
  <img :style="`opacity: ${opacity}`" src="./../../../public/assets/images/general/arrows.svg" alt="">
</template>

<script>
export default {

  props: {
    opacity: {
      type: Number,
      default: 1
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