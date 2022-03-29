<template>
  <div class="partners-all">
    <span class="partners">המאמנים שלנו</span> <br />
    <span class="partners-background">המאמנים שלנו</span> <br />
    <div class="content-divider"></div>

    <div class="coaches"><Coach /></div>
    <div class="blue-background"></div>
  </div>
</template>

<script>
import Coach from "./Coaches/Coach.vue";

export default {
  name: "Topics",
  components: { Coach },
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
  left: 48em;
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

.logos {
  /* border: 1px solid red; */
  display: flex;
  width: 55em;
  flex-direction: row-reverse;
  justify-content: space-around;
}

.logos-main {
  position: absolute;
  right: -15em;
}

.coaches {
  position: relative;
  top: 8em;
  left: 55em;
  display: flex;
}

.blue-background {
  position: absolute;
  background-color: #1c3f64;
  width: 119.5em;
  height: 15em;
  top: 29em;
  right: -44em;
  z-index: -10;
  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px;
}
</style>