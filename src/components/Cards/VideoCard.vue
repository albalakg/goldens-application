
<template>
    <div class="video_wrapper pointer" @click="submit()">
        <play v-if="showPlayButton" class="play_button"/>
        <img 
            v-if="showPlaceholder" 
            :class="{
                'rounded': rounded && !roundedTop,
                'rounded_top': roundedTop
            }"
            :src="imagePlaceholder" 
            :alt="imagePlaceholderAlt"
        >
        <video 
            v-else
            :class="{
                'rounded': rounded && !roundedTop,
                'rounded_top': roundedTop
            }" 
            ref="video"
            class="w100 h100"
            @playing="onVideoPlay"
            @pause="onVideoPaused"
            @ended="onVideoEnd"
            :controls="controls"
            controlsList="nodownload"
            :autoplay="shouldAutoplay"
            :disablePictureInPicture="disablePictureInPicture"
        >
            <source :src="src" type="video/mp4" />
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
        src: {
            type: String,
            required: true
        },

        imagePlaceholder: {
            type: String,
            required: false
        },

        imagePlaceholderAlt: {
            type: String,
            default: 'placeholder image'
        },

        controls: {
            type: Boolean,
            default: true
        },

        disablePictureInPicture: {
            type: Boolean,
            default: true
        },

        rounded: {
            type: Boolean,
            default: true
        },

        roundedTop: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            playing: false,
            startedWatching: false
        }
    },

    computed: {
        showPlaceholder() {
            return this.imagePlaceholder && !this.startedWatching;
        },
    
        showPlayButton() {
            return !this.startedWatching;
        },

        shouldAutoplay() {
            return this.imagePlaceholder;
        },
    },

    methods: {
        submit() {
            this.startedWatching = true;

            if(!this.playing) {
                this.$emit('playClicked')
            }
        },

        onVideoPlay(video) {
            this.playing = true;
            this.$emit('onVideoPlay', video)
        },

        onVideoPaused(video) {
            this.playing = false;
            this.$emit('onVideoPaused', video)
        },

        onVideoEnd(video) {
            this.$emit('onVideoEnd', video)
        },

        playClicked() {
            this.$emit('playClicked')
        },

        playVideo() {
            this.$refs.video.play();
        },

        setStartTime(startTime) {
            const video = this.$refs.video;
            if(video) {
                video.currentTime = startTime;
            }
        },

        resetWatching() {
            this.startedWatching = false;
        }
    }
}
</script>

<style scoped lang="scss">

    .video_wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #000;
    }

    .play_button {
        position: absolute;
        inset: 0;
        margin: auto;
        z-index: 2;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

</style>