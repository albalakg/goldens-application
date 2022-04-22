<template>
    <div class="last_name_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :slim="slim"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="icon ? iconSrc : ''"
            :rules="rules"
            :readonly="readonly"
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

        readonly: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },

        slim: {
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
            text:       'שם משפחה',
            iconSrc:    'mdi-account-circle',
            rules: [
                {
                    rule: /^.{2,30}$/,
                    message: 'השם משפחה חייב להכיל בין 2-30 תווים'
                }
            ]
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },

        setValue(value) {
            return this.$refs.input.setValue(value);
        },

        validate() {
            return this.$refs.input.validate();
        }
    }
}
</script>

<style scoped>
</style>
