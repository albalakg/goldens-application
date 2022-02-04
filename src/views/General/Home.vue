<template>
<v-container fluid class="home_wrapper">
    <v-flex xs11 mx-auto class="text-center">
        <Logo />

        <h1>
            כל האימונים
            <br>
        </h1>
        <h2>
            במקום <span class="main_text_color">אחד</span>
        </h2>

        <p>
            משהו משהו סתם טקסט שאני מכניס פה כדי למלא תוכן. איך אין פה שום דבר רלוונטי. אם הגעת עד לכאן אז שאפו.
        </p>

        <br>

        <div class="home_course_card">
            <course-card dark :course="courseCategories">
            </course-card>
        </div>
    </v-flex>
</v-container>
</template>

<script>
import CourseCard from '../../components/Cards/CourseCard.vue'
import Logo from '../../components/General/Logo.vue'

export default {
    components: {
        Logo,
        CourseCard,
    },
    
    created() {
        this.getCourseCategories();
    },

    computed: {
        courseCategories() {
            const categories = this.$store.getters['CourseCategoryState/courseCategories'];
            if(categories.length) {
                return categories[0];
            }

            return {};
        }
    },

    methods: {
        getCourseCategories() {
            this.$store.dispatch('CourseCategoryState/getCourseCategories')
        }
    },
}
</script>

<style scoped lang="scss">

    .home_wrapper {
    
        h1, h2 {
            font-size: 4em;
        }
    
        h2 {
            position: relative;
            top: -30px;
        }
    
        p {
            font-size: 1.2em;
            position: relative;
            top: -20px;
        }
    
        .home_course_card {
            height: 150px;
            width: 100%;
        }
    }

</style>