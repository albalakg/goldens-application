<template>
    <div>
        <section-header 
            title="לקוחות מרוצים"
            backgroundTitle="לקוחות"
        />

        <br>
        <br>

        <v-flex md9 xl8 mx-auto class="recommendations_list">
            <arrow-chip class="arrow_chip left_arrow" @submit="moveLeft()" />
            <carousel ref="carousel" :perPage="perPage" :value="currentPage" v-model="currentPage">
                <slide v-for="(item, index) in items" :key="index + item.name" class="pa-4">
                    <recommendation-card :data="item" :index="index" />
                </slide>
            </carousel>
            <arrow-chip :left="false" class="arrow_chip right_arrow" @submit="moveRight()" />
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

    methods: {
        moveLeft () {
            if(!this.currentPage) {
                return;
            }

            this.currentPage--
        },

        moveRight () {
            if(this.currentPage + 1 === this.items.length / this.perPage) {
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