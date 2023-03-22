<template>
<div class="course_content_wrapper">

  <active-course-page :course="course" v-if="hasActiveCourse" />

</div>
</template>

<script>
import ActiveCoursePage from '../../components/Content/ActiveCoursePage.vue'
export default {
  components: { ActiveCoursePage },

  computed: {
    hasActiveCourse() {
      return this.$store.getters['UserState/hasActiveCourse']
    },

    course() {
      return ContentService.findCourseById(this.$route.params.course_id)
    }
  },
}
</script>

<style scoped>

</style>