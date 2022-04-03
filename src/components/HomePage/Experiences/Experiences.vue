<template>
  <div class="bg-img">
    <div class="image">
      <!-- Assets must be in the assets folder of the project -->
      <div class="img1">
        <img :src="imageLink[currentData]" class="img-w-0" alt="" />
      </div>
      <div class="img2">
        <img
          :src="imageLink[(currentData + 1) % quizData.length]"
          class="img-w-1"
        />
      </div>
      <div class="img3">
        <img
          :src="imageLink[(currentData + 2) % quizData.length]"
          class="img-w-2"
        />
      </div>
      <div class="img4">
        <img
          :src="imageLink[(currentData + 3) % quizData.length]"
          class="img-w-3"
        />
      </div>
      <div class="img5">
        <img
          :src="imageLink[(currentData + 4) % quizData.length]"
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
          <h3 id="b_text">{{ quizData[currentData].b }}</h3>
        </div>
      </div>
      <i class="fa fa-angle-left" @click="increaseIndex"></i>
      <i class="fa fa-angle-right" @click="decreaseIndex"></i>
    </div>
  </div>
</template>

<script>
import image from "../../../../public/assets/images/Experiences/images.jpeg";
import image2 from "../../../../public/assets/images/Experiences/images2.jpeg";
import image3 from "../../../../public/assets/images/Experiences/Image1.jpg";
import image4 from "../../../../public/assets/images/Experiences/images3.jpeg";
import image5 from "../../../../public/assets/images/Experiences/04-women_1390086275.jpg";
export default {
  name: "Experiences",
  props: {
    //to get the data from the parent component
    //quizData: Array,
  },
  data() {
    return {
      currentData: 0,
      quizData: [
        {
          question: "שלום 1",
          a: "Java",
          b: "Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
        {
          question: "שלום 2",
          a: "Central Style Sheets",
          b: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        },
        {
          question: "שלום 3",
          a: "Hypertext Markup Language",
          b: "Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
        {
          question: "שלום 4",
          a: "1996",
          b: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        },
        {
          question: "שלום 5",
          a: "1996",
          b: "Lorem Ipsum הוא פשוט טקסט דמה של תעשיית הדפוס והקביעה. Lorem Ipsum היה טקסט הדמה הסטנדרטי של התעשייה מאז שנות ה-1500, כאשר מדפסת לא ידועה לקחה שולחן כתיבה וערבבה אותה כדי ליצור ספר דגימות. הוא שרד לא רק חמש מאות שנים",
        },
      ],
      imageLink: [image, image2, image3, image4, image5],
    };
  },
  computed: {},
  methods: {
    //click will change between images
    // increase = left
    increaseIndex() {
      this.currentData = (this.currentData + 1) % this.quizData.length;
      // console.log(this.imageLink[this.currentData]);
    },
    // decrease = right
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

<style scoped>
h2 {
  color: white;
}

h3 {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* or 175% */

  text-align: center;

  /* white */

  color: #ffffff;

  mix-blend-mode: normal;
  opacity: 0.7;
}

.bg-img {
  background-image: url(../../../../public/assets/images/Experiences/elipse.png);
  width: 100%;
  height: calc(400px + ((1280px - 100vw) / 40));
  background-position: bottom center;
}

img {
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 10em;
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
  left: 220px;
  margin-top: calc(10vw + ((1280px - 100vw) / 6));
  padding-left: 1em;
}

.img2 {
  margin-top: calc(8vw + ((1280px - 100vw) / 15));
  left: 360px;
  margin-left: 1em;
}

.img3 {
  margin-top: calc(7vw + ((1280px - 100vw) / 40));
}

.img4 {
  margin-top: calc(8vw + ((1280px - 100vw) / 15));
  margin-right: 1em;
}

.img5 {
  right: 179px;
  margin-top: calc(10vw + ((1280px - 100vw) / 6));
  margin-right: -1em;
  padding-right: 1em;
}

.image {
  display: flex;
  justify-content: center;
  margin-top: 12em;
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
  background: #e6b260;
  margin: 0 auto;
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
