<template>
    
</template>

<script>
export default {
    created() {
        console.log(222);
        Auth.deleteCookie();
        this.$store.dispatch('AuthState/setLogStatus', false);
        this.$router.push('/signin');
    }
}
</script>