<template>
<v-form @submit="submit()">
    <password-input 
        ref="oldPassword"
        text="סיסמא נוכחית"
        outlined
        title
        icon
        @onChange="setOldPassword" 
    />
    <br>
    <password-input 
        ref="password"
        outlined
        title
        icon
        @onChange="setPassword" 
    />

    <v-flex d-flex justify-end mt-10 mt-md-5>
        <v-flex xs12 md4 lg2>
            <main-button 
                :text="'עדכן סיסמא'"
                shadow
                :loading="loading"
            />
        </v-flex>
    </v-flex>
</v-form>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue'
import PasswordInput from './Inputs/PasswordInput.vue'

export default {
    components: { 
        MainButton,
        PasswordInput,
    },

    data() {
        return {
            form: {
                password: '',
            },
        }
    },

    methods: {
        setPassword(value) {
            this.form.password = value;
        },

        setOldPassword(value) {
            this.form.old_password = value;
        },

        async submit() {
            if(this.loading || !this.validate()) {
                return;
            }

            this.loading = true;
            await this.$store.dispatch('UserState/updatePassword', this.form);
            this.clearForm();
            this.loading = false;
        },

        clearForm() {
            this.$refs.oldPassword.setValue('')
            this.$refs.password.setValue('')
        },

        validate() {
            return this.$refs.password.validate();
        },
    }
}
</script>

<style scoped>
</style>
