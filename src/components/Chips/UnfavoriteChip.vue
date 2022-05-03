<template>
<div class="unfavorite_chip_wrapper dark_bg_color pointer" @click.stop="submit()">
    <span class="white_text_color" v-if="loading">
        ...
    </span>
    <v-icon v-else color="rgb(255, 89, 34)">
        mdi-heart-remove
    </v-icon>
</div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean
        }
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">

    .unfavorite_chip_wrapper {

        border-radius: 20px 0 0 20px;
        width: 50px;
        padding: 5px 10px;
        text-align: left;

        i {
            text-shadow: 0 0 15px 4px rgb(255, 89, 34, 1);
            filter: drop-shadow(0 0 8px rgb(255, 89, 34, 0.5));
        }
    }

</style>