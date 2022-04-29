<template>
  <v-flex align-center justify-end d-flex class="h100" @click.prevent="submit()">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.6" d="M7.29202 0.316406C3.44776 0.316406 0.316406 3.44776 0.316406 7.29202C0.316406 11.1363 3.44776 14.2676 7.29202 14.2676C11.1363 14.2676 14.2676 11.1363 14.2676 7.29202C14.2676 3.44776 11.1363 0.316406 7.29202 0.316406ZM7.29202 1.71153C10.3823 1.71153 12.8725 4.20174 12.8725 7.29202C12.8725 10.3823 10.3823 12.8725 7.29202 12.8725C4.20174 12.8725 1.71153 10.3823 1.71153 7.29202C1.71153 4.20174 4.20174 1.71153 7.29202 1.71153ZM10.2866 4.70614L5.89689 9.09587L4.29741 7.49638L3.31101 8.48277L5.89689 11.0687L11.273 5.69253L10.2866 4.70614Z" fill="#31353D"/>
    </svg>
  </v-flex>
</template>

<script>
export default {

  props: {
    opacity: {
      type: Number,                                                                                                                                                                                                       
      default: 1
    },
    
    dark: {
      type: Boolean,
    },
  },

  methods: {
    submit() {
      this.$emit('submit')
    }
  }

}
</script>

<style scoped lang="scss">

  .dark_heart path{
    stroke: #16588F;
  }

</style>