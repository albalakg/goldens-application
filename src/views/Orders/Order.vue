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
                            @onChange="setCoupon"
                            @submit="submitCoupon()"
                        />
                    </v-form>
                </v-flex>

                <br>
            </v-flex>
            <v-flex xs12 md4 xl3 class="pr-md-7">
                <order-summary-card 
                    :name="course.name"
                    :price="price"
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
                coupon: ''
            }
        }
    },

    computed: {
        course() {
            return ContentService.findCourseById(this.$route.query.courseId)
        },

        price() {
            return Math.floor(this.course.price);
        }
    },

    methods: {
        setCoupon(coupon) {
            this.form.coupon = coupon;
        },

        submitCoupon() {
            if(!this.validate()) {
                return;
            }
            
            console.log(this.form);
        },

        validate() {
            return this.$refs.coupon.validate();
        }
    }
}
</script>

<style scoped>
</style>