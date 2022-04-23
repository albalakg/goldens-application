<template>
    <div class="user_course_progress_wrapper white_bg_color">
        <v-progress-circular
            :size="93"
            :value="progress"
            color="#E6B260"
            :rotate="-90"
            width="3"
        >
            <img class="user_course_profile_image" :src="imageSrc" alt="image">
        </v-progress-circular>
        <div class="user_course_content pa-6 pt-10">
            <star-logo class="user_course_star_image" :gstar="false" :opacity=".1" />
            <h3 class="text-center mt-3">
                <span class="main_text_color">
                    {{firstName}} 
                </span>
                <span>
                    {{lastName}}
                </span>
            </h3>

            <v-flex class="user_course_progress_row mt-5" d-flex justify-space-between>
                <v-flex xs5 d-flex align-center>
                    <img class="ml-5" :src="lessonImage" alt="lesson image">
                    <span>
                        תחומי קורס
                    </span>
                </v-flex>
                <v-flex xs5 class="text-left">
                    <strong>
                        {{totalCourseAreas}}
                    </strong>
                </v-flex>
            </v-flex>

            <v-flex class="user_course_progress_row mt-5" d-flex justify-space-between>
                <v-flex xs5 d-flex align-center>
                    <img class="ml-5" :src="lessonImage" alt="lesson image">
                    <span>
                        שיעורים
                    </span>
                </v-flex>
                <v-flex xs5 class="text-left">
                    <strong>
                        {{totalLessons}}
                    </strong>
                </v-flex>
            </v-flex>

            <div class="user_course_progress_bar mt-10">
                <v-flex d-flex justify-space-between>
                    <strong>התקדמות בקורס</strong>
                    <strong>
                        {{progress}}%
                    </strong>
                </v-flex>
                <progress-bar
                    class="mt-2"
                    :progress="progress"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ProgressBar from '../General/ProgressBar.vue';
import StarLogo from '../General/StarLogo.vue';
export default {
    components: { ProgressBar, StarLogo },

    props: {
        course: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            defaultImage:   FILES_PATH + 'default_profile.jpg',
            lessonImage: require('../../../public/assets/images/general/lesson.svg'),
            courseAreaImage: require('../../../public/assets/images/general/course_area.svg'),
        }
    },

    computed: {
        imageSrc() {
            return this.userImage ? userImage : this.defaultImage
        },

        firstName() {
            return this.$store.getters['UserState/firstName'];
        },

        lastName() {
            return this.$store.getters['UserState/lastName'];
        },

        totalCourseAreas() {
            return this.course.active_areas_with_active_lessons.length;
        },

        totalLessons() {
            let totalLessons = 0;
            this.course.active_areas_with_active_lessons.forEach(courseArea => {
                totalLessons += courseArea.active_lessons.length;
            });
            return totalLessons;
        },

        progress() {
            // TODO: calc progress
            return 30;
        }
    }
}
</script>

<style scoped lang="scss">

    .user_course_progress_wrapper {
        border-radius: 8px;
        position: relative;
        box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.1);

        img.user_course_profile_image {
            border-radius: 50%;
            height: 80px;
            width: 80px;
            object-fit: cover;
            position: absolute;

        }

        .user_course_content {
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;

            .user_course_star_image {
                position: absolute;
                transform: scale(1.3);
                top: -20%;
                right: -40%;
            }
        }

    }

    ::v-deep .v-progress-circular {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -40px !important;
    }

    ::v-deep .v-progress-circular__underlay {
        stroke: transparent;
    }
</style>