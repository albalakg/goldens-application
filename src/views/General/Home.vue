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
  position: absolute;
  width: 100em;
  height: 68rem;
  left: -32em;
  top: 9em;
}

.allTrainings {
  position: absolute;

  left: 74em;
  top: 8.1em;
}

.partners {
  position: absolute;
  right: 130em;
  top: 10em;
}

.topics {
  position: absolute;
  top: 30em;
  right: 130em;
}
.coaches {
  position: absolute;
  top: 86em;
  right: 121em;
}

.bottom-cards {
  position: absolute;
  top: 178em;
}

.about-us {
  position: absolute;
  top: 155em;
  left: 15em;
}
</style>