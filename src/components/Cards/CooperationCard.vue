<template>
  <div class="cooperation_wrapper">
    <div class="cooperation_content">
      <template v-for="index in 10">
        <span :key="'a' + index" class="cooperation_item">
          <strong>{{ cooperationText }}</strong>
          <!-- <logo dark :width="$vuetify.breakpoint.smAndDown ? '35%' : '15%'" /> -->
        </span>
        <span :key="'b' + index" class="cooperation_item">
          <img loading="lazy" src="./../../../public/assets/images/icons/Gstar-black.png" alt="nike">
        </span>
      </template>
    </div>
  </div>
</template>

<script>
// import Logo from '../General/Logo.vue';
export default {
  // components: { Logo },
  props: {},

  data() {
    return {
      cooperationText: 'שחק ברמה עולמית'
    }
  },

  computed: {
  },
};
</script>

<style scoped lang="scss">
.cooperation_wrapper {
  height: 100%;
  width: 100%;
  // background-color: #222;
  background-image: linear-gradient(216deg, rgba(77, 77, 77, 0.05) 0%, rgba(77, 77, 77, 0.05) 25%, rgba(42, 42, 42, 0.05) 25%, rgba(42, 42, 42, 0.05) 38%, rgba(223, 223, 223, 0.05) 38%, rgba(223, 223, 223, 0.05) 75%, rgba(36, 36, 36, 0.05) 75%, rgba(36, 36, 36, 0.05) 100%), linear-gradient(44deg, rgba(128, 128, 128, 0.05) 0%, rgba(128, 128, 128, 0.05) 34%, rgba(212, 212, 212, 0.05) 34%, rgba(212, 212, 212, 0.05) 57%, rgba(25, 25, 25, 0.05) 57%, rgba(25, 25, 25, 0.05) 89%, rgba(135, 135, 135, 0.05) 89%, rgba(135, 135, 135, 0.05) 100%), linear-gradient(241deg, rgba(55, 55, 55, 0.05) 0%, rgba(55, 55, 55, 0.05) 14%, rgba(209, 209, 209, 0.05) 14%, rgba(209, 209, 209, 0.05) 60%, rgba(245, 245, 245, 0.05) 60%, rgba(245, 245, 245, 0.05) 69%, rgba(164, 164, 164, 0.05) 69%, rgba(164, 164, 164, 0.05) 100%), linear-gradient(249deg, rgba(248, 248, 248, 0.05) 0%, rgba(248, 248, 248, 0.05) 32%, rgba(148, 148, 148, 0.05) 32%, rgba(148, 148, 148, 0.05) 35%, rgba(202, 202, 202, 0.05) 35%, rgba(202, 202, 202, 0.05) 51%, rgba(181, 181, 181, 0.05) 51%, rgba(181, 181, 181, 0.05) 100%), linear-gradient(92deg, rgb(213, 178, 110), rgb(213, 178, 110));
  color: #fff;

  .cooperation_content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: move-right-to-left linear infinite;
    animation-duration: 25s;
  }

  .cooperation_item {
    width: 100%;
    margin-right: 5%;
    pointer-events: none;
    min-width: fit-content;
    display: flex;
    align-items: center;
  }


  img {
    height: 50px;
  }

  strong {
    font-size: 1.5em;
    position: relative;
    // color: var(--subColor);
  }
}

@media only screen and (max-width: 600px) {
  .cooperation_wrapper .cooperation_content {
    animation-duration: 10s;
  }
}

@keyframes move-right-to-left {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
