<template>
  <div v-if="course && !loading" class="app_padding_top">
    <section class="course_header_section">
      <v-flex class="course_page_image_wrapper" ref="courseHeader">
        <img
          loading="lazy"
          class="course_image"
          :src="course.imageSrc"
          alt=""
        />
        <div
          class="course_page_image_darkner"
          :class="
            hasActiveCourse
              ? 'course_page_image_darkner_left_to_right'
              : 'course_page_image_darkner_right_to_left'
          "
        ></div>
        <div
          class="course_page_image_details"
          :class="{ 'pr-5 pr-md-0': !hasActiveCourse }"
        >
          <course-header :course="course">
            <template slot="headerContent">
              <buy-button @submit="scrollToBuySection()" />
            </template>
          </course-header>
        </div>
      </v-flex>
    </section>

    <section class="cooperation_section">
      <cooperation-card />
    </section>

    <br />
    <br />
    <br />

    <section class="course_areas_section">
      <div class="course_area_background_effect"></div>
      <v-flex xl8 lg9 md10 mx-auto class="course_area_content">
        <section-header
          class="mr-3 mr-md-0"
          right
          :title="'תחומי הקורס'"
          :backgroundTitle="'תחומים'"
        />
        <v-flex d-flex flex-wrap justify-space-between class="mt-5">
          <v-flex md5>
            <course-area-list
              v-if="courseAreas"
              :courseAreas="courseAreas"
              guest
              separated
              @submit="clickOnCourseArea"
            />
          </v-flex>
          <v-flex md5 class="course_area_free_text mt-10 mt-md-0 mx-md-0 mx-5">
            <p>
              לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית לורם איפסום
              דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון
              ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט דולור, קראס אגת
              לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק. ושבעגט ליבם סולגק.
              בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה -
              לתכי מורגם בורק? לתיג ישבעס.
            </p>
          </v-flex>
        </v-flex>
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="trainers_section">
      <trainers v-if="trainers.length" :trainers="trainers" />
    </section>

    <div class="separator"></div>

    <section class="benefits_section">
      <star-logo class="benefits_background_effect" gstar />
      <section-header
        :title="'מה יצא לכם מזה'"
        :backgroundTitle="'מידע כללי'"
      />
      <v-flex xl8 lg9 md10 mx-auto>
        <course-benefits :items="items" />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="how_it_works_section pt-10">
      <v-flex xl8 lg9 md10 mx-auto>
        <section-header dark :title="'איך זה עובד'" :backgroundTitle="'שלבי המערכת'" />
        <br />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="recommendations_section">
      <v-flex xl8 lg9 md10 mx-auto>
        <recommendations :items="course.recommendations" :perPage="3" />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="buy_section">
      <section-header :title="'רכישה'" :backgroundTitle="'רכישת הקורס'" />
      <br />
      <v-flex xl8 lg9 md10 mx-auto>
        <detailed-course-card-horizontal :course="course" />
      </v-flex>
    </section>

    <br />
    <br />
  </div>
</template>

<script>
import BuyButton from "../../components/Buttons/BuyButton.vue";
import CooperationCard from "../../components/Cards/CooperationCard.vue";
import CourseAreaList from "../../components/Cards/CourseAreaList.vue";
import DetailedCourseCardHorizontal from "../../components/Cards/DetailedCourseCardHorizontal.vue";
import CourseBenefits from "../../components/Content/CourseBenefits.vue";
import CourseHeader from "../../components/Content/CourseHeader.vue";
import Recommendations from '../../components/Content/Recommendations.vue';
import Trainers from "../../components/Content/Trainers.vue";
import StarLogo from '../../components/General/StarLogo.vue';
import SectionHeader from "../../components/Texts/SectionHeader.vue";

export default {
  components: {
    CourseHeader,
    BuyButton,
    CooperationCard,
    SectionHeader,
    DetailedCourseCardHorizontal,
    CourseAreaList,
    Trainers,
    CourseBenefits,
    StarLogo,
    Recommendations,
  },

  data() {
    return {
      tabs: [
        {
          title: "תחומים",
          url: "",
        },
        {
          title: "שיעורים",
          url: "lessons",
        },
        {
          title: "לוח שנה",
          url: "schedule",
        },
      ],
      ourOnlyCourseId: 1,
      activeTab: 0,
      loading: true,
      trailerFullScreen: false,
      refreshKey: 1,
    };
  },

  beforeCreate() {
    if(Auth.isLogged()) {
      this.$router.push('/courses/1');
    }
  },

  created() {
    this.getContent();
    this.$store.dispatch("ContentState/getCourse", this.ourOnlyCourseId);
  },

  mounted() {
    const trailer = this.$refs.trailer;
    if (!trailer) {
      return;
    }

    trailer.addEventListener("fullscreenchange", () => {
      this.trailerFullScreen = document.fullscreenElement === trailer;
    });

    this.listenToScroll();
    this.initLastActiveCard();
  },

  computed: {
    course() {
      this.refreshKey;
      let courses = this.$store.getters["UserState/courses"];
      if (courses && courses.length) {
        return courses.find((course) => course.id == this.ourOnlyCourseId);
      }

      courses = this.$store.getters["ContentState/courses"];
      if (courses && courses.length) {
        return courses.find((course) => course.id == this.ourOnlyCourseId);
      }

      return null;
    },

    showTrailer() {
      return this.trailerFullScreen;
    },

    hasActiveCourse() {
      return this.$store.getters["UserState/hasActiveCourse"];
    },

    courseAreas() {
      return this.course?.guest_active_areas_with_active_lessons;
    },

    trainers() {
      const trainers = this.$store.getters["ContentState/trainers"];
      return trainers ? trainers : [];
    },

    items() {
      return [
        {
          icon: require("../../../public/assets/images/general/application.svg"),
          title: "נושא חדש",
          content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`,
        },
        {
          icon: require("../../../public/assets/images/general/whistle.svg"),
          title: "אימון מקצועי",
          content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`,
        },
        {
          icon: require("../../../public/assets/images/general/walker.svg"),
          title: "שיפור מהיר",
          content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`,
        },
      ];
    },
  },

  methods: {
    async getContent() {
      await Promise.allSettled([
        this.$store.dispatch("ContentState/getTrainers"),
      ]);
      this.loading = false;
    },

    scrollToBuySection() {
      document
        .querySelector(".buy_section")
        .scrollIntoView({ block: "center", behavior: "smooth" });
    },

    clickOnCourseArea(courseArea) {
      const courseAreaIndex = this.courseAreas.findIndex(
        (item) => item.id === courseArea.id
      );
      this.$refs.coursePlan.setActiveCourseArea(courseAreaIndex);
      this.$refs.coursePlan.$el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.course_header_section {
  position: relative;
  z-index: 2;

  .last_progress_card {
    position: absolute;
    border-radius: 8px 0 0 8px;
    right: 0;
    z-index: 15;
    width: 300px;
    transition: 0.7s right ease-out;
  }

  .hide_last_progress_card {
    right: -500px;
  }

  .course_page_image_wrapper {
    position: relative;
    height: 70vh;
    width: 100vw;
    text-align: center;

    img.course_image {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
      right: 0;
    }

    h1 {
      position: relative;
      color: #fff;
      font-size: 3em;
      z-index: 3;
    }

    .course_page_image_details {
      position: relative;
      z-index: 3;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .course_page_actions_wrapper {
      position: relative;
      z-index: 3;
    }

    .course_page_image_darkner {
      right: 0;
      position: absolute;
      height: 100%;
      width: 100%;
    }

    .course_page_image_darkner_left_to_right {
      background: linear-gradient(90deg, #0006, #102a46);
    }

    .course_page_image_darkner_right_to_left {
      background: linear-gradient(90deg, #0006, #102a46);
    }

    .divider {
      height: 3px;
      width: 30%;
      position: relative;
      margin: auto;
      z-index: 3;
      background-color: #d5b26e;
    }
  }
}

.cooperation_section {
  position: relative;
  z-index: 2;
  height: 80px;
  width: 100vw;
}

.separator {
  height: 50vh;
  max-height: 300px;
  width: 100%;
}

.course_areas_section {
  position: relative;
}

.benefits_section {
  position: relative;
}

.benefits_background_effect {
 position: absolute;
 height: 70vw;
 width: 70vw;
 left: 0;
 right: 0;
 margin: auto;
 top: -40vh;
}

.course_area_background_effect {
  height: 100vw;
  width: 100vw;
  background-color: var(--mainColor);
  position: absolute;
  left: -50vw;
  top: -60vw;
  rotate: 45deg;
}

.course_area_content {
  position: relative;
  z-index: 2;
}

.course_area_free_text {
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0.5em 0.6em 0.2em #000c;
  border-radius: 20% 0 20% 0;
  word-break: break-all;
  font-size: 1.4em;
}

.how_it_works_section {
  height: 100vh;
  background-color: #222;
}

@media only screen and (max-width: 600px) {
  .course_page_image_wrapper {
    height: 35vh !important;
  }

  .course_page_image_darkner {
    background: linear-gradient(#102a46, #0006) !important;
  }

  .last_progress_card {
    top: 100px;
  }

  .course_area_background_effect {
    left: -50vw;
    top: -70vw;
  }

  .separator {
    height: 15vh;
  }
}
</style>
