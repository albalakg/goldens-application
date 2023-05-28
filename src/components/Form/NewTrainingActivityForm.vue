<template>
    <div>
        <main-button
            class="mt-3"
            text="הוסף אימון"
            shadow
            @submit="addTrainingSchedule()"
        />
        <v-dialog
            v-model="trainingDialog"
            scrollable 
            :overlay="false"
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card class="pa-5 new_training_schedule">
                <v-form ref="form" @submit.prevent="submit()">
                    <h2>
                        הוסף אימון ללוח השנה שלך
                    </h2>
                    <br>
                    <lesson-select 
                        :items="lessons"
                        ref="lessons"
                        @onChange="onChangeLesson"
                    />
                    <br>
                    <v-date-picker class="w100" v-model="form.date" color="#0e3556"></v-date-picker>
                    <br>
                    <v-flex md8 mx-auto class="mt-4">
                        <main-button
                            text="צור אימון"
                            shadow
                            subColor
                            @submit="submit()"
                        />
                    </v-flex>
                    <br>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import LessonSelect from './Inputs/LessonsSelect.vue';
import MainButton from '../Buttons/MainButton.vue'

export default {
    components: { 
        LessonSelect,
        MainButton,
    },

    props: {
        lessons: {
            type: Array,
            required: true
        },
        courseId: {
            type: Number,
            required: true
        },
    },

    data() {
        return {
            form: {
                lessonId: '',
                date: ''
            },
            trainingDialog: false,
            loading: false,
        }
    },

    created() {
       this.setInitDate();
    },

    methods: {
        setInitDate() {
            const today = new Date;
            this.form.date = new Date(today.getTime() - (today.getTimezoneOffset() * 60000 ))
                                .toISOString()
                                .split("T")[0]
        },
        
        addTrainingSchedule() {
            this.trainingDialog = !this.trainingDialog;
        },
        
        onChangeLesson(lessonId) {
            this.form.lessonId = lessonId;
        },

        async submit() {
            if(this.loading || !this.validate()) {
                return;
            }

            this.loading = true;
            await this.$store.dispatch('UserState/createTrainingSchedule', {...this.form, courseId: this.courseId})
            this.loading = false;
        },

        validate() {
            return this.$refs.lessons.validate();
        },
    }
}
</script>

<style scoped>

    .new_training_schedule {
        width: 500px;
        min-height: 50vh;
    }

</style>
