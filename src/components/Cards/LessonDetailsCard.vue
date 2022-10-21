<template>
    <div class="lesson_details_card">
        <v-flex d-flex align-center justify-space-between class="mb-2">
            <v-flex d-flex align-center>
                <div class="lesson_details_card_icon_wrapper">
                    <v-icon color="#0e3556" dark>
                        {{ icon }}
                    </v-icon>
                </div>
                <h2 class="lesson_details_card_title main_text_color mr-2">
                    {{ title }}
                </h2>
            </v-flex>
            
            <v-tooltip top color="black">
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="#0e3556" v-bind="attrs" v-on="on" class="cursor_info">
                        mdi-information-outline
                    </v-icon>
                </template>
                <span class="white_text_color">
                    {{ info }}
                </span>
            </v-tooltip>
        </v-flex>
        
        <div class="separator"></div>

        <div class="lesson_details_card_content mt-2">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },

        icon: {
            type: String,
        },

        info: {
            type: String,
        },
    }
}
</script>

<style scoped lang="scss">

    .lesson_details_card {
        background-color: #eee8;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 3px 1px #8883;

        .lesson_details_card_icon_wrapper {
            padding: 5px;
            border-radius: 4px;
        }
    }

    .separator {
        height: 1px;
        width: 100%;
        margin: auto;
        background-color: var(--mainColor);
    }

</style>