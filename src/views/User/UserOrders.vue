<template>
    <div>
        <div v-if="orders">
            <div v-if="orders.length">
                {{ orders }}
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
export default {
    data() {
        return {

        }
    },

    created() {
        this.$store.dispatch('UserState/getOrders');
    },

    computed: {
        orders() {
            return this.$store.getters['UserState/orders']
        }
    }
}
</script>

<style scoped>
</style>
