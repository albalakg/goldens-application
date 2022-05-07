<template>
    <v-flex md10 xl9 mx-auto class="auth_padding_top">
        <h1>
            הרכישה <span class="main_text_color">שלכם</span>
        </h1>

        <br>

        <v-flex d-flex flex-wrap>
            <v-flex xs12 md8 class="pl-md-10">
                <order-course-card 
                    :course="course"
                />
                
                <br>

                <v-flex md6>
                    <v-form @submit.prevent="submitCoupon()">
                        <coupon-input 
                            ref="coupon"
                            dark
                            :loading="loading"
                            @onChange="setCoupon"
                        />
                    </v-form>
                </v-flex>

                <br>
            </v-flex>
            <v-flex xs12 md4 xl3 class="pr-md-7">
                <order-summary-card 
                    :name="course.name"
                    :price="price"
                    :discount="discount"
                    @submit="submitOrder()"
                />
            </v-flex>
        </v-flex>
        <br>
        <br>
    </v-flex>
</template>

<script>
import OrderCourseCard from '../../components/Cards/OrderCourseCard.vue'
import OrderSummaryCard from '../../components/Cards/OrderSummaryCard.vue'
import CouponInput from '../../components/Form/Inputs/CouponInput.vue'
export default {
  components: { OrderCourseCard, CouponInput, OrderSummaryCard },
    data() {
        return {
            form: {
                couponId: '',
                coupon: ''
            },
            coupon: null,
            loading: false
        }
    },

    computed: {
        course() {
            return ContentService.findCourseById(this.$route.query.courseId)
        },

        price() {
            return Math.floor(this.course.price);
        },

        discount() {
            if(!this.coupon) {
                return 0;
            }

            if(this.coupon.type === '%') {
                return this.price / this.coupon.value;
            }


            return 0;
        }
    },

    methods: {
        setCoupon(coupon) {
            this.form.coupon = coupon;
        },

        async submitCoupon() {       
            if(this.loading) {
                return;
            }     

            if(!this.validate()) {
                return;
            }

            if(this.isTheSameValue()) {
                return;
            }

            this.loading = true;
            this.coupon = await this.$store.dispatch('OrderState/getCoupon', this.form.coupon); 
            this.loading = false;

            if(!this.coupon) {
                return this.$refs.coupon.setErrorMessage('מצטערים, לא מצאנו את הקופון שחיפשת')
            }

            this.coupon.code = this.form.coupon;
        },

        async submitOrder() {
            this.loading = true;
            await this.$store.dispatch('OrderState/submitOrder', {
                content_id: this.course.id,
                coupon_code: this.form.coupon
            }); 
            this.loading = false;
        },

        isTheSameValue() {
            return this.coupon && this.form.coupon === this.coupon.code
        },

        validate() {
            return this.$refs.coupon.validate();
        }
    }
}
</script>

<style scoped>
</style>