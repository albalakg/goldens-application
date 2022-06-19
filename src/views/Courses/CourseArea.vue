<template>
  <div class="course_area_wrapper">
    <template v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="(lesson, index) in lessons">
        <div class="lesson_card_wrapper mb-5" :key="index">
          <router-link :to="`/courses/${course.id}/lessons/${lesson.id}`" class="simple_link">
            <detailed-lesson-card
              :lesson="lesson"
            />
          </router-link>
        </div>
      </template>
    </template>

    <template v-else>
      <v-flex d-flex justify-center md10 xl9 mx-auto>
        <v-flex md4 offset-md-1 class="desktop_lessons_list pl-5">
          <template v-for="(lesson, index) in lessons">
            <div class="lesson_card_wrapper mb-5" :key="index">
              <router-link :to="`/courses/${course.id}/lessons/${lesson.id}`" class="simple_link">
                <detailed-lesson-card
                  :lesson="lesson"
                />
              </router-link>
            </div>
          </template>
        </v-flex>
        <v-flex md5>
          <template v-for="(courseArea, index) in courseAreas">
            <course-area-card 
              class="mb-3"
              :class="{
                'outlined': isActiveCourseArea(courseArea.id) 
              }"
              :key="index"
              :courseArea="courseArea"
              @submit="enterCourseArea"
            />
          </template>
        </v-flex>
      </v-flex>
    </template>
  </div>
</template>

<script>
import DetailedLessonCard from '../../components/Cards/DetailedLessonCard.vue';
import CourseAreaCard from '../../components/Cards/CourseAreaCard.vue';
export default {
  components: { DetailedLessonCard, CourseAreaCard },
  props: {
    course: {
      type: Object,
      required: true
    }
  },

  computed: {
    courseArea() {
      const courseAreaId = this.$route.query.courseArea;
      if(!courseAreaId) {
        return null;
      }

      return ContentService.findCourseAreaById(courseAreaId);
    },

    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    lessons() {
      try {
        if(this.courseArea) {
          return ContentService.getLessonsByCourseAreaId(this.courseArea.id)
        }

        return ContentService.getLessonsByCourseId(this.course.id)
      } catch(err) {
        error(err);
        return [];
      }
    }
  },

  methods: {
    isActiveCourseArea(courseAreaId) {
      return courseAreaId == this.$route.query.courseArea;
    },

    enterCourseArea(courseArea) {
      if(this.$route.query.courseArea != courseArea.id) {
        this.$router.push(`/courses/${courseArea.course_id}/lessons?courseArea=${courseArea.id}`)
      }
    }
  }

}
</script>

<style scoped>
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

</style>