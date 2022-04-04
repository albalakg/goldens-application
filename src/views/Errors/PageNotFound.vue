<template>
  <main class="main-content">
    <div class="error-content">
      <h1>אופס!</h1>
      <h2>העמוד שחיפשתם לא נמצא כאן</h2>
      <button><a href="/">חזרה לעמוד הבית</a></button>
      <img src="../../../public/assets/images/svg/404/Score404.svg" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");

a {
  color: white;
  text-decoration: none;
}

.main-content {
  border: 1px solid green;
  height: 70vh;
  display: flex;
  justify-content: center;
}

.error-content {
  display: flex;
  flex-direction: column;
  border: 2px solid red;
  width: 50%;
}
button {
  color: white;
  border: 2px solid #ffffff;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #16588f;
  box-sizing: border-box;
  box-shadow: 0px 9px 40px rgba(49, 53, 61, 0.2);
  border-radius: 55px;
  width: 20%;
  margin-bottom: 3em;
}

h1,
h2,
button {
  margin-left: auto;
  margin-right: auto;
}

h1 {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 5.3vw;
  line-height: 125px;
  /* or 125% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -1.38095px;

  /* brand 2 */

  color: #e6b260;
}

h2 {
  margin-bottom: 1em;
}

img {
  width: 50vw;
  height: 50vh;
}
</style>