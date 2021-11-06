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

        <slot name="content" />

        <textarea
            v-model="value"
            :type="type"
            :placeholder="placeholder"
            :class="{
                'resizeable' : resize
            }"
        />
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

        resize: {
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
    
            textarea {
                outline: none;
                width: 100%;
                resize: none;
            }

            .resizeable {
                resize: auto !important;
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