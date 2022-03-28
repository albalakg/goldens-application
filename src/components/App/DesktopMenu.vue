<template>
  <div class="desktop_menu_wrapper">
    <div class="desktop_menu_content">
      <v-flex d-flex align-center class="h100" xs9 mx-auto>
        <Logo dark />
        <!-- <Logo /> -->
        <v-flex d-flex align-center justify-space-between>
          <template v-if="isLogged">
            <v-flex d-flex align-center>
              <search-input ref="search" outlined icon slim> </search-input>
              <router-link class="simple_link text-center" to="/user/favorites">
                <v-flex d-flex align-center justify-center>
                  <div>
                    <v-icon color="white">mdi-heart-outline</v-icon>
                    <br />
                    <span> הרשימה שלי </span>
                  </div>
                </v-flex>
              </router-link>
            </v-flex>
          </template>
          <template v-else>
            <v-flex d-flex>
              <div v-for="(link, index) in loggedLinks" :key="index">
                <router-link class="simple_link" :to="`/${link.url}`">
                  <span>
                    {{ link.text }}
                  </span>
                </router-link>
              </div>
            </v-flex>
          </template>
          <div class="account_wrapper">
            <template v-if="isLogged">
              <router-link class="simple_link" to="/user">
                <v-icon color="white">mdi-account-circle</v-icon>
              </router-link>
            </template>
            <template v-else>
              <router-link class="simple_link" to="/signin">
                <v-icon color="white">mdi-account-circle-outline</v-icon>
              </router-link>
            </template>
          </div>
        </v-flex>
      </v-flex>
    </div>

    <div class="desktop_menu_filler"></div>
  </div>
</template>

<script>
import SearchInput from "../Form/Inputs/SearchInput.vue";
import Logo from "./../General/Logo.vue";

export default {
  components: {
    Logo,
    SearchInput,
  },

  data() {
    return {
      loggedLinks: [
        {
          text: "קורסים",
          url: "courses",
        },
        {
          text: "מי אנחנו",
          url: "about",
        },
        {
          text: "צרו קשר",
          url: "contact-us",
        },
        {
          text: "תמיכה",
          url: "support",
        },
      ],
    };
  },

  computed: {
    isLogged() {
      return this.$store.getters["AuthState/isLogged"];
    },
  },

  methods: {
    toggleSearchBox() {
      console.log("toggleSearchBox");
    },

    activateAction(action) {
      if (action) {
        this[action]();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.desktop_menu_wrapper {
  width: 100vw;
  height: 80px;
  z-index: 10;
}

.desktop_menu_content {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.938);
  color: #fff;
}

.desktop_menu_filler {
  height: 80px;
  width: 100vw;
}

span {
  color: rgb(22, 88, 143);
}

.simple_link {
  padding: 20px 25px;
}
</style>