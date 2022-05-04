<template>
    <div class="email_input_wrapper">
        <BaseInput
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :slim="slim"
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

        slim: {
            type: Boolean
        },

        dark: {
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
            text:       'אימייל',
            iconSrc:    'mdi-email',
            rules:      [
                {
                    rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'האימייל חייב להיות תקני'
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
