<template>
  <div v-if="course && !loading">
    <section class="course_header_section">
      <v-flex class="course_page_image_wrapper" ref="courseHeader">
        <img loading="lazy" class="course_image" src="../../../public/assets/images/general/home_header.png" alt="תמונת עמוד בית" />
        <div class="course_page_image_darkner" :class="
          hasActiveCourse
            ? 'course_page_image_darkner_left_to_right'
            : 'course_page_image_darkner_right_to_left'
        "></div>
        <div class="course_page_image_details" :class="{ 'pr-5 pr-md-0': !hasActiveCourse }">
          <course-header title :course="course">
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

    
    <section class="benefits_section">
      <star-logo class="benefits_background_effect" gstar />
      <section-header :title="'מה יצא לכם מזה'" :backgroundTitle="'מידע כללי'" />
      <v-flex xl8 lg9 md10 mx-auto>
        <course-benefits />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="course_areas_section">
      <v-flex xl8 lg9 md10 mx-auto class="course_area_content">
        <section-header class="mr-3 mr-md-0" right :title="'תחומי הקורס'" :subtitle="'תוכנית אימון שנתית המשלבת שישה תחומים המרכיבים את כל הדרוש על מנת להצליח להגיע למטרה ולהגשים את החלום'" :backgroundTitle="'תחומים'" />
        <v-flex d-flex flex-wrap justify-space-between class="mt-5">
          <v-flex md5>
            <course-area-list v-if="courseAreas" :courseAreas="courseAreas" guest separated @submit="clickOnCourseArea" />
          </v-flex>
          <v-flex md5 class="course_area_free_text mt-10 mt-md-0 mx-md-0 mx-5">
            <strong>
              קצת עלינו
            </strong>
            <p>
              'גולדנס' הוא מיזם מיוחד שהוקם במטרה לעודד את תרבות הספורט בדור הצעיר.
              הערכים המנחים של התכנית הם ערכים שילוו את התלמידים לטווח הקצר והארוך ויעניקו להם מעטפת שלמה של ידע מקצועי, קהילה תומכת ועוצמה פנימית. 
              הצוות המקצועי שמלווה את הקורס, התוכן המדויק והיסודי, האיכות הגבוהה של הסרטונים והביצוע הטכני- יאפשר לכם ולילד שלכם להגשים חלום!
            </p>
          </v-flex>
        </v-flex>
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="trainers_section pb-4 px-5">
      <trainers :right="!$vuetify.breakpoint.smAndDown" v-if="trainers.length"
        :trainers="trainers" />
    </section>
    
    <div class="separator"></div>

    <section class="how_it_works_section pt-10">
      <v-flex xl8 lg9 md10 mx-auto>
        <section-header :title="'איך זה עובד'" :backgroundTitle="'שלבי המערכת'" />
        <br />
        <br />

        <how-it-works />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="recommendations_section">
      <v-flex xl8 lg9 md10 mx-auto>
        <recommendations :items="course.recommendations" :perPage="recommendationsPerPage" />
      </v-flex>
    </section>

    <div class="separator"></div>
    
    <section class="questions_section">
      <arrows-decorator class="arrows_decoration" />
      <section-header :title="'שאלות ותשובות'" :backgroundTitle="'שאלות נפוצות'" />
      <br />
      <br />
      <v-flex xs11 md9 lg7 xl5 mx-auto class="questions_wrapper">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(question, index) in questions"
            :key="index"
            
          >
            <v-expansion-panel-header class="main_bg_color">
              <strong class="sub_text_color">
                {{ question.title }}
              </strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="main_bg_color white_text_color">
              {{question.content}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <!-- <v-flex v-for="(question, index) in questions" :key="index" class="mb-5">
          <question-card dark :question="question" />
        </v-flex> -->
      </v-flex>
    </section>

    <section class="buy_section ">
      <section-header :title="'רכישה'" :backgroundTitle="'רכישת הקורס'" />
      <br />
      <v-flex xl8 lg9 md10 mx-auto class="px-3 px-md-0">
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
import ArrowsDecorator from '../../components/Decorators/ArrowsDecorator.vue'
import HowItWorks from "../../components/Content/HowItWorks.vue";

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
    ArrowsDecorator,
    HowItWorks,
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

  created() {
    this.getContent();
    this.$store.dispatch("ContentState/getCourse", this.ourOnlyCourseId);
  },

  mounted() {
    this.listenToScroll();

    const trailer = this.$refs.trailer;
    if (!trailer) {
      return;
    }

    trailer.addEventListener("fullscreenchange", () => {
      this.trailerFullScreen = document.fullscreenElement === trailer;
    });

  },

  watch: {
    hasActiveCourse() {
      if(this.hasActiveCourse) {
        this.$router.push('/courses/1')
      }
    }
  },

  computed: {
    recommendationsPerPage() {
      return this.$vuetify.breakpoint.smAndDown ? 1 : 3;
    },

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

    isDark() {
      return this.$store.getters['AppState/isMenuDark']
    },

    questions() {
      return [
        {
          title: 'למה לא להסתפק בסרטוני יוטיוב?',
          content: `כהורים אנחנו מחפשים להשקיע בעתיד הילדים שלנו. ביוטיוב תמצאו סרטונים נחמדים שיראו לכם כיצד לבצע תרגילים ראוותניים בכדור ולא בהכרח תרגילים בסיסיים שאיתם נדרשים להתמודד בזמן אמת- במגרש, במשחק.  ביוטיוב הילד או ההורה יאלץ לחפש לעצמו את הסרטונים, לבנות לעצמו מערכת מותאמת ורצף הגיוני ללימוד הטכניקות, ובכלל- תמצאו שם רק סרטונים של משחק בלי כל המעטפת הנדרשת כדי להפוך לשחקן מוביל: בלי הכוונה לתזונה נכונה, בלי התייחסות לחלק המנטאלי, בלי להקפיד על כושר כאורח חיים. 
בקורס אתם מקבלים את כל התחומים המקיפים את חייו של ספורטאי וכדורגלן מצליח. הילד לומד להתמודד עם המשחק במגרש בצורה טובה יותר ויסודית יותר והכל בהתאמה לסדר יומו וליכולת שלו.`
        },
        {
          title: 'למה אין תמיכה?',
          content: `על חוק 10000 שמעתם? החוק אומר שככל שתרגלו יותר- תהיו טובים יותר ותשתפרו יותר. אנחנו בקורס מעניקים לכם את כל הידע שאתם זקוקים לו כדי להצליח. במידה ויש משהו לא ברור- פשוט תצאו לשטח! תתאמנו שוב ושוב עד שתצליחו. הסרטונים מאוד ברורים וכוללים עצירות לדגשים חשובים אבל מבחן ההצלחה האמיתי הוא במגרש. כמו כן יש לכם את קבוצת הפייסבוק שלנו- בה תמצאו קהילה חמה ואוהדת של חברים-תלמידים נוספים. תוכלו לשתף, ולהתייעץ, לקבל פידבק ותמיכה ואף לקבוע אימונים משותפים יחד. אז יש תמיכה או אין?!`
        },
        {
          title: 'איך אפשר ללמוד מסרטונים?',
          content: `נכון, זה מאתגר לצפות בסרטון ואז לנסות לבצע את התרגיל בעצמך. הרבה יותר קל להשתתף בחוג כדורגל…רק מה? בחוג כדורגל יהיו מגוון של תלמידים, כל אחד ברמה אחרת ובקצב למידה אחר. בחוג כדורגל המאמן יראה לתלמידים את התרגיל- אך הביצוע שלו בלייב יהיה מהיר מאוד ולפעמים אף בלתי קליט. בסרטונים- יש את האופציה האולטימטיבית עבור הילד שלך: הסרטונים כוללים האטות ועצירות באמצע תרגיל כדי לתת דגשים חשובים, הנחיות מדויקות והכוונה ספציפית- מה שלא ניתן לראות במשחק פיזי! כך שבסופו של דבר- צפיה בסרטונים דורשת יותר משמעת עצמית והרבה תרגול- אך הלמידה היא מדוייקת יותר, מותאמת לרמת התלמיד, הוא יכול לצפות שוב ושוב בתרגיל עד שהוא מסוגל לבצע אותו בצורה הטובה ביותר!`
        },
        {
          title: 'האם זה מתאים גם למתחילים?',
          content: `בהחלט! הקורס בנוי מהבסיס ממש ומורכב מ50 שיעורים שלב אחרי שלב עד לרמות הגבוהות ביותר בעולם הכדורגל. כל תלמיד יכול לבחור לעצמו שלב התרגילים לפי הרמה שהוא נמצא בה ולפי הידע והניסיון שכבר יש לו בשטח. הקורס מעניק גם מעטפת של אימון מטאלי כדי לעודד את הילד להצליח במגרש, לא לפחד מכשלונות ולהתמיד בתרגול. הקורס הזה מוביל את הילד שלך מסע מרתק של גדילה עצמית הרבה מעבר למשחק.`
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

    listenToScroll() {
      document.body.addEventListener("scroll", () => {
        let element = document.querySelector(".course_page_image_wrapper");
        if (!element) {
          return;
        }

        let position = element.getBoundingClientRect();
        if (position.top > -600) {
          if (!this.isDark) {
            return this.$store.dispatch("AppState/setMenuMode", true);
          }
        } else {
          if (this.isDark) {
            return this.$store.dispatch("AppState/setMenuMode", false);
          }
        }
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
    height: 80vh;
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
      background: linear-gradient(90deg, #0000, #0007);
    }

    .course_page_image_darkner_right_to_left {
      background: linear-gradient(90deg, #0000, #0007);
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

.trainers_section {
  // background-color: var(--mainSecondDarkColor);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
    
  // background-image: linear-gradient(135deg, rgba(23,58,112, 0.8) 0%, rgba(23,58,112, 0.8) 15%,transparent 15%, transparent 32%,rgba(28,57,100, 0.81) 32%, rgba(28,57,100, 0.81) 100%),linear-gradient(0deg, rgba(28,57,100, 0.81) 0%, rgba(28,57,100, 0.81) 37%,transparent 37%, transparent 55%,rgba(28,57,100, 0.81) 55%, rgba(28,57,100, 0.81) 63%,rgba(32,70,127, 0.8) 63%, rgba(32,70,127, 0.8) 100%),linear-gradient(90deg, rgb(230, 182, 95),rgb(230, 182, 95));
  // background-image: linear-gradient(135deg, rgba(23, 58, 112, 0.85) 0%, rgba(23, 58, 112, 0.85) 15%, transparent 15%, transparent 32%, rgba(28, 57, 100, 0.88) 32%, rgba(28, 57, 100, 0.88) 100%), linear-gradient(0deg, rgba(28, 57, 100, 0.88) 0%, rgba(28, 57, 100, 0.88) 37%, transparent 37%, transparent 55%, rgba(28, 57, 100, 0.88) 55%, rgba(28, 57, 100, 0.88) 63%, rgb(255, 254, 252) 63%, rgb(255, 254, 252) 100%), linear-gradient(90deg, rgb(230, 182, 95), rgb(230, 182, 95));
  // background-image: linear-gradient(395deg, rgba(23,58,112, 0.8) 0%, rgba(23,58,112, 0.8) 15%,transparent 15%, transparent 32%,rgba(28,57,100, 0.81) 32%, rgba(28,57,100, 0.81) 100%),linear-gradient(260deg, rgba(28,57,100, 0.81) 0%, rgba(28,57,100, 0.81) 37%,transparent 37%, transparent 55%,rgba(28,57,100, 0.81) 55%, rgba(28,57,100, 0.81) 63%,rgba(209,162,77, 0.77) 63%, rgba(209,162,77, 0.77) 100%),linear-gradient(350deg, rgba(209,162,77, 0.77),rgba(209,162,77, 0.77));
}

.benefits_background_effect {
  position: absolute;
  height: 70vw;
  width: 70vw;
  left: -10%;
  margin: auto;
  top: -10vh;
}

.course_area_content {
  position: relative;
  z-index: 2;
}

.course_area_free_text {
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0.5em 0.6em 0.2em var(--mainColor);
  border-radius: 0 20% 0 20%;
  font-size: 1.4em;
}

.questions_section {
  position: relative;
  height: 80vh;
}

.questions_wrapper {
  position: relative;
  z-index: 2;
}

.arrows_decoration {
  position: absolute;
  top: -20vh;
  left: -50vh;
  height: 90vh;
  z-index: 0;
}

::v-deep .questions_wrapper {
  .v-icon {
    color: #fff !important;
  }
}

@media only screen and (max-width: 600px) {
  .course_page_image_wrapper {
    height: 60vh !important;
  }

  .course_page_image_darkner {
    background: linear-gradient(#0008, #0000) !important;
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
  
  .questions_section {
    height: 100vh;
  }

  .arrows_decoration {
    top: -25vh;
    left: none;
    right: 0%;
    height: 100vh;
  }

  .trainers_section {
    padding-top: 25%;
  }
  
}
</style>
