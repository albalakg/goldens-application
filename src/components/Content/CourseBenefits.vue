<template>
    <div class="course_benefits_wrapper w100 pa-10 second_dark_bg_color" :class="{'rounded': $vuetify.breakpoint.mdAndUp}">
        <div class="course_benefits_content h100 w100">
            <circle-decorator class="circle_decorator"/>
            <!-- <h2 class="white_text_color">
                <span class="sub_text_color">
                    מה יצא 
                </span>
                לכם מזה
            </h2> -->

            <v-flex d-flex :class="{
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
                    justify-start
                    class="course_benefit_item mb-4 mb-md-0"
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

    computed: {
        items() {
        return [
            {
                icon: require("../../../public/assets/images/icons/strength.png"),
                title: "חינוך לספורט ואורח חיים של כדורגלן",
                content: `האקדמיה מעניקה הכוונה ותמיכה,  הקניית ערכים ומוסריות, ילמד כיצד לחיות אורח חיים מוקפד ובריא של ספורטאי ויהפוך לשחקן מוביל`,
            },
            {
                icon: require("../../../public/assets/images/icons/trophy.png"),
                title: "אימון מנטאלי מעצים, בשלות ואופי חזק",
                content: `הרגשת ביטחון במגרש ומחוצה לו, התמודדות עם אתגרים, עבודת צוות ותקשורת, מינוף כישלונות וחתירה למטרה שהוצבה`,
            },
            {
                icon: require("../../../public/assets/images/icons/technic.png"),
                title: "טכניקה מקצועית, שליטה במיומנויות",
                content: `סרטונים מלאי תוכן וידע סופר מדויק שנבחרו בקפידה ע״י המומחים, תרגול ופיתוח המיומנויות החשובות ביותר במשחק, התרגילים בהתאמה לסדר יומו וליכולת שלו`,
            },
        ];
        },
    },
}
</script>

<style scoped lang="scss">

    
    .course_benefits_wrapper {
        min-height: 35vh;
        margin-top: 10vh;
        position: relative;
        z-index: 2;

        .course_benefits_content {
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                height: 80px;
                width: 80px;
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
                top: 0%;
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
                // padding-left: 6%;
            }


            h3 {
                font-size: 1.5em;
            }
            
            p {
                font-size: 1.1em;
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

        .course_benefits_wrapper {
            height: fit-content;
        }
    }
    

</style>