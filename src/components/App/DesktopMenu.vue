<template>
<div class="desktop_menu_wrapper">

    <div class="desktop_menu_content">
        <v-flex d-flex justify-space-around align-center class="h100" xs10 mx-auto>
            <template v-for="(link, index) in links">
                <v-flex d-flex justify-center :key="index">
                    <router-link v-if="link.text" class="pointer simple_link" :to="'/' + link.url">
                        <span>
                            {{link.text}}
                        </span>
                    </router-link>
                    <span v-else @click="activateAction(link.action)">
                        <router-link class="pointer" v-if="link.url" :to="'/' + link.url">
                            <v-icon color="white">{{link.icon}}</v-icon>
                        </router-link>
                        <v-icon class="pointer" v-else color="white">{{link.icon}}</v-icon>
                    </span>
                </v-flex>
            </template>
        </v-flex>
    </div>

    <div class="desktop_menu_filler"></div>

</div>
</template>

<script>

export default {
    components: {
    },

    data() {
        return {
            allLinks: [
                //guest
                {
                    text: 'דף הבית',
                    url: '',
                    logged: false
                },
                {
                    text: 'הגדרות',
                    url: 'settings',
                    logged: false
                },
                {
                    text: 'קורסים',
                    url: 'courses',
                    logged: false
                },
                {
                    text: 'מי אנחנו',
                    url: 'about',
                    logged: false
                },

                // logged
                {
                    text: 'דף הבית',
                    url: '',
                    logged: true
                },
                {
                    text: 'הגדרות',
                    url: 'settings',
                    logged: true
                },
                {
                    text: 'מי אנחנו',
                    url: 'about',
                    logged: true
                },
                {
                    text: 'קורסים',
                    url: 'courses',
                    logged: true
                },
                {
                    icon: 'mdi-magnify',
                    logged: true,
                    action: 'toggleSearchBox'
                },
                {
                    icon: 'mdi-account-circle',
                    url: 'user',
                    logged: true
                },
                
            ]
        }
    },

    computed: {
        links() {
            console.log('this.allLinks.filter(link => link.logged === Auth.isLogged())', this.allLinks.filter(link => link.logged === Auth.isLogged()));
            return this.allLinks.filter(link => link.logged === Auth.isLogged())
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
        }
    }
}
</script>

<style scoped>

    .desktop_menu_wrapper {
        background-color: #31353d;
        width: 100vw;
        height: 80px;
        z-index: 10;
    }

    .desktop_menu_content {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 80px
    }

    .desktop_menu_filler {
        height: 80px;
        width: 100vw;
    }

    span {
        color: rgb(174, 174, 174);
    }

</style>