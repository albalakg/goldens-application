<template>
  <v-container class="container">
    <div class="sub-topic">
      <p class="headline">
        <span class="odd">מסירה</span> &nbsp; <span>נכונה</span>
      </p>
      <br />
      <p>לורם איפסום</p>
    </div>
    <div class="sub-topic">
      <p class="headline">
        <span class="even">טקטיקה</span> &nbsp; <span>קבוצתית</span>
      </p>
      <br />
      <p>לורם איפסום</p>
    </div>
    <div class="sub-topic">
      <p class="headline">
        <span class="odd">מסירה</span> &nbsp; <span>נכונה</span>
      </p>
      <br />
      <p>לורם איפסום</p>
    </div>
    <div class="sub-topic">
      <p class="headline">
        <span class="even">טקטיקה</span> &nbsp; <span>קבוצתית</span>
      </p>
      <br />
      <p>לורם איפסום</p>
    </div>
    <div class="sub-topic">
      <p class="headline">
        <span class="odd">מסירה</span> &nbsp; <span>נכונה</span>
      </p>
      <br />
      <p>לורם איפסום</p>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "BottomCards",
};
</script>
<style scoped>
.sub-topic {
  width: 18em;
  height: 12em;
  /* white */
  background: #ffffff;
  box-shadow: 0px 20.5041px 49.7956px rgba(49, 54, 62, 0.1);
  border-radius: 20.5041px;
}

.container {
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 90%;
}

.headline {
  position: relative;
  /* right: 2em; */
  top: 2em;

  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  line-height: 111px;
  /* or 251% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -2.46049px;

  /* gray */

  color: #31353d;
}

span {
  font-family: "Arimo";
  font-style: normal;
  color: #31353d;
  font-size: 140%;
}

.odd {
  color: #16588f;
}

.even {
  color: #e6b260;
  font-size: 160%;
}

p {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>