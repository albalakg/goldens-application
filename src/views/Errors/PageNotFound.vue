<template>
    <v-flex d-flex justify-center xs10 md8 lg6 xl5 mx-auto class="page_not_found_wrapper app_padding_top">
        <div class="text-center">
            <h1 class="sub_text_color">אופס!</h1>
            <h2>העמוד שחיפשתם לא נמצא...</h2>

            <br><br>

            <router-link to="/">
                <main-button 
                    shadow
                    text="חזרה לעמוד הבית" 
                />
            </router-link>

            <img loading="lazy" class="mt-10" :src="image" alt="page not found">
        </div>
    </v-flex>
</template>

<script>
import MainButton from "../../components/Buttons/MainButton.vue"

export default {
    components: { MainButton },

    data() {
        return {
            image: require('../../../public/assets/images/general/404.png')
        }
    },

    created() {
        this.saveLandOnPageNotFound();
    },

    methods: {
        saveLandOnPageNotFound() {
            // TODO: send a request to server to notify that someone reached that page
        }
    }
}
</script>

<style scoped lang="scss">

    .page_not_found_wrapper {
        h1 {
            font-size: 5em;
        }

        img {
            width: 100%;
        }
    }

</style>