
<template>
    <div class="profile_card_wrapper">
        <img loading="lazy" :src="imageSrc" alt="">
        <span class="profile_icon" v-if="editable">
            <IconChip 
                shadow
                icon="mdi-camera"
            />
        </span>
    </div>
</template>

<script>
import IconChip from './../Chips/IconChip.vue';

export default {
    components: {
        IconChip,
    },
    
    props: {
        editable: {
            type: Boolean
        }
    },

    data() {
        return {
            userImage:      Auth.image(),
            defaultImage:   FILES_PATH + 'default_profile.jpg'
        }
    },

    computed: {
        imageSrc() {
            return this.userImage ? userImage : this.defaultImage
        }
    }
}
</script>

<style scoped lang="scss">

    .profile_card_wrapper {
        border-radius: 50%;
        border: 2px solid #FFF;
        min-height: 10px;
        min-width: 10px;
        height: 100%;
        width: 100%;
        box-shadow: 0 5px 15px 7px #00000022;
        position: relative;

        img {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .profile_icon {
            position: absolute;
            left: 10px;
            bottom: 10px;
        }
    }

</style>