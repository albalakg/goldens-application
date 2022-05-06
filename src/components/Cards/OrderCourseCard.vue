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
    <v-flex xs12 md8 d-flex flex-column class="px-5">
      <div>
        <strong>
          {{ course.name }}
        </strong>
        <br />
        <small v-html="course.description"> </small>
      </div>

      <v-flex d-flex align-end class="detailed_course_card_actions">
        <v-flex md4 class="detailed_course_card_pricing">
          <strong>
            <small> סה"כ מחיר </small>
          </strong>
          <br />
          <h2>
            {{ price }}
          </h2>
        </v-flex>
        <div class="seperator"></div>
        <v-flex md4 class="detailed_course_card_expiration mr-10 mr-md-0">
          <strong>
            <small> תקף עד </small>
          </strong>
          <br />
          <h2>
            {{ expiredAt }}
          </h2>
        </v-flex>
        <v-flex md4>
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
import MainButton from "../Buttons/MainButton.vue";
import Arrow from "../General/Arrow.vue";
import VideoCard from "./VideoCard.vue";

export default {
  components: { VideoCard, MainButton, Arrow },

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
      const yearFromNow = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      );
      let year = String(yearFromNow.getFullYear()).substring(2, 4);
      let month = String(yearFromNow.getMonth());
      let day = String(yearFromNow.getDay());

      if (day.length === 1) {
        day = `0${day}`;
      }

      if (month.length === 1) {
        month = `0${month}`;
      }

      return `${day}.${month}.${year}`;
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

    .seperator {
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
</style>