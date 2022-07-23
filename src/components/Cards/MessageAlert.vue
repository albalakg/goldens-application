<template>
    <div>
        <message-card 
            v-if="messageStatus"
            top
            small
            :type="options.type"
            :message="options.message"
            :title="options.title ? options.title : 'בדיקה'"
        />
    </div>
    <!-- <div 
        class="primary_message"
    >
        <v-alert 
            dense 
            shaped
            :color="options.color" 
            :value="messageStatus"
            :timeout="options.time"
            transition="slide-y-transition"
        >
            <v-flex d-flex justify-space-between align-center>
                <span class="white_text_color">
                    {{options.message}}
                </span>
                <div 
                    v-show="messages_counter" 
                    class="message_counter pointer"
                    :title="`Close ${messages_counter} messages in queue`"
                    @click="truncateMessages()"
                >
                    <span >
                        {{messages_counter > 9 ? '9+' : messages_counter}}
                    </span>
                </div>
            </v-flex>
        </v-alert>
    </div> -->
</template>

<script>
import MessageCard from './MessageCard.vue';
export default {
  components: { MessageCard },

    data() {
        return {
            images: {
                success: require('../../../public/assets/images/messages/success.svg'),
                error: require('../../../public/assets/images/messages/error.svg'),
                warning: require('../../../public/assets/images/messages/warning.svg'),
            }
        }
    },

    computed: {
        messageStatus() {
            return this.$store.getters['MessageState/status'];
        },

        options() {
            return this.$store.getters['MessageState/options'];
        },

        messages_counter() {
            return this.$store.getters['MessageState/messages_in_queue'].length
        },
    },

    methods: {
        truncateMessages() {
            this.$store.dispatch('MessageState/truncate');
        }
    }
}
</script>

<style scoped>

    .primary_message {
        position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 10;
        width: 50%;
        min-width: 350px;
        max-width: 90%;
    }

    .message_counter {
        padding: 0px;
        background-color: #d4d4d488;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        display: flex;
        justify-content: center;
    }
    
</style>