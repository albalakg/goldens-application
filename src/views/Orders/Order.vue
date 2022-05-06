<template>
    <v-flex md10 xl9 mx-auto class="auth_padding_top">
        <h1>
            העגלה <span class="main_text_color">שלכם</span>
        </h1>

        <br>

        <v-flex d-flex flex-wrap>
            <v-flex xs12 md8 class="pl-md-5">
                <order-course-card 
                    :course="course"
                />
            </v-flex>
            <v-flex xs12 md4 class="pr-md-5">
                2
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import OrderCourseCard from '../../components/Cards/OrderCourseCard.vue'
export default {
  components: { OrderCourseCard },
    data() {
        return {

        }
    },

    computed: {
        course() {
            return ContentService.findCourseById(this.$route.query.courseId)
        }
    },
}
</script>

<style scoped>
</style>