<template>
    <carousel ref="carousel" :perPage="perPage" :value="currentPage" v-model="currentPage" v-if="items && items.length">
        <slide v-for="(item, index) in items" :key="index">
            <slot :card="item"></slot>
        </slide>
    </carousel>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    components: {
        Carousel,
        Slide,
    },

    props: {
        perPage: {
            type: Number,
            default: 3
        },

        items: {
            type: Array,
            required: true
        }
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

<style>

</style>