<template>
<div>
    <div class="mobile_top_menu_wrapper" :class="{'mobile_top_menu_shadow': shadow}">
        <v-flex xs6 mx-auto>
            <Logo
                :dark="isDark" 
            />
        </v-flex>
    </div>

    <div v-if="filler" class="mobile_top_menu_filler"></div>
</div>
</template>

<script>
import Logo from '../General/Logo.vue'

export default {
    components: {
        Logo,
    },

    props: {
        filler: {
            type: Boolean
        },

        shadow: {
            type: Boolean
        },
    },

    computed: {
        isLogged() {
            return this.$store.getters['AuthState/isLogged'];
        },

        isDark() {
            return this.$store.getters['AppState/isMenuDark']
        }
    },
}
</script>

<style scoped>

    .mobile_top_menu_wrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 100vw;
        height: 50px;
        z-index: 10;
        padding: 10px 0;
    }

    .mobile_top_menu_shadow{
        box-shadow: 0px 10px 10px 1px #0003;
    }

    .mobile_top_menu_filler {
        height: 65px;
        width: 100vw;
    }

</style>