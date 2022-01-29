<template>
    <div class="user_header_wrapper">
        
        <div class="text-center">
            <div class="user_profile_image mx-auto">
                <profile-card
                    editable
                >
                </profile-card>
            </div>
            <div class="text--center">
                <h1>
                    <span class="main_text_color">{{ firstName }}</span> <span>{{ lastName }}</span>
                </h1>
                <v-flex xs4 mx-auto>
                    <router-link to="/signout">
                        <main-button
                            text="התנתק"
                            shadow
                            dark
                            slim
                        >
                        </main-button>
                    </router-link>
                </v-flex>
            </div>

            <br>
            <br>

            <v-flex class="user_links_wrapper">
                <MainTabs
                    :tabs="links"
                    :activeTab="activeTab"
                    @submit="setActiveTab"
                >
                </MainTabs>
            </v-flex>
        </div>

        <div class="user_content_wrapper mt-7">
            <transition name="fade" mode="out-in">
                <router-view>
                </router-view>
            </transition>
        </div>
    </div>
</template>

<script>
import MainButton   from '../../components/Buttons/MainButton.vue';
import ProfileCard  from '../../components/Cards/ProfileCard.vue';
import MainTabs     from '../../components/Tabs/MainTabs.vue';

export default {
    components: { 
        ProfileCard,
        MainButton,
        MainTabs,
    },
    
    data() {
        return {
            name: Auth.fullName(),
            links: [
                {
                    title: 'פרטים אישיים',
                    url: '/user'
                },
                {
                    title: 'אימונים קודמים',
                    url: '/user/history'
                },
                {
                    title: 'מועדפים',
                    url: '/user/favorites'
                },
                {
                    title: 'הזמנות',
                    url: '/user/orders'
                },
                {
                    title: 'פניות ותמיכה',
                    url: '/user/support'
                },
            ],
            activeTab: 0,
        }
    },

    mounted() {
        setTimeout(() => {
            this.setCurrentTab();
        }, 0);
    },

    computed: {
        firstName() {
            return this.$store.getters['UserState/firstName'] ? this.$store.getters['UserState/firstName'] : '';
        },

        lastName() {
            return this.$store.getters['UserState/lastName'] ? this.$store.getters['UserState/lastName'] : '';
        },
    },

    methods: {
        setCurrentTab() {
            this.activeTab = this.links.findIndex(link => link.url === this.$route.path);
            const linksWrapper = document.querySelector('.user_links_wrapper');
            linksWrapper.scrollLeft = this.activeTab * -80;
        },

        setActiveTab(tab) {
            this.activeTab = tab;

            if(this.links[tab].url !== this.$route.path) {
                setTimeout(() => {
                    this.$router.push(this.links[tab].url);
                }, 0);
            }
        }
    }
}
</script>

<style scoped lang="scss">

    .user_header_wrapper {

        .user_profile_image {
            height: 250px;
            width: 250px;
            margin-top: 100px;
        }

        h1 {
            font-size: 2em;
            margin-bottom: 12px;
        }

        .user_links_wrapper {
            overflow-y: hidden;
            overflow-x: scroll;
            
            &::-webkit-scrollbar {
                display: none; // Safari and Chrome
            }
        }
    }

</style>
