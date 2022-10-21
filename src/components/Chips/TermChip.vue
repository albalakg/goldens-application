<template>
    <div class="term_chip pointer" @click="submit()">
        <span>
            {{ text }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
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

    .term_chip {
        box-shadow: 0 2px 3px 1px #888;
        border-radius: 4px;
        padding: 0px 10px;
        min-width: 75px;
        text-align: center;
        font-size: 1.2em;
        background-color: #fff;
        transition: .2s transform linear;
    }

    .term_chip:hover {
        transform: scale(1.05);
    }
    
</style>