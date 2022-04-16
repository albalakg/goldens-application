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
            <!-- <arrow-chip class="lesson_wrapper_right_icon" /> -->
            <v-flex lg6 mx-auto class="lessons_wrapper px-5 mr-auto">
                <lesson-card v-for="(lesson, index) in lessons" :lesson="lesson" :key="index" />
            </v-flex>
            <!-- <arrow-chip :left="false" class="lesson_wrapper_left_icon" /> -->
        </div>

    </section>

    <div class="spacer"></div>

    <!-- Coaches -->
    <section>
        
        <section-header :title="'המאמנים שלנו'" :backgroundTitle="'מאמנים'" :subtitle="`םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס`">
        </section-header>

        <v-flex lg10 mx-auto>
            <v-flex class="trainers_desktop_wrapper main_dark_bg_color mt-10" d-none d-md-block>
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

    <br>
    <br>

</div>
</template>

<script>
import CourseCard from '../../components/Cards/CourseCard.vue'
import LessonCard from '../../components/Cards/LessonCard.vue'
import Partners from '../../components/Cards/Partners.vue'
import TrainerCard from '../../components/Cards/TrainerCard.vue'
import TrainerCardMobile from '../../components/Cards/TrainerCardMobile.vue'
import ArrowChip from '../../components/Chips/arrowChip.vue'
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
    },

    data() {
        return {
            focusedTrainerIndex: 0 
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
            box-shadow: 0 10px 15px 2px #0005;

            .trainers_wrapper {
                scroll-behavior: smooth;
                height: 90%;
                width: 100%;
                display: flex;
                overflow-x: auto;
                
                &::-webkit-scrollbar {
                    display: none;
                }
                
                & > div {
                    min-width: 250px;
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

    }

</style>