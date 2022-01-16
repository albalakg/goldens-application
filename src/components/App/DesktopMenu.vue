<template>
<div class="mobile_menu_wrapper">
    <v-flex d-flex justify-space-around align-center class="h100">
        <template v-for="(link, index) in links">
            <div :key="index">
                <router-link v-if="link.url" :to="'/' + link.url">
                    {{link.text}}
                </router-link>
                <span @click="link.action()">
                    <v-icon>{{link.icon}}</v-icon>
                </span>
            </div>
        </template>
    </v-flex>
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
                    logged: false
                },
                {
                    icon: 'mdi-search',
                    logged: true,
                    action: 'toggleSearchBox'
                },
                {
                    text: 'mdi-account',
                    url: 'profile',
                    logged: true
                },
                {
                    text: 'קורסים',
                    url: 'courses',
                    logged: false
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
    }

</style>