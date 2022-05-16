<template>
  <div class="recommendation_card px-5 py-8 text-center white_text_color" :class="index % 2 === 0 ? 'second_dark_bg_color' : 'main_dark_bg_color'">
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
  }

  .recommendation_card:hover {
    box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.3);
  }

  .divider {
    background-color: #d5b26e;
    width: 10%;
    margin: auto;
  }

</style>