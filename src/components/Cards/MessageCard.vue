<template>
    <v-flex 
        d-flex 
        justify-center 
        class="massage_card_wrapper"
        :class="{
            'message_card_top': top,
            'message_card_bottom': bottom,
            'message_card_center': center,
            'message_card_persistent': persistent,
            'message_card_small': small,
        }"
    >
        <v-flex
            mx-auto 
            d-flex 
            justify-center
            v-click-outside="{ handler: closeMessageFromOutside }"
            class="message_card_content px-10 dark_shadow white_bg_color h100 text-center"
            
        >
            <div>
                <img loading="lazy" :src="images[type]" alt="">
                
                <br>
                
                <h2 class="main_text_color">
                    {{title}}
                </h2>

                <p>
                    {{ message }}
                </p>

                <v-flex xs10 mx-auto>
                    <main-button
                        class="message_card_button" 
                        shadow
                        :text="buttonText"
                        @submit="closeMessage"
                    />
                </v-flex>
            </div>
        </v-flex>
    </v-flex>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue'

export default {
    components: { MainButton },

    props: {
        // Positions
        top: {
            type: Boolean,
        },
        
        center: {
            type: Boolean,
            default: true
        },
        
        bottom: {
            type: Boolean,
        },

        // Sizes
        small: {
            type: Boolean,
        },

        normal: {
            type: Boolean,
            default: true
        },
        
        // Options
        persistent: {
            type: Boolean,
        },

        type: {
            type: String,
            default: 'success',
            validator(value) {
                return ['success', 'error', 'warning'].includes(value);
            }
        },

        // Content
        title: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            required: true
        },

        buttonText: {
            type: String,
            default: 'המשך'
        },
    },

    data() {
        return {
            images: {
                success: require('../../../public/assets/images/messages/success.svg'),
                error: require('../../../public/assets/images/messages/error.svg'),
                warning: require('../../../public/assets/images/messages/warning.svg'),
            }
        }
    },

    methods: {
        closeMessageFromOutside() {
            if(!this.persistent) {
                this.closeMessage()
            }
        },

        closeMessage() {
            this.$emit('closeMessage');
        }
    }
}
</script>

<style scoped lang="scss">

    .massage_card_wrapper {
        position: absolute;
        height: 100vh;
        width: 100vw;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 100;
    }
    
    .message_card_persistent {
        position: fixed;
        background-color: #000b;
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

    .message_card_top {
        align-items: flex-start;
        margin-top: 30px;
    }

    .message_card_small {
        
        .message_card_content {
            min-height: 200px;
            max-height: 275px;
        }

        .message_card_button {
            top: 25px;
        }
    }

</style>