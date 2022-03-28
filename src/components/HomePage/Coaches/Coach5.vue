<template>
  <div id="coach-container">
    <img src="./images/image1.png" />
    <span>דניאל כהן</span>
    <span>מאמן כדורגל</span>
  </div>
</template>
<script>
export default {
  name: "Coach5",
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
#coach-container {
  margin-top: 1em;
  transition: 1s;
}
#coach-container:hover {
  margin-top: 0;
}
</style>