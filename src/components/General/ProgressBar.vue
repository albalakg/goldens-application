<template>
    <div class="progress_bar_wrapper">
        <div class="progress_bar_filler" :style="`width: ${progressWidth}`"></div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            required: true
        }
    },

    computed: {
        progressWidth() {
            if(this.progress < 0) {
                return '0%';
            }

            if(this.progress > 100) {
                return '100%';
            }

            return this.progress + '%';
        }
    }
    
}
</script>

<style scoped>

    .progress_bar_wrapper {
        border-radius: 8px;
        width: 100%;
        height: 12px;
        background-color: #eee;
    }

    .progress_bar_filler {
        border-radius: 8px;
        height: 100%;
        background-color: #31353d;
        transition: .3s width ease-in;
    }

</style>