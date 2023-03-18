<template>
  <div class="course_area_wrapper">
    <!-- small screen -->
    <template v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="(lesson, index) in lessons">
        <v-flex xs11 mx-auto class="lesson_card_wrapper mb-5" :key="index">
          <router-link
            :to="`/courses/${course.id}/lessons/${lesson.id}`"
            class="simple_link"
          >
            <detailed-lesson-card :lesson="lesson" />
          </router-link>
        </v-flex>
      </template>
    </template>

    <!-- big screen -->
    <template v-else>
      <v-flex d-flex justify-center md10 xl9 mx-auto>
        <v-flex md6 offset-md-1 class="desktop_lessons_list pl-5">
          <template v-for="(lesson, index) in lessons">
            <div class="lesson_card_wrapper mb-5" :key="index">
              <router-link
                :to="`/courses/${course.id}/lessons/${lesson.id}`"
                class="simple_link"
              >
                <detailed-lesson-card :lesson="lesson" />
              </router-link>
            </div>
          </template>
        </v-flex>
        <v-flex md3 class="relative">
          <div v-if="showTrainerIcon" class="trainer_icon_wrapper">
            <div class="trainer_image_wrapper" @click="toggleTrainerDialog()">
              <img loading="lazy" :src="trainer.imageSrc" />
            </div>
            <br />
            <span class="sub_text_color">
              {{ trainer.name }}
            </span>
          </div>
          <course-area-list :courseAreas="courseAreas" @submit="enterCourseArea" :activeCourseId="courseArea.id" />
        </v-flex>
      </v-flex>
    </template>

    <trainer-dialog :show="showTrainerDialog" :trainer="trainer" @closed="toggleTrainerDialog()" />
  </div>
</template>

<script>
import DetailedLessonCard from "../../components/Cards/DetailedLessonCard.vue";
import TrainerDialog from '../../components/Dialogs/TrainerDialog.vue';
import CourseAreaList from '../../components/Cards/CourseAreaList.vue';
export default {
  components: { DetailedLessonCard, TrainerDialog, CourseAreaList },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showTrainerDialog: false,
    };
  },

  computed: {
    courseArea() {
      const courseAreaId = this.$route.query.courseArea;
      if (!courseAreaId) {
        return null;
      }

      return ContentService.findCourseAreaById(courseAreaId);
    },

    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    lessons() {
      try {
        if (this.courseArea) {
          return ContentService.getLessonsByCourseAreaId(this.courseArea.id);
        }

        return ContentService.getLessonsByCourseId(this.course.id);
      } catch (err) {
        error(err);
        return [];
      }
    },

    showTrainerIcon() {
      return Boolean(this.$route.query.courseArea);
    },

    trainer() {
      const courseAreaId = this.$route.query.courseArea;
      const trainer = ContentService.findTrainerByCourseAreaId(courseAreaId);
      return trainer;
    },
  },

  methods: {
    isActiveCourseArea(courseAreaId) {
      return courseAreaId == this.$route.query.courseArea;
    },

    enterCourseArea(courseArea) {
      if (this.$route.query.courseArea != courseArea.id) {
        this.$router.push(
          `/courses/${courseArea.course_id}/lessons?courseArea=${courseArea.id}`
        );
      }
    },

    toggleTrainerDialog() {
      this.showTrainerDialog = !this.showTrainerDialog;
    },
  },
};
</script>

<style scoped lang="scss">
.lesson_card_wrapper {
  height: 200px;
  width: 100%;
}

video {
  border-radius: 8px;
  width: 100%;
}

.desktop_lessons_list {
  max-height: 100vh;
  overflow-y: auto;
}

@media only screen and (min-width: 600px) {
  .course_area_wrapper {
    position: relative;
    top: -100px;
    z-index: 3;
  }
}

.trainer_icon_wrapper {
  height: 50px;
  width: fit-content;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: -90px;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
    transition: 0.2s transform ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-3px);
    }
  }

  span {
    position: relative;
    top: -25px;
    font-weight: bold;
  }
}

</style>
