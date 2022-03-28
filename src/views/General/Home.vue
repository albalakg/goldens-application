<template>
  <v-container fluid class="home_wrapper">
    <v-flex xs11 mx-auto class="text-center">
      <!-- <Logo /> -->

      <div id="allTrainings">
        <h1>
          כל האימונים
          <br />
        </h1>
        <h2>במקום <span class="main_text_color">אחד</span></h2>

        <p>
          משהו משהו סתם טקסט שאני מכניס פה כדי למלא תוכן. איך אין פה שום דבר
          רלוונטי. אם הגעת עד לכאן אז שאפו.
        </p>
      </div>
      <br />

      <br />

      <div>
        <Star id="g-star" />
        <KidBlue id="kid-blue" />
      </div>

      <div class="home_course_card">
        <course-card dark :course="courseCategories"> </course-card>
      </div>
      <section>
        <div id="partners"><Partnership /> <br /></div>
      </section>
      <section>
        <div id="topics"><Topics /></div>
      </section>
      <section>
        <div id="coaches"><Coaches /></div>
      </section>
    </v-flex>
  </v-container>
</template>

<script>
import CourseCard from "../../components/Cards/CourseCard.vue";
import Logo from "../../components/General/Logo.vue";
import Star from "../../components/HomePage/G-star.vue";
import KidBlue from "../../components/HomePage/KidBlue.vue";
import Partnership from "../../components/HomePage/Partnership.vue";
import Topics from "../../components/HomePage/Topics.vue";
import Coaches from "../../components/HomePage/Coaches.vue";

export default {
  components: {
    CourseCard,
    Star,
    KidBlue,
    Partnership,
    Topics,
    Coaches,
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

#g-star {
  position: absolute;
  width: 105em;
  height: 62rem;
  left: -14em;
  top: 0.3em;
}

#kid-blue {
  position: absolute;
  width: 100em;
  height: 68rem;
  left: -16em;
  top: 8.8em;
}

#allTrainings {
  position: absolute;

  left: 74em;
  top: 8.1em;
}

#partners {
  position: absolute;
  left: 7em;
}

#topics {
  position: relative;
  top: 28em;
}
#coaches {
  position: relative;
  top: 97em;
}
</style>