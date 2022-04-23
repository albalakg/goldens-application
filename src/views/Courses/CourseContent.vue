<template>
  <v-flex >
    <template v-for="(courseArea, index) in courseAreas">
      <course-area-card 
        class="mb-3"
        :key="index"
        :courseArea="courseArea"
      />
    </template>
  </v-flex>
</template>

<script>
import CourseAreaCard from '../../components/Cards/CourseAreaCard.vue';
export default {
  components: { CourseAreaCard },

  props: {
    course: {
      type: Object,
      required: true
    }
  },

  computed: {
    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    }
  }

}
</script>

<style scoped>

</style>