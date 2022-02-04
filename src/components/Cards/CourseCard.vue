
<template>
  <div class="course_card_wrapper" :class="{'course_card_wrapper_dark': dark}" @click="click()" v-if="course.name">
    <img :src="course.imageSrc" alt="course image" loading="lazy">
      <h1>
        {{course.name}}
      </h1>
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

    img {
      position: absolute;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      opacity: 0.9;
    }

    h1 {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 2em;
    }
  }

  .course_card_wrapper_dark {

    h1 {
      color: #eee;
    }
  }

</style>