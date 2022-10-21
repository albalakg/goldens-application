<template>
  <v-flex class="course_plan_wrapper">
    <div>
        <section-header 
            title="תוכנית הקורס"
            backgroundTitle="תוכנית"
        />

        <v-flex md6 mx-auto mt-10 class="lessons_links_wrapper">
            <DesignedTabs
                :tabs="courseAreas"
                :activeTab="activeTab"
                @submit="setActiveTab"
            >
            </DesignedTabs>
        </v-flex>

        <v-flex d-flex md-10 justify-center class="w100 pa-10 lessons_list">
            <arrow-chip v-show="!isLeftArrowDisabled || isCarouselHidden" class="arrow_chip left_arrow" @submit="moveLeft()" />
            <transition name="fade" mode="out-in">
                <carousel v-if="activeLessons && activeLessons.length && !isCarouselHidden" ref="carousel" :perPage="perPage" :value="currentPage" v-model="currentPage">
                    <slide v-for="(item, index) in activeLessons" :key="`${index}` + item.name" class="py-8 px-4">
                        <lesson-card shadow class="lesson_card" :lesson="item" />
                    </slide>
                </carousel>
            </transition>
            <arrow-chip v-show="!isRightArrowDisabled || isCarouselHidden" :left="false" class="arrow_chip right_arrow" @submit="moveRight()" />
        </v-flex>
    </div>
  </v-flex>
</template>

<script>
import SectionHeader from '../Texts/SectionHeader.vue';
import { Carousel, Slide } from 'vue-carousel';
import LessonCard from '../Cards/LessonCard.vue';
import ArrowChip from '../Chips/arrowChip.vue';
import DesignedTabs     from '../../components/Tabs/DesignedTabs.vue';

export default {
    components: { 
        SectionHeader,
        Carousel,
        Slide,
        LessonCard,
        DesignedTabs,
        ArrowChip
    },

    props: {
        course: {
            type: Object,
            required: true,
        },
        
        perPage: {
            type: Number,
            default: 3
        },
    },

    data() {
        return {
            activeTab: 0,
            currentPage: 0,
            activeTab: 0,
            isCarouselHidden: false
    }
  },

  computed: {
    courseAreas() {
      return this.course?.active_areas_with_active_lessons.map(courseArea => {
        return {
            ...courseArea,
            title: courseArea.name
        }
      });
    },

    activeCourseArea() {
        return this.courseAreas[this.activeTab];
    },

    activeLessons() {
        return this.activeCourseArea.active_lessons
    },

    isLeftArrowDisabled() {
        return !this.currentPage || !this.hasPages
    },

    isRightArrowDisabled() {
        return ((this.currentPage + 1) == Math.ceil(this.activeLessons.length / this.perPage)) || !this.hasPages
    },
    
    hasPages() {
        if(isMobile()) {
            return this.activeLessons.length > 1;
        } else {
            return this.activeLessons.length > 3;
        }
    }
  },

  methods: {
    setActiveCourseArea(index) {
        this.activeTab      = index;
        this.currentPage    = 0;
    },
    
    playVideo() {
        this.$refs.video.playVideo()
    },
    
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

    setActiveTab(activeTab) {
        if(this.isCarouselHidden || this.activeTab === activeTab) {
            return;
        }

        this.activeTab = activeTab;
        this.setActiveCourseArea(activeTab);
        this.resetCarousel();
    },

    resetCarousel() {
        this.isCarouselHidden = true;
        setTimeout(() => {
            this.isCarouselHidden = false;
        }, 250);
    }
  }

};
</script>

<style scoped lang="scss">
    
    .course_plan_wrapper {
        position: relative;
        z-index: 2;

        img {
            width: 100%;
            max-height: 200px;
            margin-top: 12px;
            object-fit: cover;
            border-radius: 8px;
        }

        .course_plan_course_area, .course_plan_lesson {
            transition: .2s transform ease-out, .2s background-color ease-out;
        }

        .course_plan_course_area_active {
            transform: scale(1.05);
            font-weight: bold;
        }

        .course_plan_lesson:hover {
            transform: scale(1.05);
            background-color: #d5b26e;
            font-weight: bold;
        }

        .lesson_card {
            height: 360px;
        }
    }

    .lessons_list {
        direction: ltr;
        position: relative;
        min-height: 500px;
    }

    .arrow_chip {
        height: 36px;
        width: 36px;
        position: absolute;
        z-index: 2;
        top: 230px;
    }

    .right_arrow {
        right: 24%;
    }

    .left_arrow {
        left: 24%;
    }

    .lessons_links_wrapper {
        scroll-behavior: smooth;
        
        &::-webkit-scrollbar {
            display: none; // Safari and Chrome
        }
    }

    ::v-deep .VueCarousel {
        width: 50%;
    }

</style>