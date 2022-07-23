<template>
    <div class="password_input_wrapper">
        <SubmittedInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :loading="loading"
            :readonly="readonly"
            :type="type"
            :placeholder="placeholder ? text : ''"
            :title="text"
            :buttonText="buttonText"
            :icon="iconSrc"
            :rules="rules"
            :autocomplete="autocomplete"
            @onChange="onChange"
            @submit="submit"
        />
    </div>
</template>

<script>
import SubmittedInput from './SubmittedInput.vue';

export default {
    components: {
        SubmittedInput
    },

    props: {
        text: {
            type: String,
            default: 'קוד קופון',
        },

        outlined: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },
        
        loading: {
            type: Boolean,
        },
        
        readonly: {
            type: Boolean,
        },
        
        icon: {
            type: Boolean,
        },
        
        subIcon: {
            type: Boolean,
        },
        
        placeholder: {
            type: Boolean,
            default: true
        },
        
        type: {
            type: String,
            default: 'text'
        },
        
        title: {
            type: Boolean,
        },
        
        autocomplete: {
            type: String,
        },
    },

    computed: {
        iconSrc() {
            return this.icon ? 'mdi-account-circle' : '';
        },

        rules() {
            const rules = [
                {
                    rule: /^.{7}$/,
                    message: 'קוד קופון אינו תקין'
                }
            ];

            return rules;
        },

        buttonText() {
            return this.loading ? 'טוען...' : 'שלח'
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },

        submit() {
            this.$emit('submit');
        },
        
        validate() {
            return this.$refs.input.validate();
        },
        
        setErrorMessage(error) {
            return this.$refs.input.setErrorMessage(error);
        },
    }
}
</script>

<style scoped>
</style>
