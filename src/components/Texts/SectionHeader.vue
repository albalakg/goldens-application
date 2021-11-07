<template>
<div class="section_header_wrapper" :class="`section_header_${align}`" :style="`text-align: ${align}`">
    <h1 class="mb-3">
        {{ title }}
    </h1>

    <h2 v-if="backgroundTitle">
        {{ backgroundTitle }}
    </h2>

    <div class="line main_bg_color"></div>

    <p v-if="subtitle" class="mt-2">
        {{ subtitle }}
    </p>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        
        backgroundTitle: {
            type: String,
        },

        subtitle: {
            type: String,
        },

        center: {
            type: Boolean,
        },

        right: {
            type: Boolean
        },

        left: {
            type: Boolean
        },
    },

    computed: {
        align() {
            if(this.center) {
                return 'center'
            }

            if(this.right) {
                return 'right'
            }

            if(this.left) {
                return 'left'
            }

            return 'center';
        }
    }
}
</script>

<style scoped lang="scss">

    .section_header_wrapper {
        width: 100%;
        position: relative;

        h1 {
            font-size: 3em;
            position: relative;
            z-index: 2;
        }

        h2 {
            font-size: 7em;
            color: #88888822;
            top: -55px;
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
        }

        p {
            font-size: 0.9em;
            color: #999;
        }

        .line {
            height: 3px;
            width: 7%;
            margin: auto;
        }
    }

    .section_header_right {
        .line {
            margin-left: auto;
            margin: unset;
        }   
    }

    .section_header_left {
        .line {
            margin-right: auto !important;
            margin: unset;
        }   
    }

</style>
