<template>
<button 
    class="main_button_wrapper main_bg_color"
    @click="submit()"
    :class="{
        'main_button_shadow': shadow && !dark,
        'main_button_dark_shadow': shadow && dark,
        'main_button_dark dark_bg_color': dark,
    }"
    :style="cssVars"
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
        },

        styleConfig: {
            type: Object
        },
    },

    computed: {
        cssVars() {
            return {
                '--height': this.styleConfig && this.styleConfig.height ? this.styleConfig.height + 'px' : 'auto',
                '--border-radius': this.styleConfig && this.styleConfig.borderRadius ? this.styleConfig.borderRadius + 'px' : '20px',
                '--padding': this.styleConfig && this.styleConfig.padding ? this.styleConfig.padding : '7px 25px',
            }
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
        padding: var(--padding);
        border-radius: var(--border-radius);
        border: 2px solid #fff;
        width: 100%;
        transition: .3s transform linear;
        height: var(--height);
        
        span {
            color: #fff;
        }

        &:hover {
            transform: scale(1.05);
        }
    }

    .main_button_shadow {
        box-shadow: 0 0 15px 4px rgb(255 89 34 / 0.3);
    }

    .main_button_dark_shadow {
        box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.3);
    }
</style>