
<template>
    <div v-if="firstName" class="text-right last_progress_card white_bg_color pa-5 pl-10">
        <collapse class="collapse pointer" @submit="close()" />
        <strong>
        היי {{ firstName }},
        המשך מאיפה שעצרת:
        </strong>
        <br>
        <strong class="main_text_color">
        {{ lesson.name }}
        </strong>
        <br>
        <div class="video_wrapper pointer" @click="enterLesson()">
            <play class="play_button" />
            <video 
                class="mt-3 w100"
            >
                <source :src="lesson.video.videoSrc" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        <p v-html="lessonContent">
        </p>
    </div>
</template>

<script>
import Collapse from '../General/Collapse.vue';
import Play from '../General/Play.vue';
export default {
    components: {
        Play,
        Collapse,
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
        },

        lessonContent() {
            return ContentService.getLessonShortDescription(this.lesson);
        },
    },

    methods: {
        close() {
            this.$emit('close');
        },

        enterLesson() {
            this.$router.push(`/courses/${this.lesson.course_id}/lessons/${this.lesson.id}`)
        }
    }
}
</script>

<style scoped>

    .video_wrapper {
        width: 200px;
        position: relative;
    }

    video {
        border-radius: 8px;
    }

    .play_button {
        position: absolute;
        inset: 0;
        margin: auto;
    }

    .collapse {
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
    }

</style>