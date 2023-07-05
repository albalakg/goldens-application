<template>
    <v-flex md10 xl9 mx-auto text-center class="auth_padding_top px-5 px-md-0">
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

import { ACTIVE } from '../../helpers/StatusService'

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

    watch: {
        order() {
            if(this.order.status === ACTIVE) {
                setTimeout(() => {
                    window.location.reload();
                }, 200);
                this.$router.replace({'query': null});
                this.$router.push('/')
            }
        }
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

<style scoped></style>

<!-- http://localhost:8080/orders/success?transaction_uid=ba22ac77-0da2-4451-9a85-7a7e34fdda4b&page_request_uid=e10a9cfa-e9dd-4f77-8fed-79396f25fe4a&is_multiple_transaction=false&type=Charge&method=credit-card&number=PDHT7PVy4w&date=2023-07-03%2015%3A55%3A30&status=approved&status_code=000&status_description=%D7%94%D7%A2%D7%A1%D7%A7%D7%94%20%D7%91%D7%95%D7%A6%D7%A2%D7%94%20%D7%91%D7%94%D7%A6%D7%9C%D7%97%D7%94&amount=1953&currency=ILS&credit_terms=regular&number_of_payments=1&secure3D_status=&secure3D_tracking=false&approval_num=0621514D&card_foreign=0&voucher_num=22-365-77&more_info=&add_data=&customer_uid=5cc97673-79ce-4a1e-8725-4a91a8f4eac4&customer_email=rehiki7100%40fulwark.com&company_name=%D7%9E%D7%AA%D7%9F%20%D7%98%D7%A1%D7%98%D7%99%D7%9D&company_registration_number=660603&terminal_uid=f085d234-0d02-4d27-a976-100fc6f37592&terminal_name=%D7%9E%D7%A1%D7%95%D7%A3%20%D7%98%D7%A1%D7%98&terminal_merchant_number=0882714012&cashier_uid=15ed928c-2f7f-4581-94a9-c4fdfc455682&cashier_name=%D7%A8%D7%90%D7%A9%D7%99%D7%AA&four_digits=9844&expiry_month=05&expiry_year=26&alternative_method=false&customer_name=booble%20bob&customer_name_invoice=booble%20bob&identification_number=316334192&clearing_id=1&brand_id=2&issuer_id=1&extra_3=&card_holder_name=%D7%A1%D7%AA%D7%9D%20%D7%A9%D7%9D&card_bin=532614&more_info_1=&more_info_2=&more_info_3=&more_info_4=&more_info_5=&hash_data=eyJlbWFpbCI6InJlaGlraTcxMDBAZnVsd2Fyay5jb20iLCJuYW1lIjoiYm9vYmxlIGJvYiIsInZhdF9udW1iZXIiOiIzMTYzMzQxOTIiLCJwaG9uZSI6bnVsbH0%3D&clearing_name=not%20recognized&brand_name=mastercard&issuer_name=isracard -->