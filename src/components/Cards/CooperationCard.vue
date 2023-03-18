<template>
  <div class="cooperation_wrapper">
    <marquee scrollamount="5">
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
      <span class="cooperation_item">
        <logo dark :width="'15%'" />
      </span>
    </marquee>
  </div>
</template>

<script>
import Logo from '../General/Logo.vue';
export default {
  components: { Logo },
  props: {},

  computed: {},
};
</script>

<style scoped lang="scss">
    .cooperation_wrapper {
      height: 100%;
      width: 100%;
      background-color: #222;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;

      .cooperation_item {
        width: 100%;
        margin-right: 5%;
        pointer-events: none;
      }
    }
</style>
