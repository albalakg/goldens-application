<template>
    <div class="detailed_course_card dark_shadow w100 white_bg_color px-3 pb-3">
        <video-card 
            :src="course.trailerSrc"
        />
        
        <div class="px-3 mt-3">
            <v-flex d-flex justify-space-between align-center>
                <v-flex d-flex>
                    <img class="ml-2 mt-1" loading="lazy" :src="courseAreaImage" alt="course area image">
                    <strong>
                        תחומי קורס
                    </strong>
                </v-flex>
               <strong>
                   {{ totalCourseAreas }}
               </strong>
            </v-flex>
            <div class="divider my-2"></div>
            <v-flex d-flex justify-space-between align-center>
                <v-flex d-flex>
                    <img class="ml-2 mt-1" loading="lazy" :src="lessonImage" alt="course area image">
                    <strong>
                        שיעורים
                    </strong>
                </v-flex>
               <strong>
                   {{ totalCourseAreas }}
               </strong>
            </v-flex>
            <div class="divider my-2"></div>
            <v-flex d-flex justify-space-between align-center>
                <v-flex d-flex>
                    <img class="ml-2 mt-1" loading="lazy" :src="timeImage" alt="course area image">
                    <strong>
                        זמן
                    </strong>
                </v-flex>
               <strong>
                   {{ totalCourseAreas }}
               </strong>
            </v-flex>
            <div class="main_divider main_bg_color my-5"></div>
            
            <v-flex d-flex class="mb-10">
                <v-flex xs6 class="detailed_course_card_pricing">
                    <strong>
                        סה"כ מחיר
                    </strong>
                    <br>
                    <h2>
                        {{ price }}
                    </h2>
                </v-flex>
                <v-flex xs6 class="detailed_course_card_expiration">
                    <strong>
                        תקף עד
                    </strong>
                    <br>
                    <h2>
                        {{ price }}
                    </h2>
                </v-flex>
            </v-flex>
        </div>
    </div>
</template>

<script>
import VideoCard from "./VideoCard.vue"

export default {
    components: { VideoCard },

    props: {
        course: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            lessonImage: require('../../../public/assets/images/general/lesson.svg'),
            timeImage: require('../../../public/assets/images/general/time.svg'),
            courseAreaImage: require('../../../public/assets/images/general/course_area.svg'),
        }
    },

    computed: {
        totalCourseAreas() {
            return ContentService.countTotalCourseAreasByCourseId(this.course.id);
        },

        totalDuration() {
            const seconds = ContentService.countTotalCourseDuration(this.course.id);
            return ContentService.getTimeTextBySeconds(seconds);
        },
        
        totalLessons() {
            return ContentService.countTotalLessonsByCourseId(this.course.id)
        },

        price() {
            return  '₪' + Math.floor(this.course.price);
        }
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">

    .detailed_course_card {
        border-radius: 12px;
        position: relative;

    }

    .divider {
        background-color: #ccc;
        height: 1px;
    }

    .main_divider {
        height: 2px;
        width: 100%;
    }

    .detailed_course_card_pricing {
        border-left: 1px solid #888;

        strong {
            color: #555
        }

        h2 {
            font-size: 2em;
        }
    }

    .detailed_course_card_expiration {
        border-right: 1px solid #888;

    }


</style>