<template>
    <div class="password_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :type="type"
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
        
        autocomplete: {
            type: Boolean,
        },
    },

    data() {
        return {
            text:       'סיסמא',
            type:       'password',
            iconSrc:    'mdi-account-circle',
            rules:      [
                {
                    rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*\^?]{8,40}$/,
                    message: 'הסיסמא חייבת להכיל לפחות אות קטנה, אות גדולה ומספר ולהיות בין 8-40 תויים'
                },
            ]
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },
        
        validate() {
            return this.$refs.input.validate();
        }
    }
}
</script>

<style scoped>
</style>
