<template>
  <v-flex>

    <br>
    <br>

    <user-course-progress v-if="isLogged" :course="course" />
    
    <br>

    <template v-for="(courseArea, index) in courseAreas">
      <course-area-card 
        class="mb-3"
        :key="index"
        :courseArea="courseArea"
        @submit="enterCourseArea"
      />
    </template>
  </v-flex>
</template>

<script>
import CourseAreaCard from '../../components/Cards/CourseAreaCard.vue';
import UserCourseProgress from '../../components/Cards/UserCourseProgress.vue';
export default {
  components: { CourseAreaCard, UserCourseProgress },

  props: {
    course: {
      type: Object,
      required: true
    }
  },

  computed: {
    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    isLogged() {
      return this.$store.getters['AuthState/isLogged'];
    },
  },

  methods: {
    enterCourseArea(courseArea) {
      console.log('enterCourseArea', courseArea);
      this.$router.push(`/courses/${courseArea.course_id}/lessons?courseArea=${courseArea.id}`)
    }
  }

}
</script>

<style scoped>

</style>