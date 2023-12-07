<template>
    <div class="user_support_tickets_wrapper">
        <div v-if="tickets">
            <template v-if="tickets.length">
                <support-ticket-card v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" />
            </template>
            <template v-else>
                <h2 class="text-center">
                    לא נמצאו בקשות תמיכה 
                </h2>
            </template>
        </div>

        <div v-else>
            <h2 class="text-center">
                טוען...
            </h2>
        </div>
    </div>
</template>

<script>
import SupportTicketCard from './../../components/Cards/SupportTicketCard'

export default {
    components: {
        SupportTicketCard,
    },
    
    created() {
        this.$store.dispatch('UserState/getSupportTickets');
    },

    computed: {
        tickets() {
            const tickets = this.$store.getters['UserState/supportTickets'];
            return tickets;
        },
    },

    methods: {
        
    }
}
</script>

<style scoped lang="scss">

    .user_support_tickets_wrapper {

    }

</style>
