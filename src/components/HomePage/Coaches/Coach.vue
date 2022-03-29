<template>
  <div class="coach-container">
    <div v-for="coach in coaches" :key="coach.id">
      <div class="coach">
        <div><span id="coach-name">דניאל כהן</span></div>
        <div><span id="coach-specialty">כדורגל</span></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Coach",
  data: () => ({
    coaches: [{ id: 0, name: "דניאל כהן", specialty: "כדורגל" }],
  }),
};
</script>
<style scoped>
img {
  width: 20em;
  height: 25em;
  transition: 1s;
}
img:hover {
  width: 21em;
  height: 26em;
  filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.25));
  /* transform: matrix(-1, 0, 0, 1, 0, 0); */
}

#coach-name {
  position: relative;
  top: 6em;
  margin-top: 9em;
  font-weight: 400;
  font-size: 3.1em;
  white-space: nowrap;
  line-height: 90px;

  letter-spacing: -1px;

  color: white;
}
#coach-specialty {
  position: relative;
  top: 11em;
  font-weight: 400;
  font-size: 1.5em;
  white-space: nowrap;
  line-height: 90px;
  /* or 210% */

  letter-spacing: -1px;

  /* white */

  color: #e6b260;
}

.coach-container {
  margin-top: 1em;
  transition: 1s;
  display: flex;
  flex-direction: row;
}

.coach {
  width: 317px;
  height: 424px;
  background-size: contain;

  background-image: url("./images/image1.png");
  display: flex;
  flex-direction: column;
}
</style>