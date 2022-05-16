<template>
<div class="support_ticket_card">

    <v-flex d-flex justify-space-between class="ticket_header">
        <span>
            <small>
                מספר פניה {{ ticket.support_number }}
            </small>
            <br>
            <small>
                {{ time }}
            </small>
        </span>
        <small>

        </small>
    </v-flex>

</div>
</template>

<script>
export default {
    props: {
        ticket: {
            type: Object,
            required: true
        }
    },

    data() {
        return {

        }
    },

    computed: {
        time() {
            return this.ticket.human_time;
        }
    }
}
</script>

<style scoped>

    .support_ticket_card {
        width: 100%;
        box-shadow: 0 0 10px 1px #8883;
        border-radius: 20px;
        margin-bottom: 20px;
        padding: 15px;
    }

</style>