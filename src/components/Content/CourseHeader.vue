<template>
  <div :class="{
    'w100': !hasActiveCourse
  }">
    <div v-if="hasActiveCourse" class="mt-5">
      <h1>
        {{ course.name }}
      </h1>

      <div class="divider mt-md-7"></div>

      <div v-if="showTrainerIcon && $vuetify.breakpoint.smAndDown" class="trainer_icon" @click="toggleTrainerDialog()">
        <img loading="lazy" :src="trainer.imageSrc">
      </div>

      <trainer-dialog :show="showTrainerDialog" :trainer="trainer" @closed="toggleTrainerDialog()" />

      <v-flex d-flex class="course_page_actions_wrapper w100 mt-5">

        <!-- <v-flex
          class="text-center pt-4 pointer mx-3"
          v-for="(action, index) in actions"
          :key="index"
          @click="courseAction(action.action)"
        >
          <img loading="lazy" :src="action.image" alt="play button" />
          <p class="white_text_color mt-2">{{ action.text }}</p>
          <div v-if="action.tooltip">
            <v-tooltip v-model="showShareTooltip" bottom color="black">
              <template v-slot:activator="{ on, attrs }">
                <span icon v-bind="attrs" v-on="on"> </span>
              </template>
              <span class="white_text_color">קישור לעמוד הקורס הועתק</span>
            </v-tooltip>
          </div>
        </v-flex> -->
      </v-flex>
    </div>

    <v-flex v-else md9 mx-auto class="text-right">
      <v-flex>
        <h1 order-2 v-if="title" :class="{
          'text-center': $vuetify.breakpoint.smAndDown,
          'mobile-title': $vuetify.breakpoint.smAndDown
        }">
          תלמד מהטובים ביותר,
          <div class="title_separator"></div>
          <span>
            תהיה הטוב ביותר
          </span>
        </h1>
        <h3 v-if="title" class="grey_text_color">
          הצטרף לאקדמיה מקצועית לכדורגל והתאמן בכל זמן ובכל מקום
          <br>
          ראה שיפורים מידיים עם גישה לאיכות הגבוהה ביותר של אימון וקהילה תומכת
        </h3>
        <h1 v-else>
          {{ course.name }}
        </h1>
        <!-- <p class="grey_text_color sub_border_right pr-5 mt-3" v-html="course.description">
            </p> -->
        <slot order-1 name="headerContent">

        </slot>
        <div class="phone_card phone_card_on_side mx-auto">
          <img src="../../../public/assets/images/phone/header_phone_2.webp" alt="שלב שני">
        </div>
        <div class="phone_card phone_card_front mx-auto">
          <img src="../../../public/assets/images/phone/step1.webp" alt="שלב ראשון">
        </div>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import TrainerDialog from '../Dialogs/TrainerDialog.vue';
export default {
  components: { TrainerDialog },
  props: {
    course: {
      type: Object,
      required: true,
    },

    title: {
      type: Boolean,
      required: false
    }
  },

  data() {
    return {
      showShareTooltip: false,
      trailerFullScreen: false,
      showTrainerDialog: false,
      actions: [
        {
          image: require("../../../public/assets/images/general/share.svg"),
          text: "שיתוף",
          action: "copyLink",
          tooltip: true,
        },
        {
          image: require("../../../public/assets/images/general/play.svg"),
          text: "טריילר",
          action: "openTrailer",
        },

      ],
    };
  },

  computed: {
    hasActiveCourse() {
      return this.$store.getters['UserState/hasActiveCourse']
    },

    showTrainerIcon() {
      return Boolean(this.$route.query.courseArea)
    },

    trainer() {
      const courseAreaId = this.$route.query.courseArea;
      const trainer = ContentService.findTrainerByCourseAreaId(courseAreaId);
      return trainer;
    }
  },

  methods: {
    courseAction(action) {
      try {
        this[action]();
      } catch (err) {
        error(err);
      }
    },

    copyLink() {
      navigator.clipboard.writeText(window.location);
      this.showToolTip();
    },

    showToolTip() {
      this.showShareTooltip = true;
      clearTimeout(this.copyLinkTier);

      this.copyLinkTier = setTimeout(() => {
        this.showShareTooltip = false;
      }, 3000);
    },

    openTrailer() {
      this.$emit('openTrailer')
    },

    toggleTrainerDialog() {
      this.showTrainerDialog = !this.showTrainerDialog;
    },
  },
};
</script>

<style scoped lang="scss">
h1 {
  position: relative;
  color: #fff;
  font-size: 3em;
  z-index: 3;

  &.mobile-title {
    font-size: 1.7em;
  }

  span {
    position: relative;
    bottom: 20px;
  }
}

h3 {
  position: relative;
  top: -20px;
}

.course_page_actions_wrapper {
  position: relative;
  z-index: 3;
}

.title_separator {
  height: 10px;
}

.divider {
  height: 3px;
  width: 30%;
  position: relative;
  margin: auto;
  z-index: 3;
  background-color: #d5b26e;
}

.trainer_icon {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  padding: 2px;
  left: 3%;
  bottom: 20%;

  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
}

.phone_card {
  box-shadow: 0 0 5px 4px var(--subColor);
  border: 2px solid var(--mainColor);
  border-radius: 20px;
  position: absolute;


  img {
    height: calc(100% + 3px);
    width: calc(100% + 2px);
    border-radius: 20px;
    position: absolute;
    top: -1px;
    right: -1px;
  }

  p {
    bottom: -35%;
    position: absolute;
  }
}

.phone_card_on_side {
  height: 28vh;
  width: 14vh;
  left: 4%;
  top: 47%;
  rotate: -15deg;
}

.phone_card_front {
  left: calc(4% + 110px);
  top: 43%;
  height: 34vh;
  width: 17vh;
}

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 2em;
    top: -10px;
  }
}
</style>