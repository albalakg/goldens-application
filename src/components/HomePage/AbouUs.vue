<template>
  <div class="container">
    <div class="partners-all">
      <span class="partners">קצת עלינו</span> <br />
      <span class="partners-background">קצת עלינו</span> <br />
      <div class="content-divider"></div>
      <p>lorem ipsum dolor sit amet</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  components: {},
};
</script>
<style scoped>
.partners {
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 70px;
  line-height: 90px;
}
.partners-all {
  /* Our Products */

  position: absolute;
  width: 448px;
  height: 91px;
  left: 916px;
  top: 807px;

  /* identical to box height, or 129% */

  letter-spacing: -2px;

  /* grey */

  color: #31353d;
}

.partners-background {
  /* Our Products */

  position: absolute;
  width: 10em;
  height: 1em;
  top: -0.5em;
  left: -3.7em;

  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 700;
  font-size: 10.5em;
  line-height: 219px;
  /* or 129% */

  text-align: center;
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.08;
}

.content-divider {
  background-color: #16588f;
  padding: 0.2rem;
  padding-left: 7em;
  position: absolute;
  left: 10.6em;
  top: 7em;
}

p {
  font-style: normal;
  font-size: 169.749px;
  line-height: 219px;
  font-size: 1.5em;
  position: relative;
  bottom: 2em;
}
</style>