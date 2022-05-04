<template>
  <div :class="{
      'w100': !hasActiveCourse
  }">
    <div v-if="hasActiveCourse">
      <h1>
        {{ course.name }}
      </h1>

      <div class="divider mt-md-7"></div>

      <v-flex d-flex class="course_page_actions_wrapper w100 mt-5">
        <v-flex
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
        </v-flex>
      </v-flex>
    </div>

    <v-flex v-else md9 mx-auto class="text-right">
        <v-flex>
            <h1>
                {{ course.name }}
            </h1>
            <p class="grey_text_color sub_border_right pr-3 mt-3" v-html="course.description">
                
            </p>
        </v-flex>
    </v-flex>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showShareTooltip: false,
      trailerFullScreen: false,
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
  },
};
</script>

<style scoped>
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

.divider {
  height: 3px;
  width: 30%;
  position: relative;
  margin: auto;
  z-index: 3;
  background-color: #e6b260;
}

@media only screen and (max-width: 600px) {
  .course_page_image_details {
    align-items: end !important;
  }
}
</style>