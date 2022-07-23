<template>
  <v-flex d-flex align-center class="center_line_text_wrapper">
    <v-flex class="line">
    </v-flex>
    
    <span class="mx-2">
      <strong>
        {{ text }}
      </strong>
    </span>

    <v-flex class="line">
    </v-flex>
  </v-flex>
</template>

<script>
export default {

  props: {
    text: {
      type: String,
    }
  }

}
</script>

<style scoped lang="scss">

.center_line_text_wrapper {

  .line {
      height: 1px;
      background-color: rgb(192, 192, 192);
  }
}

</style>