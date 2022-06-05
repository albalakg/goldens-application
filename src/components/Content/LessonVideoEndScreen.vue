<template>
    <v-flex d-flex justify-center class="lesson_video_end_screen_wrapper w100 h100 text-right white_text_color">
        <v-flex md4 mx-auto class="h100">
            <h3>
                השיעור הבא יתחיל בעוד <span class="timer_text">{{timer}} שניות</span>
            </h3>
            <img class="mt-2" :src="lesson.imageSrc" alt="lesson image">
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
            timer: 15,
            timerInterval: null
        }
    },

    created() {
        this.startTimer();
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
        height: 30%;
        width: 100%;
        border-radius: 12px;
        object-fit: cover;
    }

    .lesson_video_end_screen_wrapper > div{
        transform: translate(0, 25%);
    }

    .timer_text {
        color: #346b9b;
    }

</style>