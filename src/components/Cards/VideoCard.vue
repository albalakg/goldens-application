
<template>
    <div class="video_wrapper pointer" @click="submit()">
        <play v-if="!playing" class="play_button" @submit="playClicked()" />
        <video 
            ref="video"
            class="mt-3 w100"
            @playing="onVideoPlay"
            @pause="onVideoPaused"
            :controls="controls || playing"
            controlsList="nodownload"
            :disablePictureInPicture="disablePictureInPicture"
        >
            <source :src="video" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
</template>

<script>
import Play from '../General/Play.vue'

export default {
    components: {
        Play,
    },
    
    props: {
        video: {
            type: String,
            required: true
        },

        controls: {
            type: Boolean
        },

        disablePictureInPicture: {
            type: Boolean
        },
    },

    data() {
        return {
            playing: false
        }
    },

    computed: {

    },

    methods: {
        submit() {
            this.$emit('submit')
        },

        onVideoPlay(video) {
            this.playing = true;
            this.$emit('onVideoPlay', video)
        },

        onVideoPaused(video) {
            this.playing = false;
            this.$emit('onVideoPaused', video)
        },

        playClicked() {
            this.$emit('playClicked')
        },

        startVideo() {
            this.$refs.video.play();
        },
    }
}
</script>

<style scoped lang="scss">

    .video_wrapper {
        width: 100%;
        position: relative;
    }

    video {
        border-radius: 8px;
    }

    .play_button {
        position: absolute;
        inset: 0;
        margin: auto;
        z-index: 2;
    }

</style>