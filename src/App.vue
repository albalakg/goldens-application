<template>
  <v-app id="app">
    <DesktopMenu v-if="!isMobile" :showFullMenu="showFullMenu"/>
    <MobileTopMenu v-else :filler="mobileFiller" />
    <MessageAlert />

    <v-main>
      <app-loader v-if="loading">
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

    <MobileMenu v-if="isMobile && !loading" />
    <Footer v-else/>
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
      loading: false,
      showMessage: true
    }
  },

  created() {
    this.setInitialSettings();
  },

  watch: {
    async isLogged() {
      if(this.isLogged) {
        this.loading = true;
        try {
          this.$store.dispatch('UserState/init');
        } catch(err) {
          error(err);
        }
        this.loading = false;
      }
    },

    $route() {
      this.setMenuMode();
    }
  },

  computed: {
    isLogged() {
      return this.$store.getters['AuthState/isLogged'];
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
      const pages = [''];
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
      if(!Auth.isLogged()) {
        this.loadInitialData();
      }
    },
    
    closeMessage() {
      this.showMessage = false;
    },

    setMenuMode() {
      const pages = ['courses/%course_id%', 'courses/%course_id%/lessons', 'about'];
      
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

</style>
