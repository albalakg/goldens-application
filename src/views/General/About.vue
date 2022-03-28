<template>
  <div class="about_wrapper dark_bg_color">
    <v-flex>
      
      <v-flex xs11 mx-auto>
        <h2 class="white_text_color">
          מי <span class="main_text_color">אנחנו</span>
        </h2>

        <v-flex xs9>
          <side-border-text dark :text="description" />
        </v-flex>

        <br>
        <br>
        
        <v-flex class="about_video_wrapper">
          
        </v-flex>

        <br>
        <br>

        <div class="about_info_section_wrapper">
          <p class="white_text_color">
            לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג
            אלית הועניב היושבב שערש שמחויט - שלושע
            ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה
            מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
            שהכים תוק, הדש שנרא התידם הכייר וק.

            קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון
            ניבאה. דס איאקוליס וולופטה דיאם. וסטיבולום אט
            דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום
            סוליסי טידום בעליק. קונדימנטום קורוס בליקרה,
            נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי.

            לורם איפסום דולור סיט אמט, לורם איפסום דולור
            אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום
            סיט
            ניסי נון ניבאה. דס איאקוליס וולופטה דיאם.
          </p>
        </div>

        <br>
        <br>
      </v-flex>

      <section-header dark title="המאמנים שלנו" backgroundTitle="מאמנים" />

      <br>

      <v-flex class="trainers_wrapper">
        <div class="trainer_card" v-for="(trainer, index) in trainers" :key="index">
          <trainer-card :trainer="trainer" />
        </div>
      </v-flex>

      <br>
      <br>
      <br>

      <section-header dark title="אני מאמין שלנו" backgroundTitle="אני מאמין" />
      <p class="white_text_color text-center mt-4 mx-11">
        לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג
        אלית הועניב היושבב שערש שמחויט שלושע
        ותלברו חשלו שעותלשך וחאית נובש ערששף.
      </p>

      <v-flex xs11 mx-auto>
        <template v-for="(note, index) in sideNotes">
          <side-border-text :key="index" dark :title="note.title" :text="note.description" />
          <div :key="index + 'spacer'" v-if="index !== sideNotes.length - 1">
            <br>
            <br>
            <br>
          </div>
        </template>
      </v-flex>

    </v-flex>
  </div>
</template>

<script>
import TrainerCard from '../../components/Cards/TrainerCard.vue';
import SectionHeader from '../../components/Texts/SectionHeader.vue';
import SideBorderText from '../../components/Texts/SideBorderText.vue';
export default {
  components: {
    SideBorderText,
    SectionHeader,
    TrainerCard,
  },

  data() {
    return {
      description: 'סתם טקסט מטופש בלי שום משמעות. אין שום קשר למציאות אז בהצלחה בהמשך הקריאה של הדבר היפה הזה.',
      trainers: [
        {
          name: 'רונית לוי',
          title: 'מאמנת כושר',
          image: baseURL + 'assets/images/trainers/ront-levi-personal-trainer.png',
        },
        {
          name: 'דניאל כהן',
          title: 'מאמן כדורל',
          image: baseURL + 'assets/images/trainers/daniel-cohen-football-trainer.jpg',
        },
      ],
      sideNotes: [
        {
          title: 'אמינות  ',
          description: `זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.`
        },
        {
          title: 'מקצועיות  ',
          description: `זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.`
        },
        {
          title: 'גישה חדשנית  ',
          description: `זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.זותה
              מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי
              שהכים תוק, הדש שנרא התידם הכייר וק.`
        },
      ],
    };
  }

}
</script>

<style scoped lang="scss">

  .about_wrapper {
    padding-top: 20%;
    padding-bottom: 70px;

    h2 {
      font-size: 3em;
    }

    .about_video_wrapper {
      background-color: #fff;
      height: 220px;
      width: 100%;
      border-radius: 12px;
    }

    .about_info_section_wrapper {
      background-color: #1c5789;
      border-radius: 12px;
      padding: 25px 20px;
    }

    .trainer_card {
      height: 50vh;
      max-height: 500px;
    }
  }

</style>