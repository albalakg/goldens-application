<template>
    <div class="user_profile_wrapper px-5 px-md-0">
        <user-profile-form />

        <br>
        <br>
        <br>

        <v-flex lg6>
            <user-update-email-form />
        </v-flex>

        <br>
        <br>
        
        <v-flex lg6>
            <user-update-password-form />
        </v-flex>
    </div>
</template>

<script>
import UserProfileForm from '../../components/Form/UserProfileForm.vue'
import UserUpdateEmailForm from '../../components/Form/UserUpdateEmailForm.vue'
import UserUpdatePasswordForm from '../../components/Form/UserUpdatePasswordForm.vue'
export default {
    components: { 
        UserProfileForm,
        UserUpdateEmailForm,
        UserUpdatePasswordForm,
    },
    

    created() {

    },
}
</script>

<style scoped>
</style>
