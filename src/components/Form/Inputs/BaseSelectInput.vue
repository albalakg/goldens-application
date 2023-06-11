<template>
<div class="base_input_wrapper">
    <div v-show="title" class="mb-1">
        <strong>
            {{ title }}
        </strong>
    </div>
    <div 
        class="base_input_content"
        ref="baseInputContent"
        :class="{
            'base_input_outlined' : outlined,
            'grey_bg_color' : dark,
            'white_bg_color' : !dark,
            'slim_input': slim,
            'loading_input': loading,
        }"
    >

        <div class="base_input_main_icon ml-3 pl-3 mb-1" v-if="icon">
            <v-icon>
                {{ icon }}
            </v-icon>
        </div>

        <slot name="content" />

        <v-flex @click="toggleList()">
            <input
                class="pl-4"
                :class="{
                    'autocomplete_input': autocomplete,
                    'pointer': !readonly && !loading,
                }"
                ref="input"
                v-model="viewValue"
                :type="type"
                :placeholder="placeholder"
                :maxlength="maxlength"
                :readonly="!autocomplete || loading"
            >
        </v-flex>

        <div 
            class="base_input_sub_icon mr-2" 
            @click="toggleList()"
            :class="{
                'pointer': !readonly
            }" 
        >
            <v-icon>
                mdi-chevron-{{ arrowDirection }}
            </v-icon>
        </div>
    </div>
    
    <v-flex 
        v-click-outside="{ handler: closeList }"
        v-if="showList && items.length" 
        class="select_input_items_wrapper white_bg_color dark_shadow pa-1" 
        :style="itemsListStyle"
    >
        <template v-for="(item, index) in items">
            <div class="select_input_item pa-2 pointer" :class="{'mb-1': index !== items.length - 1}" :key="item.id + '-' + item.value" @click="pickItem(item)">
                {{item.value}}
            </div>
        </template>
    </v-flex>

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
import { nextTick } from 'process';

const BORDER_SIZE = 2;

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

        loading: {
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
            type: Boolean,
        },

        multiple: {
            type: Boolean,
        },

        maxlength: {
            type: Number,
            default: 1000
        },

        rules: {
            type: Array,
        },

        items: {
            type: Array,
            required: true,
            validator(value) {
                if(value.length === 0) {
                    return true;
                }
                
                return -1 !== value.findIndex(item => {
                    if(!item.id || item.value) {
                        return item;
                    }
                })
            }
        }
    },

    async mounted() {
        await nextTick()
        this.itemsListWidth = this.getItemsListWidth();
    },
    
    data() {
        return {
            values: [],
            viewValue: '',
            showList: false,
            itemsListWidth: 0,
            errorMessage: ''
        }
    },

    watch: {
        values() {
            this.$emit('onChange', this.multiple ? this.values : this.values[0]);
            if(this.errorMessage) {
                this.validate();
            }

            this.showList = false;
        },

        viewValue() {
            this.$emit('onChangeSearchValue', this.viewValue);
        }
    },

    computed: {
        itemsListStyle() {
            return `width: ${this.itemsListWidth}px`
        },

        arrowDirection() {
            return this.showList ? 'up' : 'down';
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
                    if(item.value !== this.values) {
                        this.errorMessage = item.message;
                    }
                }
                
                if(item.rule) {
                    if(!new RegExp(item.rule).test(this.values)) {
                        this.errorMessage = item.message;
                    }
                }
            })
        },
        
        setValue(value) {
            this.values = [value];
            const viewValue = this.items.find(item => item.id === value);
            if(viewValue) {
                this.setViewValues(viewValue.value);
            }
        },

        toggleList() {
            if(!this.readonly && !this.loading) {
                this.showList = !this.showList;
            }
        },

        closeList() {
            setTimeout(() => {
                this.showList = false;
            }, 0);
        },

        getItemsListWidth() {
            return this.$refs.baseInputContent.clientWidth + BORDER_SIZE;
        },

        pickItem(item) {
            if(!this.multiple) {
                this.cleanValues();
            }

            this.values.push(item.id);
            this.setViewValues(item.value);
        },

        cleanValues() {
            this.values.length = 0;
        },

        setViewValues(value) {
            if(this.values.length === 1) {
                this.viewValue = value;
                return;
            }

            this.viewValue = `נבחרו ${this.values.length} פריטים`;
        },
    }
}
</script>

<style scoped lang="scss">

    .base_input_wrapper {

        .base_input_content {
            border-radius: 8px;
            padding: 12px 15px;
            font-weight: 100;
            width: 100%;
            display: flex;
            position: relative;
    
            input {
                outline: none;
                width: 100%;
            }

            input.autocomplete_input {
                cursor: text;
            }
        }

        .slim_input {
            padding: 1px 15px;

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

        .loading_input {
            opacity: .5;
        }
    
        .select_input_items_wrapper {
            margin-top: 3px;
            position: absolute;
            width: 100%;
            border: 1px solid #ddd;
            border-radius: 4px;
            z-index: 10;
            max-height: 150px;
            overflow-y: auto;

            .select_input_item {
                border-radius: 4px;
            }

            .select_input_item:hover {
                background-color: #0e35561a;
            }
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