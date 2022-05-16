<template>
  <div class="course_page_wrapper" v-if="course">

    <v-flex class="course_page_image_wrapper mb-3" ref="courseHeader">
      <img loading="lazy" class="course_image" :src="course.imageSrc" alt="">
      <div class="course_page_image_darkner" :class="hasActiveCourse ? 'course_page_image_darkner_left_to_right' : 'course_page_image_darkner_right_to_left'"></div>
      <div class="course_page_image_details">

        <last-active-lesson-card 
          v-if="hasActiveCourse"
          class="last_progress_card"
          :class="{
            'hide_last_progress_card': !showLastActiveCard
          }"
          @close="toggleLastActiveCard()" 
        />

        <course-header :course="course" @openTrailer="openTrailer" />
      
      </div>
    </v-flex>

      <video v-show="showTrailer" :src="course.trailerSrc" ref="trailer"></video>

      <main-tabs 
        v-if="showCourseTabs"
        class="course_page_tabs"
        subColor
        :tabs="tabs"
        :activeTab="activeTab"
        @submit="setActiveTab"
      />

    <br>

    <transition name="fade" mode="out-in">
      <router-view :course="course" class="course_page_content px-md-4">
      </router-view>
    </transition>

    <br>

  </div>
</template>

<script>
import LastActiveLessonCard from '../../components/Cards/LastActiveLessonCard.vue';
import CourseHeader from '../../components/Content/CourseHeader.vue';
import MainTabs from '../../components/Tabs/MainTabs.vue';

const COURSE_AREAS_TAB_INDEX  = 0;
const LESSONS_TAB_INDEX       = 1;
export default {
  components: {
    MainTabs,
    LastActiveLessonCard,
    CourseHeader,
  },

  data() {
    return {
      tabs: [
        {
          title: 'תחומים'
        },
        {
          title: 'שיעורים'
        },
      ],
      showLastActiveCard: false,
      activeTab: 0,
      trailerFullScreen: false,
    }
  },

  created() {
    if(!this.$store.getters['AuthState/isLogged']) {
      this.$store.dispatch('ContentState/getCourse', this.$route.params.course_id)
    }
  },

  mounted() {
    this.setTabByRoute();
    const trailer = this.$refs.trailer;
    if(!trailer) {
      return;
    }

    trailer.addEventListener('fullscreenchange', event => { 
      this.trailerFullScreen = document.fullscreenElement === trailer
    });
    
    this.listenToScroll();
    this.initLastActiveCard();
  },

  watch: {
    $route() {
      this.setTabByRoute();
    },
  },

  computed: {
    course() {
      let courses = this.$store.getters['UserState/courses'];
      if(courses && courses.length) {
        return courses.find(course => course.id == this.$route.params.course_id)
      }

      courses = this.$store.getters['ContentState/courses'];
      if(courses && courses.length) {
        return courses.find(course => course.id == this.$route.params.course_id)
      }

      return null;
    },

    showTrailer() {
      return this.trailerFullScreen;
    },

    hasActiveCourse() {
      return this.$store.getters['UserState/hasActiveCourse']
    },

    isDark() {
      return this.$store.getters['AppState/isMenuDark']
    },

    showCourseTabs() {
      return this.$vuetify.breakpoint.smAndDown && this.hasActiveCourse
    }
  },

  methods: {
    setActiveTab(activeTabIndex) {
      this.activeTab = activeTabIndex;

      if(activeTabIndex === LESSONS_TAB_INDEX) {
        return this.$router.push(`/courses/${this.course.id}/lessons`)
      }

      this.$router.push(`/courses/${this.course.id}`)
    },

    setTabByRoute() {
      this.activeTab = this.$route.path.includes('lessons') ? LESSONS_TAB_INDEX : COURSE_AREAS_TAB_INDEX;
    },

    openTrailer() {
      const trailer = this.$refs.trailer;
      this.openFullscreen(trailer);
    },

    openFullscreen(elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    },

    listenToScroll() {
      document.body.addEventListener('scroll', () => {
        let element = document.querySelector('.course_page_image_wrapper');
        if(!element) {
          return;
        }
        
        let position = element.getBoundingClientRect();
        if(position.height < (position.top * -1 + 100)) {
          if(this.isDark) {
            return this.$store.dispatch('AppState/setMenuMode', false);
          }
        } else {
          if(!this.isDark) {
            return this.$store.dispatch('AppState/setMenuMode', true);
          }
        }
      });
    },

    toggleLastActiveCard() {
      this.showLastActiveCard = !this.showLastActiveCard;
    },

    initLastActiveCard() {
      if(!this.$store.getters['ContentState/showLastActiveCard']) {
        return
      }

      this.$store.dispatch('ContentState/setShowLastActiveCard', false);
      setTimeout(() => {
        this.toggleLastActiveCard();
      }, 1000);

      setTimeout(() => {
        this.showLastActiveCard = false;
      }, 10000);
    }
  },

}
</script>

<style scoped lang="scss">

  .course_page_wrapper {

    .last_progress_card {
      position: absolute;
      border-radius: 8px 0 0 8px;
      right: 0;
      z-index: 15;
      width: 300px;
      transition: .7s right ease-out;
    }

    .hide_last_progress_card {
      right: -500px;
    }
    
    .course_page_image_wrapper {
      position: relative;
      height: 55vh;
      width: 100vw;
      text-align: center;

      img.course_image {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        right: 0;
      }

      h1 {
        position: relative;
        color: #fff;
        font-size: 3em;
        z-index: 3;
      }

      .course_page_image_details {
        position: relative;
        z-index: 3;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .course_page_actions_wrapper {
        position: relative;
        z-index: 3;
      }

      .course_page_image_darkner {
        right: 0;
        position: absolute;
        height: 100%;
        width: 100%;
      }

      .course_page_image_darkner_left_to_right {
        background: linear-gradient(90deg, #0006, #102a46)
      }

      .course_page_image_darkner_right_to_left {
        background: linear-gradient(90deg, #0006, #102a46)
      }

      .divider {
        height: 3px;
        width: 30%;
        position: relative;
        margin: auto;
        z-index: 3;
        background-color: #d5b26e;
      }
    }

    .course_page_tabs {
      text-align: center;
    }
  }

  @media only screen and (max-width: 600px) {
      
    .course_page_image_wrapper {
      height: 35vh !important;
    }
    
    .course_page_image_darkner {
      background: linear-gradient(#102a46, #0006) !important
    }

    .course_page_image_details {
      padding-right: 30px;
      // align-items: end !important;
    }

    .last_progress_card {
      top: 100px;
    }
  }


</style>