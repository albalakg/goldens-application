<template>
<div>
    <div class="mobile_top_menu_wrapper">
        <v-flex xs6 mx-auto>
            <Logo />
        </v-flex>
    </div>

    <div class="mobile_top_menu_filler"></div>
</div>
</template>

<script>
import Logo from '../General/Logo.vue'

const LIGHT_MODE    = 'light';
const DARK_MODE     = 'dark';

export default {
    components: {
        Logo,
    },

    data() {
        return {
            mode: LIGHT_MODE,
            whiteModePagesList: ['/']
        }
    },

    computed: {
        isLogged() {
            return this.$store.getters['AuthState/isLogged'];
        },

        isLightMode() {
            return this.mode === LIGHT_MODE;
        }
    },

    watch: {
        $route(to, from) {
            this.setMode();
        }
    },

    methods: {
        setMode() {
            const route = this.$route.fullPath;
            this.mode = this.whiteModePagesList.includes(route) ? LIGHT_MODE : DARK_MODE;
        }
    }
}
</script>

<style scoped>

    .mobile_top_menu_wrapper {
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 50px;
        z-index: 10;
        box-shadow: 0px 10px 10px 1px #0003;
        padding: 10px 0;
        background-color: #fff;
    }

    .mobile_top_menu_filler {
        height: 25px;
        width: 100vw;
    }

</style>