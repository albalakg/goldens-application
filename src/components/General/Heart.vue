<template>
  <v-flex 
    :class="{
      'justify-end': end,
      'justify-center': center,
      'justify-start': start,
    }" 
    align-center 
    d-flex 
    class="h100" 
    @click.prevent="submit()"
  >
    <svg :class="{'dark_heart': !dark, 'filled_heart': filled}" width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.46252 11.8726C-0.137517 8.40585 0.729163 3.20577 5.06256 1.47241C9.39596 -0.260945 11.996 3.20577 12.8627 4.93913C13.7294 3.20577 17.1961 -0.260945 21.5295 1.47241C25.8629 3.20577 25.8629 8.40585 23.2628 11.8726C20.6628 15.3393 12.8627 22.2727 12.8627 22.2727C12.8627 22.2727 5.06256 15.3393 2.46252 11.8726Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
    
    end: {
      type: Boolean,
      default: true
    },
    
    center: {
      type: Boolean,
    },
    
    start: {
      type: Boolean,
    },

    filled: {
      type: Boolean
    }
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
    stroke: #0e3556;
  }

  .filled_heart {
    fill: #fff;
  }

</style>