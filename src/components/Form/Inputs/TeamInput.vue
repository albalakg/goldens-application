<template>
    <div class="team_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :slim="slim"
            :readonly="readonly"
            :optional="optional"
            :loading="loading"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="icon ? iconSrc : ''"
            :rules="rules"
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

        optional: {
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

        loading: {
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
            text:       'שם הקבוצה',
            iconSrc:    'mdi-account-circle',
            rules: [
                {
                    rule: /^.{2,100}$/,
                    message: 'השם הקבוצה חייב להכיל בין 2-100 תווים'
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
        }
    }
}
</script>

<style scoped>
</style>
