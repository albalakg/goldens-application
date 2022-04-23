<template>
  <div class="course_page_wrapper second_dark_bg_color" v-if="course">

    <v-flex class="course_page_image_wrapper">
      <img :src="course.imageSrc" alt="">
      <h1>
        {{course.name}}
      </h1>
      <div class="divider"></div>
      <div class="course_page_image_darkner"></div>
    </v-flex>

    <v-flex d-flex class="course_page_actions_wrapper">
      <v-flex class="text-center pt-4" v-for="(action, index) in actions" :key="index">
        <img :src="action.image" alt="play button">
        <p class="white_text_color mt-2">{{action.text}}</p>
      </v-flex>
    </v-flex>

    <br>

    <main-tabs 
      class="course_page_tabs"
      :tabs="tabs"
      dark
      :activeTab="activeTab"
      @submit="setActiveTab"
    />


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
      actions: [
        {
          image: require('../../../public/assets/images/general/share.svg'),
          text: 'שיתוף',
          action: 'copyLink'
        },
        {
          image: require('../../../public/assets/images/general/play.svg'),
          text: 'טריילר',
          action: 'openTrailer'
        }
      ]
    }
  },

  computed: {
    course() {
      const courses = this.$store.getters['UserState/courses'];
      if(!courses) {
        return null;
      }

      return courses.find(course => course.id == this.$route.params.course_id)
    }
  },

  methods: {
    setActiveTab(activeTabIndex) {
      this.activeTab = activeTabIndex;
    }
  }

}
</script>

<style scoped lang="scss">

  .course_page_wrapper {
    
    .course_page_image_wrapper {
      position: relative;
      height: 30vh;
      width: 100vw;
      text-align: center;

      img {
        position: absolute;
        height: 100%;
        width: 100%;
        object-fit: cover;
        right: 0;
      }

      h1 {
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        color: #fff;
        font-size: 3em;
        z-index: 3;
      }

      .course_page_image_darkner {
        position: absolute;
        height: 100%;
        width: 100%;
        background: linear-gradient(#102a46, #0006)
      }

      .divider {
        height: 4px;
        width: 20%;
        position: absolute;
        bottom: 30px;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 3;
        background-color: #16588F;
      }
    }

    .course_page_tabs {
      text-align: center;
    }
  }

</style>