<template>
    <div>
        <div v-if="orders">
            <div v-if="orders.length" class="px-3 px-md-0">
                <order-course-card class="user_order mb-5" :course="order" v-for="(order, index) in orders" :key="index" />
            </div>
            <div v-else class="text-center">
                לא נמצאו הזמנות
            </div>
        </div>
        <div v-else>
            <h1 class="text-center">
                טוען...
            </h1>
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
            let orders  = this.$store.getters['UserState/orders']
            if(!orders || !orders.length) {
                return null;
            }

            return orders.map((order) => {
                return {
                    ...order.course,
                    price: order.price
                }
            })
        }
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
