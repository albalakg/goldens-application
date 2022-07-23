<template>
    
</template>

<script>
export default {
    created() {
        Auth.deleteCookie();
        this.$store.dispatch('AuthState/setLogStatus', false);
        this.$store.dispatch('UserState/clearUserState', false);
        this.$router.push('/signin');
    }
}
</script>