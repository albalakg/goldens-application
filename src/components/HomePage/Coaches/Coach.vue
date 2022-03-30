<template>
  <div class="coach-container">
    <div>
      <div class="coach">
        <div class="text">
          <div><span id="coach-name">דניאל כהן</span></div>
          <div><span id="coach-specialty">כדורגל</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Coach",
};
</script>
<style scoped>
#coach-name {
  /* position: absolute;
  top: 6em;
  left: 1.4em; */
  font-weight: 400;
  font-size: 4.7vh;
  white-space: nowrap;
  line-height: 55px;

  letter-spacing: -1px;

  color: white;
}
#coach-specialty {
  /* position: absolute;
  top: 13em;
  left: 5em; */
  font-weight: 400;
  font-size: 2.5vh;
  white-space: nowrap;
  line-height: 90px;
  /* or 210% */

  letter-spacing: -1px;

  /* white */

  color: rgb(255, 89, 34);
}

.coach-container {
  width: 20em;
  height: 100%;

  /* border: 1px solid rgb(30, 255, 0); */

  /* margin-top: -40em; */
  transition: 1s;

  margin-bottom: 3em;
}

.coach {
  width: 100%;
  height: 40vh;
  background-size: contain;
  position: relative;

  background-image: url("./images/image1.png");
  display: flex;
  flex-direction: column;
  transition: 450ms;
}

.coach:hover {
  width: 324px;
  height: 459px;
  margin-top: -1em;
  z-index: 1;

  filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.25));
}

.text {
  margin-top: 19em;
}
</style>