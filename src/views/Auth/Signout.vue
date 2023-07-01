<template>
    <span>
        <!-- None Needed -->
    </span>
</template>

<script>
import Auth from '../../helpers/Auth';

export default {
    created() {
        this.deleteSession();
    },

    methods: {
        deleteSession() {
            Auth.logout();
            if(!Auth.isLogged()) {
                this.$store.dispatch('AuthState/setLogStatus', false);
                this.$store.dispatch('UserState/clearUserState');
                this.$router.push('/signin');
            }
        }
    },
}
</script>