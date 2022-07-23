<template>
<div class="support_ticket_card">

    <v-flex d-flex justify-space-between class="ticket_header">
        <small class="ml-3">
            <strong>
                מספר פניה {{ ticket.support_number }}
            </strong>
        </small>
        <span>
            <main-button 
                :text="statusText"
                shadow
                readonly
                :dark="isCompleted"
                :styleConfig="{
                    padding: '0px 20px',
                }"
            />
        </span>
    </v-flex>

    <v-flex class="ticket_body mt-5">
        <h2>
            {{ ticket.category.name}}
        </h2>
        <p>
            {{ ticket.description }}
        </p>
    </v-flex>

    <v-flex d-flex justify-end>
        <small>
            {{ time }}
        </small>
    </v-flex>

</div>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue'
export default {
    components: {
        MainButton,
    },

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
            return TimeService.getTimeInHebrew(this.ticket.human_time);
        },

        statusText() {
            return StatusService.getSupportStatusAsString(this.ticket.status)
        },

        isCompleted() {
            return this.ticket.status !== 1
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
        padding: 15px 25px;
    }

</style>