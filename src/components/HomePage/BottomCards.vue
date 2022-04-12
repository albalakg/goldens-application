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
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 12em;
  /* white */
  background: #ffffff;
  box-shadow: 0px 20.5041px 49.7956px rgba(49, 54, 62, 0.1);
  border-radius: 20.5041px;
  margin-left: 2vw;
}

.container {
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.headline {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  line-height: 111px;
  position: relative;
  top: 1em;
  /* or 251% */

  letter-spacing: -2.46049px;

  /* gray */

  color: #31353d;
}

span {
  font-family: "Arimo";
  font-style: normal;
  color: #31353d;
  font-size: 2vw;
}

.odd {
  color: #16588f;
}

.even {
  color: rgb(230, 179, 96);
  font-size: 2vw;
}

p {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>