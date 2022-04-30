<template>
  <div class="about_wrapper pb-10 second_dark_bg_color app_padding_top">
    <img class="about_background_image" :src="aboutBackgroundImage" alt="about background">
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

      <section>
        <video src="https://www.youtube.com/watch?v=0CUjzYtloe8"></video>
      </section>
    </v-flex>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      aboutBackgroundImage: require("../../../public/assets/images/general/about_background.png"),
      description:
        "סתם טקסט מטופש בלי שום משמעות. אין שום קשר למציאות אז בהצלחה בהמשך הקריאה של הדבר היפה הזה.",
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

  .about_background_image {
    position: absolute;
    top: 0;
    max-height: 100vh;
    width: 100%;
    object-fit: cover;
  }

  .about_background_content {
    position: relative;
    z-index: 2;
  }

  h1 {
    font-size: 3em;
  }
}
</style>