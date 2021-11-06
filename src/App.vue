<template>
  <v-app id="app">
    <DesktopMenu />
    
    <v-main>
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
