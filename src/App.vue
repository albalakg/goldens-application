<template>
  <v-app id="app">
    <DesktopMenu v-if="!isMobile" :showFullMenu="showFullMenu"/>
    <MobileTopMenu v-else :filler="mobileFiller" />
    <MessageAlert />

    <v-main>
      <app-loader v-if="isLoading">
      </app-loader>
      <transition v-else name="fade" mode="out-in">
        <router-view
          key="view"
          class="app_content"
          :isLogged="isLogged"
        >
        </router-view>
      </transition>
    </v-main>

    <MobileMenu v-if="isMobile && !isLoading" />
    <Footer v-else />
  </v-app>
</template>

<script>
import DesktopMenu from './components/App/DesktopMenu.vue'
import MobileTopMenu from './components/App/MobileTopMenu.vue'
import Footer from './components/App/Footer.vue'
import AppLoader from './components/App/AppLoader.vue'
import MobileMenu from './components/App/MobileMenu.vue'
import MessageAlert from './components/Cards/MessageAlert';

export default {
  components: {
    DesktopMenu,
    MobileTopMenu,
    Footer,
    AppLoader,
    MobileMenu,
    MessageAlert,
  },

  data() {
    return {
      showMessage: true
    }
  },

  created() {
    this.setInitialSettings();
  },

  watch: {
    async isLogged() {
      if(this.isLogged) {
        this.$store.dispatch('AppState/setIsLoadingState', true);
        try {
          await this.$store.dispatch('UserState/init');
          this.$store.dispatch('UserState/setInitiated', true);
          
          if(isMobile()) {
            this.$store.dispatch('UserState/goToLastActiveCourse');
          }
        } catch(err) {
          error(err);
        }
        this.$store.dispatch('AppState/setIsLoadingState', false);
      }
    },

    $route() {
      this.setMenuMode();
      this.checkForMarketingToken();
    }
  },

  computed: {
    isLogged() {
      return this.$store.getters['AuthState/isLogged'];
    },

    isLoading() {
      return this.$store.getters['AppState/isLoading'];
    },

    lessons() {
      return this.$store.getters['UserState/lessons'];
    },

    isMobile() {
      return isMobile();
    },

    showFullMenu() {
      const pages = ['signin', 'signup', 'forgot-password', 'reset-password'];
      return !pages.includes(this.$route.path.replace('/', ''));
    },

    mobileFiller() {
      const pages = [];
      return pages.includes(this.$route.path.replace('/', '')); 
    },
  },

  methods: {
    async loadInitialData() {
      this.loading = true;
      await Promise.allSettled([
        this.$store.dispatch('ContentState/getActiveCourses'),
      ])
      this.loading = false;
    },

    async setInitialSettings() {
      this.$store.dispatch('AuthState/setLogStatus', Auth.isLogged());
      // if(!Auth.isLogged()) {
      //   this.loadInitialData();
      // }
    },
    
    closeMessage() {
      this.showMessage = false;
    },

    setMenuMode() {
      const pages = ['courses/%course_id%', 'courses/%course_id%/lessons', 'courses/%course_id%/', 'courses/%course_id%/schedule', 'about', ''];
      
      for(let index = 0; index < pages.length; index++) {
        let page      = pages[index];
        const route   = this.$route.path.replace('/', '');
        const params  = this.$route.params;


        for (const property in params) {
          page = page.replace(`%${property}%`, params[property])
        }

        if(route === page) {
          return this.$store.dispatch('AppState/setMenuMode', true);
        }
      }

      this.$store.dispatch('AppState/setMenuMode', false);
    },

    checkForMarketingToken() {
      if(this.$route.query.marketingToken) {
        CookieService.set('marketingToken', this.$route.query.marketingToken, 24);
      }
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
    overflow-x: hidden;
    height: 100vh;
    direction: rtl;
  }

  .hideScrollBar::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }

  #app {
    overflow-x: hidden;
  }

  @media only screen and (max-width: 600px) {
    .app_content {
      padding-bottom: 5vh;
    }
  }

</style>
