<template>
  <div>
    <div class="partners-all">
      <span class="partners">המאמנים שלנו</span> <br />
      <span class="partners-background">המאמנים שלנו</span> <br />
      <div class="content-divider"></div>

      <p>Lorem, ipsum dolor</p>
    </div>
    <div class="coaches"><Coach /></div>
    <div class=""></div>
  </div>
</template>

<script>
import Coach from "../../components/HomePage/Coaches/Coach.vue";
export default {
  name: "Coaches",
  components: { Coach },
  data: () => ({}),
};
</script>
<style scoped>
.coaches {
  position: relative;
  bottom: 8em;
  border: 1px solid purple;
  display: flex;
  justify-content: center;
}

.coaches-container {
  margin-right: auto;
  margin-left: auto;

  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

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

.partners-background {
  /* Our Products */

  width: 10em;
  height: 1em;

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

p {
  font-style: normal;
  font-size: 169.749px;
  line-height: 219px;
  font-size: 1.5em;
  position: relative;
  bottom: 2em;
}
</style>