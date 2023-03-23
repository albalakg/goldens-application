
<template>
    <div v-if="firstName && lesson" class="text-right last_progress_card white_bg_color pa-5 pl-10 dark_shadow">
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
        <video-card v-if="$vuetify.breakpoint.mdAndUp" :src="lesson.video.videoSrc" @playClicked="enterLesson()" />
        <p v-html="lessonContent">
        </p>
        <main-button 
            text="נתחיל להתאמן"
            dark
            slim
            @submit="enterLesson()"
        />
    </div>
</template>

<script>
import Collapse from '../General/Collapse.vue';
import VideoCard from './VideoCard.vue';
import MainButton from '../Buttons/MainButton.vue';
export default {
    components: {
        Collapse,
        VideoCard,
        MainButton,
    },
    
    computed: {
        firstName() {
            return this.$store.getters['UserState/firstName'];
        },

        lesson() {
            const lastActiveLesson = this.$store.getters['UserState/lastActive'];
            if(!lastActiveLesson) {
                return null;
            }

            return ContentService.findLessonById(lastActiveLesson.course_lesson_id)
        },

        lessonContent() {
            return ContentService.getLessonShortDescription(this.lesson, 80);
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