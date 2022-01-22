<template>
    <div class="password_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :type="type"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="iconSrc"
            :subIcon="subIconSrc"
            :rules="rules"
            @onChange="onChange"
            @subIconClicked="subIconClicked"
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
            type: Boolean,
        },
        
        subIcon: {
            type: Boolean,
        },
        
        placeholder: {
            type: Boolean,
            default: true
        },
        
        title: {
            type: Boolean,
        },
        
        autocomplete: {
            type: Boolean,
        },
        
        confirmation: {
            type: Boolean
        },
        
        match: {
            type: String,
        },
    },

    data() {
        return {
            isTextVisible: false,
        }
    },

    computed: {
        iconSrc() {
            return this.icon ? 'mdi-account-circle' : '';
        },

        subIconSrc() {
            const src = this.isTextVisible ? 'mdi-eye-off' : 'mdi-eye';
            return this.icon ? src : '';
        },

        type() {
            return this.isTextVisible ? 'text' : 'password';
        },

        text() {
            return this.confirmation ? 'אימות סיסמא' : 'סיסמא'
        },
        
        rules() {
            const rules = [
                {
                    rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*\^?]{8,40}$/,
                    message: 'הסיסמא חייבת להכיל לפחות אות קטנה, אות גדולה ומספר ולהיות בין 8-40 תויים'
                }
            ];

            if(this.match) {
                rules.push({
                    value: this.match,
                    message: 'הסיסמאות לא זהות'
                })
            }

            return rules;
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },

        subIconClicked() {
            this.isTextVisible = !this.isTextVisible;
        },
        
        validate() {
            return this.$refs.input.validate();
        },
    }
}
</script>

<style scoped>
</style>
