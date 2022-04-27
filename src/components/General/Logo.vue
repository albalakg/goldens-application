<template>
  <router-link :to="link">
      <img loading="lazy" v-if="dark" src="./../../../public/assets/images/general/dark_logo.svg" alt="">
      <img loading="lazy" v-else src="./../../../public/assets/images/general/lightLogo.png" alt="">
  </router-link>
</template>

<script>
export default {

  props: {
    dark: {
      type: Boolean
    },
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