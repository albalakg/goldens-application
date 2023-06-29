<template>
  <div class="course_areas_list">
    <course-area-list-item 
        v-for="(courseArea, index) in courseAreas" :key="index"
        :guest="guest" 
        :separated="separated" 
        :courseArea="courseArea" 
        :activeCourseId="activeCourseId"
        :class="{
            'mb-2': separated && !index,
            'my-2': separated && index,
            'mb-0': separated && index === courseAreas.length -1
        }" 
        @submit="submit" 
    />
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
        },

        guest: {
            type: Boolean,
        },
        
        separated: {
            type: Boolean,
        },
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
            width: 100%;
            height: 117px;
        }
    }

</style>