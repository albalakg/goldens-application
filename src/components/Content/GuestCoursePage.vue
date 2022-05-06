<template>
  <v-flex>
    <template v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="(courseArea, index) in courseAreas">
        <course-area-card
          class="mb-3"
          :key="index"
          :courseArea="courseArea"
          @submit="enterCourseArea"
        />
      </template>
    </template>

    <template v-else>
      <v-flex>
        <v-flex md10 xl9 mx-auto d-flex justify-center>
            <v-flex md4 offset-md-1 class="course_areas_wrapper">
                <p class="course_areas_title white_text_color mb-1">
                    <strong>
                        תחומי הקורס
                    </strong>
                </p>
            <template v-for="(courseArea, index) in courseAreas">
                <course-area-card
                    guest
                    class="mb-3"
                    :key="index"
                    :courseArea="courseArea"
                />
            </template>
            </v-flex>
            <v-flex md2>
                
            </v-flex>
            <v-flex md3 d-flex justify-end class="guest_detailed_card">
                <detailed-course-card
                    :course="course"
                />
            </v-flex>
        </v-flex>

        <v-flex md10 xl9 mx-auto class="course_benefits_wrapper w100 pa-10 second_dark_bg_color rounded">
            
            <!-- TODO: Not in use yet -->
            <!-- <v-flex d-flex class="course_lessons_wrapper">
                <v-flex xs3 v-for="(lesson, index) in lessons" :key="index" class="course_lesson_card">
                    <lesson-card 
                        :lesson="lesson"
                    />
                </v-flex>
            </v-flex> -->

            <div class="course_benefits_content h100 w100 pb-5">
                <circle-decorator class="circle_decorator"/>
                <h2 class="white_text_color">
                    <span class="sub_text_color">
                        מה יצא 
                    </span>
                    לכם מזה
                </h2>

                <v-flex d-flex class="mt-10">
                    <v-flex 
                        :class="{
                            'course_benefit_padding_right': index > 0,
                            'course_benefit_padding_left': index + 1 < items.length
                        }" 
                        xs4 
                        v-for="(item, index) in items" 
                        :key="index"
                        d-flex
                        flex-column
                        justify-end
                        class="course_benefit_item"
                    >
                        <img :src="item.icon" :alt="`course ${item.title}`">
                        <div class="circle"></div>
                        <h3 class="white_text_color">
                            {{ item.title }}
                        </h3>
                        <p class="grey_text_color">
                            {{ item.content }}
                        </p>
                    </v-flex>
                </v-flex>
            </div>
        </v-flex>

        <div class="star_logo">
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

        <recommendations :items="recommendations" />

        <br>
        <br>
        <br>
        <br>

        <v-flex md9 xl8 mx-auto>
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
import GuestCoursePlan from './GuestCoursePlan.vue';
import Recommendations from './Recommendations.vue';
export default {
  components: { CourseAreaCard, DetailedCourseCard, CircleDecorator, LessonCard, SectionHeader, GuestCoursePlan, StarLogo, Recommendations, DetailedCourseCardHorizontal },

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
                title: 'שיפור מהיר3',
                content: `ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
                    םודנדא דרפנומ סרולוק תילא גניסיפידא
                    .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
                    רילק ץפונומ קיטסאלב ופידוא`
            },
        ];
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

    .course_benefits_wrapper {
        margin-top: 10vh;
        position: relative;
        z-index: 2;

        .course_benefits_content {
            overflow: hidden;
            padding-top: 40px;

            img {
                height: 25%;
                width: 25%;
                margin-bottom: 10px;
                position: relative;
                z-index: 2;
            }

            h2 {
                font-size: 1.7em;
            }

            .circle_decorator {
                position: absolute;
                height: 100%;
                width: 100%;
                right: -50%;
                top: -50%;
                transform: rotate(-90deg);
            }

            .course_benefit_item {
                position: relative;

                .circle {
                    height: 30px;
                    width: 30px;
                    position: absolute;
                    background-color: #8885;
                    border-radius: 50%;
                    top: 40%;
                }
            }

            .course_benefit_padding_right {
                padding-right: 6%;
            }

            .course_benefit_padding_left {
                padding-left: 6%;
            }


            h3 {
                font-size: 1em;
            }
            
            p {
                font-size: .8em;
            }
        }

        .course_lessons_wrapper {
            position: absolute;
            width: 100%;
            top: -200px;
            
            .course_lesson_card {
                height: 400px;
                min-height: 20vh;
                max-height: 70vh;
            }
        }
    }

</style>