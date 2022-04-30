<template>
    <section>
        
        <section-header :dark="dark" :title="'המאמנים שלנו'" :backgroundTitle="'מאמנים'" :subtitle="`םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס`">
        </section-header>

        <v-flex :class="{
            'lg10 xl9': !full
        }" mx-auto>
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
</template>

<script>
import TrainerCard from '../Cards/TrainerCard.vue';
import TrainerCardMobile from '../Cards/TrainerCardMobile.vue';
import ArrowChip from '../Chips/arrowChip.vue';
import SectionHeader from '../Texts/SectionHeader.vue';

export default {

    components: {
        TrainerCard,
        TrainerCardMobile,
        ArrowChip,
        SectionHeader,
    },

    props: {
        dark: {
            type: Boolean
        },

        full: {
            type: Boolean
        }
    },

    data() {
        return {
            focusedTrainerIndex: 0,
        }
    },
    
    computed: {
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
        
        goToLastTrainer() {
            this.moveToTrainer(this.focusedTrainerIndex - 1)
        },

        goToNextTrainer() {
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
    }
}
</script>

<style scoped lang="scss">

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
</style>