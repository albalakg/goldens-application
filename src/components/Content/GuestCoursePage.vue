<template>
    <v-flex>
        <v-flex md10 xl9 mx-auto d-flex justify-center :class="{
            'flex-wrap': $vuetify.breakpoint.smAndDown
        }">
            <v-flex md3 d-flex justify-end class="guest_detailed_card mx-4" v-if="$vuetify.breakpoint.smAndDown">
                <detailed-course-card
                    :course="course"
                />
            </v-flex>
            
            <v-flex x12 md4 offset-md-1 class="course_areas_wrapper mt-sm-0 mt-10 pt-sm-0 pt-10">
                <p class="course_areas_title white_text_color mb-1" v-if="$vuetify.breakpoint.mdAndUp">
                    <strong>
                        תחומי הקורס
                    </strong>
                </p>
            <template v-for="(courseArea, index) in courseAreas">
                <course-area-card
                    guest
                    class="mb-3"
                    :rounded="false"
                    :key="index"
                    :courseArea="courseArea"
                />
            </template>
            </v-flex>

            <v-flex md2 v-if="$vuetify.breakpoint.mdAndUp">
                
            </v-flex>

            <v-flex md3 d-flex justify-end class="guest_detailed_card" v-if="$vuetify.breakpoint.mdAndUp">
                <detailed-course-card
                    :course="course"
                />
            </v-flex>
        </v-flex>

        <v-flex md10 xl9 mx-auto>
            <course-benefits :items="items" />
            <!-- TODO: Not in use yet -->
            <!-- <v-flex d-flex class="course_lessons_wrapper">
                <v-flex xs3 v-for="(lesson, index) in lessons" :key="index" class="course_lesson_card">
                    <lesson-card 
                        :lesson="lesson"
                    />
                </v-flex>
            </v-flex> -->

            
        </v-flex>

        <div class="star_logo" v-if="$vuetify.breakpoint.mdAndUp">
            <star-logo 
                gstar
            />
        </div>
        
        <br>
        <br>
        <br>
        <br>

        <guest-course-plan :course="course" />

        <br>
        <br>
        <br>
        <br>

        <recommendations :items="recommendations" :perPage="recommendationPerPage" />

        <br>
        <br>
        <br>
        <br>

        <v-flex md9 xl8 mx-auto class="px-4 pb-10 pb-md-0">
            <h2 class="text-center">
                רכישת <span class="main_text_color">הקורס</span>
            </h2>
            <br>
            <detailed-course-card-horizontal
                :course="course"
            />
        </v-flex>

    </v-flex>
</template>

<script>
import CourseAreaCard from "../../components/Cards/CourseAreaCard.vue";
import DetailedCourseCard from '../Cards/DetailedCourseCard.vue';
import DetailedCourseCardHorizontal from '../Cards/DetailedCourseCardHorizontal.vue';
import LessonCard from '../Cards/LessonCard.vue';
import CircleDecorator from '../Decorators/CircleDecorator.vue';
import StarLogo from '../General/StarLogo.vue';
import SectionHeader from '../Texts/SectionHeader.vue';
import CourseBenefits from './CourseBenefits.vue';
import GuestCoursePlan from './GuestCoursePlan.vue';
import Recommendations from './Recommendations.vue';
export default {
    components: { 
        CourseAreaCard, 
        DetailedCourseCard, 
        CircleDecorator, 
        LessonCard, 
        SectionHeader, 
        GuestCoursePlan, 
        StarLogo, 
        Recommendations, 
        DetailedCourseCardHorizontal, 
        CourseBenefits 
    },

    props: {
        course: {
            type: Object,
            required: true,
        },
    },

  computed: {
    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    hasActiveCourse() {
      return this.$store.getters["UserState/hasActiveCourse"];
    },

    items() {
        return [
            {
                icon: require('../../../public/assets/images/general/application.svg'),
                title: 'נושא חדש',
                content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`
            },
            {
                icon: require('../../../public/assets/images/general/whistle.svg'),
                title: 'אימון מקצועי',
                content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`
            },
            {
                icon: require('../../../public/assets/images/general/walker.svg'),
                title: 'שיפור מהיר',
                content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`
            },
        ];
    },

    recommendationPerPage() {
        return this.$vuetify.breakpoint.mdAndUp ? 3 : 1
    },

    recommendations() {
        return [
            {
                name: 'שחר פאר',
                content: `מונפרד אדנדום לורם איפסום דולור סיט אמט, קונסקטורר
                        מרגשי ומרגשח. עמחליף מודוף. אדיפיסינג אלית קולורס
                        אודיפו בלאסטיק מונופץ קליר סילקוף,`
            },
            {
                name: 'קלארק קנט',
                content: `מונפרד אדנדום לורם איפסום דולור סיט אמט, קונסקטורר
                        מרגשי ומרגשח. עמחליף מודוף. אדיפיסינג אלית קולורס
                        אודיפו בלאסטיק מונופץ קליר סילקוף,`
            },
            {
                name: 'אסף לוץ',
                content: `מונפרד אדנדום לורם איפסום דולור סיט אמט, קונסקטורר
                        מרגשי ומרגשח. עמחליף מודוף. אדיפיסינג אלית קולורס
                        אודיפו בלאסטיק מונופץ קליר סילקוף,`
            },
            {
                name: 'פינוקיו',
                content: `מונפרד אדנדום לורם איפסום דולור סיט אמט, קונסקטורר
                        מרגשי ומרגשח. עמחליף מודוף. אדיפיסינג אלית קולורס
                        אודיפו בלאסטיק מונופץ קליר סילקוף,`
            },
            {
                name: 'ספיידרמן',
                content: `מונפרד אדנדום לורם איפסום דולור סיט אמט, קונסקטורר
                        מרגשי ומרגשח. עמחליף מודוף. אדיפיסינג אלית קולורס
                        אודיפו בלאסטיק מונופץ קליר סילקוף,`
            },
            {
                name: 'איירון מן',
                content: `מונפרד אדנדום לורם איפסום דולור סיט אמט, קונסקטורר
                        מרגשי ומרגשח. עמחליף מודוף. אדיפיסינג אלית קולורס
                        אודיפו בלאסטיק מונופץ קליר סילקוף,`
            },
        ];
    },

    lessons() {
        // TODO: Not in use yet
        const lessons = ContentService.getLessonsByCourseId(this.course.id);
        const randomLessons = [];

        for(let index = 0; index < 4; index++ ) {
            const randomIndex   = Math.floor(Math.random()*lessons.length);
            randomLessons.push(lessons[randomIndex]);
            lessons.slice(randomIndex, 1);
        }

        return randomLessons
    },
  },

};
</script>

<style scoped lang="scss">
    video {
        border-radius: 8px;
        width: 100%;
    }

    .course_areas_title {
        position: absolute;
        top: -30px;
    }

    .guest_detailed_card {
        height: 505px;
        position: relative;
        z-index: 2;
    }

    .star_logo {
        position: absolute;
        width: 50vw;
        height: 50vw;
        top: 35vh;
        left: -15vw;
    }

    .course_areas_wrapper {
        position: relative;
        z-index: 3;
    }


</style>