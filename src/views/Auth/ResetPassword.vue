<template>
    <div class="signin_wrapper auth_padding_top">
        <main class="auth_form_top_margin w100">
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 lg7 xl8>
                    <star-logo colored class="star_image" />
                </v-flex>
                <v-flex xs12 md6 lg5 xl4 px-5 px-md-0>
                    <v-flex md8>
                        <v-form class="signin_form" ref="form" @submit.prevent="submit()">
                            <h2 class="auth_form_title"><span class="main_text_color">איפוס סיסמה</span> לאתר</h2>
                            <h3 class="auth_form_subtitle">חשוב לבחור סיסמה חזקה כדי לאבטח על המשתמש</h3>
                            
                            <Divider :space="8" />
                            
                            <password-input
                                ref="password"
                                outlined
                                title
                                icon
                                autocomplete="new-password"
                                @onChange="setPassword" 
                            >
                            </password-input>
                            
                            <div class="spacer"></div>
                            
                            <password-input
                                ref="passwordConfirmation"
                                outlined
                                title
                                icon
                                confirmation
                                autocomplete="new-password"
                                @onChange="setPasswordConfirmation" 
                            >
                            </password-input>
                            
                            <Divider :space="8" />

                            <v-flex d-md-flex align-center justify-space-between class="text-center text-md-right pt-10 pt-md-0">
                                <v-flex md5>
                                    <MainButton
                                        :loading="loading"
                                        :styleConfig="{
                                            padding: '10px 25px',
                                            borderRadius: '30',
                                        }"
                                    >
                                        <template slot="content">
                                            <v-flex d-flex align-center justify-center>
                                                <strong class="white--text" v-if="loading">
                                                    טוען...
                                                </strong>
                                                <template v-else>
                                                    <strong class="white--text">
                                                        אפס סיסמה
                                                    </strong>
                                                </template>
                                            </v-flex>
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
import PasswordInput from '../../components/Form/Inputs/PasswordInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import Divider from '../../components/General/Divider.vue'
import StarLogo from '../../components/General/StarLogo.vue'

export default {
    components: {
        PasswordInput,
        MainButton,
        Divider,
        StarLogo,
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
                .then(() => {
                    this.$store.dispatch('MessageState/addInfoMessage', {message: 'נשלחה בקשת איפוס סיסמה בהצלחה'})
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
                    message = 'הסיסמה החדשה אינה יכולה להיות זהה להסיסמה הישנה';
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

    .star_image {
        width: 60%;
        position: relative;
        top: -10%;
    }

    .signin_wrapper {
        width: 100vw;
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    .player_icon {
        height: 15px;
        width: 15px;
    }
    
    .spacer {
        height: 30px;
        width: 100%;
    }
    
    @media only screen and (max-width: 600px) {
        
        .spacer {
            height: 50px;
        }

        .star_image {
            display: none;
        }
    }

</style>
