<template>
<div 
    class="icon_chip_wrapper"
    :class="{
        'icon_chip_shadow': shadow && !dark,
        'icon_chip_dark_shadow': shadow && dark,
        'icon_chip_dark dark_bg_color': dark,
        'white_bg_color': !dark,
        'pointer': pointer,
    }"
    @click="submit()"
>
    <v-icon 
        :class="{
            'icon_transform_direction': left
        }" 
        :dark="dark" 
        :size="30"
    >
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

        left: {
            type: Boolean,
            default: true
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
        padding: 3px;
    }

    .icon_chip_shadow {
        box-shadow: 0 0 15px 4px rgb(0, 0, 0, .3);
    }

    .icon_chip_dark_shadow {
        box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.3);
    }

    .icon_transform_direction {
        transform: rotate(180deg);
    }
</style>