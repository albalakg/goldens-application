<template>
    <icon-chip
        :shadow="shadow" 
        :pointer="pointer" 
        :dark="dark" 
        :icon="icon" 
        :left="left" 
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
            default: false
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