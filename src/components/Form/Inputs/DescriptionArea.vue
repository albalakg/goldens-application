<template>
    <div class="phone_input_wrapper">
        <BaseTextArea 
            :outlined="outlined"
            :dark="dark"
            :resize="resize"
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
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        }
    }
}
</script>

<style scoped>
</style>
