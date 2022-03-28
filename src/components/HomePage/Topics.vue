<template>
  <div id="partners-all">
    <span id="partners">נושאי לימוד</span> <br />
    <span id="partners-background">נושאי לימוד</span> <br />
    <span></span>
    <div id="content-divider"></div>

    <p>Lorem, ipsum dolor</p>
    <div id="topics"><Basic /> <Advanced /><Basic /> <Advanced /></div>
    <a href=""><Button /></a>
  </div>
</template>

<script>
import Button from "./Topics/Button.vue";
import Basic from "./Topics/Basic.vue";
import Advanced from "./Topics/Advanced.vue";
export default {
  name: "Topics",
  components: { Button, Basic, Advanced },
};
</script>
<style scoped>
#partners {
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 70px;
  line-height: 90px;
}
#partners-all {
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

#partners-background {
  /* Our Products */

  position: absolute;
  width: 10em;
  height: 1em;
  top: -0.5em;
  left: -3.7em;

  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 700;
  font-size: 169.749px;
  line-height: 219px;
  /* or 129% */

  text-align: center;
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.08;
}

#content-divider {
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

#logos {
  /* border: 1px solid red; */
  display: flex;
  width: 55em;
  flex-direction: row-reverse;
  justify-content: space-around;
}

#logos-main {
  position: absolute;
  right: -15em;
}

#topics {
  position: relative;
  left: 18em;
  /* border: 1px solid red; */
  width: 65em;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>