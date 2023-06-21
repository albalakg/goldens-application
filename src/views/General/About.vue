<template>
  <div class="about_wrapper second_dark_bg_color app_padding_top">
    <img class="about_background_image" :src="aboutBackgroundImage" alt="about background" />
    <div class="about_background_darkner"></div>
    <v-flex md10 xl9 mx-auto class="about_background_content">
      <section class="about_header">
        <circle-decorator class="circle_decorator" />
        <v-flex xs12 md8 class="px-3 px-md-0 mt-10">
          <h1>
            <span class="white_text_color"> מי </span>
            <span class="sub_text_color"> אנחנו </span>
          </h1>
          <p class="white_text_color mt-2 pr-3 sub_border_right">
            {{ description }}
          </p>
        </v-flex>
      </section>

      <!-- <div class="spacer"></div>

      <section>
        <v-flex md10 mx-auto class="px-3 px-md-0">
          <video src="https://www.youtube.com/watch?v=0CUjzYtloe8" controls></video>
        </v-flex>
      </section> -->

      <div class="spacer"></div>

      <section class="about_description_section px-5 px-md-0">
        <star-logo :gstar="false" class="star_logo" />
        <v-flex md8 mx-auto>
          <p class="white_text_color">
            <strong>התוכנית הזו מנגישה את האפשרות להפוך לכדורגלן אלוף - לכל ילד.</strong>
            <br>
            {{ content }}
          </p>
        </v-flex>
      </section>

      <div class="spacer"></div>
    </v-flex>

    <v-flex md8 mx-auto class="trainers_section mt-md-8">
      <trainers v-if="trainers.length" full dark :trainers="trainers" />
    </v-flex>

    <section class="about_believe_section mt-10 px-lg-5 px-md-0">
      <div class="spacer"></div>
      <img loading="lazy" :src="aboutBelieveBackgroundImage" alt="about believe background" />
      <div class="about_background_darkner"></div>

      <div class="about_believe_content px-3">
        <section-header :title="'האני מאמין'" :backgroundTitle="'מאמין'" :subtitle="believeSubtitle" dark />

        <v-flex d-flex>
          <v-flex md5 xl6> </v-flex>
          <v-flex md5 xl4>
            <div class="side_note white_border_right pr-3" v-for="(note, index) in sideNotes" :key="index">
              <h2 class="sub_text_color">
                {{ note.title }}
              </h2>
              <p class="white_text_color">
                {{ note.description }}
              </p>
            </div>
          </v-flex>
        </v-flex>
      </div>
    </section>
  </div>
</template>

<script>
import Trainers from "../../components/Content/Trainers.vue";
import CircleDecorator from "../../components/Decorators/CircleDecorator.vue";
import StarLogo from "../../components/General/StarLogo.vue";
import SectionHeader from "../../components/Texts/SectionHeader.vue";

export default {
  components: {
    Trainers,
    StarLogo,
    CircleDecorator,
    SectionHeader,
  },

  data() {
    return {
      aboutBackgroundImage: require("../../../public/assets/images/general/about_background.png"),
      aboutBelieveBackgroundImage: require("../../../public/assets/images/general/about_believe_backgroun.png"),
      description: "גולדנס הוא מיזם מיוחד שהוקם במטרה לעודד את תרבות הספורט בדור הצעיר. הערכים המנחים של התכנית הם ערכים שילוו אתכם לטווח הקצר והארוך ויספקו מעטפת שלמה של ידע מקצועי, קהילה תומכת ועוצמה פנימית. הצוות המקצועי של האקדמיה נבחר בקפידה להעניק לכם את התוכן המדויק והיסודי המבוסס על ידע מתוך שנים של ניסיון ומחקר, הבסיס החשוב ביותר לפעולות במגרש ומחוצה לו, אנחנו מאמינים בגישה מקצועית וממוקדת שתסייע להתפתח בצורה מרשימה, הקפדנו על האיכות הגבוהה של הסרטונים, ההדרכה והביצוע הטכני, שיאפשרו לפתח את הכישורים ולהשיג את היעדים הספורטיביים בעולם הכדורגל!",
      content: `בכל מקום, ללא תלות במגורים קרובים לקבוצות מפורסמות.
בזמן שלך, הממשק נגיש, פשוט ונח ללמוד מהסלון בבית או לתרגל הלכה למעשה במגרש.
בלי הצורך לשפוך סכומים מטורפים על מאמנים אישיים ולהיות תלותיים בזמנים שלהם.
ובלי להתפשר על הרמה הכי גבוה שיש!!
תוכנית אימון מקיפה, המעטפת המושלמת הבנויה שלב אחרי שלב כולל טכניקה יסודית, הכוונה לתזונה נכונה, כושר ואתלטיות, אימון מנטלי, שינה והדרכת הורים.
`,
      believeSubtitle: `״נעשה ככל שביכולתנו על מנת להעניק לדור הצעיר את כל הכלים הנדרשים להיות שחקנים ברמה הגבוה ביותר, לממש את הפוטנציאל הקיים בהם כספורטאי וכאדם, ולהחדיר אורח חיים ותרבות ספורט בקהילה מלווה ותומכת״`,
        sideNotes: [
          {
            title: "מקצועיות",
            description: `הצוות המקצועי הבלתי מתפשר של גולדנס מתמקד באיכות התוכן שנבחר בקפידה עד ירידה לפרטים הכי קטנים. המומחים מביאים שנים של ניסיון, מחקר ומחשבה בכדי לוודא שהתוכן המסופק הוא המקצועי ביותר, מעודכן ומותאם לרמת המתאמנים.`
          },
          {
            title: "חדשנות",
            description: `החברה עוקבת אחרי המגמות החדשות בתחום הלמידה והטכנולוגיה ומשתמשת בכלים דיגיטליים מתקדמים כדי לספק חוויה מרתקת ומעודכנת למתאמנים. היא משתמשת בסרטוני הדגמה, תרגילים פרקטיים ומערכת תמיכה מקוונת כדי לאפשר למתאמנים להשגת תוצאות מרהיבות.`,
          },
          {
            title: "מעורבות הורים",
            description: `אנו מבינים את החשיבות של תמיכת הורים בהתפתחות הילד. האקדמיה שלנו מערבת את ההורים באופן פעיל ומספק להם עדכוני התקדמות קבועים, משאבים חינוכיים וטיפים לתמיכה במסע הלמידה של ילדם. אנו מאמינים שביחד נוכל לעזור לילדים להצטיין בכדורגל.`
          },
      ],
    };
  },

  created() {
    this.$store.dispatch('ContentState/getTrainers')
  },

  mounted() {
    this.listenToScroll();
  },

  computed: {
    trainers() {
      const trainers = this.$store.getters['ContentState/trainers'];
      return trainers ? trainers : [];
    },

    isDark() {
      return this.$store.getters['AppState/isMenuDark']
    }
  },

  methods: {
    listenToScroll() {
      document.body.addEventListener("scroll", () => {
        let element = document.querySelector(".about_background_image");
        if (!element) {
          return;
        }

        let position = element.getBoundingClientRect();
        if (position.top > -200) {
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
.about_wrapper {
  position: relative;

  .about_header {
    position: relative;

    .circle_decorator {
      position: absolute;
      transform: scale(5);
      right: -60%;
    }
  }

  .about_background_image,
  .about_background_darkner {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .about_background_image {
    object-fit: cover;
    max-height: 100vh;
    height: 100%;
  }

  .about_background_darkner {
    height: 100vh;
    background: linear-gradient(#0000, #102a46);
    z-index: 2;
  }

  .about_description_section {
    position: relative;

    p {
      z-index: 2;
      position: relative;
    }

    .star_logo {
      position: absolute;
      left: -60%;
      transform: scale(2);
    }
  }

  .trainers_section {
    min-height: 100vh;
    position: relative;
    z-index: 2;
  }

  .about_believe_section {
    position: relative;

    img {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;

      @media only screen and (max-width: 600px) {
        object-position: right;
      }
    }


    .about_believe_content {
      position: relative;
      z-index: 2;
    }

    .side_note {
      margin: 60px 0;
      z-index: 2;
      position: relative;
    }

    .about_background_darkner {
      height: 100%;
      background: linear-gradient(#102a46 1%, #0000, #102a46);
    }
  }

  .about_background_content {
    position: relative;
    z-index: 2;
  }

  video {
    width: 100%;
    border-radius: 25px;
  }

  h1 {
    font-size: 3em;
  }

  .spacer {
    height: 80px;
    width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .about_description_section {
    .star_logo {
      opacity: 0.1;
      width: 30%;
      bottom: -30%;
      left: 0% !important;
    }
  }
}

@media only screen and (min-width: 601px) {

  .trainers_section {
    display: flex;
    align-items: flex-end;
  }

}
</style>