<template>
    <div class="phone_input_wrapper">
        <BaseTextArea 
            ref="textarea"
            :outlined="outlined"
            :dark="dark"
            :resize="resize"
            :rules="rules"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            @onChange="onChange"
        />
    </div>
</template>

<script>
import BaseTextArea from './BaseTextArea.vue';

export default {
    components: {
        BaseTextArea
    },

    props: {
        outlined: {
            type: Boolean
        },
        
        resize: {
            type: Boolean
        },

        dark: {
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
            text:       'תיאור',
            rules:      [
                {
                    rule: /^.+$/,
                    message: 'חובה למלא את התיאור'
                },
                {
                    rule: /^.{2,1000}$/,
                    message: 'התיאור חייב להיות 2-1000 תווים'
                },
            ]
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },

        validate() {
            return this.$refs.textarea.validate();
        }
    }
}
</script>

<style scoped>
</style>
