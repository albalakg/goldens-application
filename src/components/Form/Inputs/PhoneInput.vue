<template>
    <div class="phone_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :slim="slim"
            :rules="optional ? [] : rules"
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

        slim: {
            type: Boolean
        },

        optional: {
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
            iconSrc:    'mdi-phone',
            rules: [
                {
                    rule: /^[\d\-\s]{7,15}$/,
                    message: 'המספר טלפון חייב להיות תקני'
                }
            ]
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },
        
        validate() {
            return this.$refs.input.validate();
        },
        
        setValue(value) {
            return this.$refs.input.setValue(value);
        },
    }
}
</script>

<style scoped>
</style>
