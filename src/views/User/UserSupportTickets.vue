<template>
    <div class="user_support_tickets_wrapper">
        <div v-if="tickets && tickets.length">
            <support-ticket-card v-for="(ticket, index) in tickets" :key="index" :ticket="ticket" />
        </div>

        <div v-else>
            <h1 class="text-center">
                לא נמצאו בקשות תמיכה
            </h1>
        </div>
    </div>
</template>

<script>
import LessonFavoriteCard from '../../components/Cards/LessonFavoriteCard.vue';
import SupportTicketCard from '../../components/Cards/SupportTicketCard.vue';
import ArrowChip from '../../components/Chips/arrowChip.vue';
import Pagination from '../../components/General/Pagination.vue';
export default {
  components: { LessonFavoriteCard, Pagination, ArrowChip, SupportTicketCard },
    created() {
        this.$store.dispatch('UserState/getSupportTickets');
    },

    computed: {
        tickets() {
            const tickets = this.$store.getters['UserState/supportTickets'];
            console.log(tickets);
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
