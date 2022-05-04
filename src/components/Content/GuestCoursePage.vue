<template>
  <v-flex>
    <template v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="(courseArea, index) in courseAreas">
        <course-area-card
          class="mb-3"
          :key="index"
          :courseArea="courseArea"
          @submit="enterCourseArea"
        />
      </template>
    </template>

    <template v-else>
      <v-flex d-flex justify-center md10 xl9 mx-auto>
        <v-flex md4 offset-md-1>
            <p class="white_text_color mb-1">
                <strong>
                    תחומי הקורס
                </strong>
            </p>
          <template v-for="(courseArea, index) in courseAreas">
            <course-area-card
              guest
              class="mb-3"
              :key="index"
              :courseArea="courseArea"
            />
          </template>
        </v-flex>
        <v-flex md2>
            
        </v-flex>
        <v-flex md3 d-flex justify-end>
            <detailed-course-card 
                :course="course"
            />
        </v-flex>
      </v-flex>
    </template>
  </v-flex>
</template>

<script>
import CourseAreaCard from "../../components/Cards/CourseAreaCard.vue";
import DetailedCourseCard from '../Cards/DetailedCourseCard.vue';
export default {
  components: { CourseAreaCard, DetailedCourseCard },

  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  computed: {
    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    hasActiveCourse() {
      return this.$store.getters["UserState/hasActiveCourse"];
    },
  },

};
</script>

<style scoped>
video {
  border-radius: 8px;
  width: 100%;
}
</style>