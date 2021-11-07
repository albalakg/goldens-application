<template>
<div class="content_image_card" :style="cssVars">
    <img :src="image" alt="">
    <div class="content_image_details">
        <h2 class="mb-2">
           {{ name }} 
        </h2>

        <div class="line mb-2 main_bg_color"></div>
        
        <p>
            {{ subtitle }}
        </p>
    </div>
    <div class="content_image_bottom_darknesss"></div>
</div>
</template>

<script>
export default {
    props: {
        image: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        subtitle: {
            type: String,
        },

        shadow: {
            type: Boolean,
        },

        height: {
            type: Number,
            default: 450
        }
    },

    computed: {
        cssVars() {
            return {
                '--height': this.height + 'px'
            }
        }
    }
}
</script>

<style scoped lang="scss">

    .content_image_card {
        height: var(--height);
        width: 270px;
        position: relative;

        img {
            position: absolute;
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 12px;
        }

        .content_image_bottom_darknesss {
            border-radius: 12px;
            width: 100%;
            height: 40%;
            position: absolute;
            bottom: 0;
            background: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.8));
        }

        .content_image_details {
            position: absolute;
            bottom: 5%;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 2;
            text-align: center;
        }

        .line {
            width: 7%;
            margin: auto;
            height: 4px;
        }

        h2 {
            color: #FFF;
            font-size: 3em;
            font-weight: 100;
        }

        p {
            color: #FFF;
        }
    }

</style>