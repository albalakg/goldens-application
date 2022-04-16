
<template>
  <div class="lesson_card_wrapper">
    <img :src="lesson.image" alt="lesson image" loading="lazy">
  </div>
</template>

<script>
export default {

  props: {
    lesson: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      
    };
  }

}
</script>

<style scoped lang="scss">

  .lesson_card_wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

</style>