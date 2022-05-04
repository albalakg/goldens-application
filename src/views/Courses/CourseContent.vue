<template>
<div>

  <active-course-page :course="course" v-if="hasActiveCourse" />
  <guest-course-page :course="course" v-else />

</div>
</template>

<script>
import ActiveCoursePage from '../../components/Content/ActiveCoursePage.vue'
import GuestCoursePage from '../../components/Content/GuestCoursePage.vue'
export default {
  components: { ActiveCoursePage, GuestCoursePage },

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