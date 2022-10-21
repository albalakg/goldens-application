<template>
    <div class="equipment_chip">
        <v-icon>
            {{ icon }}
        </v-icon>
        <br>
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
        },

        icon: {
            type: String,
            required: true
        },
    }
}
</script>

<style scoped>

    .equipment_chip {
        padding: 0px 10px;
        min-width: 75px;
        text-align: center;
        border-radius: 12px;
        font-size: 1.2em;
        background-color: #ffff;
        box-shadow: 0 2px 3px 1px #8885;
    }
    
</style>