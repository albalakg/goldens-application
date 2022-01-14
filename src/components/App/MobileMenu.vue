<template>
<div class="mobile_menu_wrapper">
    <v-flex d-flex justify-space-around align-center class="h100">
        <template v-for="(link, index) in links">
            <TabIcon
                :text="link.text" 
                :icon="link.icon" 
                :key="index" 
            />
        </template>
    </v-flex>
</div>
</template>

<script>
import TabIcon from './../../components/Tabs/TabIcon';

export default {
    components: {
        TabIcon,
    },

    data() {
        return {
            allLinks: [
                //guest
                {
                    text: 'דף הבית',
                    icon: 'mdi-home',
                    logged: false
                },
                {
                    text: 'הגדרות',
                    icon: 'mdi-settings',
                    logged: false
                },
                {
                    text: 'קורסים',
                    icon: 'mdi-courses',
                    logged: false
                },
                {
                    text: 'מי אנחנו',
                    icon: 'mdi-info',
                    logged: false
                },

                // logged
                {
                    text: 'דף הבית',
                    icon: 'mdi-home',
                    logged: true
                },
                {
                    text: 'פרופיל',
                    icon: 'mdi-home',
                    logged: true
                },
                {
                    text: 'הגדרות',
                    icon: 'mdi-settings',
                    logged: true
                },
                {
                    text: 'חיפוש',
                    icon: 'mdi-search',
                    logged: true
                },
            ]
        }
    },

    computed: {
        links() {
            return this.allLinks.filter(link => link.logged === Auth.isLogged())
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