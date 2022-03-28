<template>
  <router-link
    :class="{
      dark_mode: dark,
    }"
    to="/"
  >
    <img src="./Logo.svg" />
  </router-link>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  margin-left: 20px;
}

.dark_mode {
  letter-spacing: 1px;

  img {
    position: relative;
    top: -0.2em;
  }
}
</style>