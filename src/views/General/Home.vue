<template>
<div class="home_wrapper">
    <v-flex d-flex flex-wrap>
        <v-flex xs12 lg6 mx-auto class="text-center" d-flex justify-end>
            <v-flex xs12 lg9 class="text-right">
                <!-- <Logo /> -->

                <h1>
                    כל האימונים
                    <br>
                </h1>
                <h2>
                    במקום <span class="sub_text_color">אחד</span>
                </h2>

                <p>
                    משהו משהו סתם טקסט שאני מכניס פה כדי למלא תוכן. <br> איך אין פה שום דבר רלוונטי. אם הגעת עד לכאן אז שאפו.
                </p>

                <br>

                <div class="home_course_card">
                    <course-card dark :course="courseCategories">
                    </course-card>
                </div>
            </v-flex>
        </v-flex>
        <v-flex xs12 lg6 class="text-left">
            <star-logo class="star_logo_wrapper" :opacity=".2" />
        </v-flex>
    </v-flex>
</div>
</template>

<script>
import CourseCard from '../../components/Cards/CourseCard.vue'
import Logo from '../../components/General/Logo.vue'
import StarLogo from '../../components/General/StarLogo.vue'

export default {
    components: {
        Logo,
        StarLogo,
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

        padding-top: 5%;
    
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
            width: 60%;
        }

        .star_logo_wrapper {
            position: relative;
            z-index: 10;
            width: 90%;
            top: -10%;
        }
    }

</style>