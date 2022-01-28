<template>
    
</template>

<script>
export default {
    created() {

        Auth.deleteCookie();
        this.$store.dispatch('AuthState/setLogStatus', false);
        this.$router.push('/signin');

    }
}
</script>