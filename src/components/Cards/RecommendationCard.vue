<template>
  <div class="recommendation_card px-5 py-8 text-center white_text_color"
    :class="index % 2 === 0 ? 'second_dark_bg_color' : 'main_dark_bg_color'">
    <img loading="lazy" v-if="data.image" :src="data.image" class="recommendation_image" alt="recommender image">

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
  border-radius: 20px;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 3px 15px 4px rgb(49, 53, 61, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(5px);
  transition: .3s linear all;
}

.recommendation_card::before {
  content: "";
  background: linear-gradient(to left, rgba(255, 255, 255, 0.15), transparent);
  transform: skewX(45deg) translate(0);
  transition: 0.5s;
  filter: blur(0px);
}

.recommendation_card:hover {
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.3);
}

.recommendation_image {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: -25px;
  left: 0;
  right: 0;
  margin: auto;
}

.divider {
  background-color: #d5b26e;
  width: 10%;
  margin: auto;
}
</style>