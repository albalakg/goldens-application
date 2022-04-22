
<template>
  <div class="course_card_wrapper text-right" :class="{'course_card_wrapper_dark': dark}" @click="click()" v-if="course.name">
    <img :src="course.imageSrc" alt="course image" loading="lazy">
    <h3>
      {{course.name}}
    </h3>
    <div class="course_card_darkner"></div>
  </div>
</template>

<script>
export default {

  props: {
    course: {
      type: Object,
      required: true
    },

    dark: Boolean
  },

  methods: {
    click() {
      this.$emit('onClick');
    }
  }

}
</script>

<style scoped lang="scss">

  .course_card_wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 0px 0px 10px 1px #0003;
    border-radius: 8px;
    cursor: pointer;

    img {
      position: absolute;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      opacity: 0.9;
      object-fit: cover;
    }

    h3 {
      position: absolute;
      bottom: 0;
      left: 2%;
      right: 2%;
      margin: auto;
      font-size: 2em;
      z-index: 3;
    }
  }

  .course_card_darkner {
    z-index: 2;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(#0000 40%, #000d);
    border-radius: 8px;
  }

  .course_card_wrapper_dark {

    h3 {
      color: #eee;
    }
  }

</style>