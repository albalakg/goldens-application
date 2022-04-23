<template>
  <div>
    {{courseArea}}
    
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true
    }
  },

  computed: {
    courseArea() {
      const courseAreaId = this.$route.params.courseAreaId;
      if(!courseAreaId) {
        return null;
      }

      return this.course.active_areas_with_active_lessons.find(courseArea => courseArea.id === courseAreaId);
    },

    
  }

}
</script>

<style scoped>

</style>