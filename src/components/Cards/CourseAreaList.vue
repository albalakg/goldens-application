<template>
  <div class="course_areas_list">
    <div v-for="(courseArea, index) in courseAreas" :key="index">
        <course-area-list-item :courseArea="courseArea" :activeCourseId="activeCourseId" @submit="submit" />
    </div>
  </div>
</template>

<script>
import CourseAreaListItem from './CourseAreaListItem.vue'
export default {
  components: { CourseAreaListItem },

    props: {
        courseAreas: {
            type: Array,
            required: true
        },
        
        activeCourseId: {
            type: Number,
        }
    },

    methods: {
        submit(courseArea) {
            this.$emit('submit', courseArea);
        }
    }

}
</script>

<style lang="scss" scoped>

    .course_areas_list {
        max-height: 100%;

        div {
            height: 100%;
            width: 100%;
            height: 80px;
        }
    }

</style>