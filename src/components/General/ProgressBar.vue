<template>
    <div 
        class="progress_bar_wrapper"
        :class="{
            'dark_progress_bar': dark,
            'slim_progress_bar': slim
        }"
    >
        <div 
            class="progress_bar_filler" 
            :style="`width: ${progressWidth}`"
        >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        progress: {
            type: Number,
            required: true
        },

        dark: {
            type: Boolean
        },

        slim: {
            type: Boolean 
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

    .dark_progress_bar {
        background-color: #eee3;
    }

    .dark_progress_bar .progress_bar_filler{
        background-color: #fff;
    }

    .slim_progress_bar {
        height: 8px;
    }

</style>