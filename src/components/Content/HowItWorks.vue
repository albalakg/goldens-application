<template>
    <div>
        <v-flex d-flex justify-space-between>
            <v-flex md4 d-flex align-center class="relative">
                <h3>1</h3>
                <div class="phone_card mx-auto">
                    <img src="../../../public/assets/images/phone/step1.png" alt="שלב ראשון">
                </div>
            </v-flex>
            <v-flex md4 d-flex align-center class="relative">
                <h3>2</h3>
                <div class="phone_card mx-auto">
                    <img src="../../../public/assets/images/phone/step2.png" alt="שלב ראשון">
                </div>
            </v-flex>
            <v-flex md4 d-flex align-center class="relative">
                <h3>3</h3>
                <div class="phone_card mx-auto">
                    <img src="../../../public/assets/images/phone/step3.png" alt="שלב ראשון">
                </div>
            </v-flex>
        </v-flex>
        <v-flex d-flex justify-space-between align-start class="mt-5">
            <v-flex md4 d-flex align-center class="text-center px-10">
                <p class="px-10">
                    <strong>
                        מתחילים ללמוד לשחק כמו אלופים! 
                    </strong>
                    <br>
                    אחרי ההרשמה לתוכנית השנתית, אתם מקבלים גישה למערכת הקורס שלנו. 
                    ישנם כ 50 תרגילים המנוהלים לפי יומן שמגדיר מתי לבצע כל אימון 

                </p>
            </v-flex>
            <v-flex md4 d-flex align-center class="text-center px-10">
                <p class="px-10">
                    <strong>
                        צופים בשיעורים בהתאמה אישית
                    </strong>
                    <br>
                    תוכלו לבצע את התרגילים לפי הסדר או לבחור באופן עצמאי את השיעורים לפי טכניקה מועדפת. ישנה אפשרות לחזור אחורה בשיעורים כדי לתרגל וניתן אף לשנות ביומן את מועדי האימון לפי מערכת השעות האישית שלכם! 
                </p>
            </v-flex>
            <v-flex md4 d-flex align-center class="text-center px-10">
                <p class="px-10">
                    <strong>
                        מתרגלים ושוב מתרגלים
                    </strong>
                    <br>
                    קחו את הנייד למגרש האמיתי ותתאמנו בליווי של הדרכת המאמנים
                </p>
            </v-flex>
        </v-flex>
    </div>
</template>

<script>

// import PhoneCard from '../../components/Cards/PhoneCard.vue';

export default {

    components: {
        // PhoneCard,
    },

}
</script>

<style scoped lang="scss">

    h3 {
        font-size: 7em;
        position: absolute;
        right: 5%;
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

</style>