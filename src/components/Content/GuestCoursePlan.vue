<template>
  <v-flex class="course_plan_wrapper">
    <div>
        <section-header 
            title="תוכנית הקורס"
            backgroundTitle="תוכנית"
        />

        <v-flex d-flex md-10 mx-auto class="main_dark_bg_color w100 mt-10" :class="{
            'flex-wrap': $vuetify.breakpoint.smAndDown
        }">
            <v-flex d-flex xs12 md6 :class="{
                'flex-wrap': $vuetify.breakpoint.smAndDown,
            }">
                <v-flex md6 d-flex flex-column>
                    <div 
                        class="course_plan_course_area pr-10 pointer py-8" 
                        :class="{'course_plan_course_area_active sub_bg_color': activeCourseAreaIndex === index}" 
                        v-for="(courseArea, index) in courseAreas" 
                        :key="index"
                        @click="setActiveCourseArea(index)"
                    >
                        <span class="white_text_color">
                            {{ courseArea.name }}
                        </span>
                    </div>
                </v-flex>
                <v-flex md6 class="dark_bg_color px-5 pb-5 pt-1 w100">
                    <img loading="lazy" :src="activeCourseArea.imageSrc" />

                    <p class="sub_text_color mt-2 mb-0">
                        {{ activeCourseArea.name }}
                    </p>

                    <small v-html="activeCourseArea.description" class="grey_text_color"> 
                    </small>
                </v-flex>
            </v-flex>
            <v-flex d-flex>
                <v-flex v-if="$vuetify.breakpoint.smAndDown">
                    <div class="course_plan_lesson pa-4" v-for="(lesson, index) in activeLessons" :key="index">
                        <span class="white_text_color">
                            <strong>
                                {{index + 1}}
                            </strong> 
                            &nbsp; 
                            {{ lesson.name }}
                        </span>
                    </div>
                </v-flex>
                <v-flex v-else v-for="(lessonList, columnIndex) in viewLessons" :key="columnIndex" xs3 d-flex flex-column flex-wrap>
                    <div class="course_plan_lesson pa-8" v-for="(lesson, itemIndex) in lessonList" :key="itemIndex">
                        <span class="white_text_color">
                            {{ lesson.name }}
                        </span>
                    </div>
                </v-flex>
            </v-flex>
        </v-flex>
    </div>
  </v-flex>
</template>

<script>
import SectionHeader from '../Texts/SectionHeader.vue';
export default {
  components: { SectionHeader },

  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
        activeCourseAreaIndex: 0
    }
  },

  computed: {
    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    activeCourseArea() {
        return this.courseAreas[this.activeCourseAreaIndex];
    },

    activeLessons() {
        return this.activeCourseArea.active_lessons
    },

    viewLessons() {
        return [
            this.activeLessons.slice(0, 5),
            this.activeLessons.slice(5, 10),
            this.activeLessons.slice(10, 15),
            this.activeLessons.slice(15, 20),
        ];
    }
  },

  methods: {
    setActiveCourseArea(index) {
        this.activeCourseAreaIndex = index;
    },
    
    playVideo() {
        this.$refs.video.playVideo()
    }
  }

};
</script>

<style scoped lang="scss">
    
    .course_plan_wrapper {
        position: relative;
        z-index: 2;

        img {
            width: 100%;
            max-height: 200px;
            margin-top: 12px;
            object-fit: cover;
            border-radius: 8px;
        }

        .course_plan_course_area, .course_plan_lesson {
            transition: .2s transform ease-out, .2s background-color ease-out;
        }

        .course_plan_course_area_active {
            transform: scale(1.05);
            font-weight: bold;
        }

        .course_plan_lesson:hover {
            transform: scale(1.05);
            background-color: #d5b26e;
            font-weight: bold;
        }
    }

</style>