<template>
  <div class="course_page_wrapper">
    <img :src="course.imageSrc" alt="">
    course page:2
    <div>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    course() {
      const courses = this.$store.getters['UserState/courses'];
      console.log('course', courses.find(course => course.id == this.$route.params.course_id));
      return courses.find(course => course.id == this.$route.params.course_id)
    }
  }

}
</script>

<style scoped>

  .course_page_wrapper {

  }

</style>