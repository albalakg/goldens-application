<template>
<div>
    <v-form @submit.prevent="submit()" v-if="showPasswordForm">
        <password-input 
            ref="oldPassword"
            text="סיסמה נוכחית"
            outlined
            title
            icon
            autofocus
            @onChange="setOldPassword" 
        />
        <br>
        <password-input 
            ref="password"
            text="סיסמה חדשה"
            outlined
            title
            icon
            @onChange="setPassword" 
        />

        <v-flex d-flex justify-end mt-10 mt-md-5>
            <v-flex xs12 md6 mt-4>
                <main-button 
                    :text="'עדכן סיסמה'"
                    shadow
                    :disabled="isPasswordsEmpty"
                    :loading="loading"
                />
            </v-flex>
        </v-flex>
    </v-form>
    <v-flex md6 v-else>
        <main-button 
            text="החלף סיסמה"
            @submit="toggleShowPasswordForm()"
        />
    </v-flex>
</div>
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
            loading: false,
            showPasswordForm: false
        }
    },

    computed: {
        
        isPasswordsEmpty() {
            return !this.form.password || !this.form.old_password;
        },
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

            if(this.isTheSamePassword()) {
                return this.$store.dispatch('MessageState/addErrorMessage', { message: 'הסיסמה החדשה צריכה להיות שונה מהסיסמה הנוכחית' });
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

        isTheSamePassword() {
            return this.form.password === this.form.old_password;
        },

        toggleShowPasswordForm() {
            this.showPasswordForm = !this.showPasswordForm;
        }
    }
}
</script>

<style scoped>
</style>
