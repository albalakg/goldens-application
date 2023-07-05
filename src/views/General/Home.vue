<template>
  <div v-if="course && !loading">
    <section class="course_header_section">
      <v-flex class="course_page_image_wrapper" ref="courseHeader">
        <img loading="lazy" class="course_image" src="../../../public/assets/images/general/home_header.webp" alt="תמונת עמוד בית" />
        <div class="course_page_image_darkner" :class="
          hasActiveCourse
            ? 'course_page_image_darkner_left_to_right'
            : 'course_page_image_darkner_right_to_left'
        "></div>
        <div class="course_page_image_details">
          <course-header title :course="course" v-if="$vuetify.breakpoint.mdAndUp">
            <template slot="headerContent">
              <buy-button @submit="scrollToBuySection()" class="mr-3 mr-md-0" />
            </template>
          </course-header>
          <home-header v-else @scrollToBuySection="scrollToBuySection()" />
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
      <star-logo class="benefits_background_effect" v-show="$vuetify.breakpoint.mdAndUp" gstar />
      <section-header :title="'מיומנויות מפתח'" :backgroundTitle="'מיומנויות'" />
      <v-flex xl8 lg9 md10 mx-auto>
        <course-benefits />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="course_areas_section">
      <v-flex xl8 lg9 md10 mx-auto class="course_area_content">
        <v-flex d-flex flex-wrap justify-space-between>
          <v-flex md5 order-2 order-md-1 class="mt-10 mt-md-0">
            <section-header class="mr-3 mr-md-0" right :title="'תחומי האקדמיה'" :subtitle="'תוכנית אימון שנתית המשלבת את חמשת המרכיבים הנדרשים על מנת להצליח'" :backgroundTitle="'תחומים'" />
            <course-area-list v-if="courseAreas" :courseAreas="courseAreas" guest separated @submit="clickOnCourseArea" />
          </v-flex>
          <v-flex md5 order-1 order-md-2 class="course_area_free_text mb-10 mt-md-0 mx-md-0 mx-5">
            <strong>
              קצת עלינו
            </strong>
            <p>
              גולדנס הוא מיזם מיוחד שהוקם במטרה לעודד את תרבות הספורט בדור הצעיר. הערכים המנחים של התכנית הם ערכים שילוו אתכם לטווח הקצר והארוך ויספקו מעטפת שלמה של ידע מקצועי, קהילה תומכת ועוצמה פנימית. הצוות המקצועי של האקדמיה נבחר בקפידה להעניק לכם את התוכן המדויק והיסודי המבוסס על ידע מתוך שנים של ניסיון ומחקר, הבסיס החשוב ביותר לפעולות במגרש ומחוצה לו, אנחנו מאמינים בגישה מקצועית וממוקדת שתסייע להתפתח בצורה מרשימה, הקפדנו על האיכות הגבוהה של הסרטונים, ההדרכה והביצוע הטכני, שיאפשרו לפתח את הכישורים ולהשיג את היעדים הספורטיביים בעולם הכדורגל!
            </p>
          </v-flex>
        </v-flex>
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="trainers_section pb-4 px-5">
      <img class="trainers_background" src="./../../../public/assets/images/trainers/Trainers-background-sm.webp" alt="trainers background">
      <v-flex xl8 lg9 md10 mx-auto>
        <trainers dark :right="!$vuetify.breakpoint.smAndDown" v-if="trainers.length"
          :trainers="trainers" />
      </v-flex>
    </section>
    
    <div class="separator"></div>

    <section class="how_it_works_section pt-10">
      <v-flex xl8 lg9 md10 mx-auto>
        <section-header :title="'השלבים להצלחה'" :backgroundTitle="'השלבים'" />
        <br />
        <br />

        <how-it-works />
      </v-flex>
    </section>

    <div class="separator"></div>

    <section class="recommendations_section">
      <v-flex xl8 lg9 md10 mx-auto>
        <recommendations dark :items="course.recommendations" :perPage="recommendationsPerPage" />
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

    <section class="buy_section">
      <section-header :title="'רכישה'" :backgroundTitle="$vuetify.breakpoint.mdAndUp ? 'הצטרפות לאקדמיה' : 'הצטרף'" />
      <br />
      <v-flex xl8 lg9 md10 mx-auto class="px-3 px-md-0">
        <detailed-course-card-horizontal :course="course" />
      </v-flex>
    </section>

    <br />
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
import HomeHeader from "../../components/Content/HomeHeader.vue";

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
    HomeHeader,
},

  data() {
    return {
      activeTab: 0,
      loading: true,
      trailerFullScreen: false,
      refreshKey: 1,
    };
  },

  created() {
    this.getContent();
    this.$store.dispatch("ContentState/getCourse");
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
    hasActiveCourse: {
      immediate: true,
      handler() {
        if(this.hasActiveCourse) {
          const courses = this.$store.getters['UserState/courses'];
          this.$router.push('/courses/' + courses[0].id)
        }
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
        return courses[0];
      }

      courses = this.$store.getters["ContentState/courses"];
      if (courses && courses.length) {
        return courses[0];
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
      return this.course?.active_areas_with_active_lessons;
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
          content: `כהורים אנחנו מחפשים להשקיע בעתיד הילדים שלנו. ביוטיוב תמצאו סרטונים שיראו לכם כיצד לבצע תרגילים ראוותניים בכדור ולא בהכרח תרגילים בסיסיים ״יסודות״ שאיתם נדרשים להתמודד בזמן אמת במגרש, במשחק, אשר מרכיבים כ90% מהפעולות של השחקן. ביוטיוב הילד או ההורה יאלץ לחפש לעצמו את הסרטונים, לבנות לעצמו מערכת מותאמת ורצף הגיוני ללימוד הטכניקות, ובכלל, תמצאו שם רק סרטונים של משחק בלי כל המעטפת הנדרשת כדי להפוך לשחקן מוביל: בלי הכוונה לתזונה נכונה, בלי התייחסות לחלק המנטאלי, בלי להקפיד על כושר ואתלטיות כאורח חיים.באקדמיה אתם מקבלים את כל התחומים המקיפים את חייו של ספורטאי וכדורגלן מצליח, אשר נבחרו בקפידה ע״י אנשי המקצוע המובילים שהרכיבו עבורכם תוכנית אימון שנתית, הילד לומד להתמודד עם המשחק במגרש בצורה טובה יותר ויסודית יותר והכל בהתאמה לסדר יומו וליכולת שלו.`
        },
        {
          title: 'האם יש משוב?',
          content: `על חוק 10,000 השעות שמעתם? החוק אומר שככל שתתרגלו יותר, תהיו טובים יותר ותשתפרו יותר. הממשק שהקמנו עבורכם פשוט ונח, נגיש לכל האמצעים, מתאים למחשב לטאבלט וכמובן גם לנייד, אתם צופים בתרגילים ויכולים לקחת את המאמן האישי לקבל הדרכה גם במגרש, הסרטונים מאוד ברורים וכוללים עצירות לדגשים החשובים. אנחנו באקדמיה מעניקים לכם את כל הידע שאתם זקוקים לו כדי להצליח. במידה ומשהו לא ברור, פשוט תצאו למגרש! תתאמנו שוב ושוב עד שתצליחו. כמו כן יש לכם את קבוצת הפייסבוק שלנו, בה תמצאו קהילה חמה ואוהדת של חברים, שחקנים נוספים. תוכלו לשתף ולהתייעץ, לקבל פידבק ותמיכה ואף לקבוע אימונים משותפים יחד.`
        },
        {
          title: 'איך אפשר ללמוד מסרטונים?',
          content: `נכון, זה מאתגר לצפות בסרטון ואז לנסות לבצע את התרגיל בעצמך. הרבה יותר קל להשתתף בחוג כדורגל.. רק מה? בחוג כדורגל יהיו מגוון של שחקנים, כל אחד ברמה אחרת ובקצב למידה אחר, היחס והאימון אינו אישי, מעבר לכך מספר הנגיעות בכדור והתרגול הוא נמוך מאוד ביחס לאימון. בחוג כדורגל המאמן יראה לתלמידים את התרגיל, אך הביצוע שלו בלייב יהיה מהיר מאוד ולפעמים אף בלתי קליט. בסרטונים, יש את האופציה האולטימטיבית עבור הילד שלך: הסרטונים כוללים האטות ועצירות באמצע תרגיל כדי לתת דגשים חשובים, הנחיות מדויקות והכוונה ספציפית, מה שלא ניתן לראות במשחק פיזי! כך שבסופו של דבר, צפיה בסרטונים דורשת יותר משמעת עצמית והרבה תרגול, אך הלמידה היא מדוייקת יותר, מותאמת לרמת התלמיד, הוא יכול לצפות שוב ושוב בתרגיל עד שהוא מסוגל לבצע אותו בצורה הטובה ביותר!`
        },
        {
          title: 'האם האקדמיה מתאימה גם למתחילים?',
          content: `בהחלט! האקדמיה בנויה מהבסיס ממש ומורכבת מ52? שיעורים שלב אחרי שלב עד לרמות הגבוהות ביותר בעולם הכדורגל, שלא בהכרח קשות לתרגול, אך מצריכות הכוונה והדרכה נכונה. כל תלמיד יכול לבחור לעצמו את קצב ההתקדמות לפי הרמה שהוא נמצא בה ולפי הידע והניסיון שכבר יש לו בשטח. האקדמיה מעניקה גם מעטפת של אימון מנטאלי כדי לעודד את הילד להצליח במגרש, לא לפחד מכשלונות ולהתמיד בתרגול. האקדמיה הזאת מובילה את הילד שלך מסע מרתק של גדילה עצמית הרבה מעבר למשחק.`
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

.buy_section {
  margin-top: 15vh;
  margin-bottom: 5vh;
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;

  .trainers_background {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

.recommendations_section {
  min-height: 100vh;
  padding-top: 10vh;
  background-image: radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(90deg, rgb(16,42,70),rgb(228,202,149));

  // background-image: radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),linear-gradient(90deg, rgb(16,42,70),rgb(213,178,110));
  
  // background-image: radial-gradient(circle at 29% 55%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 4%,transparent 4%, transparent 44%,transparent 44%, transparent 100%),radial-gradient(circle at 85% 89%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 52%,transparent 52%, transparent 100%),radial-gradient(circle at 6% 90%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 53%,transparent 53%, transparent 64%,transparent 64%, transparent 100%),radial-gradient(circle at 35% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 6%,transparent 6%, transparent 98%,transparent 98%, transparent 100%),radial-gradient(circle at 56% 75%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 16%,transparent 16%, transparent 23%,transparent 23%, transparent 100%),radial-gradient(circle at 42% 0%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 3%,transparent 3%, transparent 26%,transparent 26%, transparent 100%),radial-gradient(circle at 29% 28%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 51%,transparent 51%, transparent 75%,transparent 75%, transparent 100%),radial-gradient(circle at 77% 21%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 35%,transparent 35%, transparent 55%,transparent 55%, transparent 100%),radial-gradient(circle at 65% 91%, hsla(329,0%,99%,0.05) 0%, hsla(329,0%,99%,0.05) 46%,transparent 46%, transparent 76%,transparent 76%, transparent 100%),linear-gradient(45deg, rgb(16,42,70),rgb(12,32,54));
  // background: #102a46;
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
  min-height: 80vh;
}

.questions_wrapper {
  position: relative;
  z-index: 2;
}

.arrows_decoration {
  position: absolute;
  top: -10vh;
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
    height: 88vh !important;
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
    min-height: 70vh;
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

  // .benefits_background_effect {
  //   left: 0;
  //   top: -9vh;
  //   right: 0;
  // }

  .course_area_free_text {
    border-radius: 0 50px 0 50px;
  }
}
</style>
