<template>
<v-form @submit="submit()">
    <password-input 
        ref="password"
        :loading="loading"
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
            loading: true,
        }
    },

    methods: {

        setPassword(value) {
            this.form.password = value;
        },

        async submit() {
            if(!this.validate()) {
                return;
            }

            this.loading = true;
            await this.$store.dispatch('UserState/updatePassword', this.form)
            this.loading = false;
        },

        validate() {
            return this.$refs.password.validate();
        },
    }
}
</script>

<style scoped>
</style>
