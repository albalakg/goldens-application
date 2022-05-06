<template>
    <div class="detailed_course_card dark_shadow w100 white_bg_color px-3 pb-3">
        <video-card 
            ref="video"
            :src="course.trailerSrc"
            @playClicked="startTrailer()"
        />
        
        <div class="px-3 mt-3">
            <v-flex d-flex justify-space-between align-center>
                <v-flex d-flex>
                    <img class="ml-2 mt-1" loading="lazy" :src="courseAreaImage" alt="course area image">
                    <strong>
                        תחומי קורס
                    </strong>
                </v-flex>
               <strong>
                   {{ totalCourseAreas }}
               </strong>
            </v-flex>
            <div class="divider"></div>
            <v-flex d-flex justify-space-between align-center>
                <v-flex d-flex>
                    <img class="ml-2 mt-1" loading="lazy" :src="lessonImage" alt="course area image">
                    <strong>
                        שיעורים
                    </strong>
                </v-flex>
               <strong>
                   {{ totalLessons }}
               </strong>
            </v-flex>
            <div class="divider"></div>
            <v-flex d-flex justify-space-between align-center>
                <v-flex d-flex>
                    <img class="ml-2 mt-1" loading="lazy" :src="timeImage" alt="course area image">
                    <strong>
                        זמן
                    </strong>
                </v-flex>
               <strong>
                   {{ totalDuration }}
               </strong>
            </v-flex>
            <div class="main_divider main_bg_color my-5"></div>
            
            <v-flex d-flex class="detailed_course_bottom">
                <v-flex xs6 class="detailed_course_card_pricing">
                    <strong>
                        סה"כ מחיר
                    </strong>
                    <br>
                    <h2>
                        {{ price }}
                    </h2>
                </v-flex>
                <v-flex xs6 class="detailed_course_card_expiration">
                    <strong>
                        תקף עד
                    </strong>
                    <br>
                    <h2>
                        {{ expiredAt }}
                    </h2>
                </v-flex>
            </v-flex>

            <v-flex md8 mx-auto class="buy_button">
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
            </v-flex>
        </div>
    </div>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue';
import Arrow from '../General/Arrow.vue';
import VideoCard from "./VideoCard.vue"

export default {
    components: { VideoCard, MainButton, Arrow },

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
            return  '₪' + Math.floor(this.course.price);
        },

        expiredAt() {
            const yearFromNow   = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
            let year            = String(yearFromNow.getFullYear()).substring(2, 4);
            let month           = String(yearFromNow.getMonth());
            let day             = String(yearFromNow.getDay());
            
            if(day.length === 1) {
                day = `0${day}`;
            }

            if(month.length === 1) {
                month = `0${month}`;
            }

            return `${day}.${month}.${year}`;
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

    .detailed_course_card {
        min-width: 350px;
        border-radius: 12px;
        position: relative;

    }

    .divider {
        background-color: #ccc;
        height: 1px;
        margin: 15px 0;
    }

    .main_divider {
        height: 2px;
        width: 100%;
    }

    .detailed_course_bottom {
        strong {
            color: #555
        }

        h2 {
            font-size: 1.3em;
        }
    }

    .detailed_course_card_pricing {
        border-left: 1px solid #888;
        padding-right: 5%;
    }

    .detailed_course_card_expiration {
        border-right: 1px solid #888;
        padding-right: 18%;
    }

    .buy_button {
        position: relative;
        top: 55px;
    }

</style>