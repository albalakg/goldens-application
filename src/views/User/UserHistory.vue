<template>
    <v-flex d-flex flex-wrap v-if="lessons && lessons.length">
        <v-flex xs10 md3 mx-auto mx-md-0 v-for="lesson in lessons" :key="lesson.course_lesson_id" class="mb-10">
            <lesson-history-card class="lesson_history_card" :lesson="lesson" />
        </v-flex>
    </v-flex>
</template>

<script>
import LessonHistoryCard from '../../components/Cards/LessonHistoryCard.vue';
export default {
  components: { LessonHistoryCard },
    data() {
        return {
            page: 1,
            totalLessonsPerPage: 8
        }
    },

    computed: {
        lessons() {
            const courses = this.$store.getters['UserState/progress'];
            let lessons = [];
            courses.forEach(course => {
                lessons = lessons.concat(course.lessons_progress)
            });
            return lessons;
        }
    }
}
</script>

<style scoped>

    .lesson_history_card {
        height: 70vh;
        max-height: 350px;
    }

</style>
