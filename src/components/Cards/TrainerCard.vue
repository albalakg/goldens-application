
<template>
  <div class="trainer_card_wrapper" :class="{'rounded': rounded}">
    <div class="trainer_card_content">
      <img loading="lazy" :src="trainer.imageSrc" alt="trainer image" :class="{'rounded': rounded}" class="trainer_person">
      <img loading="lazy" src="../../../public/assets/images/general/trainer_card.png" alt="trainer card" class="trainer_card">
    </div>
    <!-- <div class="trainer_card_darkner" :class="{'rounded': rounded}"></div> -->
    <!-- <h3>
      {{
        trainer.name
      }}
    </h3>
    <p class="sub_text_color">
      {{
        trainer.title
      }}
    </p> -->
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
      border-radius: 8px;
    }

    .trainer_card_content {
      height: 100%;
      width: 100%;
      background-image: linear-gradient(148deg, rgba(15, 15, 15,0.04) 0%, rgba(15, 15, 15,0.04) 35%,rgba(113, 113, 113,0.04) 35%, rgba(113, 113, 113,0.04) 42%,rgba(210, 210, 210,0.04) 42%, rgba(210, 210, 210,0.04) 100%),linear-gradient(70deg, rgba(15, 15, 15,0.04) 0%, rgba(15, 15, 15,0.04) 25%,rgba(113, 113, 113,0.04) 25%, rgba(113, 113, 113,0.04) 30%,rgba(210, 210, 210,0.04) 30%, rgba(210, 210, 210,0.04) 100%),linear-gradient(65deg, rgba(15, 15, 15,0.04) 0%, rgba(15, 15, 15,0.04) 13%,rgba(113, 113, 113,0.04) 13%, rgba(113, 113, 113,0.04) 27%,rgba(210, 210, 210,0.04) 27%, rgba(210, 210, 210,0.04) 100%),linear-gradient(90deg, rgba(213,178,110, 0.3333333333333333),rgba(213,178,110, 0.3333333333333333));
      padding: 5px;
      border: 1px solid var(--mainColor);
      box-shadow: inset 0px 0px 10px 2px var(--subColor);
    }

    img.trainer_person {
      position: absolute;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
      object-fit: cover;
      border-radius: 8px;
      z-index: 2;
    }

    img.trainer_card {
      position: absolute;
      width: calc(100% - 10px);
      height: calc(100% - 10px);
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