<template>
    <div>
        
        <section-header :right="right" :dark="dark" :title="'המאמנים שלנו'" :backgroundTitle="'מאמנים'" :subtitle="subtitle">
        </section-header>

        <br>

        <div class="trainer_content">
            <v-flex v-if="$vuetify.breakpoint.mdAndUp" d-flex justify-space-between flex-wrap class="trainers_wrapper">
                <v-flex md3 v-for="(trainer, index) in trainers" :key="index" class="mb-2 px-5 trainer_wrapper">
                    <div class="trainer_card">
                        <img loading="lazy" class="trainer_shield" src="./../../../public/assets/images/trainers/trainer-card.webp" alt="trainer shield">
                        <img loading="lazy" class="trainer_person" :src="trainer.imageSrc" alt="trainer person">
                        <div class="trainer_card_details">
                            <h4 class="trainer_name main_text_color">
                                {{
                                    trainer.name
                                }}
                            </h4>
                            <v-divider class="mb-2 mt-2"></v-divider>
                            <p class="main_text_color">
                                {{
                                    trainer.title
                                }}
                            </p>
                        </div>
                    </div>
                </v-flex>
            </v-flex>

            <v-flex class="trainers_mobile_wrapper mt-md-10 pt-md-5" v-else>
                <arrow-chip v-show="showNextTrainerArrow" @submit="goToLastTrainer()" :left="false" class="lesson_wrapper_right_icon" />
                <v-flex class="trainers_wrapper" ref="trainers">
                    <div v-for="(trainer, index) in trainers" :key="index" :ref="`trainer-${index}`">
                        <div class="trainer_card">
                            <img loading="lazy" class="trainer_shield" src="./../../../public/assets/images/trainers/trainer-card.webp" alt="trainer shield">
                            <img loading="lazy" class="trainer_person" :src="trainer.imageSrc" alt="trainer person">
                            <div class="trainer_card_details">
                                <h4 class="trainer_name main_text_color">
                                    {{
                                        trainer.name
                                    }}
                                </h4>
                                <v-divider class="mb-2 mt-2"></v-divider>
                                <p class="main_text_color">
                                    {{
                                        trainer.title
                                    }}
                                </p>
                            </div>
                        </div>
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
            subtitle: `בצוות תמצאו אנשי המפתח מעולם הכדורגל- הם בחרו את התרגילים והתכנים הכי מדוייקים בשבילכם! הם מקצועיים, הם מתאימים לתכונות שאנחנו מחפשים עבורכם והם הכי טובים במה שהם עושים.`
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
                if(this.scrollingDisabled) {
                    return;
                }

                this.scrollingDisabled = true;
                setTimeout(() => {
                    this.scrollingDisabled = false;
                }, 300);

                const trainers      = document.querySelector('.trainers_wrapper');
                const trainer       = this.$refs[`trainer-${goToTrainerIndex}`][0];
                const trainerMargin = 67;
                trainers.scrollLeft = (trainer.clientWidth + trainerMargin) * -1 * goToTrainerIndex;
                // trainer.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
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
    
    .trainer_wrapper {
        transition: .3s transform linear;
        
        &:hover {
            transform: scale(1.05);
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
            pointer-events: none;
            scroll-behavior: smooth;
            
            @media only screen and (max-width: 600px) {
                margin-right: 30px;
            }

            
            &::-webkit-scrollbar {
                display: none;
            }
            
            & > div {
                min-width: 80%;
                margin: 0 10%;
                text-align: center;
            }
        }

        .lesson_wrapper_right_icon {
            position: absolute;
            right: 10px;
            top: 33%;
            z-index: 5;                
        }

        .lesson_wrapper_left_icon {
            position: absolute;
            left: 10px;
            top: 33%;
            z-index: 5;                
        }
    }

    .trainer_card {
        width: 90%;
        position: relative;

        .trainer_card_details {
            position: absolute;
            z-index: 2;
            top: 57%;
            left: 0;
            right: 0;
            text-align: center;
            margin: auto;

            .trainer_name {
                font-size: 2em;
            }

            p {
                font-size: 1.2em;
                font-weight: bold;
            }

            @media only screen and (max-width: 1600px) {
                .trainer_name {
                    font-size: 1.7em;
                }

                p {
                    font-size: 1em;
                }
            }
            
            @media only screen and (max-width: 1400px) {
                .trainer_name {
                    font-size: 1.3em;
                }

                p {
                    font-size: .7em;
                }
            }
            
            @media only screen and (max-width: 600px) {
                .trainer_name {
                    font-size: 1.7em;
                }

                p {
                    font-size: 1em;
                }
            }
        }

        .trainer_shield {
            position: relative;
            width: 100%;
        }

        .trainer_person {
            position: absolute;
            bottom: calc(47% + -1px);
            left: 0;
            right: 0;
            margin: auto;
            width: 90%;
            
            @media only screen and (min-width: 1700px) {
                bottom: calc(47% + -2px);
            }

            @media only screen and (max-width: 600px) {
                width: 88%;
                top: calc(10% - 2px);
            }
        }
    }
</style>