<template>
  <router-link :to="link">
      <img :style="`width: ${width}`" loading="lazy" v-if="dark" src="./../../../public/assets/images/general/dark_logo.svg" alt="dark logo">
      <img :style="`width: ${width}`" loading="lazy" v-else src="./../../../public/assets/images/general/lightLogo.png" alt="logo">
  </router-link>
</template>

<script>
export default {

  props: {
    dark: {
      type: Boolean
    },

    width: {
      type: String,
      default: '100%'
    }
  },

  computed: {
    link() {
      const course = ContentService.findMyActiveCourse();
      if(!course) {
          return '/';
      } 

      return `/courses/${course.id}`;
    }
  },

}
</script>

<style scoped lang="scss">

  img {
    height: 100%;
    width: 100%;
  }

</style>