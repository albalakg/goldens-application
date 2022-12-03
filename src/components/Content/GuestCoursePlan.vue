<template>
  <v-flex class="course_plan_wrapper" ref="coursePlanWrapper">
    <div>
        <section-header
            title="תוכנית הקורס"
            backgroundTitle="תוכנית"
        />

        <v-flex md6 mx-auto mt-10 class="lessons_links_wrapper">
            <main-tabs 
                :tabs="courseAreas"
                :activeTab="activeTab"
                @submit="setActiveTab"
            />
            <!-- <DesignedTabs
                :tabs="courseAreas"
                :activeTab="activeTab"
                @submit="setActiveTab"
            >
            </DesignedTabs> -->
        </v-flex>

        <v-flex lg8 xl6 mx-auto>
            <v-timeline
                :reverse="!$vuetify.breakpoint.smAndDown"
                :class="{
                    'ltr pr-4': $vuetify.breakpoint.smAndDown 
                }"
                :dense="$vuetify.breakpoint.smAndDown"
            >
                <v-timeline-item
                    v-for="(lesson, index) in activeLessons" 
                    :key="index"
                    color="var(--subColor)"
                >
                    <v-card class="elevation-2 rtl">
                    <h2 class="pr-4 mb-0 pt-2">
                        {{lesson.name}}
                    </h2>
                    <v-card-text v-html="lesson.content">
                    </v-card-text>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
            <v-flex mx-auto xs10 md6 lg2 xl1>
                <main-button 
                    text="חזרה למעלה"
                    shadow
                    @submit="scrollToTimelineTop()"
                />
            </v-flex>
        </v-flex>
        <!-- <v-flex d-flex md7 mx-auto flex-wrap justify-end class="w100 pa-10 lessons_list">
            <v-flex xs6 md2 d-flex align-center justify-center class="lesson_card main_bg_color mx-2 mb-5" v-for="(lesson, index) in activeLessons" :key="index">
                <span class="white_text_color bold">
                    {{lesson.name}}
                </span>
            </v-flex>
        </v-flex> -->
    </div>
  </v-flex>
</template>

<script>
import SectionHeader from '../Texts/SectionHeader.vue';
import DesignedTabs     from '../../components/Tabs/DesignedTabs.vue';
import MainButton from '../Buttons/MainButton.vue';
import MainTabs from '../Tabs/MainTabs.vue';

export default {
    components: { 
        SectionHeader,
        DesignedTabs,
        MainButton,
        MainTabs,
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
    },

    scrollToTimelineTop() {
        this.$refs.coursePlanWrapper.scrollIntoView(
            {behavior: "smooth", block: "start", inline: "center"}
        )
    }
  }

};
</script>

<style scoped lang="scss">
    
    .course_plan_wrapper {
        position: relative;
        z-index: 2;
        padding-top: 100px;
        min-height: 500px;

        .lesson_card {
            height: 40px;
            width: 120px;
            transform: skew(-30deg);
            box-shadow: 5px 3px 5px 3px #0007;
            border-right: 3px solid var(--subColor);
            border-left: 3px solid var(--subColor);
            cursor: pointer;
            transition: .3s all linear;

            &:hover {
                transform: scale(1.1) skew(-30deg) translateX(-10px) translateY(5px);
            }
        }
    }

    .lessons_list {
        direction: ltr;
        position: relative;
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

    @media only screen and (max-width: 600px) {
         .course_plan_wrapper {
            padding-top: 20px;
         }
    }

</style>