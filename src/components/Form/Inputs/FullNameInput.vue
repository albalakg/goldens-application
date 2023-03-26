<template>
    <div class="first_name_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :slim="slim"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="icon ? iconSrc : ''"
            :maxlength="maxlength"
            :rules="rules"
            :floatingPlaceholder="floatingPlaceholder"
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
        
        icon: {
            type: Boolean
        },
        
        placeholder: {
            type: Boolean,
            default: true
        },
        
        floatingPlaceholder: {
            type: Boolean,
            default: false
        },
        
        title: {
            type: Boolean,
        },
    },

    data() {
        return {
            maxlength:  100,
            text:       'שם מלא',
            iconSrc:    'mdi-account-circle',
            rules:      [
                {
                    rule: /^.+$/,
                    message: 'חובה למלא שם מלא'
                },
                {
                    rule: /^.{2,100}$/,
                    message: 'שם מלא חייב להיות 2-1000 תווים'
                },
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
