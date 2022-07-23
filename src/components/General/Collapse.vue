<template>
  <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg" @click="submit()">
    <path d="M16 13L12 9L12 17L16 13ZM10 -2.62268e-07L8 -3.49691e-07L8 26L10 26L10 -2.62268e-07ZM6 -4.37114e-07L4 -5.24537e-07L4 26L6 26L6 -4.37114e-07ZM2 -6.11959e-07L0 -6.99382e-07L-1.1365e-06 26L2 26L2 -6.11959e-07Z" fill="#31353D"/>
  </svg>
</template>

<script>
export default {

  props: {
    opacity: {
      type: Number,                                                                                                                                                                                                       
      default: 1
    },
    
    dark: {
      type: Boolean,
    },
  },

  methods: {
    submit() {
      this.$emit('submit')
    }
  }

}
</script>

<style scoped lang="scss">

</style>