<template>
  <div>
      <template v-for="(lesson, index) in lessons">
        <div class="lesson_card_wrapper" :key="index">
          <lesson-card
            :lesson="lesson"
            
          />
        </div>
      </template>
  </div>
</template>

<script>
import LessonCard from '../../components/Cards/LessonCard.vue';
export default {
  components: { LessonCard },
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
        console.warn(err);
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