<template>
    <div class="password_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :type="type"
            :placeholder="placeholder ? viewText : ''"
            :title="title ? viewText : ''"
            :icon="iconSrc"
            :subIcon="subIconSrc"
            :rules="rules"
            :slim="slim"
            :autocomplete="autocomplete"
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
        text: {
            type: String,
            default: 'סיסמה',
        },

        outlined: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },

        slim: {
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
            type: String,
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

        viewText() {
            return this.confirmation ? 'אימות סיסמה' : this.text
        },
        
        rules() {
            const rules = [
                {
                    rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*\^?]{8,40}$/,
                    message: 'הסיסמה חייבת להכיל לפחות אות קטנה, אות גדולה ומספר ולהיות בין 8-40 תויים'
                }
            ];

            if(this.match) {
                rules.push({
                    value: this.match,
                    message: 'הסיסמהות לא זהות'
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
        
        setValue(value) {
            this.value = value;
        },
    }
}
</script>

<style scoped>
</style>
