<template>
<div 
    class="icon_chip_wrapper main_bg_color"
    :class="{
        'icon_chip_shadow': shadow && !dark,
        'icon_chip_dark_shadow': shadow && dark,
        'icon_chip_dark dark_bg_color': dark,
        'pointer': pointer,
    }"
    @click="submit()"
>
    <v-icon dark>
        {{icon}}
    </v-icon>
</div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        },

        shadow: {
            type: Boolean
        },

        pointer: {
            type: Boolean,
            default: true
        },

        dark: {
            type: Boolean
        },
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped>

    .icon_chip_wrapper {
        border-radius: 50%;
        padding: 10px;
    }

    .icon_chip_shadow {
        box-shadow: 0 0 15px 4px rgb(255 89 34 / 0.3);
    }

    .icon_chip_dark_shadow {
        box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.3);
    }
</style>