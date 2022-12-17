<template>
    <span>
        <!-- None Needed -->
    </span>
</template>

<script>
export default {
    created() {
        Auth.deleteCookie();
        this.$store.dispatch('AuthState/setLogStatus', false);
        this.$store.dispatch('UserState/clearUserState', false);
        this.$router.push('/signin');
        console.log('finished!');
    }
}
</script>