<template>
<button 
    class="main_button_wrapper main_bg_color"
    @click="submit()"
    :class="{
        'main_button_shadow': shadow && !dark,
        'main_button_dark_shadow': shadow && dark,
        'main_button_dark dark_bg_color': dark,
    }"
>
    <span>
        {{ text }}
    </span>

    <slot name="content">

    </slot>
</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: ''
        },

        shadow: {
            type: Boolean
        },

        dark: {
            type: Boolean
        }
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">

    .main_button_wrapper {
        padding: 7px 25px;
        border-radius: 20px;
        border: 2px solid #fff;
        
        span {
            color: #fff;
        }
    }

    .main_button_shadow {
        box-shadow: 0 0 10px 4px rgb(255, 89, 34, 0.3);
    }

    .main_button_dark_shadow {
        box-shadow: 0 0 10px 4px rgb(49, 53, 61, 0.3);
    }
</style>