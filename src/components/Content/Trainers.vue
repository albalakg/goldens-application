<template>
    <div>
        
        <section-header :right="right" :dark="dark" :title="'המאמנים שלנו'" :backgroundTitle="'מאמנים'" :subtitle="`בצוות תמצאו אנשי המפתח מעולם הכדורגל- הם בחרו את התרגילים והתכנים הכי מדוייקים בשבילכם! הם מקצועיים, הם מתאימים לתכונות שאנחנו מחפשים עבורכם והם הכי טובים במה שהם עושים.`">
        </section-header>

        <br>

        <div class="trainer_content">
            <v-flex v-if="$vuetify.breakpoint.mdAndUp" d-flex justify-space-between flex-wrap>
                <!-- <img class="trainers_background" src="./../../../public/assets/images/trainers/trainers-desktop.webp" alt="trainers"> -->
                <div v-for="(trainer, index) in trainers" :key="index">
                    <img class="trainer_card" src="./../../../public/assets/images/trainers/trainer-card.png" alt="trainer card">
                </div>
            </v-flex>

            <v-flex class="trainers_mobile_wrapper mt-md-10 pt-md-5" v-else>
                <arrow-chip v-show="showNextTrainerArrow" @submit="goToLastTrainer()" :left="false" class="lesson_wrapper_right_icon" />
                <v-flex class="trainers_wrapper mr-auto" ref="trainers">
                    <div v-for="(trainer, index) in trainers" :key="index" :ref="`trainer-${index}`">
                        <img class="trainer_card" src="./../../../public/assets/images/trainers/trainer-card.png" alt="trainer card">
                    </div>
                </v-flex>
                <arrow-chip v-show="showLastTrainerArrow" @submit="goToNextTrainer()" class="lesson_wrapper_left_icon" />
            </v-flex>
        </div>
        
    </div>
</template>

<script>
import ArrowChip from '../Chips/arrowChip.vue';
import SectionHeader from '../Texts/SectionHeader.vue';

export default {

    components: {
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
            scrollingDisabled:   false,
        }
    },

    mounted() {
        this.displayArrowsByScrolling();
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
            console.log('focusedTrainerIndex', this.focusedTrainerIndex, this.focusedTrainerIndex !== 0 && this.trainers.length > 0);
            return this.focusedTrainerIndex !== 0 && this.trainers.length > 0;
        },

        showLastTrainerArrow() {
            return this.focusedTrainerIndex !== (this.trainers.length - 1) && this.trainers.length > 0;
        },
    },

    methods: {
        displayArrowsByScrolling() {
            const wrapper           = this.$refs.trainers;
            const trainerMarginSize = 66; 
            const trainerWidthSize  = this.$refs['trainer-0'][0].clientWidth
            const trainerSize       = trainerMarginSize + trainerWidthSize;
            wrapper.addEventListener('scroll', (event) => {
                const nextFocusedTrainer = 4 - Math.floor((wrapper.scrollWidth + event.currentTarget.scrollLeft) / trainerSize);
                if(!this.scrollingDisabled) {
                    this.moveToTrainer(nextFocusedTrainer)
                } else {
                    this.focusedTrainerIndex = nextFocusedTrainer;
                }
            })
        },
        
        goToLastTrainer() {
            this.moveToTrainer(this.focusedTrainerIndex - 1)
        },

        goToNextTrainer() {
            this.moveToTrainer(this.focusedTrainerIndex + 1)
        },

        moveToTrainer(goToTrainerIndex) {
            try {
                this.scrollingDisabled = true;
                setTimeout(() => {
                    this.scrollingDisabled = false;
                }, 500);
                // const trainer = this.$refs[`trainer-${goToTrainerIndex}`][0].$el;
                const trainer = this.$refs[`trainer-${goToTrainerIndex}`][0];
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

    .trainer_content {
        position: relative;
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
            right: 0px;
            top: 33%;
            z-index: 5;                
        }

        .lesson_wrapper_left_icon {
            position: absolute;
            left: 0px;
            top: 33%;
            z-index: 5;                
        }
    }
</style>