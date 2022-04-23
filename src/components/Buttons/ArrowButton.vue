<template>
<div class="arrow_button_wrapper" :style="cssVars" @click="submit()">
    <!-- <img loading="lazy"  :src="" alt=""> -->
    <div :class="direction">
        >
    </div>
</div>
</template>

<script>
import IconChip from './../Chips/IconChip.vue';

export default {
    components: {
        IconChip,
    },

    props: {
        left: {
            type: Boolean
        },

        right: {
            type: Boolean
        },

        size: {
            type: Number,
            default: 36
        }
    },

    computed: {
        direction() {
            if(this.left) {
                return 'arrow_left';
            }
            
            if(this.right) {
                return 'arrow_right';
            }

            return 'arrow_left';
        },

        cssVars() {
            return {
                '--size': this.size + 'px'
            }
        }
    },

    methods: {
        submit() {
            this.$emit('submit');
        }
    }
}
</script>

<style scoped>

    .arrow_button_wrapper {
        background-color: #fff;
        border-radius: 50%;
        height: var(--size);
        width: var(--size);
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.3);
        cursor: pointer;
    }

    .arrow_left {
        transform: rotate(180deg);
    }

    .arrow_rigth {
    }

</style>