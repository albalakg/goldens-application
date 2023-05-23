<template>
    <div>
        
        <section-header :right="right" :dark="dark" :title="'המאמנים שלנו'" :backgroundTitle="'מאמנים'" :subtitle="`בצוות תמצאו אנשי המפתח מעולם הכדורגל- הם בחרו את התרגילים והתכנים הכי מדוייקים בשבילכם! הם מקצועיים, הם מתאימים לתכונות שאנחנו מחפשים עבורכם והם הכי טובים במה שהם עושים.`">
        </section-header>

        <br>
        
        <v-flex :class="{
            'xs10 xl9': !full
        }" mx-auto>
            <v-flex class="trainers_desktop_wrapper mt-10" d-none d-md-block>
                <v-flex class="trainers_wrapper mr-auto">
                    <trainer-card class="ml-2" v-for="(trainer, index) in viewTrainers" :trainer="trainer" :key="index" />
                </v-flex>
            </v-flex>
            
            <v-flex class="trainers_mobile_wrapper mt-10 pt-5" d-flex d-md-none>
                <arrow-chip v-show="showNextTrainerArrow" @submit="goToLastTrainer()" :left="false" class="lesson_wrapper_right_icon" />
                <v-flex class="trainers_wrapper mr-auto" ref="trainers">
                    <trainer-card-mobile v-for="(trainer, index) in trainers" :trainer="trainer" :key="index" :ref="`trainer-${index}`" />
                </v-flex>
                <arrow-chip v-show="showLastTrainerArrow" @submit="goToNextTrainer()" class="lesson_wrapper_left_icon" />
            </v-flex>

            
        </v-flex>



    </div>
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

        right: {
            type: Boolean,
            default: false
        },

        full: {
            type: Boolean
        },

        trainers: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            focusedTrainerIndex: 0,
        }
    },
    
    computed: {
        viewTrainers() {
            const trainers = this.trainers.slice();
            const maxTrainers  = 5;
            const viewTrainers = [];

            for(let index = 0; index < maxTrainers; index++) {
                const randomIndex = Math.floor(Math.random() * trainers.length);
                viewTrainers.push(trainers[randomIndex])
                trainers.splice(randomIndex, 1);

                if(!trainers.length) {
                    break;
                }
            }
            return viewTrainers;
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