<template>
<div class="base_textarea_wrapper" :style="cssVars">
    <div v-show="title" class="mb-1">
        <strong>
            {{ title }}
        </strong>
    </div>
    <div 
        class="base_textarea_content"
        :class="{
            'base_textarea_outlined' : outlined,
            'base_textarea_slim' : slim,
            'grey_bg_color' : dark,
            'white_bg_color' : !dark,
        }"
    >

        <div class="base_textarea_icon ml-3 pl-3" v-if="icon">
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
        
        <div 
            class="base_textarea_error_wrapper" 
            :class="{
                'base_textarea_error_wrapper_visible' : !!errorMessage 
            }"
        >
            <small>
                {{ errorMessage }}
            </small>
        </div>
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

        slim: {
            type: Boolean,
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

        minHeight: {
            type: Number,
            default: 120
        },

        rules: {
            type: Array,
        }
    },

    computed: {
        cssVars() {
            return {
                '--minHeight': this.minHeight + 'px',
            }
        }
    },

    watch: {
        value() {
            this.$emit('onChange', this.value);
            if(this.errorMessage) {
                this.validate();
            }
        }
    },

    data() {
        return {
            value:          '',
            errorMessage:   '',
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
                if(!new RegExp(item.rule).test(this.value.trim())) {
                    this.errorMessage = item.message;
                }
            })
            
            return !this.errorMessage;
        }
    }
}
</script>

<style scoped lang="scss">

    .base_textarea_wrapper {
        position: relative;

        .base_textarea_content {
            border-radius: 8px;
            padding: 10px 15px;
            font-weight: 100;
            display: flex;
    
            textarea {
                outline: none;
                width: 100%;
                resize: none;
                min-height: var(--minHeight);
            }

            .resizeable {
                resize: auto !important;
            }
        }
    
        .base_textarea_icon {
            border-left: 1px solid #DDD;
        }
    
        .base_textarea_outlined {
            border: 1px solid #CCC;
        }

        .base_textarea_slim {
            textarea {
                font-size: .8em;
            }
        }

        .base_textarea_error_wrapper {
            position: absolute;
            bottom: -25px;
            right: 0;
            opacity: 0;
            transition: .3s opacity linear;

            small {
                color: red;
            }
        }

        .base_textarea_error_wrapper_visible {
            opacity: 1;
        }
    }


</style>