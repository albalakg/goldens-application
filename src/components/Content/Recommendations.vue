<!-- eslint-disable vue/valid-v-for -->
<template>
    <div>
        <section-header title="לקוחות ממליצים" :backgroundTitle="$vuetify.breakpoint.mdAndUp ? 'המלצות חמות' : 'המלצות'" :dark="dark" />

        <br>
        <br>

        <v-flex md9 xl8 mx-auto class="recommendations_list recommendations_scroll" v-if="$vuetify.breakpoint.mdAndUp || items.length > 3">
            <!-- <arrow-chip v-show="!isLeftArrowDisabled && $vuetify.breakpoint.smAndDown" class="arrow_chip left_arrow" @submit="moveLeft()" /> -->
            <carousel :rtl="$vuetify.breakpoint.smAndDown" ref="carousel" :perPage="perPage" :value="currentPage" v-model="currentPage">
                <slide v-for="(item, index) in items" :key="index + item.name" class="py-8 px-4">
                    <recommendation-card :data="item" :index="index" />
                </slide>
            </carousel>
            <!-- <arrow-chip v-show="!isRightArrowDisabled && $vuetify.breakpoint.smAndDown" :left="false" class="arrow_chip right_arrow" @submit="moveRight()" /> -->
        </v-flex>
        <v-flex d-flex md9 xl8 mx-auto class="recommendations_list" v-else>
            <v-flex md4 v-for="(item, index) in items" :key="index" class="py-8 px-4">
                <recommendation-card :data="item" :index="index"/>
            </v-flex>
        </v-flex>
    </div>
</template>

<script>
import SectionHeader from '../Texts/SectionHeader.vue'
import { Carousel, Slide } from 'vue-carousel';
import RecommendationCard from '../Cards/RecommendationCard.vue';
// import ArrowChip from '../Chips/arrowChip.vue';

export default {
    components: {
        SectionHeader,
        Carousel,
        Slide,
        RecommendationCard,
        // ArrowChip,
    },

    props: {
        items: {
            type: Array,
            required: true,
            validator(value) {
                if (value.length === 0) {
                    return true;
                }

                return -1 !== value.findIndex(item => {
                    if (!item.name || item.content) {
                        return item;
                    }
                })
            }
        },

        perPage: {
            type: Number,
            default: 3
        },

        dark: {
            type: Boolean,
            default: false
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

        hasPages() {
            if (isMobile()) {
                return this.items.length > 1;
            } else {
                return this.items.length > 3;
            }
        }
    },

    methods: {
        moveLeft() {
            if (this.isLeftArrowDisabled) {
                return;
            }

            this.currentPage--
        },

        moveRight() {
            if (this.isRightArrowDisabled) {
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

.recommendations_scroll {
    cursor: grab;
}

.recommendations_scroll:active {
    cursor: grabbing;

}

.arrow_chip {
    height: 36px;
    width: 36px;
    position: absolute;
    z-index: 2;
    top: 30%;
}

.right_arrow {
    right: 4px;
}

.left_arrow {
    left: 4px;
}

::v-deep .VueCarousel-pagination .VueCarousel-dot:focus {
    outline: none;
}

::v-deep .VueCarousel-inner {
    direction: rtl;
}
</style>