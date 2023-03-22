<template>
    <span>
        <!-- None Needed -->
    </span>
</template>

<script>
import Auth from '../../helpers/Auth';

export default {
    created() {
        Auth.deleteCookie();
        this.$store.dispatch('AuthState/setLogStatus', false);
        this.$store.dispatch('UserState/clearUserState', false);
        if(!Auth.isLogged()) {
            this.$router.push('/signin');
        }
    }
}
</script>