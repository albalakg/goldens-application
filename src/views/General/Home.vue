<template>
<div class="home_wrapper">

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
                    <h2>
                        במקום <span class="sub_text_color">אחד</span>
                    </h2>

                    <v-flex xs12 lg7 class="mx-5 mx-lg-0">
                        <div class="home_course_card">
                            <course-card dark :course="courseCategories">
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
            <v-flex md7 xl6 mx-auto class="lessons_wrapper px-5 mr-auto">
                <lesson-card v-for="(lesson, index) in lessons" :lesson="lesson" :key="index" />
            </v-flex>
        </div>

    </section>

    <div class="spacer"></div>

    <!-- Coaches -->
    <section>
        
        <section-header :title="'המאמנים שלנו'" :backgroundTitle="'מאמנים'" :subtitle="`םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס`">
        </section-header>

        <v-flex lg10 xl9 mx-auto>
            <v-flex class="trainers_desktop_wrapper mt-10" d-none d-md-block>
                <v-flex class="trainers_wrapper mr-auto">
                    <trainer-card v-for="(trainer, index) in trainers" :trainer="trainer" :key="index" />
                </v-flex>
            </v-flex>
            
            <v-flex class="trainers_mobile_wrapper main_dark_bg_color mt-10 pt-5" d-flex d-md-none>
                <arrow-chip v-show="showNextTrainerArrow" @submit="goToLastTrainer()" :left="false" class="lesson_wrapper_right_icon" />
                <v-flex class="trainers_wrapper mr-auto" ref="trainers">
                    <trainer-card-mobile v-for="(trainer, index) in trainers" :trainer="trainer" :key="index" :ref="`trainer-${index}`" />
                </v-flex>
                <arrow-chip v-show="showLastTrainerArrow" @submit="goToNextTrainer()" class="lesson_wrapper_left_icon" />
            </v-flex>

            
        </v-flex>



    </section>

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
                <star-logo :gstar="false" class="about_star_decorator" />
                <img class="mt-10 mt-md-0" :src="aboutPlayerSrc" alt="">
            </v-flex>
            
        </v-flex>

        <v-flex class="about_arrow_decorator" d-none d-md-block>
            <arrow-decorator />
        </v-flex>

    </section>

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
import TrainerCard from '../../components/Cards/TrainerCard.vue'
import TrainerCardMobile from '../../components/Cards/TrainerCardMobile.vue'
import ArrowChip from '../../components/Chips/arrowChip.vue'
import ArrowDecorator from '../../components/Decorators/ArrowDecorator.vue'
import ArrowsDecorator from '../../components/Decorators/ArrowsDecorator.vue'
import Logo from '../../components/General/Logo.vue'
import StarLogo from '../../components/General/StarLogo.vue'
import SectionHeader from '../../components/Texts/SectionHeader.vue'

export default {
    components: {
        Logo,
        StarLogo,
        CourseCard,
        Partners,
        SectionHeader,
        LessonCard,
        ArrowChip,
        TrainerCard,
        TrainerCardMobile,
        MainButton,
        ArrowDecorator,
        ArrowsDecorator,
    },

    data() {
        return {
            focusedTrainerIndex: 0,
            aboutPlayerSrc: require('../../../public/assets/images/general/about_player.png')
        }
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
        },

        lessons() {
            return [
                {
                    name: 'שיעור ראשון',
                    description: 'שיעור ראשון תיאור מעניין',
                    image: require('../../../public/assets/images/lessons/lesson1.png')
                },
                {
                    name: 'שיעור שני',
                    description: 'שיעור שני תיאור מעניין',
                    image: require('../../../public/assets/images/lessons/lesson1.png')
                },
                {
                    name: 'שיעור שלישי',
                    description: 'שיעור שלישי תיאור מעניין',
                    image: require('../../../public/assets/images/lessons/lesson1.png')
                },
                {
                    name: 'שיעור רביעי',
                    description: 'שיעור רביעי תיאור מעניין',
                    image: require('../../../public/assets/images/lessons/lesson1.png')
                },
            ];
        },

        trainers() {
            return [
                {
                    name: 'דניאל כהן',
                    title: 'מאמן כדורגל',
                    image: require('../../../public/assets/images/trainers/ront-levi-personal-trainer.png')
                },
                {
                    name: 'דנה ברגר',
                    title: 'מאמנת כושר',
                    image: require('../../../public/assets/images/trainers/dana-personal-trainer.png')
                },
                {
                    name: 'דניאל כהן',
                    title: 'מאמן כדורגל',
                    image: require('../../../public/assets/images/trainers/ront-levi-personal-trainer.png')
                },
                {
                    name: 'דנה ברגר',
                    title: 'מאמנת כושר',
                    image: require('../../../public/assets/images/trainers/dana-personal-trainer.png')
                },
                {
                    name: 'דניאל כהן',
                    title: 'מאמן כדורגל',
                    image: require('../../../public/assets/images/trainers/ront-levi-personal-trainer.png')
                },
            ]
        },

        showNextTrainerArrow() {
            return this.focusedTrainerIndex !== 0 && this.trainers.length > 0;
        },

        showLastTrainerArrow() {
            return this.focusedTrainerIndex !== (this.trainers.length - 1) && this.trainers.length > 0;
        },
    },

    methods: {
        getCourseCategories() {
            this.$store.dispatch('CourseCategoryState/getCourseCategories')
        },

        goToLastTrainer() {
            this.moveToTrainer(this.focusedTrainerIndex - 1)
            console.log('goToLastTrainer');
        },

        goToNextTrainer() {
            console.log('goToNextTrainer');
            this.moveToTrainer(this.focusedTrainerIndex + 1)
        },

        moveToTrainer(goToTrainerIndex) {
            try {
                const trainer = this.$refs[`trainer-${goToTrainerIndex}`][0].$el;
                trainer.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
                this.focusedTrainerIndex = goToTrainerIndex;
            } catch(err) {
                console.error(err);
            }
        }
    },
}
</script>

<style scoped lang="scss">

    .home_wrapper {

        padding-top: 5%;
    
        h1, h2 {
            font-size: 4.5em;
        }
    
        h2 {
            position: relative;
            top: -30px;
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
            z-index: 10;
            width: 90%;
            top: -10%;
        }

        .lessons_wrapper_carousel {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;

            .lessons_wrapper {
                height: 30vh;
                min-height: 325px;
                max-height: 400px;
                display: flex;
                overflow-x: auto;
    
                &::-webkit-scrollbar {
                    display: none;
                }

                & > div {
                    min-width: 200px;
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

        .trainers_desktop_wrapper {
            position: relative;
            width: 100%;
            display: flex;
            height: 35vh;
            min-height: 400px;
            max-height: 450px;

            .trainers_wrapper {
                scroll-behavior: smooth;
                height: 100%;
                width: 100%;
                display: flex;
                box-shadow: 0 10px 15px 2px #0008;

                &::-webkit-scrollbar {
                    display: none;
                }
                
                & > div {
                    transition: .3s transform;
                    min-width: 250px;
                }

                & > div:hover {
                    transform: scale(1.2);
                    z-index: 2;
                }
            }

        }

        .trainers_mobile_wrapper {
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            height: 70vh;
            box-shadow: 0 10px 15px 2px #0005;

            .trainers_wrapper {
                height: 90%;
                width: 100%;
                display: flex;
                overflow-x: auto;
                
                &::-webkit-scrollbar {
                    display: none;
                }
                
                & > div {
                    min-width: 80%;
                    margin: 0 10%;
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
                position: absolute;
                top: -10vh;
                left: 20%;
                width: 70%;
                min-width: 300px;
                z-index: 2;
            }

            .about_button_wrapper {
                width: 160px;
            }

            .about_left_side_wrapper {
                position: relative;
            }
            
            .about_right_side_wrapper {
                z-index: 2;
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
        top: -30vh;
        right: -13vw;
    }

    .about_wrapper ::v-deep .about_star_decorator img {
        position: relative;
        top: -20vh;
        left: -30%;
        z-index: 2;
        width: 70%;
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