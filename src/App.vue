<template>
  <v-app id="app">
    <DesktopMenu />
    <v-main>
      <SearchCard />
      <transition name="fade" mode="out-in">
        <router-view
          :key="$route.path"
          class="app_content"
        >
        </router-view>
      </transition>
    </v-main>

    <Footer />
    <MobileMenu />
  </v-app>
</template>

<script>
import DesktopMenu from './components/App/DesktopMenu.vue'
import Footer from './components/App/Footer.vue'
import MobileMenu from './components/App/MobileMenu.vue'

export default {
  components: {
    DesktopMenu,
    Footer,
    MobileMenu,
  },

  created() {
    this.setInitialSettings()
  },

  computed: {
    sidebarIsOpen() {
      return this.$store.getters['AppState/sidebarState'];
    },

    logged() {
      return this.$store.getters['AppState/isLogged'];
    }
  },

  methods: {
    setInitialSettings() {
      this.$store.dispatch('UserState/getUsers');
      this.$store.dispatch('CourseState/getCourses');
      this.$store.dispatch('CourseCategoryState/getCourseCategories');
      this.$store.dispatch('LessonState/getLessons');
      this.$store.dispatch('VideoState/getVideos');
      this.$store.dispatch('CourseAreaState/getCourseAreas');
      this.$store.dispatch('TestState/getTests');
      this.$store.dispatch('CouponState/getCoupons');
      this.$store.dispatch('OrderState/getOrders');
      this.$store.dispatch('SupportState/getSupportTickets');
      this.$store.dispatch('SupportState/getSupportCategories');
      this.$store.dispatch('UserCourseState/getUsersCourses');
      this.$store.dispatch('PoliciesState/getCookies');
      this.$store.dispatch('PoliciesState/getTermsAndConditions');
      this.$store.dispatch('AppState/updateLogState', Auth.isLogged());
      this.$store.dispatch('AppState/updateItemsPerPage', window.screen.width > 1600 ? 10 : 5)
    }
  }

}
</script>

<style lang="scss">

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  html {
    overflow: hidden;
  }

  body {
    overflow-y: auto;
    height: 100vh;
    overflow-x: hidden;
    direction: rtl;
  }

  .app_content {
  
  }
</style>
