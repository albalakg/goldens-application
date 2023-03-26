<template>
    <div class="contact_description_input_wrapper">
        <BaseTextArea 
            ref="textarea"
            :outlined="outlined"
            :dark="dark"
            :resize="resize"
            :rules="rules"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :floatingPlaceholder="floatingPlaceholder"
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
            text:       'דברו אלינו...',
            rules:      [
                {
                    rule: /^.+$/ms,
                    message: 'חובה למלא את ההודעה'
                },
                {
                    rule: /^.{2,1000}$/ms,
                    message: 'ההודעה חייבת להיות 2-1000 תווים'
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
