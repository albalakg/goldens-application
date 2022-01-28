<template>
    <div>
        <router-link to="/signout">logout</router-link>
        <h1>
            User Index
        </h1>

        <router-view>

        </router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>
</style>
