<template>
  <v-container>
    <div id="football-card">
      <span>כדורגל</span>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "TopCards",
};
</script>
<style scoped>
div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../../public/assets/images/svg/Cards/football.svg");
  width: 13em;
  height: 14em;
  border-radius: 14px;
}

span {
  position: relative;
  top: 2em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 43px;
  line-height: 90px;
  /* or 210% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1px;

  /* white */

  color: #ffffff;
}
</style>