<template>
    <div class="user_profile_wrapper px-5 px-md-0">
        <user-profile-form />

        <br>
        <br>
        <br>

        <user-update-email-form />

        <br>
        <br>

        <user-update-password-form />
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
    }
}
</script>

<style scoped>
</style>
