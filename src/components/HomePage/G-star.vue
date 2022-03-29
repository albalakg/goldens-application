<template>
  <div>
    <img class="g-star" src="../../../public/assets/images/svg/G-star.svg" />
    <img
      class="bottom-star"
      src="../../../public/assets/images/svg/G-star-bottom.svg"
    />
  </div>
</template>


<script>
export default {
  name: "Star",
};
</script>

<style scoped>
.g-star {
  position: absolute;
  width: 105em;
  height: 62rem;
  left: -14em;
  top: 0.3em;
}

.bottom-star {
  position: relative;
  top: 205em;
  right: 11em;
}
</style>