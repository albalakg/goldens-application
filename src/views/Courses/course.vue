<template>
  <div class="course_page_wrapper" v-if="course">

    <v-flex class="course_page_image_wrapper mb-3">
      <img class="course_image" :src="course.imageSrc" alt="">
      <div class="course_page_image_darkner"></div>
      <div class="course_page_image_details">
        <div>
          <h1>
            {{course.name}}
          </h1>

          <div class="divider"></div>

          <v-flex d-flex class="course_page_actions_wrapper w100 mt-5">
            <v-flex class="text-center pt-4" v-for="(action, index) in actions" :key="index" @click="courseAction(action.action)">
              <img :src="action.image" alt="play button">
              <p class="white_text_color mt-2">{{action.text}}</p>
              <div v-if="action.tooltip">
                <v-tooltip
                  v-model="showShareTooltip"
                  bottom
                  color="black"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <span
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                    </span>
                  </template>
                  <span class="white_text_color">קישור האתר הועתק</span>
                </v-tooltip>
              </div>
            </v-flex>
          </v-flex>
        </div>
      </div>
    </v-flex>

    <video v-show="showTrailer" :src="course.trailerSrc" ref="trailer"></video>

    <main-tabs 
      class="course_page_tabs"
      subColor
      :tabs="tabs"
      :activeTab="activeTab"
      @submit="setActiveTab"
    />

    <br>

    <router-view :course="course" class="px-4">
    </router-view>

    <br>
  </div>
</template>

<script>
import MainTabs from '../../components/Tabs/MainTabs.vue';
export default {
  components: {
    MainTabs,
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
      activeTab: 0,
      showShareTooltip: false,
      trailerFullScreen: false,
      actions: [
        {
          image: require('../../../public/assets/images/general/share.svg'),
          text: 'שיתוף',
          action: 'copyLink',
          tooltip: true
        },
        {
          image: require('../../../public/assets/images/general/play.svg'),
          text: 'טריילר',
          action: 'openTrailer'
        }
      ]
    }
  },

  mounted() {
    const trailer = this.$refs.trailer;
    trailer.addEventListener('fullscreenchange', event => { 
      this.trailerFullScreen = document.fullscreenElement === trailer
    });
  },

  computed: {
    course() {
      const courses = this.$store.getters['UserState/courses'];
      if(!courses) {
        return null;
      }

      return courses.find(course => course.id == this.$route.params.course_id)
    },

    showTrailer() {
      return this.$vuetify.breakpoint.mdAndUp || this.trailerFullScreen;
    }
  },

  methods: {
    setActiveTab(activeTabIndex) {
      this.activeTab = activeTabIndex;
    },

    courseAction(action) {
      try {
        this[action]();
      } catch(err) {
        console.warn(err);
      }
    },

    copyLink() {
      navigator.clipboard.writeText(window.location);
      this.showToolTip();
    },

    showToolTip() {
      this.showShareTooltip = true;
      clearTimeout(this.copyLinkTier);

      this.copyLinkTier = setTimeout(() => {
        this.showShareTooltip = false;
      }, 3000);
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
    }
  }

}
</script>

<style scoped lang="scss">

  .course_page_wrapper {
    
    .course_page_image_wrapper {
      position: relative;
      height: 35vh;
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
        align-items: end;
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
        background: linear-gradient(#102a46, #0006)
      }

      .divider {
        height: 3px;
        width: 30%;
        position: relative;
        margin: auto;
        z-index: 3;
        background-color: #E6B260;
      }
    }

    .course_page_tabs {
      text-align: center;
    }
  }


</style>