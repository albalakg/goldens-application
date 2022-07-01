<template>
<div class="app_loader_wrapper">
    <v-progress-circular size="150" indeterminate class="pa-4" color="#d5b26e">
        <favicon />
    </v-progress-circular>
</div>
</template>

<script>
import Favicon from '../General/Favicon.vue'
export default {

    components: {
        Favicon,
    },

}
</script>

<style scoped lang="scss">

    .app_loader_wrapper {
        height: 100vh;  
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #31353d;
        z-index: 1000;
    }

</style>