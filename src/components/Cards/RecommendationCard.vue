<template>
  <div class="recommendation_card px-5 py-8 text-center white_text_color" :class="index % 2 === 0 ? 'second_dark_bg_color' : 'main_dark_bg_color'">
    <img v-if="data.image" :src="data.image" class="recommendation_image" alt="recommender image">

    <h3>
      {{ data.name }}
    </h3>
    
    <div class="divider my-4"></div>

    <small>
      {{ data.content }}
    </small>
  </div>
</template>

<script>
export default {

  props: {
    data: {
      type: Object,
      required: true,
      validator(value) {
        return !value.name || value.content;
      } 
    },

    index: {
      type: Number,
      default: 0
    }
  },

}
</script>

<style scoped>

  .recommendation_card {
    border-radius: 8px;
    position: relative;
  }

  .recommendation_card:hover {
    box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.3);
  }

  .recommendation_image {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: #fff;
    object-fit: cover;
    position: absolute;
    top: -25px;
    left: 0;
    right: 0;
    margin: auto;
    box-shadow: 0 5px 10px 1px #333;
  }

  .divider {
    background-color: #d5b26e;
    width: 10%;
    margin: auto;
  }

</style>