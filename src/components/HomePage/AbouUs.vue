<template>
  <div class="container">
    <div class="partners-all">
      <span class="partners">קצת עלינו</span> <br />
      <span class="partners-background">קצת עלינו</span> <br />
      <div class="content-divider"></div>
    </div>

    <div class="text-container">
      <p>
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
      </p>
    </div>

    <div class="button">
      <a href=""
        ><img src="../../../public/assets/images/svg/About Us/Button.svg"
      /></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  components: {},
};
</script>
<style scoped>
.container {
  /* border: 1px solid green; */
}

p {
  font-style: normal;
  font-size: 169.749px;
  font-size: 1.5em;
}

.partners {
  /* font-family: "Arimo"; */
  font-style: normal;
  font-weight: 600;
  font-size: 70px;
  line-height: 90px;
}
.partners-all {
  /* border: 2px solid yellow; */
  display: flex;
  flex-direction: column;
  margin-left: 60%;
  width: 100%;
  margin-top: 1em;
  margin-bottom: -1em;
  /* Our Products */

  /* position: absolute; 
  width: 448px;
  height: 91px;
  left: 916px;
  top: 807px; 

  /* identical to box height, or 129% */

  letter-spacing: -2px;

  /* grey */

  color: #31353d;
}

span:nth-of-type(2) {
  position: relative;
  bottom: 1.1em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 10em;
  line-height: 219px;
  /* or 129% */

  /* text-align: center; */
  letter-spacing: -4.84996px;

  /* grey */

  color: #31353d;

  opacity: 0.05;
}

.content-divider {
  margin-top: -14em;
  margin-bottom: 2em;
  margin-left: auto;
  margin-right: 18em;
  padding-left: 10px;
  padding-left: 10px;
  width: 53px;
  height: 4px;

  /* brand */

  background: #16588f;
}

.button {
  margin-left: 18em;
}
</style>