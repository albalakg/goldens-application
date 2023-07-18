<template>
    <v-flex d-flex class="detailed_course_card_horizontal dark_shadow px-4 pb-1 pt-6" :class="{
        'flex-wrap': $vuetify.breakpoint.smAndDown
    }">
        <v-flex md4>
            <img loading="lazy" :src="course.imageSrc" alt="תמונת הקורס" />
        </v-flex>
        <v-flex xs12 md4 class="pa-5">
            <strong>
                {{ course.name }}
            </strong>
            <br>
            <small v-html="course.description">
            </small>
        </v-flex>
        <v-flex xs12 md4 d-flex class="ma-md-10 px-10 pb-10 pb-md-0 detailed_course_card_actions" :class="{
            'flex-column main_border_right': $vuetify.breakpoint.mdAndUp
        }">
            <v-flex md6 class="detailed_course_card_pricing">
                 <strong>
                    <small>
                        סה"כ מחיר
                    </small>
                </strong>
                <br>
                <h2>
                    {{ price }}
                </h2>
            </v-flex>
            <v-flex md6 class="detailed_course_card_expiration mr-10 mr-md-0">
                <strong>
                    <small>
                        תקף עד
                    </small>
                </strong>
                <br>
                <h2>
                    {{ expiredAt }}
                </h2>
            </v-flex>
        </v-flex>

        <div class="buy_button">
            <router-link :to="`/orders?courseId=${course.id}`">
                <main-button
                    shadow
                    :styleConfig="{
                        padding: '10px 25px',
                        borderRadius: '30',
                    }"
                >
                    <template slot="content">
                        <v-flex d-flex align-center justify-center>
                            <template>
                                <strong class="white--text ml-3">
                                    לרכישה    
                                </strong>
                                <arrow />

                            </template>
                        </v-flex>
                    </template>
                </main-button>
            </router-link>
        </div>
    </v-flex>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue';
import Arrow from '../General/Arrow.vue';

export default {
    components: { MainButton, Arrow },

    props: {
        course: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            lessonImage: require('../../../public/assets/images/general/lesson.svg'),
            timeImage: require('../../../public/assets/images/general/time.svg'),
            courseAreaImage: require('../../../public/assets/images/general/course_area.svg'),
        }
    },

    computed: {
        totalCourseAreas() {
            return ContentService.countTotalCourseAreasByCourseId(this.course.id);
        },

        totalDuration() {
            const seconds = ContentService.countTotalCourseDuration(this.course.id);
            return ContentService.getTimeTextBySeconds(seconds);
        },
        
        totalLessons() {
            return ContentService.countTotalLessonsByCourseId(this.course.id)
        },

        price() {
            return ContentService.getCoursePrice(this.course);
        },

        expiredAt() {
            return ContentService.getExpiredDate()
        }
    },

    methods: {
        startTrailer() {
            this.$refs.video.playVideo()
        }
    }
}
</script>

<style scoped lang="scss">

    .detailed_course_card_horizontal {
        min-width: 100%;
        border-radius: 12px;
        position: relative;
        background-color: #fff;

        img {
            width: 100%;
            border-radius: 15px;
        }

        .detailed_course_card_actions {

            strong {
                color: #555
            }

            h2 {
                font-size: 1.5em;
            }
        }

    }

    .buy_button {
        position: absolute;
        bottom: -25px;
        left: 0;
        right: 0;
        width: 90%;
        margin: auto;
    }

    @media only screen and (min-width: 601px) {
        .detailed_course_card_pricing {
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
        }
    
        .detailed_course_card_expiration {
            margin-top: 15px;
        }

        .buy_button {
            position: absolute;
            bottom: 30px;
            left: -50px;
            width: 15%;
            right: unset;
            margin: unset;
        }
    }

</style>