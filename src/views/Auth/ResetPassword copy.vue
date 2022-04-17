<template>
    <div>
        <header>
            <Logo />
        </header>
            
        <main class="auth_form_top_margin">
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 xl8>
                    image
                </v-flex>
                <v-flex xs12 md6 xl4 px-5 px-md-0>
                    <v-flex md8>
                        <v-form class="signin_form" ref="form" @submit.prevent="submit()">
                            <h2 class="auth_form_title"><span class="main_text_color">איפוס</span> סיסמא</h2>
                            <h3 class="auth_form_subtitle">טופס לאיפוס הסיסמא</h3>
                            
                            <Divider :space="8" />
                            
                            <password-input
                                ref="password"
                                outlined
                                title
                                icon
                                @onChange="setPassword" 
                            >
                            </password-input>
                            
                            <Divider :space="8" />
                            
                            <password-input
                                ref="passwordConfirmation"
                                outlined
                                title
                                icon
                                confirmation
                                :match="form.password"
                                @onChange="setPasswordConfirmation" 
                            >
                            </password-input>
                            
                            <Divider :space="8" />

                            <v-flex d-md-flex align-center justify-space-between text-center>
                                <v-flex md5 mb-5 mb-md-0>
                                    <router-link to="/signin">
                                        <span class="link">
                                            להתחברות
                                        </span>
                                    </router-link>
                                </v-flex>
                                <v-flex md5>
                                    <MainButton
                                        :loading="loading"
                                        :styleConfig="{
                                            padding: '10px 25px',
                                            borderRadius: '30',
                                        }"
                                    >
                                        <template slot="content">
                                            <strong class="white--text" v-if="loading">
                                                טוען...
                                            </strong>
                                            <strong class="white--text" v-else>
                                                שלח קישור לאיפוס
                                            </strong>
                                        </template>
                                    </MainButton>
                                </v-flex>
                            </v-flex>
                        </v-form>
                    </v-flex>
                </v-flex>
            </v-flex>
        </main>

    </div>
</template>

<script>
import Logo from './../../components/General/Logo.vue'
import PasswordInput from '../../components/Form/Inputs/PasswordInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import CenterLineText from '../../components/Texts/CenterLineText.vue'
import Divider from '../../components/General/Divider.vue'

export default {
    components: {
        Logo,
        PasswordInput,
        MainButton,
        CenterLineText,
        Divider,
    },
    
    data() {
        return {
            form: {
                password: '',
                passwordConfirmation: '',
            },
            error: '',
            loading: false
        }
    },

    created() {
        this.setURLParams();
    },

    methods: {
        setURLParams() {
            this.form.email = this.$route.query.email;
            this.form.token = this.$route.query.token;
        },

        submit() {
            this.error = '';

            this.preSendActions();

            if(!this.validate()) {
                this.postSendActions();
                return;
            }

            axios.post('auth/reset-password', this.form)
                .then(res => {
                    this.$store.dispatch('MessageState/addMessage', {message: 'נשלחה בקשת איפוס סיסמא בהצלחה'})
                    this.$router.push('/signin');
                }).catch(err => {
                    this.setError(err.response);
                }).finally(() => {
                    this.postSendActions();
                })
        },

        setError(error) {
            let message = 'מצטערים, יש שגיאה בבקשה, תבדוק שכל המידע תקין';

            try {
                if(error.data.message === 'Can\'t update new password that matches the old password') {
                    message = 'הסיסמה החדשה אינה יכולה להיות זהה להסיסמא הישנה';
                }

            } catch(err) {
                error(err);
            }
            
            this.$store.dispatch('MessageState/addErrorMessage', { message: message })
        },

        preSendActions() {
            this.loading    = true;
            this.error      = '';
        },

        postSendActions() {
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },

        validate() {
            const isPasswordValid               = this.$refs.password.validate();
            const isPasswordConfirmationValid   = this.$refs.passwordConfirmation.validate();
            const isURLValid                    = this.form.email && this.form.token;

            if(!isURLValid) {
                this.$store.dispatch('MessageState/addErrorMessage', {message: 'הקישור אינו תקין'})
            }

            return  isPasswordValid && 
                    isPasswordConfirmationValid &&
                    isURLValid;
        },

        setPassword(password) {
            this.form.password = password;
        },

        setPasswordConfirmation(passwordConfirmation) {
            this.form.passwordConfirmation = passwordConfirmation;
        },
    }
}
</script>

<style scoped lang="scss">

</style>
