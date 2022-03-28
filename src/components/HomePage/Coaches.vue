<template>
  <div id="partners-all">
    <span id="partners">המאמנים שלנו</span> <br />
    <span id="partners-background">המאמנים שלנו</span> <br />
    <div id="content-divider"></div>

    <div id="coaches">
      <Coach1 /><Coach2 /><Coach3 /><Coach4 /><Coach5 /><Coach6 /><Coach7 />
    </div>
  </div>
</template>

<script>
import Coach1 from "./Coaches/Coach1.vue";
import Coach2 from "./Coaches/Coach2.vue";
import Coach3 from "./Coaches/Coach3.vue";
import Coach4 from "./Coaches/Coach4.vue";
import Coach5 from "./Coaches/Coach5.vue";
import Coach6 from "./Coaches/Coach6.vue";
import Coach7 from "./Coaches/Coach7.vue";
export default {
  name: "Topics",
  components: { Coach1, Coach2, Coach3, Coach4, Coach5, Coach6, Coach7 },
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
  font-size: 10.5em;
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

#coaches {
  position: relative;
  top: 8em;
  left: 55em;
  display: flex;
}
</style>