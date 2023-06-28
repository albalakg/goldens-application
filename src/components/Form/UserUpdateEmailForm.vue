<template>
<v-form @submit.prevent="submit()">
    <email-input 
        ref="email"
        :loading="loading"
        outlined
        title
        icon
        @onChange="setEmail" 
    />

    <v-flex d-flex justify-end mt-10 mt-md-5>
        <v-flex xs12 md6>
            <main-button 
                :text="'עדכן אימייל'"
                shadow
                :disabled="isSameEmail"
                :loading="loading"
            />
        </v-flex>
    </v-flex>
</v-form>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue'
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'

export default {
    components: { 
        MainButton,
        EmailInput,
    },

    data() {
        return {
            form: {
                email: '',
            },
            loading: true,
        }
    },

    watch: {
        email() {
            this.setInitialData();
        }
    },

    mounted() {
        if(this.email) {
            this.setInitialData();
        }
    },

    computed: {
        email() {
            return this.$store.getters['UserState/email']
        },

        isSameEmail() {
            return this.form.email === this.$store.getters['UserState/email'];
        }
    },

    methods: {
        setInitialData() {
            this.$refs.email.setValue(this.$store.getters['UserState/email']);
            this.loading = false;
        },

        setEmail(value) {
            this.form.email = value;
        },

        async submit() {
            if(this.loading || !this.validate()) {
                return;
            }

            if(this.isSameEmail) {
                this.$store.dispatch('MessageState/addErrorMessage', { message: 'הכותבת מייל אינה יכולה להיות זהה לכתובת הנוכחית' })
                return;
            }

            this.loading = true;
            await this.$store.dispatch('UserState/updateEmail', this.form)
            this.loading = false;
        },

        validate() {
            return this.$refs.email.validate();
        },
    }
}
</script>

<style scoped>
</style>
