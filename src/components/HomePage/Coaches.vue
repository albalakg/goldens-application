<template>
  <div class="container">
    <div class="partners-all">
      <span class="partners">המאמנים שלנו</span> <br />
      <span class="partners-background">המאמנים</span> <br />
      <div class="content-divider"></div>

      <p>Lorem, ipsum dolor</p>
    </div>
    <div class="background"></div>

    <div class="coaches">
      <div v-for="coach in coaches" :key="coach.id" class="coach">
        <Coach />
      </div>
    </div>
  </div>
</template>

<script>
import Coach from "../../components/HomePage/Coaches/Coach.vue";
export default {
  name: "Coaches",
  components: { Coach },
  data: () => ({
    coaches: [
      { id: 0, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 1, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 2, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 3, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 4, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 5, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 6, name: "דניאל כהן", specialty: "כדורגל" },
    ],
  }),
};
</script>
<style scoped>
.coaches {
  border: 1px solid red;
  width: 100%;
  height: 48vh;
  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px;
  background-color: #1c3f64;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; /* flex: 1 1 auto; */
  grid-gap: 0;
  justify-content: center;

  margin-left: auto;
  margin-right: auto;
  /* justify-content: center; */
  margin-bottom: 4em;
  /* border: 10px solid rgb(255, 130, 213); */
}

.coach {
}

.coaches-container {
  /* margin-right: auto; */
  /* margin-left: auto; */

  width: 60%;
  /* display: flex; */
  /* flex-direction: row; */
  justify-content: space-around;
  /* border: 2px solid magenta; */
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
.container {
  /* position: relative;
  bottom:0em; */
  width: 190em;
  /* border: 10px solid rgb(110, 110, 53); */
}
.background {
  /* position: absolute; */
  /* top: 17em;
  right: -20em; */
  /* z-index: -1; */
  /* width: 100vw;
  height: 30em;
  background-color: #1c3f64;

  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px; */
}
</style>