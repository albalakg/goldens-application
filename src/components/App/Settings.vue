<template>
  <div class="settings_wrapper second_dark_bg_color pa-10">
    <div class="setting_header">
      <v-flex d-flex align-center class="setting_row mt-5">
        <v-icon class="close_icon" color="white" large @click="close()">mdi-close</v-icon>
        <h2 class="mr-5">
          תפריט
        </h2>
      </v-flex>

      <main-button
        class="setting_download_button setting_row"
        subColor
        :styleConfig="{
          borderRadius: 25
        }"
      >
        <template slot="content">
          <v-flex d-flex align-center justify-space-between>
            <span></span>
            <span>
              שמירה על הטלפון
            </span>
            <img :src="downloadIcon" alt="download icon">
          </v-flex>
        </template>
      </main-button>
    </div>

    <div class="settings_links">

      <div v-for="(link, index) in links" :key="index" class="setting_row mb-10 settings_link">
        <h3>
          <router-link class="simple_link grey_text_color" :to="'/' + link.url">
            {{
              link.text
            }}
          </router-link>
        </h3>
      </div>

    </div>
  </div>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue';
export default {
  components: { MainButton },

  data() {
    return {
      downloadIcon:     require('../../../public/assets/images/general/download.svg'),
      links: [
        {
          text: 'דף הבית',
          url: ''
        },
        {
          text: 'קורסים',
          url: 'courses'
        },
        {
          text: 'מי אנחנו',
          url: 'about'
        },
        {
          text: 'מועדפים',
          url: 'user/favorites'
        },
        {
          text: 'יצירת קשר',
          url: 'contact-us'
        },
        {
          text: 'תמיכה',
          url: 'support'
        },
        {
          text: 'תנאי האתר',
          url: 'terms-and-conditions'
        },
      ],

    };
  },

  methods: {
    close() {
      this.$emit('close');
    }
  }

}
</script>

<style scoped lang="scss">

  .settings_wrapper {
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;

    .setting_header {
      .close_icon {
        position: relative;
        top: 2px;
      }

      button {
        font-weight: bold;
      }
        
      .setting_download_button img, .setting_download_button span {
        position: relative;
        left: -15px;
        font-size: 1.1em;
      }
    }

    .setting_row {
      margin-bottom: 25px;

      .simple_link {
        font-weight: 100;
      }
    }

  }

  h2 {
    color: #fff;
    margin: 0;
  }

</style>