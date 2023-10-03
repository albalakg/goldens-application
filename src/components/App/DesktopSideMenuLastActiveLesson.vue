<template>
    <div class="desktop_side_menu_item px-10 pt-10 text-right pointer">
        <strong class="grey_text_color">
            {{ lesson.name }}
        </strong>
        <VideoCard v-if="$vuetify.breakpoint.mdAndUp" :src="lesson.video.videoSrc" :controls="false" @playClicked="enterLesson()" />
    </div>
</template>
    
<script>
import VideoCard from '../Cards/VideoCard.vue';


export default {
    components: {
        VideoCard
    },

    computed: {
        lesson() {
            const lastActiveLesson = this.$store.getters['UserState/lastActive'];
            if(!lastActiveLesson) {
                return null;
            }

            return ContentService.findLessonById(lastActiveLesson.course_lesson_id)
        },
    },

    methods: {
        enterLesson() {
            this.$router.push(`/courses/${this.lesson.course_id}/lessons/${this.lesson.id}`)
        }
    }
}
</script>
    
<style scoped lang="scss">

    .desktop_side_menu_item {
    }

</style>