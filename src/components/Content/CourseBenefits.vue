<template>
    <div class="course_benefits_wrapper w100 pa-10 second_dark_bg_color rounded">
        <div class="course_benefits_content h100 w100 pb-5">
            <circle-decorator class="circle_decorator"/>
            <h2 class="white_text_color">
                <span class="sub_text_color">
                    מה יצא 
                </span>
                לכם מזה
            </h2>

            <v-flex d-flex class="mt-10" :class="{
                'flex-wrap': $vuetify.breakpoint.smAndDown
            }">
                <v-flex 
                    :class="{
                        'course_benefit_padding_right': index > 0 && $vuetify.breakpoint.mdAndUp,
                        'course_benefit_padding_left': index + 1 < items.length && $vuetify.breakpoint.mdAndUp,
                    }" 
                    xs12
                    md4
                    v-for="(item, index) in items" 
                    :key="index"
                    d-flex
                    flex-column
                    justify-end
                    class="course_benefit_item"
                >
                    <img :src="item.icon" :alt="`course ${item.title}`">
                    <div class="circle"></div>
                    <h3 class="white_text_color">
                        {{ item.title }}
                    </h3>
                    <p class="grey_text_color">
                        {{ item.content }}
                    </p>
                </v-flex>
            </v-flex>
        </div>
    </div>
</template>

<script>
import CircleDecorator from "../Decorators/CircleDecorator.vue"

export default {
    components: { CircleDecorator },

    props: {
        items: {
            type: Array,
            required: true
        }
    },
}
</script>

<style scoped lang="scss">

    
    .course_benefits_wrapper {
        margin-top: 10vh;
        position: relative;
        z-index: 2;

        .course_benefits_content {
            overflow: hidden;
            padding-top: 40px;

            img {
                height: 25%;
                width: 25%;
                margin-bottom: 10px;
                position: relative;
                z-index: 2;
            }

            h2 {
                font-size: 1.7em;
            }

            .circle_decorator {
                position: absolute;
                height: 100%;
                width: 100%;
                right: -50%;
                top: -50%;
                transform: rotate(-90deg);
            }

            .course_benefit_item {
                position: relative;

                .circle {
                    height: 30px;
                    width: 30px;
                    position: absolute;
                    background-color: #8885;
                    border-radius: 50%;
                    top: 40%
                }
            }

            .course_benefit_padding_right {
                padding-right: 6%;
            }

            .course_benefit_padding_left {
                padding-left: 6%;
            }


            h3 {
                font-size: 1em;
            }
            
            p {
                font-size: .8em;
            }
        }

        .course_lessons_wrapper {
            position: absolute;
            width: 100%;
            top: -200px;
            
            .course_lesson_card {
                height: 400px;
                min-height: 20vh;
                max-height: 70vh;
            }
        }
    }


    @media only screen and (max-width: 600px) {
        .circle {
            top: 30% !important;
        }
    }
    

</style>