<template>
    <div>
        <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-flex d-flex justify-space-between>
                <v-flex xs12 md4 d-flex align-center class="relative mb-7 mb-md-0">
                    <h3>1</h3>
                    <div class="phone_card mx-auto">
                        <img src="../../../public/assets/images/phone/step1.png" alt="שלב ראשון">
                    </div>
                </v-flex>
                <v-flex xs12 md4 d-flex align-center class="relative mb-7 mb-md-0">
                    <h3>2</h3>
                    <div class="phone_card mx-auto">
                        <img src="../../../public/assets/images/phone/step2.png" alt="שלב ראשון">
                    </div>
                </v-flex>
                <v-flex xs12 md4 d-flex align-center class="relative mb-7 mb-md-0">
                    <h3>3</h3>
                    <div class="phone_card mx-auto">
                        <img src="../../../public/assets/images/phone/step3.png" alt="שלב ראשון">
                    </div>
                </v-flex>
            </v-flex>
            <v-flex d-flex justify-space-between align-start class="mt-5">
                <v-flex md4 d-flex align-center class="text-center px-10" v-for="(step, index) in steps" :key="index">
                    <p class="px-10">
                        <strong>
                            {{ step.title }}
                        </strong>
                        <br>
                        {{ step.description }}
                    </p>
                </v-flex>
            </v-flex>
        </template>
        <template v-else>
            <v-flex d-flex justify-space-between class="how_it_works_wrapper relative pa-3">
                <div class="phone_card mx-auto">
                    <img src="../../../public/assets/images/phone/step1.png" alt="שלב ראשון">
                </div>
                <div class="phone_card mx-auto">
                    <img src="../../../public/assets/images/phone/step2.png" alt="שלב ראשון">
                </div>
                <div class="phone_card mx-auto">
                        <img src="../../../public/assets/images/phone/step3.png" alt="שלב ראשון">
                    </div>
            </v-flex>
            <br>
            <div class="mt-10 px-5">
                <div v-for="(step, index) in steps" :key="index">
                    <h2>
                        {{index + 1}}. {{ step.title }}
                    </h2>
                    <p>
                        {{ step.description }}
                    </p>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

// import PhoneCard from '../../components/Cards/PhoneCard.vue';

export default {

    components: {
        // PhoneCard,
    },

    data() {
        return {
            steps: [
                {
                    title: 'מתחילים ללמוד לשחק כמו אלופים!',
                    description: `אחרי ההרשמה לתוכנית השנתית, אתם מקבלים גישה למערכת הקורס שלנו. 
                        ישנם כ 50 תרגילים המנוהלים לפי יומן שמגדיר מתי לבצע כל אימון`
                },
                {
                    title: 'צופים בשיעורים בהתאמה אישית',
                    description: `תוכלו לבצע את התרגילים לפי הסדר או לבחור באופן עצמאי את השיעורים לפי טכניקה מועדפת. ישנה אפשרות לחזור אחורה בשיעורים כדי לתרגל וניתן אף לשנות ביומן את מועדי האימון לפי מערכת השעות האישית שלכם!`
                },
                {
                    title: 'מתרגלים ושוב מתרגלים',
                    description: `קחו את הנייד למגרש האמיתי ותתאמנו בליווי של הדרכת המאמנים`
                },
            ]
        }
    }

}
</script>

<style scoped lang="scss">

    h3 {
        font-size: 7em;
        position: absolute;
        right: 15px;
    }

    
    ::-webkit-scrollbar {
        display: none;
    }

    .phone_card {
        height: 50vh;
        width: 25vh;
        box-shadow: 0 0 5px 4px var(--subColor);
        border: 2px solid var(--mainColor);
        border-radius: 20px;
        position: relative;

        img {
            height: calc(100% + 3px);
            width: calc(100% + 2px);
            border-radius: 20px;
            position: absolute;
            top: -1px;
            right: -1px;
        }

        p {
            bottom: -35%;
            position: absolute;
        }
    }

    @media only screen and (max-width: 1400px) {
        h3 {
            right: -15px;
        }
    }

    @media only screen and (max-width: 600px) {
        
        .how_it_works_wrapper {
            height: 50vh;
        }
        
        .phone_card {
            position: absolute;
            top: 0;
        }
        
        .phone_card:nth-of-type(1) {
            right: 5%;
            z-index: 3;
        }
        
        .phone_card:nth-of-type(2) {
            right: 25%;
            z-index: 2;
            rotate: -5deg;
        }
        
        .phone_card:nth-of-type(3) {
            right: 45%;
            top: 3%;
            z-index: 1;
            rotate: -10deg;
        }

    }
</style>