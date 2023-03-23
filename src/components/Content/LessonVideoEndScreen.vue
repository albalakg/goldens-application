<template>
    <v-flex d-flex justify-center align-center class="lesson_video_end_screen_wrapper w100 h100 text-right white_text_color">
        <v-flex md4 lg5 mx-auto v-if="$vuetify.breakpoint.mdAndUp">
            <h3>
                השיעור הבא יתחיל בעוד <span class="timer_text">{{timer}} שניות</span>
            </h3>
            <img loading="lazy" class="mt-2" :src="lesson.imageSrc" alt="lesson image">
            <small>
                {{lesson.name}}
            </small>

            <v-flex d-flex class="mt-3">
                <main-button 
                    slim
                    dark
                    text="ביטול"
                    class="ml-3"
                    @submit="closeEndScreen()"
                />
                <main-button 
                    ref="nextButton"
                    slim    
                    class="mr-3"
                    text="הפעלה"
                    @submit="moveToNextLesson()"
                />
            </v-flex>
        </v-flex>

        <v-flex v-else class="pa-3">
            <h3>
                השיעור הבא יתחיל בעוד <span class="timer_text">{{timer}} שניות</span>
            </h3>
            <small>
                {{lesson.name}}
            </small>
            <v-flex xs5>
                <img loading="lazy" class="mt-2" :src="lesson.imageSrc" alt="lesson image">
            </v-flex>
            <v-flex d-flex class="mt-1">
                <main-button 
                    slim
                    dark
                    text="ביטול"
                    class="ml-3"
                    @submit="closeEndScreen()"
                />
                <main-button 
                    ref="nextButton"
                    slim    
                    class="mr-3"
                    text="הפעלה"
                    @submit="moveToNextLesson()"
                />
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import MainButton from "../Buttons/MainButton.vue"

export default {
  components: { MainButton },

    props: {
        lesson: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            timer: 105,
            timerInterval: null
        }
    },

    created() {
        this.startTimer();
    },

    mounted() {
        this.focusNextButton();
    },

    methods: {
        startTimer() {
            this.timerInterval = setInterval(() => {
                this.timer--;
                if(!this.timer) {
                    this.closeTimer();
                    this.moveToNextLesson();
                }
            }, 1000);
        },

        closeTimer() {
            clearInterval(this.timerInterval);
        },

        focusNextButton() {
            this.$refs.nextButton.$el.focus()
        },

        moveToNextLesson() {
            this.$emit('nextLesson', this.lesson);
        },

        closeEndScreen() {
            this.$emit('closeEndScreen')
        }
    },

    beforeDestroy() {
        this.closeTimer();
    }

}
</script>

<style scoped>

    img {
        width: 100%;
        border-radius: 12px;
        object-fit: cover;
    }

    .timer_text {
        color: #346b9b;
    }

    @media only screen and (max-width: 600px) {
    
        img {
            height: 60px;
        }

    }

</style>