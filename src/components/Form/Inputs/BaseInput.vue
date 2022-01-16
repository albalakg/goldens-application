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
            'grey_bg_color' : dark,
            'white_bg_color' : !dark,
        }"
    >

        <div class="base_input_main_icon ml-3 pl-3" v-if="icon">
            <v-icon>
                {{ icon }}
            </v-icon>
        </div>

        <slot name="content" />

        <input
            v-model="value"
            :type="type"
            :placeholder="placeholder"
            :maxlength="maxlength"
        >

        <div class="base_input_sub_icon mr-2 pointer" v-if="subIcon" @click="subIconClicked()">
            <v-icon>
                {{ subIcon }}
            </v-icon>
        </div>
    </div>
    <div 
        class="base_input_error_wrapper" 
        :class="{
            'base_input_error_wrapper_visible' : !!errorMessage 
        }"
    >
        <small>
            {{ errorMessage }}
        </small>
    </div>
</div>
</template>

<script>
export default {

    props: {
        outlined: {
            type: Boolean
        },

        textarea: {
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

        subIcon: {
            type: String
        },

        maxlength: {
            type: Number,
            default: 1000
        },

        rules: {
            type: Array,
        }
    },

    watch: {
        value() {
            this.value = this.value.trim();
            this.$emit('onChange', this.value);
            if(this.errorMessage) {
                this.validate();
            }
        }
    },

    data() {
        return {
            value: '',
            errorMessage: ''
        }
    },

    methods: {
        validate() {
            this.errorMessage = '';
            if(!this.rules) {
                warning('Rules are required for validation');
                return true;
            }

            this.rules.forEach(item => {
                if(this.errorMessage) {
                    return;
                }
                
                if(!new RegExp(item.rule).test(this.value)) {
                    this.errorMessage = item.message;
                }
            })
            
            return !this.errorMessage;
        },

        subIconClicked() {
            this.$emit('subIconClicked')
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
    
        .base_input_main_icon {
            border-left: 1px solid #DDD;
        }

        .base_input_sub_icon {

        }
    
        .base_input_outlined {
            border: 1px solid #CCC;
        }

        .base_input_error_wrapper {
            position: absolute;
            opacity: 0;
            transition: .3s opacity linear;

            small {
                color: red;
            }
        }

        .base_input_error_wrapper_visible {
            opacity: 1;
        }
    }


</style>