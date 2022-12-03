<template>
    <div class="search_input_wrapper">
        <BaseInput 
            ref="input"
            :outlined="outlined"
            :dark="dark"
            :placeholder="placeholder ? text : ''"
            :title="title ? text : ''"
            :icon="icon ? iconSrc : ''"
            :rules="rules"
            :slim="slim"
            :closeable="true"
            :subIcon="''"
            @onChange="onChange"
            @onFocus="onFocus"
        />

        <v-flex class="search_list" v-show="searchValue">
            <template v-if="result.length">
                <v-flex d-flex v-for="(lesson, index) in result" :key="index" class="search_list_item" :class="{'mb-2': index != result.length -1}" @click="enterLesson(lesson)">
                    <v-flex xs4>
                        <img loading="lazy" :src="lesson.imageSrc" alt="lesson">
                    </v-flex>
                    <v-flex xs8 class="pa-2">
                        <strong>
                            <small>
                                {{ lesson.name }}
                            </small>
                        </strong>
                        <br>
                        <small class="lesson_description" v-html="lesson.description">
                        </small>
                    </v-flex>
                </v-flex>
            </template>
            <template v-else>
                <small class="mr-2">
                    לא נמצאו שיעורים...
                </small>
            </template>
        </v-flex>
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
        
        slim: {
            type: Boolean,
        }
    },

    data() {
        return {
            text:           'חפש שיעור',
            iconSrc:        'mdi-magnify',
            rules:          [],
            searchValue:    '',
        }
    },

    computed: {
        result() {
            let lessons = this.$store.getters['UserState/lessons'];
            if(!lessons) {
                return [];
            }

            lessons = lessons.filter(lesson => {
                if(
                    lesson.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
                    lesson.description.toLowerCase().includes(this.searchValue.toLowerCase())
                ) {
                    return lesson;
                }
            })

            return lessons;
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
            this.searchValue = value;
        },

        onFocus(value) {
            this.$emit('onFocus', value);
        },

        enterLesson(lesson) {
            this.$router.push('/courses/' + lesson.course_id + '/lessons/' + lesson.id);
            this.searchValue = '';
            this.$refs.input.setValue('');
            this.$emit('close');
        }
    }
}
</script>

<style scoped lang="scss">

    .search_input_wrapper {
        position: relative;
        color: #000;
    
        .search_list {
            padding: 5px;
            border-radius: 4px;
            background-color: #fff;
            margin-top: 2px;
            position: absolute;
            width: 100%;
            height: fit-content;
            max-height: 250px;
            overflow-y: auto;
            box-shadow: 0 0 3px #3338;

            .search_list_item {
                cursor: pointer;
                box-shadow: 0 0 3px 2px #aaa8;
                border-radius: 4px;
                
                & > div:nth-child(2) {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    position: relative;
                    top: -6px;
                }

                img {
                    border-radius: 0 4px 4px 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                strong {
                    position: relative;
                    top: 6px;
                }

                .lesson_description {
                    font-size: .7em;
                }
            }

        }
    }

</style>
