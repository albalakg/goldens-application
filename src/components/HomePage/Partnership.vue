<template>
  <div class="partners-all">
    <span class="partners">חברות שותפות</span> <br />
    <span class="partners-background">שותפות</span> <br />
    <span></span>
    <div class="content-divider"></div>
    <br />
    <div class="logos-main">
      <div class="logos"><allPartners /></div>
    </div>
  </div>
</template>.
<script>
import allPartners from "../../components/HomePage/Logos/allPartners.vue";
export default {
  name: "Partnership",
  components: { allPartners },
};
</script>
<style scoped>
.partners {
  /* border: 1px solid red; */
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 70px;
  line-height: 90px;
}
.partners-all {
  /* border: 1px solid green; */

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
  /* border: 1px solid blue; */

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
  line-height: 219px;
  font-size: 2em;
}

.logos {
  /* border: 1px solid red; */
  position: relative;
  right: 1.5em;
  display: flex;
  width: 55em;
  flex-direction: row-reverse;
  justify-content: space-around;
}

.logos-main {
  position: absolute;
  right: -15em;
}
</style>