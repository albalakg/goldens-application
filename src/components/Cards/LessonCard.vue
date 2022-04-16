
<template>
  <div class="lesson_card_wrapper rounded">
    <img class="rounded" :src="lesson.image" alt="lesson image" loading="lazy">
    <div class="lesson_card_darkner"></div>
    <div class="lesson_card_details">
      <p>{{ lesson.name }}</p>
      <divider />
      <small>
        {{lesson.description}}
      </small>
    </div>
  </div>
</template>

<script>
import Divider from '../General/Divider.vue';
export default {
  components: { Divider },

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
      left: 0;
      top: 0;
    }

    .lesson_card_details {
      z-index: 3;
      position: absolute;
      bottom: 5%;
      text-align: center;
    }

    .lesson_card_darkner {
      z-index: 2;
      position: absolute;
      height: 100%;
      width: 100%;
      background: linear-gradient(#0000, #0008);
    }
  }

</style>