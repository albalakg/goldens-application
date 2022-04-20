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
            'slim_input': slim
        }"
    >

        <v-flex d-flex class="base_input_main_icon ml-3 pl-3" v-if="icon">
            <v-icon>
                {{ icon }}
            </v-icon>
        </v-flex>

        <slot name="content" />

        <input
            class="pl-4"
            ref="input"
            :autocomplete="autocomplete"
            v-model="value"
            :type="type"
            :placeholder="placeholder"
            :maxlength="maxlength"
            :readonly="readonly"
        >

        <div class="base_input_sub_icon mr-2 pointer" v-if="closeable && value" @click="close()">
            <v-icon>
                mdi-close
            </v-icon>
        </div>
        <div class="base_input_sub_icon mr-2 pointer" v-else-if="subIcon" @click="subIconClicked()">
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
        closeable: {
            type: Boolean
        },

        outlined: {
            type: Boolean
        },

        textarea: {
            type: Boolean
        },

        readonly: {
            type: Boolean
        },

        slim: {
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

        autocomplete: {
            type: String,
            default: ''
        },

        maxlength: {
            type: Number,
            default: 1000
        },

        rules: {
            type: Array,
        }
    },
    
    data() {
        return {
            value: '',
            errorMessage: ''
        }
    },

    mounted() {
        this.focusInput();
    },

    watch: {
        value() {
            this.$emit('onChange', this.value);
            if(this.errorMessage) {
                this.validate();
            }
        }   
    },

    methods: {
        validate() {
            this.errorMessage = '';
            
            if(this.rules) {
                this.validateRules();
                return !this.errorMessage;
            }

            return !this.errorMessage;
        },

        validateRules() {
            this.rules.forEach(item => {
                if(this.errorMessage) {
                    return;
                }
                
                if(item.value) {
                    if(item.value !== this.value.trim()) {
                        this.errorMessage = item.message;
                    }
                }
                
                if(item.rule) {
                    if(!new RegExp(item.rule).test(this.value.trim())) {
                        this.errorMessage = item.message;
                    }
                }
            })
        },

        subIconClicked() {
            this.$emit('subIconClicked')
        },

        close() {
            this.value = '';
            this.focusInput();
        },

        focusInput() {
            this.$refs.input.focus();
        },

        setValue(value) {
            this.value = value;
        },
    }
}
</script>

<style scoped lang="scss">

    .base_input_wrapper {

        .base_input_content {
            border-radius: 8px;
            padding: 15px 15px;
            font-weight: 100;
            display: flex;
            position: relative;
    
            input {
                outline: none;
                width: 100%;
            }
        }

        .slim_input {
            padding: 5px 15px;

            i {
                font-size: 1em;
            }

            input {
                font-size: .8em;
            }
        }
    
        .base_input_main_icon {
            border-left: 1px solid #DDD;
        }

        .base_input_sub_icon {
            position: absolute;
            left: 10px;
            z-index: 2;
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