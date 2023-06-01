<template>
    <div class="signin_wrapper auth_padding_top">
        <main class="auth_form_top_margin w100">
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 lg7 xl8>
                    <star-logo colored class="star_image" />
                </v-flex>
                <v-flex xs12 md6 lg5 xl4 px-5 px-md-0 mb-md-8>
                    <v-flex md8>
                        <v-form class="signin_form" ref="form" @submit.prevent="submit()">
                            <h2 class="auth_form_title"><span class="main_text_color">התחברות</span> לאתר</h2>
                            <h3 class="auth_form_subtitle">ברוך הבא לעולם הספורט</h3>
                            
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

                            <password-input
                                ref="password"
                                outlined
                                title
                                icon
                                @onChange="setPassword" 
                            >
                            </password-input>
                            
                            <Divider :space="8" />

                            <v-flex d-md-flex align-center justify-space-between class="text-center text-md-right">
                                <v-flex md5 mb-5 mb-md-0 v-if="$vuetify.breakpoint.mdAndUp">
                                    <router-link to="/forgot-password">
                                        <span class="link">
                                            שכחתי סיסמה
                                        </span>
                                    </router-link>
                                </v-flex>
                                <v-flex md5 class="signin_button">
                                    <main-button
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
                                                        כניסה
                                                    </strong>
                                                    <player-icon-decorator class="player_icon mr-3"/>
                                                </template>
                                            </v-flex>
                                        </template>
                                    </main-button>
                                </v-flex>
                            </v-flex>

                            <Divider :space="8" />

                            <CenterLineText
                                class="my-3 my-lg-10"
                                text="עוד לא רשומים?"
                            />

                            <Divider :space="8" />

                        </v-form>

                        <router-link class="mt-5" to="/signup">
                            <main-button
                                subColor
                                shadow
                                text="הרשמה"
                                :styleConfig="{
                                    padding: '10px 25px',
                                    borderRadius: '30',
                                }"
                            >
                            </main-button>
                        </router-link>
                
                        <v-flex v-if="$vuetify.breakpoint.smAndDown" class="mt-5 text-center">
                            <router-link to="/forgot-password">
                                <span class="link">
                                    שכחתי סיסמה
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
import PasswordInput from '../../components/Form/Inputs/PasswordInput.vue'
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import CenterLineText from '../../components/Texts/CenterLineText.vue'
import Divider from '../../components/General/Divider.vue'
import StarLogo from '../../components/General/StarLogo.vue'
import PlayerIconDecorator from '../../components/Decorators/playerIconDecorator.vue'

export default {
    components: {
        EmailInput,
        PasswordInput,
        MainButton,
        CenterLineText,
        Divider,
        StarLogo,
        PlayerIconDecorator,
    },
    
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            loading: false,
            errorsMapping: {
                'Email or password is invalid': 'האימייל או הסיסמה אינם תקינים',
                'Please confirm your email first': 'מצטערים, אך צריכים שקודם תאשר את המייל',
            }
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
                    
                    Auth.login(res.data.data);
                    this.$store.dispatch('MessageState/addInfoMessage', {type: 'info', title: 'ברוך הבא', message: 'התחברת בהצלחה ' + Auth.firstName()});
                    this.loggedSuccessfullyActions();
                    
                }).catch((err) => {
                    this.handleLoginError(err);
                }).finally(() => {
                    this.loading = false;
                })

        },

        handleLoginError(error) {
            try {
                this.$store.dispatch('MessageState/addErrorMessage', {message: this.errorsMapping[error.response.data.message] })
            } catch(err) {
                this.$store.dispatch('MessageState/addErrorMessage', {message: 'מצטערים אך יש תקלה בנסיון ההתחברות' })
            }
        },

        async loggedSuccessfullyActions(){
            this.$store.dispatch('AuthState/setLogStatus', true);
            await this.$store.dispatch('UserState/init', true);

            if(this.$route.query.redirect) {
                this.redirectToPage();
            } else {
                this.$store.dispatch('UserState/goToLastActiveCourse', true);
            }
        },

        preSendActions() {
            this.loading    = true;
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
        },

        redirectToPage() {
            this.$router.push(this.$route.query.redirect)
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
        .signin_button {
            margin-top: 50px;
        }

        .star_image {
            display: none;
        }
    }

</style>
