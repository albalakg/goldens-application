<template>
<div class="submited_input_wrapper">
   
    <div 
        class="submited_input_content"
        :class="{
            'submited_input_outlined' : outlined,
            'grey_bg_color submited_input_dark' : dark,
            'white_bg_color' : !dark,
        }"
    >

        <div class="submited_input_icon ml-3 pl-3" v-if="icon">
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
        
        <div class="submited_input_button">
            <MainButton 
                dark
                shadow
                :text="buttonText"
                @submit="submit()"
            />
        </div>
    </div>
    <div 
        class="submited_input_error_wrapper" 
        :class="{
            'submited_input_error_wrapper_visible' : !!errorMessage 
        }"
    >
        <small>
            {{ errorMessage }}
        </small>
    </div>
</div>
</template>

<script>
import MainButton from '../../Buttons/MainButton.vue';

export default {
    components: {
        MainButton,
    },

    props: {
        buttonText: {
            type: String,
            default: 'שלח'
        },

        outlined: {
            type: Boolean
        },

        textarea: {
            type: Boolean
        },

        dark: {
            type: Boolean
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

        maxlength: {
            type: Number,
            default: 1000
        },

        rules: {
            type: Array,
        },
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

        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">

    .submited_input_wrapper {

        .submited_input_content {
            border-radius: 25px;
            padding-right: 15px;
            font-weight: 100;
            display: flex;
            align-items: center;
    
            input {
                outline: none;
                width: 100%;
            }
        }

        .submited_input_dark {
            padding: 2px 15px 2px 2px;
        }
    
        .submited_input_icon {
            border-left: 1px solid #DDD;
        }
    
        .submited_input_outlined {
            border: 1px solid #CCC;
        }

        .submited_input_error_wrapper {
            position: absolute;
            opacity: 0;
            transition: .3s opacity linear;

            small {
                color: red;
            }
        }

        .submited_input_error_wrapper_visible {
            opacity: 1;
        }
    }


</style>