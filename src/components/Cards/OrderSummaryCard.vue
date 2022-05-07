<template>
    <div class="order_summary_card dark_shadow">
        <h2 class="text-center">
            <span class="main_text_color">סיכום </span> הזמנה
        </h2>
        <br>
        <div class="divider"></div>
        <v-flex d-flex justify-space-between class="px-6 py-3">
            <span>{{ name }}</span>
            <span>{{ priceView }}</span>
        </v-flex>
        <div class="divider"></div>
        <v-flex d-flex justify-space-between class="px-6 py-3">
            <span>הנחת קופון</span>
            <span>{{ discountView }}</span>
        </v-flex>
        <v-flex d-flex justify-space-between class="grey_bg_color px-6 py-3">
            <strong>מע"מ</strong>
            <strong>₪{{ taxPrice }}</strong>
        </v-flex>
        <v-flex d-flex justify-space-between class="summary_item px-6 py-3">
            <span>סך הכל</span>
            <span>₪{{ totalPrice }}</span>
        </v-flex>

        <main-button
            class="order_button"
            shadow
            :styleConfig="{
                padding: '7px 25px',
                borderRadius: '30',
            }"
            text="תשלום"
            @submit="submit()"
        >
        </main-button>
    </div>
</template>

<script>
import MainButton from "../Buttons/MainButton.vue"

export default {
    components: { MainButton },

    props: {
        name: {
            type: String,
        },

        price: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },
    },

    computed: {
        priceView() {
            return '₪' + this.price;
        },

        discountView() {
            return '₪' + this.discount;
        },

        taxPrice() {
            return Math.floor((this.price - this.discount) * 0.17);
        },

        totalPrice() {
            return this.price - this.discount + this.taxPrice;
        }
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped>

    .order_summary_card {
        padding-top: 40px;
        padding-bottom: 120px;
        width: 100%;
        border-radius: 15px;
        position: relative;
    }

    .divider {
        height: 1px;
    }

    .summary_item {
        font-size: 1.3em;
    }

    .order_button {
        position: absolute;
        width: 80%;
        bottom: -20px;
        left: 0;
        right: 0;
        margin: auto;
    }

</style>