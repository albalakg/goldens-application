<template>
    <div 
        class="question_card pointer pa-5"
        :class="{
            'white_bg_color': dark,
            'dark_bg_color': !dark
        }"
        @click="toggleCard()"
    >
        <v-flex d-flex justify-space-between align-center class="question_card_title pointer">
            <strong>
                {{
                    question.title
                }}
            </strong>
            <v-icon color="#d5b26e">mdi-chevron-{{arrowDirection}}</v-icon>
        </v-flex>
        <v-flex class="question_card_content" :class="{'question_card_content_open': isActive}">
            {{question.content}}
        </v-flex>
    </div>
</template>

<script>
export default {
    props: {
        question: {
            type: Object,
            required: true
        },

        dark: {
            type: Boolean,
            default: true
        },
    },
    
    data() {
        return {
            isActive: false
        }
    },

    computed: {
        arrowDirection() {
            return this.isActive ? 'up' : 'down'
        }
    },

    methods: {
        toggleCard() {
            this.isActive = !this.isActive;
        }
    }
}
</script>

<style scoped lang="scss">

    .question_card {
        width: 100%;
        border-radius: 5px;
    }

    .question_card_content {
        text-align: right;
        height: 0;
        transition: .3s all ease-in-out;
        overflow: hidden;
    }

    .question_card_content_open {
        height: 80px;
    }

</style>