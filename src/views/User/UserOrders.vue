<template>
    <div>
        <div v-if="orders">
            <div v-if="orders.length">
                <order-course-card class="user_order mb-5" :course="order" v-for="(order, index) in orders" :key="index" />
            </div>
            <div v-else>
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
    data() {
        return {

        }
    },

    created() {
        this.$store.dispatch('UserState/getOrders');
    },

    computed: {
        orders() {
            let orders  = this.$store.getters['UserState/orders']
            if(!orders || !orders.length) {
                return [];
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

    .user_order {
        height: 250px;
    }

</style>
