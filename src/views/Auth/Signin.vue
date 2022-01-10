<template>
    <div>
        <header>
            <Logo />
        </header>
            
        <main>
            <v-flex d-flex>
                <v-flex md8>
                    image
                </v-flex>
                <v-flex md4>
                    <v-flex md8>
                        <v-form class="signin_form">
                            <h2 class="auth_form_title"><span class="main_text_color">התחברות</span> לאתר</h2>
                            <!-- <h3 class="auth_form_subtitle"></h3> -->
                            <br>
                            
                            <email-input
                                outlined
                                title
                                icon
                            >
                            </email-input>
                            
                            <br>
                            <br>

                            <password-input
                                outlined
                                title
                                icon
                            >
                            </password-input>
                            
                            <br>
                            <br>

                            <v-flex d-flex align-center justify-space-between>
                                <v-flex md5>
                                    <router-link to="/forgot-password">
                                        <span class="link">
                                            שכחתי סיסמא
                                        </span>
                                    </router-link>
                                </v-flex>
                                <v-flex md5>
                                    <MainButton>
                                        <template slot="content">
                                            <strong class="white--text">
                                                כניסה
                                            </strong>
                                        </template>
                                    </MainButton>
                                </v-flex>
                            </v-flex>

                            <br>
                            <br>

                            <CenterLineText />

                            <br>
                            <br>

                            <MainButton
                                dark
                                shadow
                                text="הרשמה"
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

export default {
    components: {
        Logo,
        EmailInput,
        PasswordInput,
        EmailInput,
        MainButton,
        CenterLineText,
    },
    
    data() {
        return {
            form: {
                email: '',
                password: '',
            }
        }
    }
}
</script>

<style scoped lang="scss">

main {
    margin-top: 5%;
}

</style>
