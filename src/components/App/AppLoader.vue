<template>
<div class="app_loader_wrapper">
    <h1>
        טוען...
    </h1>
</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

    .app_loader_wrapper {
        height: 100vh;  
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #31353d;
        z-index: 1000;

        h1 {
            color: #fff;
        }
    }

</style>