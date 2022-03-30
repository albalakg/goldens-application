<template>
  <div class="coach-container">
    <div>
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
};
</script>
<style scoped>
#coach-name {
  position: relative;
  top: 6em;
  font-weight: 400;
  font-size: 3.1rem;
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
  width: 20em;
  height: 100%;

  border: 1px solid rgb(30, 255, 0);

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
  height: 439px;

  filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.25));
}
</style>