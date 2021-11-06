<template>
<div class="base_input_wrapper">
    <div v-show="title" class="mb-1">
        <strong>
            {{ title }}
        </strong>
    </div>
    <div 
        class="base_input_content"
        :class="{
            'base_input_outlined' : outlined,
            'greyBgColor' : dark,
            'whiteBgColor' : !dark,
        }"
    >

        <div class="base_input_icon ml-3 pl-3" v-if="icon">
            <v-icon>
                {{ icon }}
            </v-icon>
        </div>

        <input
            v-model="value"
            :type="type"
            :placeholder="placeholder"
        >
    </div>
</div>
</template>

<script>
export default {

    props: {
        outlined: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },

        title: {
            type: String,
        },

        type: {
            type: String,
            default: 'text'
        },

        placeholder: {
            type: String
        },

        icon: {
            type: String
        },

    },

    watch: {
        value() {
            this.$emit('onChange', this.value);
        }
    },

    data() {
        return {
            value: ''
        }
    }
}
</script>

<style scoped lang="scss">

    .base_input_wrapper {

        .base_input_content {
            border-radius: 8px;
            padding: 10px 15px;
            font-weight: 100;
            display: flex;
    
            input {
                outline: none;
                width: 100%;
            }
        }
    
        .base_input_icon {
            border-left: 1px solid #DDD;
        }
    
        .base_input_outlined {
            border: 1px solid #CCC;
        }

    }


</style>