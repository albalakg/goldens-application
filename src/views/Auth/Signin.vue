<template>
    <div>
        <header>
            <Logo />
        </header>
            
        <main class="auth_form_top_margin">
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 lg7 xl8>
                    image
                </v-flex>
                <v-flex xs12 md6 lg5 xl4 px-5 px-md-0>
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

                            <v-flex d-md-flex align-center justify-space-between text-center>
                                <v-flex md5 mb-5 mb-md-0>
                                    <router-link to="/forgot-password">
                                        <span class="link">
                                            שכחתי סיסמא
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
                                                כניסה
                                            </strong>
                                        </template>
                                    </MainButton>
                                </v-flex>
                            </v-flex>

                            <Divider :space="8" />

                            <CenterLineText
                                class="my-3"
                                text="עוד לא רשומים?"
                            />

                            <Divider :space="8" />

                            <MainButton
                                dark
                                shadow
                                text="הרשמה"
                                :styleConfig="{
                                    padding: '10px 25px',
                                    borderRadius: '30',
                                }"
                            >
                            </MainButton>
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
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import CenterLineText from '../../components/Texts/CenterLineText.vue'
import Divider from '../../components/General/Divider.vue'

export default {
    components: {
        Logo,
        EmailInput,
        PasswordInput,
        EmailInput,
        MainButton,
        CenterLineText,
        Divider,
    },
    
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            error: '',
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
                    
                    Auth.login(res.data.data);
                    this.loggedSuccessfully(res.data.data);

                }).catch(err => {
                    this.error = err?.response?.data?.message;
                }).finally(() => {
                    this.loading = false;
                })

        },

        preSendActions() {
            this.loading    = true;
            this.error      = '';
        },

        loggedSuccessfully(data) {
            try {
                if(data.courses.length) {
                    // TODO: need to add logic that it will be the last
                    const lastActiveCourse = data.courses[0];
                    console.log('lastActiveCourse', lastActiveCourse);
                    this.$router.push('/courses/' + lastActiveCourse.course.id)
                }
            } catch(err) {
                error(err);
                this.$router.push('/')
            }
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
    }
}
</script>

<style scoped lang="scss">

</style>
