<template>
<div class="time_chip_wrapper">
    <span class="white_text_color">
        {{time}}
    </span>
</div>
</template>

<script>
export default {
    props: {
        seconds: {
            type: String,
            required: true
        }
    },

    computed: {
        time() {
            return ContentService.getLessonTimeFormat(this.seconds);
        }
    }
}
</script>

<style scoped>

    .time_chip_wrapper {
        border-radius: 4px;
        background-color: #393d3dee;
        padding: 4px 6px;
    }

</style>