<template>
  <v-flex
    d-flex
    class="detailed_course_card_horizontal dark_shadow pa-3"
    :class="{
      'flex-wrap': $vuetify.breakpoint.smAndDown,
    }"
  >
    <v-flex xs12 md4>
      <img class="course_image" :src="course.imageSrc" alt="course image" />
    </v-flex>
    <v-flex xs12 md8 d-flex flex-column class="px-md-5 pt-3 pt-md-0">
      <div>
        <strong>
          {{ course.name }}
        </strong>
        <br />
        <small v-html="course.description"> </small>
      </div>

      <v-flex d-flex flex-wrap align-end class="detailed_course_card_actions mt-5 mt-md-0">
        <v-flex xs6 md4 class="detailed_course_card_pricing">
          <strong>
            <small> סה"כ מחיר </small>
          </strong>
          <br />
          <h2>
            {{ price }}
          </h2>
        </v-flex>
        <div class="separator"></div>
        <v-flex xs6 md4 class="detailed_course_card_expiration pr-10 pr-md-0">
          <strong>
            <small> תקף עד </small>
          </strong>
          <br />
          <h2>
            {{ expiredAt }}
          </h2>
        </v-flex>
        <v-flex xs12 md4 class="mt-5 mt-md-0">
          <v-flex d-flex justify-space-between align-center>
            <v-flex d-flex>
              <img
                class="ml-2 mt-1"
                loading="lazy"
                :src="courseAreaImage"
                alt="course area image"
              />
              <strong> תחומי קורס </strong>
            </v-flex>
            <strong>
              {{ totalCourseAreas }}
            </strong>
          </v-flex>
          <div class="divider"></div>
          <v-flex d-flex justify-space-between align-center>
            <v-flex d-flex>
              <img
                class="ml-2 mt-1"
                loading="lazy"
                :src="lessonImage"
                alt="course area image"
              />
              <strong> שיעורים </strong>
            </v-flex>
            <strong>
              {{ totalLessons }}
            </strong>
          </v-flex>
          <div class="divider"></div>
          <v-flex d-flex justify-space-between align-center>
            <v-flex d-flex>
              <img
                class="ml-2 mt-1"
                loading="lazy"
                :src="timeImage"
                alt="course area image"
              />
              <strong> זמן </strong>
            </v-flex>
            <strong>
              {{ totalDuration }}
            </strong>
          </v-flex>
          <div class="main_divider main_bg_color mt-2"></div>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-flex>
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
      lessonImage: require("../../../public/assets/images/general/lesson.svg"),
      timeImage: require("../../../public/assets/images/general/time.svg"),
      courseAreaImage: require("../../../public/assets/images/general/course_area.svg"),
    };
  },

  computed: {
    totalCourseAreas() {
      return ContentService.countTotalCourseAreasByCourseId(this.course.id);
    },

    totalDuration() {
      const seconds = ContentService.countTotalCourseDuration(this.course.id);
      return ContentService.getTimeTextBySeconds(seconds);
    },

    totalLessons() {
      return ContentService.countTotalLessonsByCourseId(this.course.id);
    },

    price() {
      return "₪" + Math.floor(this.course.price);
    },

    expiredAt() {
      return ContentService.getExpiredDate()
    },
  },
};
</script>

<style scoped lang="scss">
.detailed_course_card_horizontal {
  min-width: 100%;
  border-radius: 12px;
  position: relative;

  img.course_image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .detailed_course_card_actions {
    position: relative;

    .separator {
      position: absolute;
      width: 2px;
      height: 35%;
      left: 75%;
      bottom: 0;
      background-color: #ccc8;
    }

    strong {
      color: #555;
    }

    h2 {
      font-size: 1.5em;
    }
  }
}

.divider {
  background-color: #ccc;
  height: 1px;
  margin: 15px 0;
}


@media only screen and (max-width: 600px) {
.detailed_course_card_horizontal
.detailed_course_card_actions
.separator {
    bottom: 65%;
    left: 50%;
  }
}
</style>