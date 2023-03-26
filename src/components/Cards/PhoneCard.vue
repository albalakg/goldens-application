<template>
    <div class="phone_card mx-auto">
        <img :src="imageSrc" alt="שלב ראשון">
    </div>
</template>

<script>

export default {
    props: {
       imageSrc: {
            type: String,
            required: true
       }
    },
}
</script>

<style scoped lang="scss">
    .phone_card {
        height: 50vh;
        width: 25vh;
        box-shadow: 0 0 5px 4px var(--subColor);
        border: 2px solid var(--mainColor);
        border-radius: 20px;
        position: relative;

        img {
            height: calc(100% + 3px);
            width: calc(100% + 2px);
            border-radius: 20px;
            position: absolute;
            top: -1px;
            right: -1px;
        }

        p {
            bottom: -35%;
            position: absolute;
        }
    }

</style>