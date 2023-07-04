<template>
    <div>
        <div v-if="orders">
            <div v-if="orders.length" class="px-3 px-md-0">
                <order-course-card class="user_order mb-5" :order="order" v-for="(order, index) in orders" :key="index" />
            </div>
            <div v-else class="text-center">
                <h2 class="text-center">
                    לא נמצאו הזמנות
                </h2>
            </div>
        </div>
        <div v-else>
            <h2 class="text-center">
                טוען...
            </h2>
        </div>
    </div>
</template>

<script>
import OrderCourseCard from '../../components/Cards/OrderCourseCard.vue';
export default {
  components: { OrderCourseCard },
    created() {
        this.$store.dispatch('UserState/getOrders');
    },

    computed: {
        orders() {
            let orders  = this.$store.getters['UserState/orders'];
            if(!orders || !orders.length) {
                return orders;
            }

            return orders.map((order) => {
                return {
                    content_id: order.content_id,
                    price:      order.price,
                    order_num:  order.order_number
                }
            })
        },
    }
}
</script>

<style scoped>

    @media only screen and (min-width: 601px) {
        .user_order {
            height: 250px;
        }
    }

</style>
