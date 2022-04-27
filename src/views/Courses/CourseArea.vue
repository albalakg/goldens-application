<template>
  <div>
      <template v-for="(lesson, index) in lessons">
        <div class="lesson_card_wrapper mb-5" :key="index">
          <router-link :to="`/courses/${course.id}/lessons/${lesson.id}`" class="simple_link">
            <detailed-lesson-card
              :lesson="lesson"
            />
          </router-link>
        </div>
      </template>
  </div>
</template>

<script>
import DetailedLessonCard from '../../components/Cards/DetailedLessonCard.vue';
export default {
  components: { DetailedLessonCard },
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
  }

}
</script>

<style scoped>
  .lesson_card_wrapper {
    height: 200px;
    width: 100%;
  }
</style>