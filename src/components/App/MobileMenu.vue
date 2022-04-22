<template>
<div class="mobile_menu_wrapper">

    <div class="mobile_menu_content">
        <v-flex d-flex justify-space-around align-center class="h100">
            <template v-for="(link, index) in links">
                <div v-if="link.url" :key="index">
                    <router-link class="simple_link" :to="link.url">
                        <TabIcon
                            :text="link.text" 
                            :icon="link.icon" 
                            :key="index" 
                        />
                    </router-link>
                </div>
                <TabIcon
                    v-else
                    :text="link.text" 
                    :icon="link.icon" 
                    :key="index"
                    @onClick="action(link.action)" 
                />
            </template>
        </v-flex>
        <search-dialog 
            :show="showSearch"
            :minHeight="300"
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
import TabIcon from './../../components/Tabs/TabIcon';

export default {
    components: {
        TabIcon,
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
                    icon: 'mdi-home',
                    logged: false
                },
                {
                    url: '/signin',
                    text: 'התחבר',
                    icon: 'mdi-key-outline',
                    logged: false
                },
                {
                    url: '/about',
                    text: 'מי אנחנו',
                    icon: 'mdi-account-group-outline',
                    logged: false
                },
                {
                    action: 'toggleSettings',
                    text: 'הגדרות',
                    icon: 'mdi-cog',
                    logged: false
                },

                // logged
                {
                    text: 'דף הבית',
                    icon: 'mdi-home',
                    action: 'home',
                    logged: true
                },
                {
                    url: '/user',
                    text: 'פרופיל',
                    icon: 'mdi-account-circle',
                    logged: true
                },
                {
                    action: 'search',
                    text: 'חיפוש',
                    icon: 'mdi-magnify',
                    logged: true
                },
                {
                    action: 'toggleSettings',
                    text: 'הגדרות',
                    icon: 'mdi-cog',
                    logged: true
                },
            ],
            showSearch: false,
            showSettings: false,
        }
    },

    watch: {
        $route(newval) {
            this.showSettings = false;
        }
    },

    computed: {
        links() {
            return this.allLinks.filter(link => link.logged === this.$store.getters['AuthState/isLogged'])
        },

        courses() {
            return this.$store.getters['UserState/courses'];
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
            this.$store.dispatch('UserState/goToLastActiveCourse', this.$route.path);
        },

        toggleSettings() {
            this.showSettings = !this.showSettings;
        }
    }
}
</script>

<style scoped lang="scss">

    .mobile_menu_wrapper {
        width: 100vw;
        height:59px;
        z-index: 10;

        .mobile_menu_content {
            background-color: #31353d;
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100vw;
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