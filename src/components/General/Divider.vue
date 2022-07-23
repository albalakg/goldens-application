<template>
  <div :class="`my-${smallSpace} my-md-${space}`">

  </div>
</template>

<script>
export default {

  props: {
    space: {
      type: Number,
      default: 4
    }
  },

  computed: {
    smallSpace() {
      return Math.ceil(this.space / 2);
    }
  }

}
</script>

<style scoped>

</style>