<template>
  <div class="partners-all">
    <span class="partners">חברות שותפות</span> <br />
    <span class="partners-background">שותפות</span> <br />
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
  font-size: 12vw;
  line-height: 90px;
}

span:nth-of-type(2) {
  position: relative;
  bottom: 15vh;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 28vw;
  line-height: 219px;
  /* or 129% */

  /* text-align: center; */
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.05;
}

.content-divider {
  margin-top: -11em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-left: 10px;
  width: 53px;
  height: 4px;

  /* brand */

  background: #16588f;
}

@media (max-width: 1920px) {
  .partners {
    /* border: 1px solid red; */
    /* font-family: "Arimo"; */
    font-style: normal;
    font-weight: 600;
    font-size: 3em;
    line-height: 90px;
  }

  span:nth-of-type(2) {
    position: relative;
    bottom: 4.1cm;
    font-family: "Arimo";
    font-style: normal;
    font-weight: 700;
    font-size: 7em;
    line-height: 219px;
    /* or 129% */

    /* text-align: center; */
    letter-spacing: -4.84996px;

    /* grey */

    color: #31353d;

    opacity: 0.05;
  }

  .content-divider {
    margin-top: -11em;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-left: 10px;
    width: 53px;
    height: 4px;

    /* brand */

    background: #16588f;
  }
}
</style>