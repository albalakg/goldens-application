<template>
    <div class="signin_wrapper pb-10">
        <main class="auth_form_top_margin w100">
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 lg7 xl8>
                    <star-logo colored class="star_image" />
                </v-flex>
                <v-flex xs12 md6 lg5 xl4 px-5 px-md-0>
                    <v-flex md8>
                        <v-form class="signin_form" ref="form" @submit.prevent="submit()">
                            <h2 class="auth_form_title"><span class="main_text_color">שכחתי סיסמא</span> לאתר</h2>
                            <h3 class="auth_form_subtitle">לא באמת שכחתי, סתם בא לי לעדכן את הסיסמא...</h3>
                            
                            <Divider :space="8" />
                            
                            <email-input
                                ref="email"
                                outlined
                                title
                                icon
                                @onChange="setEmail" 
                            >
                            </email-input>
                            
                            <Divider :space="8" />

                            <v-flex d-md-flex align-center justify-space-between class="text-center text-md-right">
                                <v-flex md5 mb-5 mb-md-0 v-if="$vuetify.breakpoint.mdAndUp">
                                    <router-link to="/signin">
                                        <span class="link">
                                            רשומים? התחברו עכשיו
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
                                            <v-flex d-flex align-center justify-center>
                                                <strong class="white--text" v-if="loading">
                                                    טוען...
                                                </strong>
                                                <template v-else>
                                                    <strong class="white--text">
                                                        שלח קישור לאיפוס
                                                    </strong>
                                                </template>
                                            </v-flex>
                                        </template>
                                    </MainButton>
                                </v-flex>
                            </v-flex>
                        </v-form>
                
                        <v-flex v-if="$vuetify.breakpoint.smAndDown" class="mt-5 text-center">
                            <router-link to="/signin">
                                <span class="link">
                                    רשומים? התחברו עכשיו
                                </span>
                            </router-link>
                        </v-flex>
                    </v-flex>
                </v-flex>
            </v-flex>
        </main>
    </div>
</template>

<script>
import Logo from './../../components/General/Logo.vue'
import PasswordInput from '../../components/Form/Inputs/PasswordInput.vue'
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import CenterLineText from '../../components/Texts/CenterLineText.vue'
import Divider from '../../components/General/Divider.vue'
import StarLogo from '../../components/General/StarLogo.vue'

export default {
    components: {
        Logo,
        EmailInput,
        PasswordInput,
        EmailInput,
        MainButton,
        CenterLineText,
        Divider,
        StarLogo,
    },
    
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            loading: false
        }
    },

    methods: {
        submit() {

            if(!this.validate()) {
                return;
            }

            this.preSendActions();

            axios.post('auth/login', this.form)
                .then(res => {
                    
                    this.$store.dispatch('MessageState/addMessage', {message: 'התחברת בהצלחה, ברוך הבא!'});
                    Auth.login(res.data.data);
                    this.loggedSuccessfully(res.data.data);
                    this.$store.dispatch('AuthState/setLogStatus', true);

                }).catch(err => {
                    this.$store.dispatch('MessageState/addErrorMessage', { message: 'האימייל או הסיסמא אינם תקינים' })
                }).finally(() => {
                    this.loading = false;
                })

        },

        preSendActions() {
            this.loading    = true;
        },

        loggedSuccessfully(data) {
            try {
                this.$store.dispatch('UserState/setCourses', data.courses);
                this.$store.dispatch('UserState/goToLastActiveCourse', this.$route.path);
            } catch(err) {
                error(err);
            }

            this.$router.push('/')
        },

        validate() {
            const isEmailValid      = this.$refs.email.validate();
            const isPasswordValid   = this.$refs.password.validate();

            return isEmailValid && isPasswordValid;
        },

        setEmail(email) {
            this.form.email = email;
        },
        
        setPassword(password) {
            this.form.password = password;
        }
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
    
    @media only screen and (max-width: 600px) {
        .star_image {
            display: none;
        }
    }

</style>
