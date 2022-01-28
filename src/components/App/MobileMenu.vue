<template>
<div class="mobile_menu_wrapper">
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
        @close="close()"
     />
</div>
</template>

<script>
import SearchDialog from '../Dialogs/SearchDialog.vue';
import TabIcon from './../../components/Tabs/TabIcon';

export default {
    components: {
        TabIcon,
        SearchDialog,
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
                    url: '/settings',
                    text: 'הגדרות',
                    icon: 'mdi-cog',
                    logged: false
                },
                {
                    url: '/about',
                    text: 'מי אנחנו',
                    icon: 'mdi-account-group-outline',
                    logged: false
                },

                // logged
                {
                    url: '/',
                    text: 'דף הבית',
                    icon: 'mdi-home',
                    logged: true
                },
                {
                    url: '/user',
                    text: 'פרופיל',
                    icon: 'mdi-account-circle',
                    logged: true
                },
                {
                    url: '/settings',
                    text: 'הגדרות',
                    icon: 'mdi-cog',
                    logged: true
                },
                {
                    action: 'search',
                    text: 'חיפוש',
                    icon: 'mdi-magnify',
                    logged: true
                },
            ],
            showSearch: false,
        }
    },

    computed: {
        links() {
            return this.allLinks.filter(link => link.logged === this.$store.getters['AuthState/isLogged'])
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
        }
    }
}
</script>

<style scoped>

    .mobile_menu_wrapper {
        background-color: #31353d;
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100vw;
        height: 80px;
        z-index: 10;
    }

</style>