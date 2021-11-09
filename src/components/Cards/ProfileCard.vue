
<template>
    <div class="profile_card_wrapper" :style="cssVars">
        <img :src="imageSrc" alt="">
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
        size: {
            type: Number,
            default: 100
        },

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
        cssVars() {
            return {
                '--size': this.size + 'px'
            }
        },

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
        height: var(--size);
        width: var(--size);
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
            left: 0;
            bottom: 0;
        }
    }

</style>