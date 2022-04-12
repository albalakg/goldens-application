<template>
  <div class="partners-all">
    <span class="partners">המאמנים שלנו</span> <br />
    <span class="partners-background" id="background-title">המאמנים</span>
    <br />
    <div class="content-divider"></div>
  </div>
</template>

<script>
export default {
  name: "CoachesTitle",
};
</script>
<style scoped>
.partners {
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 6rem;
  white-space: nowrap;
  line-height: 90px;
}

span:nth-of-type(2) {
  position: relative;
  bottom: 0.8em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 12rem;
  white-space: nowrap;
  line-height: 219px;
  /* or 129% */

  /* text-align: center; */
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.08;
}

.content-divider {
  margin-top: -11em;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-left: 10px;
  margin-bottom: 2em;
  width: 53px;
  height: 4px;

  /* brand */

  background: #16588f;
}
</style>