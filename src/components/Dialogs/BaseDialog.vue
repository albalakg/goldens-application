<template>
  <v-dialog
    v-model="show"
    :persistent="persistent"
    :overlay="overlay"
    transition="dialog-transition"
    @click:outside="close()"
  >
    <v-card class="base_dialog_wrapper pa-3">
      <slot name="content" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  props: {

    show: {
      type: Boolean,
    },

    maxWidth: {
      type: Number,
    },
    
    overlay: {
      type: Boolean,
    },
    
    persistent: {
      type: Boolean,
    },
    
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }

}
</script>

<style scoped>

  .base_dialog_wrapper {
    
  }

</style>