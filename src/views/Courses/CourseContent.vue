<template>
<div>

  <active-course-page v-if="hasActiveCourse" />
  <guest-course-page v-else />

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
    }
  },
}
</script>

<style scoped>
</style>