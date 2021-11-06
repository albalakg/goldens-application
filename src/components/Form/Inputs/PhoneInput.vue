<template>
    <div class="phone_input_wrapper">
        <BaseInput 
            :outlined="outlined"
            :dark="dark"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="icon ? iconSrc : ''"
            @onChange="onChange"
        />
    </div>
</template>

<script>
import BaseInput from './BaseInput.vue';

export default {
    components: {
        BaseInput
    },

    props: {
        outlined: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },
        
        icon: {
            type: Boolean
        },
        
        placeholder: {
            type: Boolean,
            default: true
        },
        
        title: {
            type: Boolean,
        },
    },

    data() {
        return {
            text:       'טלפון',
            iconSrc:    'mdi-phone'
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        }
    }
}
</script>

<style scoped>
</style>
