<template>
  <div class="bg-img">
    <div class="image">
      <!-- Assets must be in the assets folder of the project -->
      <div class="img1">
        <img
          src="../../../../public/assets/images/Experiences/images3.jpeg"
          class="img-w-0"
        />
      </div>
      <div class="img2">
        <img
          src="../../../../public/assets/images/Experiences/04-women_1390086275.jpg"
          class="img-w-1"
        />
      </div>
      <div class="img3">
        <img
          src="../../../../public/assets/images/Experiences/images2.jpeg"
          class="img-w-2"
        />
      </div>
      <div class="img4">
        <img
          src="../../../../public/assets/images/Experiences/images.jpeg"
          class="img-w-3"
        />
      </div>
      <div class="img5">
        <img
          src="../../../../public/assets/images/Experiences/Image1.jpg"
          class="img-w-4"
        />
      </div>
    </div>
    <div class="quiz-container" id="data">
      <div class="quiz-header">
        <h2 id="question">{{ quizData[currentData].question }}</h2>
        <div>
          <h3 id="a_text">{{ quizData[currentData].a }}</h3>
          <hr />
        </div>
        <div>
          <h3 class="b_text">{{ quizData[currentData].b }}</h3>
        </div>
      </div>
      <i class="fa fa-angle-left" @click="decreaseIndex"></i>
      <i class="fa fa-angle-right" @click="increaseIndex"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quizdata",
  props: {
    //to get the data from the parent component
    //quizData: Array,
  },
  data() {
    return {
      quizData: [
        {
          question: "שחר פאר",
          a: "כדורגל",
          b: "Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
        {
          question: "יוסי יונה",
          a: "כדורגל",
          b: "Lorem Ipsum הוא פשוט טקסט דמה של תעשיית  והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
        {
          question: "אבי כהן",
          a: "כדורגל",
          b: "Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
        {
          question: "דניאל לוי",
          a: "כדורגל",
          b: "Lorem Ipsum הוא פת. הוא שרד לא רק חמש מאות שנים",
        },
        {
          question: "רון משה",
          a: "כדורגל",
          b: "Lorem Ipsum הוא פשוטהדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
      ],
      currentData: 0,
    };
  },
  methods: {
    increaseIndex() {
      this.currentData = (this.currentData + 1) % this.quizData.length;
    },
    decreaseIndex() {
      if (this.currentData == 0) {
        this.currentData = this.quizData.length - 1;
      } else {
        this.currentData = (this.currentData - 1) % this.quizData.length;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.bg-img {
  background-image: url("../../../../public/assets/images/Experiences/elipse.png");
  width: 100%;
  height: 33vh;
  background-position: bottom center;
}

img {
  border-radius: 50%;
  object-fit: cover;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.img-w-0,
.img-w-4 {
  width: calc(80px - ((1280px - 100vw) / 20));
  height: calc(80px - ((1280px - 100vw) / 20));
}

.img-w-1,
.img-w-3 {
  width: calc(90px - ((1280px - 100vw) / 30));
  height: calc(90px - ((1280px - 100vw) / 30));
}

.img-w-2 {
  width: calc(110px - ((1280px - 100vw) / 40));
  height: calc(110px - ((1280px - 100vw) / 40));
}

.img1 {
  margin-left: -1vw;
  margin-top: calc(8vw + ((1280px - 100vw) / 6));
  padding-left: 50px;
}

.img2 {
  margin-top: calc(380px + ((1280px - 100vw) / 15));
  left: 360px;
}

.img3 {
  margin-top: calc(380px + ((1280px - 100vw) / 40));
}

.img4 {
  margin-top: calc(380px + ((1280px - 100vw) / 15));
  right: 360px;
}

.img5 {
  right: 179px;
  margin-top: calc(280px + ((1280px - 100vw) / 6));
  padding-right: 50px;
}

.image {
  display: flex;
  justify-content: space-around;
}

.a_text {
  border-bottom: 1px solid black;
}

#data {
  padding: 20px;
  background: #1c3f64;
  color: white;
  width: 40%;
  margin: 20px auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.fa {
  color: #1c3f64;
  border-radius: 50%;
  font-size: 20px;
  padding: 10px 17px;
  background: white;
  font-weight: bolder;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.fa-angle-left {
  position: absolute;
  top: 40%;
  left: -25px;
}

.fa-angle-right {
  position: absolute;
  top: 40%;
  right: -25px;
}

#data {
  position: relative;
}

hr {
  width: 10%;
  border: none;
  height: 3px;
  background-color: yellow;
  margin: 0 auto;
}

h2 {
  color: white;
}
h3 {
  color: white;
}

.fa:hover {
  cursor: pointer;
}

@media (max-width: 800px) {
  #data {
    width: 60%;
  }
}

@media (max-width: 450px) {
  #data {
    width: 80vw;
  }
}
</style>
