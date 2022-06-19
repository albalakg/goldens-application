<template>
<div class="home_wrapper app_padding_top">

    <!-- header -->
    <section>
        <v-flex d-flex flex-wrap>
            <v-flex xs12 lg6 mx-auto class="text-center" d-flex justify-end>
                <v-flex xs12 lg9 class="text-center text-lg-right">
                    <!-- <Logo /> -->

                    <h1>
                        כל האימונים
                        <br>
                    </h1>
                    <h1>
                        במקום <span class="sub_text_color">אחד</span>
                    </h1>

                    <v-flex xs12 lg7 class="mx-5 mx-lg-0">
                        <div class="home_course_card">
                            <course-card class="mb-3" v-for="(course, index) in courses" :key="index" dark :course="course" @submit="enterCourse(course)">
                            </course-card>
                        </div>
                    </v-flex>
                </v-flex>
            </v-flex>
            <v-flex xs12 lg6 class="text-center text-lg-left mt-8 mt-lg-0">
                <star-logo class="star_logo_wrapper" />
            </v-flex>
        </v-flex>
    </section>

    <div class="spacer"></div>

    <!-- partners -->
    <section>
        
        <section-header :title="'חברות משותפות'" :backgroundTitle="'שותפות'" :subtitle="`םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס`">
        </section-header>

        <v-flex lg6 mx-auto>
            <partners />
        </v-flex>

    </section>

    <div class="spacer"></div>

    <!-- Lessons -->
    <section>
        
        <section-header :title="'שיעורי לימוד'" :backgroundTitle="'שיעורים'" :subtitle="`םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס`">
        </section-header>

        <div class="lessons_wrapper_carousel">
            <v-flex v-if="lessons.length" xl8 md7 mx-auto class="lessons_wrapper px-5 py-5 mr-auto">
                <lesson-card v-for="(lesson, index) in lessons" :lesson="lesson" :key="index" />
            </v-flex>
        </div>

    </section>

    <div class="spacer"></div>

    <!-- Coaches -->
    <trainers v-if="trainers.length" :trainers="trainers" />

    <div class="spacer"></div>

    <!-- About -->
    <section>
        
        <v-flex class="about_wrapper" d-flex justify-space-between flex-wrap>

            <v-flex md1></v-flex>
            
            <v-flex xs12 md6 class="about_right_side_wrapper mb-10 mb-md-0 px-5 px-md-0">
                <section-header right :title="'קצת עלינו'" :backgroundTitle="'עלינו'" />
                <br>
                <br>
                <v-flex md6>
                    <small>
                            םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
        רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס    
                        <br>
                        םודנדא דרפנומ סרולוק תיאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס   
                        <br>
                        םודנדא דרפנומ סרולוק תיאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס   
                    </small>    
                </v-flex>    

                <v-flex class="pl-8 mt-10 about_button_wrapper">
                    <router-link to="/about">
                        <main-button
                            shadow
                            :styleConfig="{
                                padding: '2px 0',
                                borderRadius: '30',
                            }"
                        >
                            <template slot="content">
                                <strong class="white--text">
                                    קרא עוד
                                </strong>
                                <v-icon color="white" class="mr-1">mdi-chevron-left</v-icon>
                            </template>
                        </main-button>
                    </router-link>
                </v-flex>

            </v-flex>

            <v-flex xs12 md4 class="about_left_side_wrapper mt-10 mt-md-0">
                <star-logo class="about_star_decorator" />
                <img loading="lazy" class="mt-10 mt-md-0" :src="aboutPlayerSrc" alt="">
            </v-flex>
            
        </v-flex>

        <v-flex class="about_arrow_decorator" d-none d-md-block>
            <arrow-decorator />
        </v-flex>

    </section>

    <template v-if="$vuetify.breakpoint.smAndDown">
        <div class="spacer"></div>
        <div class="spacer"></div>
    </template>

    <!-- Questiosn -->
    <section>
        <v-flex class="questions_wrapper">
            
            <arrows-decorator class="arrows" />
            <v-flex md8 lg6 mx-auto class="questions_content text-center h100" d-flex align-center justify-center>
                <h3>
                   <span class="white_text_color">שאלות</span>
                   &nbsp;
                   <span class="sub_text_color">נפוצות</span> 
                </h3>
                <!-- TODO -->
            </v-flex>
        </v-flex>
    </section>

    <div class="spacer"></div>

    <div class="spacer"></div>

</div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue'
import CourseCard from '../../components/Cards/CourseCard.vue'
import LessonCard from '../../components/Cards/LessonCard.vue'
import Partners from '../../components/Cards/Partners.vue'
import Trainers from '../../components/Content/Trainers.vue'
import ArrowDecorator from '../../components/Decorators/ArrowDecorator.vue'
import ArrowsDecorator from '../../components/Decorators/ArrowsDecorator.vue'
import StarLogo from '../../components/General/StarLogo.vue'
import SectionHeader from '../../components/Texts/SectionHeader.vue'

export default {
    components: {
        StarLogo,
        CourseCard,
        Partners,
        SectionHeader,
        LessonCard,
        MainButton,
        ArrowDecorator,
        ArrowsDecorator,
        Trainers,
    },

    data() {
        return {
            loading: true,
            aboutPlayerSrc: require('../../../public/assets/images/general/about_player.png')
        }
    },
    
    created() {
        this.getContent();
    },

    computed: {
        courses() {
            const courses = this.$store.getters['ContentState/courses'];
            return courses ? courses : [];
        },

        lessons() {
            const lessons = this.$store.getters['ContentState/lessons'];
            return lessons ? lessons : [];
        },

        trainers() {
            const trainers = this.$store.getters['ContentState/trainers'];
            return trainers ? trainers : [];
        },
    },

    methods: {
        async getContent() {
            await Promise.allSettled([
                this.$store.dispatch('ContentState/getCategories'),
                this.$store.dispatch('ContentState/getLessons'),
                this.$store.dispatch('ContentState/getTrainers'),
            ])
            this.loading = false;
        },

        enterCourse(course) {
            this.$router.push('/courses/' + course.id)
        }
    },
}
</script>

<style scoped lang="scss">

    .home_wrapper {

        h1 {
            font-size: 6em;
        }
        
        h1:nth-of-type(2) {
            position: relative;
            top: -50px;
        }

        @media only screen and (max-width: 600px) {
            h1 {
                font-size: 4em;
            }

            h1:nth-of-type(2) {
                position: relative;
                top: -30px;
            }
        }
        h3 {
            font-size: 2em;
        }
    
        p {
            font-size: 1.2em;
            position: relative;
            top: -20px;
        }
    
        .home_course_card {
            height: 150px;
        }

        .star_logo_wrapper {
            position: relative;
            z-index: 8;
            width: 90%;
            top: -10%;
        }

        .lessons_wrapper_carousel {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;


            @media only screen and (max-width: 600px) {
                .lessons_wrapper {
                    overflow-x: auto;
                }
            }

            .lessons_wrapper {
                height: 30vh;
                min-height: 375px;
                max-height: 425px;
                display: flex;
    
                &::-webkit-scrollbar {
                    display: none;
                }

                & > div {
                    min-width: 220px;
                }
            }

            .lesson_wrapper_right_icon {
                position: absolute;
                right: 15px;
                z-index: 5;                
            }

            .lesson_wrapper_left_icon {
                position: absolute;
                left: 15px;
                z-index: 5;                
            }
        }

        .spacer {
            height: 100px;
            width: 100%;
        }

        .about_wrapper {
            height: 60vh;
            max-height: 800px;
            position: relative;
            
            small {
                font-weight: bold;
            }

            img {
                object-fit: cover;
                position: absolute;
                top: -10vh;
                left: 20%;
                width: 70%;
                min-width: 300px;
                z-index: 2;
            }

            .about_button_wrapper {
                width: 160px;
                z-index: 3;
                position: relative;
            }

            .about_left_side_wrapper {
                position: relative;
            }
            
            .about_right_side_wrapper {
                z-index: 4;
            }
        }

    }

    div.about_arrow_decorator {
        width: 50vw;
        z-index: 2;
        position: absolute;
    }

    ::v-deep .about_arrow_decorator img {
        position: relative;
        top: -25vh;
        right: -13vw;
    }

    .about_wrapper ::v-deep .about_star_decorator img {
        position: relative;
        top: -20vh;
        left: -30%;
        z-index: 2;
        width: 180%;
    }

    .questions_wrapper {
        background-color: #102A46;
        height: 70vh;
        max-height: 800px;
        min-height: 400px;
        width: 100%;
        position: relative;

        .arrows {
            position: absolute;
            left: 30%;
        }
    }

</style>