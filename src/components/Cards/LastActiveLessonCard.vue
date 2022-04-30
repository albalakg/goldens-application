
<template>
    <div v-if="firstName" class="text-right last_progress_card white_bg_color pa-5">
        <strong>
        היי {{ firstName }},
        המשך מאיפה שעצרת:
        </strong>
        <br>
        <strong class="main_text_color">
        {{ lesson.name }}
        </strong>
        <br>
        <div class="video_wrapper">
            <play />
            <video 
                class="mt-3 w100"
            >
                <source :src="lesson.video.videoSrc" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
</template>

<script>
import Play from '../General/Play.vue';
export default {
    components: {
        Play,
    },

    data() {
        return {

        }
    },

    computed: {
        firstName() {
            return this.$store.getters['UserState/firstName'];
        },

        lesson() {
            const lastActiveLesson = this.$store.getters['UserState/lastActive'];
            return ContentService.findLessonById(lastActiveLesson.course_lesson_id)
        }
    }
}
</script>

<style scoped>

    .video_wrapper {
        width: 200px;
    }

    video {
        border-radius: 8px;
    }

</style>