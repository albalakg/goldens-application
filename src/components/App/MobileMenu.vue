<template>
<div class="mobile_menu_wrapper">

    <div class="mobile_menu_content">
        <v-flex d-flex justify-space-around align-center class="h100">
            <template v-for="(link, index) in links">
                <div v-if="link.url" :key="index">
                    <router-link class="simple_link" :to="link.url">
                        <MobileMenuTab
                            :text="link.text" 
                            :image="link.image" 
                            :key="index" 
                            @onClick="scrollToTop(link.url)"
                        />
                    </router-link>
                </div>
                <MobileMenuTab
                    v-else
                    :text="link.text" 
                    :image="link.image" 
                    :key="index + 'a'"
                    @onClick="action(link.action)" 
                />
            </template>
        </v-flex>
        <search-dialog 
            :show="showSearch"
            :minHeight="350"
            @close="close()"
        />

        <div class="settings_wrapper" :class="{'settings_visible': showSettings}">
            <settings
                @close="toggleSettings"
            >
            </settings>
        </div>
    </div>

    <div class="mobile_menu_filler"></div>

</div>
</template>

<script>
import Settings from './Settings.vue';
import SearchDialog from '../Dialogs/SearchDialog.vue';
import MobileMenuTab from './../../components/Tabs/MobileMenuTab';

export default {
    components: {
        MobileMenuTab,
        SearchDialog,
        Settings,
    },

    data() {
        return {
            allLinks: [
                //guest
                {
                    url: '/',
                    text: 'דף הבית',
                    image: require('../../../public/assets/images/icons/Home.png'),
                    logged: false
                },
                {
                    url: '/signin',
                    text: 'התחבר',
                    image: require('../../../public/assets/images/icons/Profile.png'),
                    logged: false
                },
                {
                    url: '/about',
                    text: 'מי אנחנו',
                    image: require('../../../public/assets/images/icons/Gstar.png'),
                    logged: false
                },
                {
                    action: 'toggleSettings',
                    text: 'הגדרות',
                    image: require('../../../public/assets/images/icons/Settings.png'),
                    logged: false
                },

                // logged
                {
                    url: '/',
                    text: 'האקדמיה',
                    image: require('../../../public/assets/images/icons/Gstar.png'),
                    logged: true
                },
                {
                    url: '/user',
                    text: 'פרופיל',
                    image: require('../../../public/assets/images/icons/Profile.png'),
                    logged: true
                },
                {
                    url: '/about',
                    text: 'מי אנחנו',
                    image: require('../../../public/assets/images/icons/Gstar.png'),
                    logged: true
                },
                {
                    action: 'toggleSettings',
                    text: 'הגדרות',
                    image: require('../../../public/assets/images/icons/Settings.png'),
                    logged: true
                },
            ],

            myCourseLink: {
                action: 'home',
                text: 'הקורס שלי',
                image: require('../../../public/assets/images/icons/Home.png'),
                logged: true
            },
            searchLink: {
                action: 'search',
                text: 'חיפוש',
                image: require('../../../public/assets/images/icons/Search.png'),
                logged: true
            },

            showSearch: false,
            showSettings: false,
        }
    },

    watch: {
        $route() {
            this.showSettings = false;
        }
    },

    computed: {
        links() {
            let links               = this.allLinks.filter(link => link.logged === this.$store.getters['AuthState/isLogged']);
            const hasActiveCourse   = this.$store.getters['UserState/hasActiveCourse'];

            if(hasActiveCourse) {
                links = links.map(link => {
                    if(link.text === 'דף הבית') {
                        return this.myCourseLink
                    }

                    if(link.text === 'מי אנחנו') {
                        return this.searchLink;
                    }

                    return link;
                })
            }

            return links;
        },

        hasActiveCourse() {
            return this.$store.getters['UserState/hasActiveCourse'];
        }
    },

    methods: {
        action(method) {
            try {
                this[method]();
            } catch(err) {
                warning('mobile menu method not found: ' + err)
            }
        },

        search() {
            this.showSearch = !this.showSearch;
        },

        close() {
            this.search();
        },

        home() {
            this.$store.dispatch('UserState/goToLastActiveCourse');
        },

        toggleSettings() {
            this.showSettings = !this.showSettings;
        },

        scrollToTop(toUrl) {
            if(this.$route.path === toUrl) {
                document.querySelector('#app').scrollIntoView(
                    {behavior: "smooth", block: "start", inline: "center"}
                )
            }
        }
    }
}
</script>

<style scoped lang="scss">

    .mobile_menu_wrapper {
        width: 100vw;
        height:59px;
        z-index: 100;

        .mobile_menu_content {
            background-color: var(--mainDarkColor);
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100vw;
            padding-bottom: 8px;
        }

        .mobile_menu_filler {
            height:59px;
            width: 100vw;
        }

        .settings_wrapper {
            position: absolute;
            right: -100vw;
            top: calc(-50vh + 30px);
            transition: .3s right linear;
            z-index: 100;
        }

        .settings_visible {
            right: 100vw;
            transition: .5s right linear;
        }
    }

</style>