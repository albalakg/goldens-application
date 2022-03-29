<template>
  <v-container fluid class="home_wrapper">
    <v-flex xs11 mx-auto class="text-center">
      <!-- <Logo /> -->

      <div class="allTrainings">
        <h1>
          כל האימונים
          <br />
        </h1>
        <h2>במקום <span class="main_text_color">אחד</span></h2>

        <p>
          משהו משהו סתם טקסט שאני מכניס פה כדי למלא תוכן. איך אין פה שום דבר
          רלוונטי. אם הגעת עד לכאן אז שאפו.
        </p>
        <div><TopCards /></div>
      </div>
      <br />

      <br />

      <div>
        <Star class="g-star" />
        <KidBlue class="kid-blue" />
      </div>

      <div class="home_course_card">
        <course-card dark :course="courseCategories"> </course-card>
      </div>
      <section>
        <div class="partners"><Partnership /> <br /></div>
      </section>
      <section>
        <div class="topics"><Topics /></div>
      </section>
      <section>
        <div class="coaches"><Coaches /></div>
        <div class="blue-background"></div>
      </section>
      <section>
        <div class="bottom-cards"><BottomCards /></div>
      </section>
      <section>
        <div class="about-us"><AboutUs /></div>
      </section>
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
    font-size: 4em;
  }

  h2 {
    position: relative;
    top: -30px;
  }

  p {
    font-size: 1.2em;
    position: relative;
    top: -20px;
  }

  .home_course_card {
    height: 150px;
    width: 100%;
  }
}

.kid-blue {
  position: relative;
  width: 100em;
  height: 68rem;
  left: -42em;
  top: 5em;
}

.allTrainings {
  position: absolute;

  left: 74em;
  top: 8.1em;
}

.partners {
  position: relative;
  right: 14em;
  bottom: 70em;
}

.topics {
  position: relative;
  bottom: 45em;
  right: 14em;
}
.coaches {
  margin: auto;
  position: relative;
  top: 15em;
  right: 15em;
}

.blue-background {
  position: relative;
  background-color: #1c3f64;
  width: 113em;
  height: 15em;
  top: 95em;
  right: 1.6em;
  z-index: -10;
  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 10px;
}

.bottom-cards {
  position: relative;
  top: 92em;
}

.about-us {
  position: relative;
  top: 60em;
  left: 10em;
}
</style>