<template>
    <v-flex 
        v-if="messageStatus"
        d-flex 
        justify-center 
        class="massage_card_wrapper"
        :class="{
            'message_card_top': top,
            'message_card_center': center,
            'message_card_bottom': bottom,
        }"
    >
        <v-flex
            mx-auto 
            d-flex 
            justify-center 
            class="message_card_content dark_shadow white_bg_color h100 text-center"
            
        >
            <div>
                <img :src="images[options.type]" alt="">
                
                <br>
                
                <h2 class="main_text_color">
                    {{options.title}}
                </h2>

                <p v-html="options.message">
                </p>

                <main-button
                    class="message_card_button" 
                    shadow
                    :text="options.button"
                />
            </div>
        </v-flex>
    </v-flex>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue'

export default {
  components: { MainButton },

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

        top() {
            return this.options.position === 'top';
        },

        center() {
            return this.options.position === 'center' || 1;
        },

        bottom() {
            return this.options.position === 'bottom';
        },
    },

    created() {
        setInterval(() => {
            this.$store.dispatch('MessageState/addMessage', {
                type: 'success',
                title: 'אין עליכם!',
                message: 'סיימתם את שיעור 4 בהצלחה. <br> תרצו להמשיך ללמוד או לקחת הפסקה?',
                button: 'המשך',
                time: 3000
            });
        }, 1000);
    },

    methods: {
        truncateMessages() {
            this.$store.dispatch('MessageState/truncate');
        }
    }
}
</script>

<style scoped>

    .massage_card_wrapper {
        position: absolute;
        height: 100vh;
        width: 100vw;
        left: 0;
        right: 0;
        margin: auto;
    }
    
    .message_card_center {
        align-items: center;
    }

    .message_card_content {
        position: fixed;
        z-index: 100;
        border-radius: 12px;
        min-height: 250px;
        max-height: 350px;
        width: 350px;
        max-width: 80%;
        background-color: #fff;
    }

    .message_card_button {
        position: relative;
        top: 75px;
    }

    h2 {
        font-size: 2em;
    }

</style>