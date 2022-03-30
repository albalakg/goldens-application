<template>
  <div class="container">
    <img class="g-star" src="../../../public/assets/images/svg/G-star.svg" />
    <img class="kid-blue" src="../../../public/assets/images/svg/kidBlue.svg" />
  </div>
</template>


<script>
export default {
  name: "Star",
};
</script>

<style scoped>
.g-star {
  border: 1px solid red;

  position: absolute;
  width: 75em;
  height: 62rem;
  left: -6em;
  top: 0.3em;
}
.kid-blue {
  width: 35em;
  margin-left: 100em;

  border: 1px solid red;
}

.container {
  /* position: relative; */
}
</style>