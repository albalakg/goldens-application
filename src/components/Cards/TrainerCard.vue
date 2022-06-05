
<template>
  <div class="trainer_card_wrapper" :class="{'rounded': rounded}">
    <img loading="lazy" :src="trainer.imageSrc" alt="trainer image" :class="{'rounded': rounded}">
    <div class="trainer_card_darkner" :class="{'rounded': rounded}"></div>
    <h3>
      {{
        trainer.name
      }}
    </h3>
    <p class="sub_text_color">
      {{
        trainer.title
      }}
    </p>
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

  .trainer_card_wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    .trainer_card_darkner {
      width: 100%;
      height: 100%;
      position: absolute;
      background: linear-gradient(transparent, #00000088);
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    h3, p {
      z-index: 2;
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
    }

    h3 {
      bottom: 30px;
      font-size: 2.5em;
      color: #fff;
    }

    p {
      bottom: 0;
      font-weight: bold;
    }
  }

</style>