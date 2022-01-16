<template>
  <div class="tab_icon_wrapper text-center py-2 px-3" @click="onClick()">
    <v-icon :color="color">{{ icon }}</v-icon>
    <p class="mb-0" :class="`${color}--text`">
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
    
    icon: {
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

  p {
    font-weight: 100;
    font-size: 0.8em;
  }

</style>