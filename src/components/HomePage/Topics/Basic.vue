<template>
  <div class="topic">
    <span>{{ topicTitle }}</span>
    <span>שיפור שליטה בכדור באמצעות הקפצה</span>
  </div>
</template>

<script>
export default {
  props: ["topicTitle"],
  name: "Topic",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");
.topic {
  display: flex;
  justify-content: center;
  flex-direction: column;

  background-image: linear-gradient(
      180deg,
      rgba(49, 53, 61, 0) 18.59%,
      #31353d 100%
    ),
    url("../../../../public/assets/images/Topics/image1.png");
  width: 14.3em;
  height: 24.8em;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 14px;
  /* border: 2px solid red; */
  font-family: "Arimo";
  font-style: normal;
}

.topic:hover {
  background-image: url("../../../../public/assets/images/Topics/image1.png");
}

span {
  font-family: "Arimo";
  font-style: normal;
}

span:first-of-type {
  position: relative;
  top: 4em;

  font-weight: 400;
  font-size: 2.1em;
  white-space: nowrap;
  line-height: 90px;

  letter-spacing: -1px;

  color: white;
}
span:nth-of-type(2) {
  position: relative;
  top: 6em;

  font-weight: 400;
  font-size: 1em;
  white-space: nowrap;
  line-height: 90px;
  /* or 210% */

  letter-spacing: -1px;

  /* white */

  color: white;
}
</style>