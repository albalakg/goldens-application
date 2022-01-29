<template>
    <div class="phone_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :readonly="readonly"
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

        readonly: {
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
        },
        
        setValue(value) {
            return this.$refs.input.setValue(value);
        },
    }
}
</script>

<style scoped>
</style>
