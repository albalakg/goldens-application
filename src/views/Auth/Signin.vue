<template>
    <div>
        <header>
            <Logo />
        </header>
            
        <main>
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 lg7 xl8>
                    image
                </v-flex>
                <v-flex xs12 md6 lg5 xl4 px-5 px-md-0>
                    <v-flex md8>
                        <v-form class="signin_form">
                            <h2 class="auth_form_title"><span class="main_text_color">התחברות</span> לאתר</h2>
                            <h3 class="auth_form_subtitle">ברוך הבא לעולם הספורט</h3>
                            
                            <br>
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
                                        :styleConfig="{
                                            padding: '10px 25px',
                                            borderRadius: '30',
                                        }"
                                    >
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

                            <CenterLineText
                                class="my-3"
                                text="עוד לא רשומים?"
                            />

                            <br>
                            <br>

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
