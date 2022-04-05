<template>
  <div class="container">
    <div class="g-star">
      <img src="../../../public/assets/images/svg/G-star.svg" />
      <div>
        <img
          class="kid-blue"
          src="../../../public/assets/images/svg/kidBlue.svg"
        />
      </div>
      <div class="bottom-star">
        <img
          class="star-img"
          src="../../../public/assets/images/svg/G-star-bottom.svg"
          alt=""
        />
      </div>
    </div>
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
  left: -10%;
  top: -14em;
}

.kid-blue {
  margin-top: -52em;
  margin-right: 10em;
}
.bottom-star {
  margin-top: 95vw;
  margin-right: -22%;
}

.star-img {
  width: 99vw;
  height: 99vh;
}
.container {
  position: relative;
}
</style>