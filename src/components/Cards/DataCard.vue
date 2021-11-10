<template>
<v-flex 
    d-flex 
    align-center 
    justify-center 
    class="data_card_wrapper"
    :class="{
        'dark_bg_color dark_card': dark,
        'active_card': animation,
        'dark_shadow': shadow,
    }"
>
    <div class="text-center">
        <h2>
            <span
                class="main_text_color"
            >
                {{ titleFirstWord }}
            </span>
            <span>
                {{ restOfTheTitle }}
            </span>
        </h2>

        <small v-if="subtitle">
            {{ subtitle }}
        </small>
    </div>
</v-flex>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },

        subtitle: {
            type: String,
        },

        dark: {
            type: Boolean,
        },

        shadow: {
            type: Boolean,
            default: true
        },

        animation: {
            type: Boolean,
            default: true
        },
    },

    computed: {
        titleFirstWord() {
            return this.title.replace(/ .*/,'');
        },

        restOfTheTitle() {
            return this.title.replace(this.titleFirstWord, '');
        },
    }
}
</script>

<style scoped lang="scss">

    .data_card_wrapper {
        border-radius: 12px;
        padding: 30px;

        small {
            color: #aaa;
            font-weight: bold;
        }

        h2 span:nth-child(2){
            font-weight: 100;
        }
    }

    .dark_card {
        h2 span:nth-child(2) {
            color: #fff;
        }
    }

    .active_card:hover {
        background-color: rgb(255, 89, 34);
        box-shadow: 0 0 15px 4px rgb(255 89 34 / 0.3);

        h2 span:nth-child(1) {
            color: rgb(49, 53, 61);
        }

        h2 span:nth-child(2){
            color: #fff;
        }
        
        small {
            color: #ddd;
        }
    }

</style>