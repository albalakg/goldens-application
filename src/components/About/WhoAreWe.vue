<template>
  <div class="content-container">
    <h1>מי <span>אנחנו</span></h1>
    <p>
      lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor
      sit amet
    </p>
  </div>
</template>
<script>
export default {
  name: "WhoAreWe",
};
</script>
<style scoped>
.content-container {
  width: 20vw;
  height: 30vh;
  /* border: 2px solid red; */
}
h1 {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 4.5vw;
  line-height: 90px;
  /* or 98% */

  text-align: right;
  letter-spacing: -3.85;
  color: white;
  margin-bottom: 0.3em;
}
h1 span {
  color: #e6b260;
}

p {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 1vw;
  line-height: 28px;
  /* or 155% */

  text-align: right;

  /* white */

  color: #ffffff;

  border-right: 5px solid #e6b260;
  padding-right: 2em;
}
</style>