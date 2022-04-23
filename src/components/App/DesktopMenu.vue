<template>
<div>
    <div class="desktop_menu_wrapper">

        <div v-if="showFullMenu" class="desktop_menu_content"  :class="{
            'desktop_menu_content_light': isLightMode,
            'desktop_menu_content_dark': !isLightMode,
        }">
            <v-flex d-flex align-center class="h100" xs9 mx-auto>
                <div class="logo_wrapper">
                    <Logo :dark="!isLightMode"/>
                </div>
                <v-flex d-flex align-center justify-space-between class="mr-5">
                    <template v-if="isLogged">
                        <v-flex d-flex align-center>
                            <search-input
                                ref="search"
                                outlined
                                icon
                                slim
                            >
                            </search-input>
                            <router-link class="simple_link text-center" to="/user/favorites">
                                <v-flex d-flex align-center justify-center>
                                    <div>
                                        <heart dark />
                                        <span>הרשימה שלי</span>
                                    </div>
                                </v-flex>
                            </router-link>
                        </v-flex>
                    </template>
                    <template v-else>
                        <v-flex d-flex>
                            <div v-for="(link, index) in loggedLinks" :key="index" class="px-3">
                                <router-link class="simple_link main_text_color" :to="`/${link.url}`">
                                    <span class="main_text_color">
                                        {{link.text}}
                                    </span>
                                </router-link>
                            </div>
                        </v-flex>
                    </template>
                    <div class="account_wrapper">
                        <template v-if="isLogged">
                            <router-link class="simple_link" to="/user">
                                <img :src="userImage" alt="user">
                            </router-link>
                        </template>
                        <template v-else>
                            <router-link class="simple_link" to="/signin">
                                <img :src="userImage" alt="user">
                            </router-link>
                        </template>
                    </div>
                </v-flex>
            
            </v-flex>
        </div>

        <v-flex v-else xs12 d-flex align-center class="h100 pr-md-5 white_bg_color">
            <v-flex xs1>
                <logo />
            </v-flex>
        </v-flex>
    </div>

    <div v-if="!showFullMenu" class="mobile_menu_filler"></div>
</div>
</template>

<script>
import SearchInput from '../Form/Inputs/SearchInput.vue';
import Heart from '../General/Heart.vue';
import Logo from './../General/Logo.vue'

const LIGHT_MODE    = 'light';
const DARK_MODE     = 'dark';

export default {
    components: {
        Logo,
        SearchInput,
        Heart,
    },

    props: {
        showFullMenu: {
            type: Boolean,
            default: true
        },

        dark: {
            type: Boolean
        }
    },

    data() {
        return {
            loggedLinks: [
                {
                    text: 'קורסים',
                    url: 'courses'
                },
                {
                    text: 'מי אנחנו',
                    url: 'about'
                },
                {
                    text: 'יצירת קשר',
                    url: 'contact-us'
                },
                {
                    text: 'תמיכה',
                    url: 'support'
                }
            ],
            userDarkImage:  require('../../../public/assets/images/general/userDark.svg'),
            userLightImage: require('../../../public/assets/images/general/userLight.svg'),
            heartImage:     require('../../../public/assets/images/general/heart.svg'),
            mode: LIGHT_MODE,
            darkModePagesList: []
        }
    },

    computed: {
        isLogged() {
            return this.$store.getters['AuthState/isLogged'];
        },

        isLightMode() {
            return this.mode === LIGHT_MODE;
        },

        userImage() {
            return this.isLightMode ? this.userDarkImage : this.userLightImage
        }
    },

    watch: {
        $route(to, from) {
            this.setMode();
        }
    },

    methods: {
        toggleSearchBox() {
            console.log('toggleSearchBox');
        },

        activateAction(action) {
            if(action) {
                this[action]();
            }
        },

        setMode() {
            const route = this.$route.fullPath;
            this.mode = this.darkModePagesList.includes(route) ? DARK_MODE : LIGHT_MODE;
        }
    }
}
</script>

<style scoped lang="scss">

    .desktop_menu_wrapper {
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 80px;
        z-index: 10;
    }

    .desktop_menu_content {
        height: 100%;
        width: 100%;
        transition: .5s background-color;
    }

    .desktop_menu_content_light {
        background-color: #fff;
        color: #31353d;
    }

    .desktop_menu_content_dark {
        color: #fff;
    }

    .desktop_menu_filler {
        height: 80px;
        width: 100vw;
    }

    span {
        color: rgb(174, 174, 174);
    }

    .simple_link {
        padding: 20px 25px;
    }

    .logo_wrapper {
        width: 15%;
    }

    .account_wrapper img {
        height: 35px;
    }
</style>