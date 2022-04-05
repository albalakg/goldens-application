<template>
  <v-container fluid class="home_wrapper">
    <v-flex xs11 mx-auto class="text-center">
      <!-- <Logo /> -->

      <!-- <div>
        <Star class="g-star" />
        <KidBlue class="kid-blue" />
      </div> -->

      <div class="home_course_card">
        <course-card dark :course="courseCategories"> </course-card>
      </div>

      <div class="main-content">
        <div class="headline">
          <div><h1 id="title-top" class="heading">כל האימונים</h1></div>
          <div>
            <h1 class="heading">במקום <span>אחד</span></h1>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            voluptatem numquam nostrum ducimus libero, distinctio vitae velit
          </p>
          <TopCards />
        </div>
      </div>
      <div class="kid-blue">
        <KidBlue />

        <Star class="star" />
      </div>
      <div>
        <div class="partners"><Partnership /></div>
      </div>
      <div>
        <div class="topics"><Topics /></div>
      </div>
      <div class="coaches">
        <CoachesTitle />
        <Coaches />
        <!-- <div class="blue-background"></div> -->
      </div>
      <div class="bottom-cards"><BottomCards /></div>
      <div class="about-us"><AboutUs /></div>
      <div class="common-questions">
        <CommonQuestions />
      </div>
      <div class="experiences-container"><Experiences /></div>
      <div class="contact" xs11 mx-auto><SupportForm /></div>
      <footer><Footer /></footer>
    </v-flex>
  </v-container>
</template>

<script>
import CourseCard from "../../components/Cards/CourseCard.vue";
import Star from "../../components/HomePage/G-star.vue";
// import KidBlue from "../../components/HomePage/KidBlue.vue";
import Partnership from "../../components/HomePage/Partnership.vue";
import Topics from "../../components/HomePage/Topics.vue";
import CoachesTitle from "../../components/Titles/CoachesTitle.vue";
import Coaches from "../../components/HomePage/Coaches.vue";
import BottomCards from "../../components/HomePage/BottomCards.vue";
import TopCards from "../../components/HomePage/TopCards.vue";
import AboutUs from "../../components/HomePage/AbouUs.vue";
import CommonQuestions from "../../components/HomePage/CommonQuestions.vue";
import SupportForm from "../../components/Form/SupportForm.vue";
import Footer from "../../components/General/Footer.vue";
import Experiences from "../../components/HomePage/Experiences/Experiences.vue";
export default {
  name: "Home",
  components: {
    CourseCard,
    Star,
    Partnership,
    Topics,
    Coaches,
    CoachesTitle,
    TopCards,
    BottomCards,
    AboutUs,
    CommonQuestions,
    Experiences,
    SupportForm,
    Footer,
  },

  created() {
    this.getCourseCategories();
  },

  computed: {
    courseCategories() {
      const categories =
        this.$store.getters["CourseCategoryState/courseCategories"];
      if (categories.length) {
        return categories[0];
      }

      return {};
    },
  },

  methods: {
    getCourseCategories() {
      this.$store.dispatch("CourseCategoryState/getCourseCategories");
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");

.home_wrapper {
  margin: 0;
  padding: 0;
  // border: 5px solid green;
  h1,
  h2 {
    font-family: "Arimo";
    font-style: normal;
    font-weight: 700;
    font-size: 4vw;
  }

  h2 {
    position: relative;
    top: -30px;
  }

  span {
    font-family: "Arimo";
    font-style: normal;
    font-weight: 700;
    font-size: 4vw;
    color: rgb(230, 179, 96);
  }

  .headline {
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    margin-left: 30%;
  }

  .heading {
    margin-top: 0.4em;
  }

  .star {
    margin-top: -30%;
    margin-bottom: 70em;
  }

  #title-top {
    margin-bottom: 0.2em;
  }

  p {
    font-size: 2vw;
    margin-top: 1.5em;
    margin-left: 1em;

    // position: relative;
    // top: -20px;
  }

  .home_course_card {
    height: 150px;
    width: 100%;
  }
}

.main-content {
  // padding: 10em;
  width: 70%;
  // background-color: red;
}

.partners {
  // background-color: yellow;
  // border: 2px solid yellow;
  margin-bottom: 7em;
  margin-top: -15em;
}

.topics {
  margin-top: 3em;
  margin-bottom: 20em;
  // background-color: green;
}
.coaches {
  // border: 2px solid gold;
  margin-top: -15em;
}

.bottom-cards {
  position: relative;
  bottom: 10em;
}

.blue-background {
  width: 100vw;
  height: 6em;
  background-color: #1c3f64;
  position: absolute;
  bottom: 148.5em;
  // margin-bottom: -5%;
  // z-index: -1;
}

.about-us {
  width: 50%;
  margin-bottom: 1em;
  // background-color: red;
  // margin-top: 20em;
}

.common-questions {
  // border: 2px solid magenta;
  margin-bottom: 0.1em;
}
.experiences-container {
  margin-left: auto;
  margin-right: auto;

  // background-color: green;
  margin-bottom: 35em;
  // border: 3px solid red;
  display: flex;
  // flex-shrink: 1;
}

.contact {
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
</style>