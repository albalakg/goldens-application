<template>
<div class="client_review_card_wrapper dark_bg_color">
    <div class="arrow left_arrow">
        <ArrowButton right />
    </div>
    <div>
        <h2 class="mb-1">
            {{ name}}
        </h2>

        <small>
            {{ course }}
        </small>

        <div class="line main_bg_color mt-2"></div>

        <p class="mt-3">
            {{ review }}
        </p>
    </div>
    <div class="arrow right_arrow">
        <ArrowButton left />
    </div>
</div>
</template>

<script>
import ArrowButton from './../Buttons/ArrowButton.vue';

export default {
    components: {
        ArrowButton,
    },

    props: {
        name: {
            type: String,
            required: true,
        },

        course: {
            type: String,
        },

        review: {
            type: String,
            required: true,
        },

        dark: {
            type: Boolean,
            default: true
        }
    }

}
</script>

<style scoped lang="scss">

    .client_review_card_wrapper {
        position: relative;
        border-radius: 12px;
        text-align: center;
        padding: 30px 70px;

        .line {
            height: 3px;
            width: 10%;
            margin: auto;
        }

        h2, small {
            color: #fff;
        }

        p {
            color: #aaa;
            font-weight: 100;
            font-size: 0.8em;
        }

        .arrow {
            position: absolute;
            top: 43%;
        }

        .left_arrow {
            left: -18px;
        }

        .right_arrow {
            right: -18px;
        }
    }

</style>