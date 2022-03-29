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
  font-size: 65px;
  line-height: 90px;
}

span:nth-of-type(2) {
  position: relative;
  bottom: 0.9em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 169.749px;
  line-height: 219px;
  /* or 129% */

  /* text-align: center; */
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.05;
}

.logos {
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
</style>