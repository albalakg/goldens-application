<template>
    <div class="user_favorites_wrapper">
        <div v-if="lessons && lessons.length">
            <v-flex d-flex flex-wrap v-if="$vuetify.breakpoint.mdAndUp">
                <v-flex md3 v-for="lesson in viewLessons" :key="lesson.course_lesson_id" class="mb-10 pl-3">
                    <lesson-favorite-card class="lesson_favorites_card" :lesson="lesson" @submit="enterLesson" />
                </v-flex>
            </v-flex>

            <v-flex v-else class="user_favorites_mobile">
                <v-flex d-flex class="use_favorites_lessons_wrapper pr-10">
                    <v-flex v-for="lesson in viewLessons" :key="lesson.course_lesson_id">
                        <lesson-favorite-card class="lesson_favorites_card my-10" :lesson="lesson" @submit="enterLesson" />
                    </v-flex>
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

        <div v-else>
            <h1 class="text-center">
                לא נמצאו שיעורים מועדפים
            </h1>
        </div>
    </div>
</template>

<script>
import LessonFavoriteCard from '../../components/Cards/LessonFavoriteCard.vue';
import ArrowChip from '../../components/Chips/arrowChip.vue';
import Pagination from '../../components/General/Pagination.vue';
export default {
  components: { LessonFavoriteCard, Pagination, ArrowChip },
    data() {
        return {
            page: 1,
            totalLessonsPerPage: 8,
            focusedLessonIndex: 0
        }
    },

    computed: {
        lessons() {
            return this.$store.getters['UserState/favorites'];
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
        },
    }
}
</script>

<style scoped lang="scss">

    .lesson_favorites_card {
        height: 70vh;
        max-height: 350px;
    }

    .user_favorites_mobile {

        .use_favorites_lessons_wrapper {
            overflow-x: auto;
            position: relative;
            
            &::-webkit-scrollbar {
                display: none;
            }
    
            .lesson_favorites_card {
                min-width: 250px;
                margin-right: 10vw;
            }
        }
        
    }

</style>
