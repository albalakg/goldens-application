<template>
  <div>
    <div class="bg-img">
      <div class="image">
        <div class="img1">
          <img
            src="../../../../public/assets/images/UsersExperience/images3.jpeg"
            class="img-w-0"
          />
        </div>
        <div class="img2">
          <img
            src="../../../../public/assets/images/UsersExperience/04-women_1390086275.jpg"
            class="img-w-1"
          />
        </div>
        <div class="img3">
          <img
            src="../../../../public/assets/images/UsersExperience/images2.jpeg"
            class="img-w-2"
          />
        </div>
        <div class="img4">
          <img
            src="../../../../public/assets/images/UsersExperience/images.jpeg"
            class="img-w-3"
          />
        </div>
        <div class="img5">
          <img
            src="../../../../public/assets/images/UsersExperience/Image1.jpg"
            class="img-w-4"
          />
        </div>
      </div>
      <div class="quiz-container" id="data">
        <div class="quiz-header">
          <h2 id="question">Question</h2>
          <div>
            <h3 id="a_text">Question</h3>
            <hr />
          </div>
          <div>
            <h3 id="b_text">Question</h3>
          </div>
        </div>
        <i class="fa fa-angle-left" id="return"></i>
        <i class="fa fa-angle-right" id="submit"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Experience",
  data: () => ({
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
  }),
};
</script>
<style scoped>
/* body {
  padding: 0;
  margin: 0;
} */
.bg-img {
  background-image: url("../../../../public/assets/images/UsersExperience/elipse.png");
  width: 100%;
  height: 33vh;
  background-size: cover;
  background-position: bottom center;
}
img {
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.img-w-0,
.img-w-4 {
  width: 80px;
  height: 80px;
}
.img-w-1,
.img-w-3 {
  width: 90px;
  height: 90px;
}
.img-w-2 {
  width: 110px;
  height: 110px;
}
.img1 {
  position: absolute;
  left: 220px;
  top: 10px;
}
.img2 {
  position: absolute;
  top: 100px;
  left: 360px;
}
.img3 {
  position: absolute;
  top: 140px;
}
.img4 {
  position: absolute;
  top: 100px;
  right: 360px;
}
.img5 {
  position: absolute;
  right: 179px;
  top: 10px;
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
  margin: auto;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  top: 45vh;
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
.fa:hover {
  cursor: pointer;
}
</style>