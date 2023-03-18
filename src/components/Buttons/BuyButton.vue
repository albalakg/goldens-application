<template>
<button 
    class="buy_button_wrapper"
    :class="{
        'light_buy_button_wrapper': !dark,
        'slim_buy_button_wrapper':  slim,
    }"
    @click="submit()"
>
    <span>
        רכוש עכשיו
    </span>

    <slot name="content">

    </slot>
</button>
</template>

<script>
export default {
    props: {
        dark: {
            type: Boolean,
            default: true
        },

        slim: {
            type: Boolean,
            default: false
        },
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">

    .buy_button_wrapper {
        border: 1px solid #fff;
        padding: 7px 20px;
        font-size: 1.5em;
        color: #fff;
        transition: .2s all ease-in;
        box-shadow: 0px 4px 6px 3px #0008;
        
        &:hover {
            transform: scale(1.05);
            box-shadow: 0px 4px 6px 6px #0006;
        }
    }

    .light_buy_button_wrapper {
        box-shadow: none;
        color: var(--mainColor);
        border: 1px solid var(--mainColor);

        &:hover {
            box-shadow: none;
        }
    }

    .slim_buy_button_wrapper {
        padding: 0px 20px;
    }

</style>