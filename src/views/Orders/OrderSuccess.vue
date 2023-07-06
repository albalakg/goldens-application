<template>
    <v-flex md10 xl9 mx-auto text-center class="auth_padding_top px-2 px-md-0">
        <br>
        <br>
        <div v-if="!order">
            <h3>
                טוען פרטי הזמנה...
            </h3>
        </div>
        <v-flex xl5 lg6 md8 sm10 mx-auto v-else-if="order.order_number">
            <h1>
                ההזמנה בוצעה בהצלחה!
            </h1>
            <h2 class="grey_text_color">תודה על הרכישה וברוך הבא לאקדמיה שלנו</h2>
            <br>
            <br>
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
            <div v-if="orderFinished">
                <span>
                    ההזמנה הושלמה והאקדמיה מוכנה לך!
                </span>
                <br>
                <v-flex md6 xs8 mx-auto>
                    <router-link to="/">
                        <main-button
                            class="mt-3" 
                            text="היכנס לאקדמיה"
                            shadow
                        />
                    </router-link>
                </v-flex>
            </div>
            <span v-else>
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
                מצטערים, אך לא נמצאה הזמנה אחרונה
            </h3>
        </div>
        <br>
        <br>
    </v-flex>
</template>

<script>
import { ACTIVE } from '../../helpers/StatusService'
import MainButton from '../../components/Buttons/MainButton'

export default {
    components: {
        MainButton,
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
            return this.order.price;
        },

        orderFinished() {
            return this.order.status === ACTIVE;
        },

        expiredAt() {
            const date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
            return this.getEventDate(date);
        },

        hasCourses() {
            const courses = this.$store.getters['UserState/courses'];
            return courses ? Boolean(courses.length) : false;
        }
    },

    watch: {
        order() {
            if(this.orderFinished) {
                this.$store.dispatch('UserState/clearUserContent');
                this.$store.dispatch('UserState/getCourses');
            }
        }
    },

    methods: {
        getOrder() {
            this.$store.dispatch('OrderState/getUserLastOrder');
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