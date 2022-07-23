<template>
  <div class="tab_icon_wrapper text-center py-2 px-3" @click="onClick()">
    <img loading="lazy" :src="image" alt="menu link image">
    <p class="tab_icon_placeholder"></p>
    <p class="mb-0 tab_icon_text" :class="`${color}--text`">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {

  props: {
    text: {
      type: String,
      required: true
    },
    
    image: {
      type: String,
      required: true
    },

    color: {
      type: String,
      default: 'white'
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick');
    }
  }

}
</script>

<style scoped>

  .tab_icon_wrapper {
    position: relative;
  }

  .tab_icon_text {
    position: absolute;
    top: 40px;
    width: 100%;
    right: 0px;
    white-space: nowrap;
  }

  p {
    font-weight: 100;
    font-size: 0.8em;
  }

</style>