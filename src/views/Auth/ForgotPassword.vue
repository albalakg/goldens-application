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
                            <h2 class="auth_form_title"><span class="main_text_color">שכחתי סיסמה</span> לאתר</h2>
                            <h3 class="auth_form_subtitle">לא באמת שכחתי, סתם בא לי לעדכן את הסיסמה...</h3>
                            
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

                            <v-flex d-md-flex align-center justify-space-between class="text-center text-md-right pt-10 pt-md-0">
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
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import Divider from '../../components/General/Divider.vue'
import StarLogo from '../../components/General/StarLogo.vue'

export default {
    components: {
        EmailInput,
        MainButton,
        Divider,
        StarLogo,
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
                .then(() => {
                    this.$store.dispatch('MessageState/addInfoMessage', {message: 'נשלחה בקשת איפוס סיסמה בהצלחה'})
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
