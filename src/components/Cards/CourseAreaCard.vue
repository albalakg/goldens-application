<template>
    <v-flex class="course_area_card_wrapper pointer" @click="submit()">
        <img loading="lazy" :src="courseArea.imageSrc" alt="course area image">
        <div class="course_area_darkner"></div>
        <v-flex class="course_area_detail h100" d-flex flex-column justify-space-between>
            <v-flex xs10>
                <h3 class="white_text_color">
                    {{ courseArea.name }}
                </h3>
                <p class="white_text_color">
                    {{ description }}
                </p>
            </v-flex>
            <v-flex d-flex align-end class="h100">
                <div class="w100">
                    <v-flex d-flex class="mb-2">
                        <strong class="white_text_color">
                            {{ totalLessons }} שיעורים
                        </strong>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <strong class="white_text_color">
                            {{ totalDuration }}    
                        </strong>
                    </v-flex>
                    <progress-bar
                        v-if="isLogged"
                        dark
                        slim
                        :progress="progress"
                    />
                </div>
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import ProgressBar from '../General/ProgressBar.vue';
export default {
  components: { ProgressBar },

    props: {
        courseArea: {
            type: Object,
            required: true
        },

        guest: {
            type: Boolean,
        }
    },

    computed: {
        description() {
            const dots = this.courseArea.description.length > 50 ? '...' : '';
            return this.courseArea.description.substring(0, 50) + dots;
        },

        totalLessons() {
            try {
                return this.courseArea.active_lessons.length;
            } catch(err) {
                error(err);
                return 0
            }
        },

        totalDuration() {
            const seconds = ContentService.countTotalCourseAreaDuration(this.courseArea.id);
            return ContentService.getTimeTextBySeconds(seconds);
        },

        isLogged() {
            return this.$store.getters['AuthState/isLogged'];
        },

        progress() {
            try {
                const lessons = ContentService.getLessonsByCourseAreaId(this.courseArea.id);
                let totalSecondsWatched = 0;
                let totalSeconds = ContentService.countTotalCourseAreaDuration(this.courseArea.id);
                lessons.forEach(lesson => {
                    const progress      = lesson.progress ? lesson.progress.progress : 0;
                    const totalLength   = lesson.video.video_length;
                    totalSecondsWatched += progress / 100 * totalLength
                });
                return totalSecondsWatched * 100 / totalSeconds;
            } catch (err) {
                error(err);
                return 0;
            }
        }
    },

    methods: {
        submit() {
            this.$emit('submit', this.courseArea);
        }
    }
}
</script>

<style scoped lang="scss">

    .course_area_card_wrapper {
        width: 100%;
        height: 180px;
        border-radius: 6px;
        position: relative;
        transition: .2s box-shadow linear;

        &:hover {
            box-shadow: 0 0 10px 1px #0005;
        }

        img {
            object-fit: cover;
            border-radius: 6px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
        }

        .course_area_darkner {
            border-radius: 6px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 2;
            background: linear-gradient(90deg, #0000, #000a 60%);
        }

        .course_area_detail {
            position: relative;
            z-index: 3;
            padding: 10px 20px;

            h3 {
                font-size: 1.4em;
            }
        }
    }

</style>