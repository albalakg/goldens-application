<template>
  <div class="container">
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
    ],
  }),
};
</script>
<style scoped>
.coaches {
  border: 1px solid red;
  display: flex;
  justify-content: flex-start;
  height: 60vh;
  background-color: #102a46;

  /* width: 101vw;
  height: 48vh;
  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px;
  background-color: #102a46;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0;
  margin-right: -6em;
  margin-bottom: 4em; */
  /* justify-content: center; */

  /* border: 10px solid rgb(255, 130, 213); */
}

.coaches-container {
  width: 60%;

  justify-content: space-around;
}

.partners {
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