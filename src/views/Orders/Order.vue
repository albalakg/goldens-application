<template>
    <v-flex md10 xl9 mx-auto class="auth_padding_top px-5 px-md-0">
        <colored-circle-decorator class="user_colored_circle" />
        <div v-if="orderToken" class="payment_card">
            מסך תשלום צד שלישי   
        </div>
        <div v-else class="order_page_content mt-5">
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
                                :readonly="!!orderToken"
                                @onChange="setCoupon"
                            />
                        </v-form>
                    </v-flex>

                    <br>
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
        </div>
    </v-flex>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue'
import OrderCourseCard from '../../components/Cards/OrderCourseCard.vue'
import OrderSummaryCard from '../../components/Cards/OrderSummaryCard.vue'
import ColoredCircleDecorator from '../../components/Decorators/ColoredCircleDecorator.vue'
import CouponInput from '../../components/Form/Inputs/CouponInput.vue'
export default {
  components: { OrderCourseCard, CouponInput, OrderSummaryCard, ColoredCircleDecorator, MainButton, },
    data() {
        return {
            form: {
                couponId: '',
                coupon: ''
            },
            coupon: null,
            loading: false,
            orderToken: null
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
            try {
                this.orderToken = await this.$store.dispatch('OrderState/submitOrder', {
                    content_id: this.course.id,
                    coupon_code: this.form.coupon
                })

                this.orderToken = 'asd';
                this.$refs.coupon.setErrorMessage('')

            } catch(err) {
                error(err);
                this.$store.dispatch('MessageState/addErrorMessage', { message: 'מצטערים, אבל תהליך ההזמנה כשל' })
            }
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

    .order_page_content * {
        position: relative;
        z-index: 2;
    }

    .user_colored_circle {
        height: 50vw;
        width: 50vw;
        transform: scale(1.5);
        position: absolute;
        top: -80%;
        right: -48%;
    }

</style>