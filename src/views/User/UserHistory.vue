<template>
    <div class="user_history_wrapper">
        <div v-if="lessons && lessons.length">
            <v-flex d-flex flex-wrap v-if="$vuetify.breakpoint.mdAndUp">
                <v-flex md3 v-for="lesson in viewLessons" :key="lesson.course_lesson_id" class="mb-10 pl-3">
                    {{ lesson }}
                    <lesson-history-card class="lesson_history_card" :lesson="lesson" @submit="enterLesson" />
                </v-flex>
            </v-flex>

            <v-flex v-else class="user_history_mobile">
                <v-flex d-flex class="use_history_lessons_wrapper pr-10">
                    <v-flex v-for="lesson in viewLessons" :key="lesson.course_lesson_id" class=" pl-3">
                        <lesson-history-card class="lesson_history_card my-10" :lesson="lesson" @submit="enterLesson" />
                    </v-flex>
                </v-flex>
            </v-flex>

            <br>
            <br>

            <v-flex md6 mx-auto v-if="$vuetify.breakpoint.mdAndUp">
                <pagination 
                    :totalPages="totalPages"
                    :currentPage="page"
                    @setPage="setPage"
                />
            </v-flex>
        </div>

        <div v-else>
            <h1 class="text-center">
                לא נמצאו שיעורים
            </h1>
        </div>
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
            totalLessonsPerPage: 8,
            focusedLessonIndex: 0
        }
    },

    computed: {
        lessons() {
            const courses = this.$store.getters['UserState/progress'];
            let lessons = [];
            courses.forEach(course => {
                lessons = lessons.concat(course.lessons_progress)
            });

            return lessons.filter(lesson => lesson.finished_at);
        },

        viewLessons() {
            if(this.$vuetify.breakpoint.smAndDown) {
                return this.lessons;
            }

            const startIndex    = (this.page - 1) * this.totalLessonsPerPage;
            const endIndex      = startIndex + this.totalLessonsPerPage;

            return this.lessons.slice(startIndex, endIndex);
        },

        totalPages() {
            return Math.ceil(this.viewLessons.length / this.totalLessonsPerPage);
        }
    },

    methods: {
        setPage(page) {
            this.page = page;
        },

        enterLesson(lesson) {
            this.$router.push(`/courses/${lesson.course_id}/lessons/${lesson.id}`)
        },
    }
}
</script>

<style scoped lang="scss">

    .lesson_history_card {
        height: 70vh;
        max-height: 350px;
    }

    .user_history_mobile {

        .use_history_lessons_wrapper {
            overflow-x: auto;
            position: relative;
            
            &::-webkit-scrollbar {
                display: none;
            }
    
            .lesson_history_card {
                min-width: 250px;
                margin-right: 10vw;
            }
        }
        
    }

</style>
