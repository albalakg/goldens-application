<template>
  <div class="coach-container">
    <div v-for="coach in coaches" :key="coach.id">
      <img src="./images/image1.png" />
      <span>{{ coach.name }}</span>
      <span>{{ coach.specialty }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Coach",
  data: () => ({
    coaches: [
      { id: 0, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 1, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 2, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 3, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 4, name: "דניאל כהן", specialty: "כדורגל" },
      { id: 5, name: "דניאל כהן", specialty: "כדורגל" },
    ],
  }),
};
</script>
<style scoped>
img {
  width: 20em;
  height: 25em;
  transition: 1s;
  /* transform: matrix(-1, 0, 0, 1, 0, 0); */
}
img:hover {
  width: 21em;
  height: 26em;
  filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.25));
}

span:first-of-type {
  position: relative;
  bottom: 2.6em;
  right: 0.9em;

  font-weight: 400;
  font-size: 3.1em;
  white-space: nowrap;
  line-height: 90px;

  letter-spacing: -1px;

  color: white;
}
span:nth-of-type(2) {
  position: relative;

  left: 4.1em;
  bottom: 4em;

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
  position: absolute;
  right: 10.5em;
}
</style>