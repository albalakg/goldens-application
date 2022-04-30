<template>
  <div class="about_wrapper pb-10 second_dark_bg_color app_padding_top">
    <img class="about_background_image" :src="aboutBackgroundImage" alt="about background">
    <div class="about_background_darkner">
    </div>
    <v-flex md10 xl9 mx-auto class="about_background_content">
      <section class="about_header">
        <v-flex md4>
          <h1>
            <span class="white_text_color">
              מי
            </span>
            <span class="sub_text_color">
              אנחנו
            </span>
          </h1>
          <p class="white_text_color mt-2 pr-3 sub_border_right">
            {{ description }}
          </p>
        </v-flex>
      </section>

      <div class="spacer"></div>

      <section>
        <v-flex md10 mx-auto>
          <video src="https://www.youtube.com/watch?v=0CUjzYtloe8" controls></video>
        </v-flex>
      </section>

      <div class="spacer"></div>
      
      <section>
        <v-flex md8 mx-auto>
          <p class="white_text_color">
            {{content}}
          </p>
        </v-flex>
      </section>

      <div class="spacer"></div>


    </v-flex>
    
    <trainers full dark />
  </div>
</template>

<script>
import Trainers from '../../components/Content/Trainers.vue';
export default {
  components: {Trainers},

  data() {
    return {
      aboutBackgroundImage: require("../../../public/assets/images/general/about_background.png"),
      description:
        "סתם טקסט מטופש בלי שום משמעות. אין שום קשר למציאות אז בהצלחה בהמשך הקריאה של הדבר היפה הזה.",
      content: `,ופמיכל סא לקרמל ודנילב לפנטצת .קבולב ריטחס תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
.תנמ ןסומ טעמפל .הצגור ךנילב םומאיל רומוד זיווק .שידדג םעיתלו - גשרב םעיתפל - טויעמו טוצ ,לוד
טגעבשו
?קרוב םגרומ יכתל - המשה םשתס ונכל דעתסו ךנברת .שמגמ ימרוגב ,ףחנומ קרוצ תחלו טיארב .קגלוס םביל
.סעבשי גיתל

סא לקרמל ודנילב לפנטצת .קבולב ריטחס יצאלק .םיצוחימ טשרלכ ץמורב ,ףיא ןביא חוקרמל טעפוצ עהלוק
טעמפל .הצגור ךנילב םומאיל רומוד זיווק .שידדג םעיתלו - גשרב םעיתפל - טויעמו טוצ ,לוד ,ופמיכל

הטפולוו סילוקאיא סד .האבינ ןונ יסינ םוקנמלא תס .תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
תימאהל .תנמ ןסומ .קילעב םודיט יסילוס םולוביטסו וגואא לאוו סוטקל תגא סארק ,רולוד טא םולוביטסו .םאיד
ולשח ורבלתו עשולש - טיוחמש שרעש בבשויה בינעוה .ךרונמ יאושנ ןיכטמל םכנמ ,אמ זד טיעכס קשהרק
שדה ,קות םיכהש יגרמנ וחאצינ הנאכ ,שבי תמאלד חאפא ץיקבה קנמ התוז .ףששרע שבונ תיאחו ךשלתועש
.קו רייכה םדיתה ארנש`,
      sideNotes: [
        {
          title: "אמינות  ",
          description: `זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.`,
        },
        {
          title: "מקצועיות  ",
          description: `זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.`,
        },
        {
          title: "גישה חדשנית  ",
          description: `זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.`,
        },
      ],
    };
  },

  computed: {
    trainers() {
      return [
        {
          name: "דניאל כהן",
          title: "מאמן כדורגל",
          image: require("../../../public/assets/images/trainers/ront-levi-personal-trainer.png"),
        },
        {
          name: "דנה ברגר",
          title: "מאמנת כושר",
          image: require("../../../public/assets/images/trainers/dana-personal-trainer.png"),
        },
        {
          name: "דניאל כהן",
          title: "מאמן כדורגל",
          image: require("../../../public/assets/images/trainers/ront-levi-personal-trainer.png"),
        },
        {
          name: "דנה ברגר",
          title: "מאמנת כושר",
          image: require("../../../public/assets/images/trainers/dana-personal-trainer.png"),
        },
        {
          name: "דניאל כהן",
          title: "מאמן כדורגל",
          image: require("../../../public/assets/images/trainers/ront-levi-personal-trainer.png"),
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.about_wrapper {
  position: relative;

  .about_background_image, .about_background_darkner {
    position: absolute;
    top: 0;
    max-height: 100vh;
    width: 100%;
  }

  .about_background_image {
    object-fit: cover;
  }

  .about_background_darkner {
    height: 100vh;
    background: linear-gradient(#0000, #102a46);
    z-index: 2;
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
    height: 50px;
    width: 100%;
  }
}
</style>