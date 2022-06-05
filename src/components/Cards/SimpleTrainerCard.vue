
<template>
  <div class="simple_trainer_card_wrapper text-center white_bg_color" :class="{'rounded': rounded}">
    <div class="simple_trainer_content pa-5">
      <img loading="lazy" :src="trainer.imageSrc" alt="trainer image" :class="{'rounded': rounded}">
      <h3 class="main_text_color">
        {{
          trainer.name
        }}
      </h3>
      <h4 class="dark_text_color mt-2">
        {{
          trainer.title
        }}
      </h4>
      <div class="spacer main_bg_color"></div>
      <small v-html="trainer.description">

      </small>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    trainer: {
      type: Object,
      required: true
    },

    rounded: {
      type: Boolean
    }
  },

  data() {
    return {
      
    };
  }

}
</script>

<style scoped lang="scss">

  .simple_trainer_card_wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    .simple_trainer_content {
      width: 100%;
      height: 100%;
      box-shadow: 0 0 15px 1px #8883;
    }

    img {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      top: -25px;
      left: 0;
      right: 0;
      margin: auto;
      box-shadow: 0 10px 10px 1px #8885;
    }

    h3 {
      padding-top: 20px;
    }

    .spacer {
      height: 3px;
      width: 20%;
      margin: 10px auto;
    }

    p {
      bottom: 0;
      font-weight: bold;
    }
  }

</style>