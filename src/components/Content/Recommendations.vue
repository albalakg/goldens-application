<template>
    <div>
        <section-header 
            title="המלצות"
            backgroundTitle="המלצות חמות"
        />

        <br>
        <br>

        <v-flex md9 xl8 mx-auto class="recommendations_list">
            <arrow-chip v-show="!isLeftArrowDisabled" class="arrow_chip left_arrow" @submit="moveLeft()" />
            <carousel ref="carousel" :perPage="perPage" :value="currentPage" v-model="currentPage">
                <slide v-for="(item, index) in items" :key="index + item.name" class="py-8 px-4">
                    <recommendation-card :data="item" :index="index" />
                </slide>
            </carousel>
            <arrow-chip v-show="!isRightArrowDisabled" :left="false" class="arrow_chip right_arrow" @submit="moveRight()" />
        </v-flex>
    </div>
</template>

<script>
import SectionHeader from '../Texts/SectionHeader.vue'
import { Carousel, Slide } from 'vue-carousel';
import RecommendationCard from '../Cards/RecommendationCard.vue';
import ArrowChip from '../Chips/arrowChip.vue';

export default {
    components: {
        SectionHeader,
        Carousel,
        Slide,
        RecommendationCard,
        ArrowChip,
    },

    props: {
        items: {
            type: Array,
            required: true,
            validator(value) {
                if(value.length === 0) {
                    return true;
                }
                
                return -1 !== value.findIndex(item => {
                    if(!item.name || item.content) {
                        return item;
                    }
                })
            } 
        },

        perPage: {
            type: Number,
            default: 3
        },
    },

    data() {
        return {
            currentPage: 0
        }
    },

    computed: {
        isLeftArrowDisabled() {
            return !this.currentPage || !this.hasPages
        },

        isRightArrowDisabled() {
            return this.currentPage + 1 === this.items.length / this.perPage || !this.hasPages
        },

        hasPages() {
            if(isMobile()) {
                return this.items.length > 1;
            } else {
                return this.items.length > 3;
            }
        }
    },

    methods: {
        moveLeft () {
            if(this.isLeftArrowDisabled) {
                return;
            }

            this.currentPage--
        },

        moveRight () {
            if(this.isRightArrowDisabled) {
                return;
            }

            this.currentPage++
        },

    }
}
</script>

<style scoped>

    .recommendations_list {
        direction: ltr;
        position: relative;
    }

    .arrow_chip {
        height: 36px;
        width: 36px;
        position: absolute;
        z-index: 2;
        top: 33%;
    }

    .right_arrow {
        right: -3px;
    }

    .left_arrow {
        left: -3px;
    }

</style>