<template>
  <v-flex d-flex align-center class="side_border_text_wrapper" :class="{'white_border_text_wrapper': title}">
    
    <div>
      <h3 v-if="title" :class="{'main_text_color': dark}">
        {{ title }}
      </h3>
      <br>
      <p :class="{'white_text_color': dark}">
        {{ text }}
      </p>
    </div>

  </v-flex>
</template>

<script>
export default {

  props: {
    text: {
      type: String,
      required: true
    },

    title: String,

    dark: Boolean,
  }

}
</script>

<style scoped lang="scss">

.side_border_text_wrapper {

  padding-right: 20px;
  border-right: 4px solid rgb(255, 89, 34);
  
  h3 {
    font-size: 2em;
  }
}

.white_border_text_wrapper {
    border-right: 4px solid rgb(255, 255, 255);
}

.dark_side_border {
  color: #EEE;
}

</style>