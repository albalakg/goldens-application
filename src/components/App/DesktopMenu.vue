<template>
    <div>
        <div class="desktop_menu_wrapper">

            <div v-if="showFullMenu" class="desktop_menu_content" :class="{
                'desktop_menu_content_light dark_shadow': !isDark,
                'desktop_menu_content_dark': isDark,
            }">
                <v-flex d-flex justify-space-between align-center class="h100" xs9 mx-auto>
                    <div class="logo_wrapper">
                        <Logo @onClick="scrollToTop('')" :dark="isDark" />
                    </div>
                    <v-flex d-flex>
                        <v-icon @click="toggleSideMenu()" :color="isDark ? 'white' : '#102a46'" large
                            class="pointer">mdi-menu</v-icon>
                        <template v-if="hasActiveCourse">
                            <v-flex d-flex align-center class="search_input_wrapper mr-3" :class="{
                                'search_input_wrapper_focused': isSearchFocused
                            }">
                                <search-input ref="search" outlined icon slim @onFocus="onFocus">
                                </search-input>

                            </v-flex>
                        </template>
                    </v-flex>
                    <div>
                        <v-flex d-flex align-center justify-space-between>
                            <div class="account_wrapper">
                                <template v-if="isLogged">
                                    <v-flex d-flex align-center>
                                        <router-link title="מועדפים" class="simple_link text-center favorite_link"
                                            to="/user/favorites">
                                            <heart center :dark="isDark" @submit="enterFavorites()" />
                                        </router-link>
                                        <router-link title="פרופיל" class="simple_link" to="/user">
                                            <img loading="lazy" :src="userImage" alt="user">
                                        </router-link>
                                    </v-flex>
                                </template>
                                <template v-else>
                                    <v-flex align-center d-flex>
                                        <router-link class="simple_link d-flex" to="/orders?courseId=1">
                                            <buy-button :dark="isDark" slim />
                                        </router-link>
                                        <router-link class="simple_link d-flex" to="/signin">
                                            <img loading="lazy" :src="userImage" alt="user">
                                        </router-link>
                                    </v-flex>
                                </template>
                            </div>
                        </v-flex>
                    </div>

                </v-flex>
            </div>

            <v-flex v-else xs12 d-flex align-center class="h100 pr-md-5 white_bg_color">
                <v-flex xs2 class="pa-8">
                    <logo />
                </v-flex>
            </v-flex>
        </div>

        <div v-if="!showFullMenu" class="mobile_menu_filler"></div>

        <v-navigation-drawer @v-click-outside="toggleSideMenu()" class="desktop_menu_sidebar" v-model="sideMenu" fixed
            temporary right dark :width="$vuetify.breakpoint.lgAndDown ? '25%' : '20%'">
            <div>
                <v-flex class="pa-3" d-flex justify-end>
                    <v-icon class="pointer" @click="toggleSideMenu()">mdi-close</v-icon>
                </v-flex>
                <br>

                <DesktopSideMenuItem v-for="(item, index) in links" :key="index" :text="item.text" :url="item.url" />
                <DesktopSideMenuLastActiveLesson />
                <div class="desktop_menu_sidebar_logout" v-if="isLogged">
                    <span class="grey_text_color pointer" @click="logout()">
                        התנתק
                    </span>
                </div>
            </div>
        </v-navigation-drawer>
    </div>
</template>

<script>
import BuyButton from '../Buttons/BuyButton.vue';
import SearchInput from '../Form/Inputs/SearchInput.vue';
import Heart from '../General/Heart.vue';
import Logo from './../General/Logo.vue'
import DesktopSideMenuItem from './DesktopSideMenuItem.vue';
import DesktopSideMenuLastActiveLesson from './DesktopSideMenuLastActiveLesson.vue';

export default {
    components: {
        Logo,
        SearchInput,
        Heart,
        BuyButton,
        DesktopSideMenuItem,
        DesktopSideMenuLastActiveLesson
    },

    props: {
        showFullMenu: {
            type: Boolean,
            default: true
        },
    },

    data() {
        return {
            userDarkImage: require('../../../public/assets/images/general/userDark.svg'),
            userLightImage: require('../../../public/assets/images/general/userLight.svg'),
            heartImage: require('../../../public/assets/images/general/heart.svg'),
            isSearchFocused: false,
            sideMenu: false
        }
    },

    computed: {
        hasActiveCourse() {
            return this.$store.getters['UserState/hasActiveCourse']
        },

        userImage() {
            return !this.isDark ? this.userDarkImage : this.userLightImage
        },

        isDark() {
            return this.$store.getters['AppState/isMenuDark']
        },

        isLogged() {
            return this.$store.getters['AuthState/isLogged'];
        },

        links() {
            let links = [
                {
                    text: 'מי אנחנו',
                    url: '/about'
                },
                {
                    text: 'יצירת קשר',
                    url: '/contact-us'
                },
                {
                    text: 'תמיכה',
                    url: '/support'
                },
            ]

            let extraLinks = [];

            if (this.hasActiveCourse) {
                const courses = this.$store.getters['UserState/courses'];
                extraLinks = [
                    {
                        text: 'פרופיל',
                        url: '/user'
                    },
                    {
                        text: 'יומן',
                        url: '/courses/' + courses[0].id + '/schedule'
                    },
                ]
            } else {
                extraLinks = [
                    {
                        text: 'התחברות',
                        url: '/signin'
                    },
                    {
                        text: 'הרשמה',
                        url: '/signup'
                    },
                ]
            }

            return links = links.concat(extraLinks);
        }
    },

    methods: {
        activateAction(action) {
            if (action) {
                this[action]();
            }
        },

        enterFavorites() {
            this.$router.push('/user/favorites')
        },

        onFocus(value) {
            this.isSearchFocused = value;
        },

        scrollToTop(toUrl) {
            if (this.$route.path === '/' + toUrl) {
                document.querySelector('#app').scrollIntoView(
                    { behavior: "smooth", block: "start", inline: "center" }
                )
            }
        },

        toggleSideMenu() {
            this.sideMenu = !this.sideMenu;
        },

        logout() {
            this.$router.push('/signout')
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
    border-top: 2px solid #d5b26e;
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
    color: #fff;
}

.simple_link {
    padding: 20px 15px;
}

.logo_wrapper {
    width: 13%;
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    margin: auto;
}

.desktop_menu_sidebar {
    z-index: 101;
}

.desktop_menu_sidebar_logout {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
}

.account_wrapper img {
    height: 35px;
}

.favorite_link {
    margin-bottom: 6px;
}

.search_input_wrapper {
    width: 25%;
    transition: .2s width ease-out;
}

.search_input_wrapper_focused>div {
    width: 35%;
}
</style>