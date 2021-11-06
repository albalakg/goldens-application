<template>
    <div class="password_input_wrapper">
        <BaseInput 
            :outlined="outlined"
            :dark="dark"
            :type="type"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="icon ? iconSrc : ''"
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
            iconSrc:    'mdi-account-circle'
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
