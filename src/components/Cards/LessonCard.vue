
<template>
  <v-flex xs10 lg12 mx-auto class="h100 px-3">
    <div class="lesson_card_wrapper pointer">
      <img :src="lesson.image" alt="lesson image" loading="lazy">
      <div class="lesson_card_darkner"></div>
      <div class="lesson_card_details text-center">
        <h2 class="white_text_color">{{ lesson.name }}</h2>
        <div class="line main_bg_color"></div>
        <small class="white_text_color">
          {{lesson.description}}
        </small>
      </div>
    </div>
  </v-flex>
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
    height: 100%;
    width: 100%;
    max-width: 225px;
    position: relative;
    border-radius: 8px;
    transition: .3s box-shadow, .3s transform;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 8px;
    }

    .lesson_card_details {
      z-index: 3;
      width: 100%;
      position: absolute;
      bottom: 5%;

      h2 {
        font-weight: 100;
      }
    
      .line {
          height: 3px;
          width: 10%;
          margin: auto;
      }

      small {
        font-size: .7em;
      }
    }

    .lesson_card_darkner {
      z-index: 2;
      position: absolute;
      height: 100%;
      width: 100%;
      background: linear-gradient(#0000 50%, #000a);
      border-radius: 8px;
    }
  }

  .lesson_card_wrapper:hover {
    box-shadow: 0 0 10px 2px #0005;
    transform: scale(1.05);
  }

</style>