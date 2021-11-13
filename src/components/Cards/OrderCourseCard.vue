<template>
<div class="order_course_card_wrapper dark_shadow">
    <v-flex d-flex>
        <v-flex xs4 class="order_course_card_video_card">
            <video :src="course.trailer" controls controlsList="nodownload"></video>
            <!-- <img :src="course.trailer" alt=""> -->
        </v-flex>
        <v-flex xs5 class="order_course_card_description_card my-5">
            <v-flex xs9 mx-auto>
                <p class="order_course_card_description_title">
                    <strong>
                        {{ course.title }}
                    </strong>
                </p>
                <p class="order_course_card_description_text mb-0">
                    {{ course.description }}
                </p>
            </v-flex>
        </v-flex>
        <v-flex xs3 class="order_course_card_details_card my-5 mr-10">
            <p class="sub_text mb-0">
                סה"כ מחיר
            </p>
            
            <strong class="price_text">
                ₪{{ course.price }}
            </strong>

            <v-flex xs4 class="my-3">
                <div class="divider"></div>
            </v-flex>

            <p class="sub_text mb-0">
                תקף למשך
            </p>

            <strong class="expired_at">
                שנה
            </strong>
        </v-flex>
        
        <v-flex class="order_course_card_actions">
            <MainButton
                shadow
                :styleConfig="{
                    padding: '7px 45px'
                }"
            >
                <template slot="content">
                    <span>
                        בואו ללמוד
                    </span>
                    <v-icon color="white">mdi-menu-left</v-icon>
                </template>
            </MainButton>
        </v-flex>
    </v-flex>
</div>
</template>

<script>
import MainButton from './../Buttons/MainButton.vue';

export default {
    components: {
        MainButton,
    },

    props: {
        course: {
            type: Object,
            required: true
        }
    },

    data() {
        return {

        }
    }
}
</script>

<style scoped lang="scss">
    
    .order_course_card_wrapper {
        position: relative;
        padding: 25px;
        border-radius: 12px;
        height: 240px;

        img, video {
            border-radius: 12px;
            height: 100%;
            width: 100%;
            max-height: 190px;
            object-fit: cover;
        }

        .order_course_card_actions {
            position: absolute;
            left: -50px;
            bottom: 10%;
        }

        .order_course_card_description_card {
            border-left: 4px solid rgb(255, 89, 34);

            .order_course_card_description_text {
                font-size: 0.9em;
                overflow: hidden;
                text-overflow: ellipsis;
                max-height: 110px;
            }
        }

        .order_course_card_details_card {
            .price_text {
                font-weight: bold;
                font-size: 2.3em;
            }

            .expired_at {
                font-weight: bold;
                font-size: 1.8em;
            }
        }
    }

</style>