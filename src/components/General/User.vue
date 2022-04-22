<template>
  <div class="h100 w100">
    <svg :class="{'dark_heart': dark}" width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21.5" cy="21.5" r="21" fill="white" fill-opacity="0.0306839" stroke="white"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0698 13.7617C18.9364 13.7617 17.1998 15.4974 17.1998 17.6317C17.1998 19.766 18.9364 21.5017 21.0698 21.5017C23.2041 21.5017 24.9398 19.766 24.9398 17.6317C24.9398 15.4974 23.2041 13.7617 21.0698 13.7617ZM13.8319 27.8993C13.5604 28.5424 14.092 29.2417 14.8119 29.2417L28.1876 29.2417C28.9075 29.2417 29.4391 28.5424 29.1676 27.8993C27.9078 24.9254 24.948 23.2217 21.4992 23.2217C18.0515 23.2217 15.0918 24.9254 13.8319 27.8993Z" fill="white"/>
    </svg>
  </div>
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
  }

}
</script>

<style scoped lang="scss">

  .dark_heart path{
    stroke: #16588F;
  }

</style>