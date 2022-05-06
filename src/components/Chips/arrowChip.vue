<template>
    <icon-chip
        :shadow="shadow" 
        :pointer="pointer" 
        :dark="dark" 
        :icon="icon" 
        :disabled="disabled" 
        :left="left" 
        @submit="submit()"
    />
</template>

<script>
import IconChip from './IconChip.vue'

export default {
  components: { IconChip },
    props: {
        left: {
            type: Boolean,
            default: true
        },

        shadow: {
            type: Boolean,
            default: true
        },

        pointer: {
            type: Boolean,
            default: true
        },

        dark: {
            type: Boolean,
        },

        disabled: {
            type: Boolean,
        },
    },

    data() {
        return {
            icon: 'mdi-chevron-right'
        }
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped>

</style>