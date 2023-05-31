<template>
    <div class="autocomplete_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :placeholder="placeholder ? placeholder : text"
            :title="title ? text : ''"
            :icon="icon"
            :rules="rules"
            :slim="slim"
            :closeable="true"
            :subIcon="''"
            @onChange="onChange"
            @onFocus="onFocus"
        />

        <v-flex class="autocomplete_list" v-show="showList">
            <template v-if="result.length">
                <v-flex 
                    d-flex v-for="(item, index) in result" 
                    :key="index" 
                    class="autocomplete_list_item" :class="{'mb-2': index != result.length -1}"
                    @click="chooseItem(item)"
                >
                    <strong>
                        <small>
                            {{ item }}
                        </small>
                    </strong>
                </v-flex>
            </template>
            <template v-else>
                <small class="mr-2">
                    {{ 
                        emptyResultMessage    
                    }}
                </small>
            </template>
        </v-flex>
    </div>
</template>

<script>
import BaseInput from './BaseInput.vue';
import { nextTick } from 'process';

export default {
    components: {
        BaseInput
    },

    props: {
        items: {
            type: Array,
            required: true
        },
        outlined: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },
        
        icon: {
            type: String,
            default: ''
        },
        
        text: {
            type: String,
            required: true
        },
        
        emptyResultMessage: {
            type: String,
            default: 'לא נמצאו תוצאות...'
        },
        
        placeholder: {
            type: String,
            required: true
        },
        
        title: {
            type: Boolean,
        },
        
        slim: {
            type: Boolean,
        }
    },

    data() {
        return {
            rules:          [],
            searchValue:    '',
            showList:       false,
            errorMessage:   ''
        }
    },

    computed: {
        result() {
            return this.items.filter(item => item.includes(this.searchValue));
        }
    },

    methods: {
        validate() {
            return !!this.items.find(item => item === this.searchValue);
        },

        setErrorMessage(errorMessage) {
            this.$refs.input.setErrorMessage(errorMessage)
        },
        
        onChange(value) {
            this.$emit('onChange', value);
            this.searchValue    = value;
            this.showList       = !!value;
        },

        onFocus(value) {
            this.$emit('onFocus', value);
        },

        setValue(value) {
            this.chooseItem(value);
        },

        chooseItem(item) {
            this.$refs.input.setValue(item);
            this.setErrorMessage('');
            this.$emit('chooseItem', item);
            nextTick(() => {
                this.showList = false;
            })
        }
    }
}
</script>

<style scoped lang="scss">

    .autocomplete_input_wrapper {
        position: relative;
        color: #000;
    
        .autocomplete_list {
            padding: 5px;
            border-radius: 4px;
            background-color: #fefefe;
            margin-top: 2px;
            position: absolute;
            width: 100%;
            height: fit-content;
            max-height: 250px;
            overflow-y: auto;
            box-shadow: 0 0 3px #3338;
            z-index: 2;

            .autocomplete_list_item {
                cursor: pointer;
                padding-bottom: 15px;
                padding-right: 10px;
            
                &:hover {
                    background-color: #fafafa;
                }

                strong {
                    position: relative;
                    top: 6px;
                }
            }

        }
    }

</style>
