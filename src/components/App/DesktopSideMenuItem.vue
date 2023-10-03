<template>
    <div class="desktop_side_menu_item text-center pointer">
        <router-link :to="url" class="simple_link">
            <h3 class="sub_text_color">
                {{ text }}
            </h3>
        </router-link>
    </div>
</template>
    
<script>

export default {
    components: {

    },

    props: {
        text: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },

    computed: {

    },

    methods: {

    }
}
</script>
    
<style scoped lang="scss">

    .desktop_side_menu_item {
        padding: 20px 5px;
        transition: .3s background-color linear;
        
        &:hover {
            background-color: #fff1;
        }
    }

</style>