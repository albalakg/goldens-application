<template>
    <div class="email_input_wrapper">
        <BaseInput
            ref="input"
            :outlined="outlined"
            :dark="dark"
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
    },

    data() {
        return {
            text:       'אימייל',
            iconSrc:    'mdi-email',
            rules:      [
                {
                    rule: /^[\w\d@.!#$%&'*+\-\/=?^_`{|}~]+@[\w\d@.!#$%&'*+\-\/=?^_`{|}~]+\.[\w\d@.!#$%&'*+\-\/=?^_`{|}~]+$/,
                    message: 'האימייל חייב להיות תקני'
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
