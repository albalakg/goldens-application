<template>
    <div class="user_history_wrapper" v-if="lessons && lessons.length">
        <v-flex d-flex flex-wrap>
            <v-flex xs10 md3 mx-auto mx-md-0 v-for="lesson in viewLessons" :key="lesson.course_lesson_id" class="mb-10">
                <lesson-history-card class="lesson_history_card" :lesson="lesson" @submit="enterLesson" />
            </v-flex>
        </v-flex>

        <br>
        <br>

        <v-flex md6 mx-auto>
            <pagination 
                :totalPages="totalPages"
                :currentPage="page"
                @setPage="setPage"
            />
        </v-flex>
    </div>
</template>

<script>
import LessonHistoryCard from '../../components/Cards/LessonHistoryCard.vue';
import Pagination from '../../components/General/Pagination.vue';
export default {
  components: { LessonHistoryCard, Pagination },
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
        },

        viewLessons() {
            const startIndex    = (this.page - 1) * this.totalLessonsPerPage;
            const endIndex      = startIndex + this.totalLessonsPerPage;
            return this.lessons.slice(startIndex, endIndex)
        },

        totalPages() {
            return Math.ceil(this.lessons.length / this.totalLessonsPerPage);
        }
    },

    methods: {
        setPage(page) {
            this.page = page;
        },

        enterLesson(lesson) {
            this.$router.push(`/courses/${lesson.course_id}/lessons/${lesson.id}`)
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
