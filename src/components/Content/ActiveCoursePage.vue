<template>
  <v-flex>
    <!-- small screen -->
    <template v-if="$vuetify.breakpoint.smAndDown">
      <template v-if="hasActiveCourse">
        <br>
        <br>
        <user-course-progress :course="course" class="mx-4" />
      </template>

      <br>
      
      <template v-for="(courseArea, index) in courseAreas">
        <course-area-card 
          class="mb-3"
          :key="index"
          :rounded="false"
          :courseArea="courseArea"
          @submit="enterCourseArea"
        />
      </template>
    </template>
    
    <!-- big screen -->
    <template v-else>
      <v-flex d-flex justify-center md10 xl9 mx-auto>
        <v-flex md4 offset-md-1>
          
          <template v-for="(courseArea, index) in courseAreas">
            <course-area-card 
              class="mb-3"
              :key="index"
              :courseArea="courseArea"
              @submit="enterCourseArea"
            />
          </template>
        </v-flex>
        <v-flex md4>
          <video :src="course.trailerSrc" ref="trailer" controls></video>
          <br>
          <br>
          <br>
          <br>
          <user-course-progress v-if="hasActiveCourse" :course="course" />
        </v-flex>
      </v-flex>
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

    hasActiveCourse() {
      return this.$store.getters['UserState/hasActiveCourse'];
    },
    
  },

  methods: {
    enterCourseArea(courseArea) {
      this.$router.push(`/courses/${courseArea.course_id}/lessons?courseArea=${courseArea.id}`)
    }
  }

}
</script>

<style scoped>
  video {
    border-radius: 8px;
    width: 100%;
  }
</style>