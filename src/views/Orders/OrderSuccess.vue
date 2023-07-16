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
                היי {{ name }}, תודה רבה על הזמנתך, אנחנו שמחים שבחרת בנו ובטוחים שתהנה מהאקדמיה.
                <br>
                אנחנו מאמתים את ההזמנה, תהליך זה עלול לקחת מספר דקות.
                <br>
                ישלח אליך מייל ברגע שהאקדמיה שלך מוכנה.
                <br>
                תודה על הסבלנות, ובהצלחה!
                <br>
                <br>
                אם יש לך שאלות, אל תהסס ליצור איתנו קשר בכתובת המייל fa@goldensacademy.com
                <br>
                אנחנו כאן לשירותך.
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

const MAX_CHECK_ORDER_ATTEMPTS  = 10;
const SPACE_BETWEEN_ATTEMPTS    = 1000 * 10; // 10 seconds

export default {
    components: {
        MainButton,
    },

    data() {
        return {
            getOrderInterval: null,
            currentAttempt: 1
        }
    },
    
    created() {
        this.getOrder();
        this.getOrderInterval = setInterval(() => {
            this.getOrder();
        }, SPACE_BETWEEN_ATTEMPTS);
    },

    computed: {
        order() {
            return this.$store.getters['OrderState/order'];
        },

        price() {
            return this.order.price;
        },

        orderFinished() {
            return this.order && this.order.status === ACTIVE;
        },

        expiredAt() {
            const date = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
            return this.getEventDate(date);
        },

        hasCourses() {
            const courses = this.$store.getters['UserState/courses'];
            return courses ? Boolean(courses.length) : false;
        },

        hasReachedMaxAttempts() {
            return this.currentAttempt >= MAX_CHECK_ORDER_ATTEMPTS;
        },

        name() {
            return Auth.firstName();
        }
    },

    watch: {
        order() {
            if(this.orderFinished) {
                this.$store.dispatch('UserState/clearUserContent');
                this.$store.dispatch('UserState/getProgress');
                this.$store.dispatch('UserState/getCourses');
            }
        }
    },

    beforeDestroy() {
        clearInterval(this.getOrderInterval);
    },

    methods: {
        getOrder() {
            if(this.hasReachedMaxAttempts || this.orderFinished) {
                clearInterval(this.getOrderInterval);
                return;
            }
            this.$store.dispatch('OrderState/getUserLastOrder');
            this.currentAttempt++;
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