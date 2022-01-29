<template>
  <div>
    course page:2
    <div>
      {{ course }}
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    course() {
      const courses = this.$store.getters['UserState/courses'];
      return courses.find(course => course.course_id == this.$route.params.course_id)
    }
  }

}
</script>

<style scoped>

</style>