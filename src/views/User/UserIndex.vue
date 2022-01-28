<template>
    <div>
        <router-link to="/signout">logout</router-link>
        <h1>
            User Index: {{name}}
        </h1>

        <div>
            <p>Courses:</p>
            {{ courses }}
        </div>

        <router-view>

        </router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: Auth.fullName(),
        }
    },

    computed: {
        courses() {
            return this.$store.getters['UserState/courses'];
        }
    },
}
</script>

<style scoped>
</style>
