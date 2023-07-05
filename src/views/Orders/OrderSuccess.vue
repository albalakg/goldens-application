<template>
    <v-flex md10 xl9 mx-auto text-center class="auth_padding_top px-2 px-md-0">
        <br>
        <br>
        <h1>
            ההזמנה בוצעה בהצלחה!
        </h1>
        <h2 class="grey_text_color">תודה על הרכישה וברוך הבא לאקדמיה שלנו</h2>
        <br>
        <br>
        <v-flex xl5 lg6 md8 sm10 mx-auto v-if="order">
            <v-flex d-flex>
                <v-flex xs6 class="text-right">
                    <span>מספר אישור</span>
                </v-flex>
                <v-flex xs6 class="text-left">
                    {{ order.order_number }}
                </v-flex>
            </v-flex>
            <v-divider class="my-4"></v-divider>
            <v-flex d-flex>
                <v-flex xs6 class="text-right">
                    <span>סכום הזמנה</span>
                </v-flex>
                <v-flex xs6 class="text-left">
                    ₪{{ price }}
                </v-flex>
            </v-flex>
            <v-divider class="my-4"></v-divider>
            <v-flex d-flex>
                <v-flex xs6 class="text-right">
                    <span>תוקף הרכישה</span>
                </v-flex>
                <v-flex xs6 class="text-left">
                    {{ expiredAt }}
                </v-flex>
            </v-flex>
            <br>
            <br>
            <span>
                אנחנו מאמתים את ההזמנה ומכינים לך את האקדמיה,
                <br>
                תהליך זה עלול לקחת מספר דקות.
                <br>
                ברגע שהאקדמיה שלך מוכנה, יישלח אליך מייל.
                <br>
                תודה על הסבלנות, ובהצלחה! 
            </span>
        </v-flex>
        <div v-else>
            <h3>
                טוען פרטי הזמנה...
            </h3>
        </div>
        <br>
        <br>
    </v-flex>
</template>

<script>

export default {
    data() {
        return {

        }
    },

    created() {
        setTimeout(() => {
            this.getOrder();
        }, 1000);
    },

    computed: {
        order() {
            return this.$store.getters['OrderState/order'];
        },

        price() {
            return this.$route.query.amount;
        },

        expiredAt() {
            const date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
            return this.getEventDate(date);
        },
    },

    methods: {
        getOrder() {
            if(!this.$route.query.page_request_uid) {
                return this.$router.push('/')
            }
            
            this.$store.dispatch('OrderState/getOrder', this.$route.query.page_request_uid)
        },

        getEventDate(date) {
            const year  = new Date(date).getFullYear();
            let month   = new Date(date).getMonth() + 1;
            month       = String(month).length === 1 ? "0" + month : month;
            let day     = new Date(date).getDate();
            day         = String(day).length === 1 ? "0" + day : day;
            return day + '/' + month + '/' + year;
        },
    }
}
</script>