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
      <Star class="star" />
      <KidBlue class="kid-blue" />
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
        </div>
      </div>
      <div>
        <div class="partners"><Partnership /></div>
      </div>
      <div>
        <div class="topics"><Topics /></div>
        <div class="blue-background"></div>
      </div>
      <div class="coaches"><Coaches /></div>
      <div class="bottom-cards"><BottomCards /></div>

      <!--  <section>
          <div class="partners"><Partnership /> <br /></div>
        </section>

        <section>
          <div class="topics"><Topics /></div>
        </section>

        <section>
          <div class="coaches"><Coaches /></div>
        </section>

        <section>
          <div class="bottom-cards"><BottomCards /></div>
        </section>
      </div> -->

      <!-- <section>
        <div class="about-us"><AboutUs /></div>
      </section>
      <section>
        <div class="middle-background"></div>
      </section> -->
    </v-flex>
  </v-container>
</template>

<script>
import CourseCard from "../../components/Cards/CourseCard.vue";
import Star from "../../components/HomePage/G-star.vue";
import KidBlue from "../../components/HomePage/KidBlue.vue";
import Partnership from "../../components/HomePage/Partnership.vue";
import Topics from "../../components/HomePage/Topics.vue";
import Coaches from "../../components/HomePage/Coaches.vue";
import BottomCards from "../../components/HomePage/BottomCards.vue";
import TopCards from "../../components/HomePage/TopCards.vue";
import AboutUs from "../../components/HomePage/AbouUs.vue";

export default {
  components: {
    CourseCard,
    Star,
    KidBlue,
    Partnership,
    Topics,
    Coaches,
    TopCards,
    BottomCards,
    AboutUs,
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
  h1,
  h2 {
    font-family: "Arimo";
    font-style: normal;
    font-weight: 700;
    font-size: 92.0051px;
  }

  h2 {
    position: relative;
    top: -30px;
  }

  span {
    font-family: "Arimo";
    font-style: normal;
    font-weight: 700;
    font-size: 92.0051px;
    color: rgb(230, 178, 96);
  }

  .headline {
    display: flex;
    flex-direction: column;
    margin-left: 60%;
  }

  .heading {
    margin-top: 0.4em;
  }

  #title-top {
    margin-bottom: 0.2em;
  }

  p {
    font-size: 1.2em;
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
  // background-color: red;
  margin-bottom: 3em;
}

.kid-blue {
  position: absolute;
  width: 100em;
  height: 68rem;
  left: -25em;
  top: 8.8em;
}

.partners {
  // background-color: yellow;
  // border: 2px solid yellow;
  margin-bottom: 7em;
  margin-top: 35em;
}

.topics {
  margin-top: 3em;
  // background-color: green;
}
.coaches {
  margin-top: -20em;
  // position: absolute;
  // top: 86em;
  // right: 118.5em;
}

.bottom-cards {
  position: relative;
  bottom: 8em;
}

.about-us {
  position: absolute;
  top: 160em;
  left: 15em;
}

.middle-background {
  position: absolute;
  background-color: #1c3f64;
  width: 119.5em;
  height: 50em;
  top: 270em;
  right: -0em;
  z-index: -10;
  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px;
}

.blue-background {
  position: relative;
  top: 25em;
  width: 105.6em;
  height: 20em;
  background: #1c3f64;
  /* 1 */

  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px;
}
</style>