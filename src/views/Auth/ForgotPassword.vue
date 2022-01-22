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
                            <h2 class="auth_form_title"><span class="main_text_color">שכחתי</span> סיסמא</h2>
                            <h3 class="auth_form_subtitle">טופס למקרה ששכחת את הסיסמא</h3>
                            
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
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import CenterLineText from '../../components/Texts/CenterLineText.vue'
import Divider from '../../components/General/Divider.vue'

export default {
    components: {
        Logo,
        EmailInput,
        MainButton,
        CenterLineText,
        Divider,
    },
    
    data() {
        return {
            form: {
                email: '',
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

            axios.post('auth/forgot-password', this.form)
                .then(res => {
                    this.$store.dispatch('MessageState/addMessage', {message: 'נשלחה בקשת איפוס סיסמא בהצלחה'})
                    this.$router.push('/signin');
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

        validate() {
            const isEmailValid = this.$refs.email.validate();

            return isEmailValid;
        },

        setEmail(email) {
            this.form.email = email;
        },
    }
}
</script>

<style scoped lang="scss">

</style>
