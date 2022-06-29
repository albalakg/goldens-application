<template>
    <div class="signin_wrapper pb-10 auth_padding_top">
        <main class="auth_form_top_margin w100">
            <v-flex d-flex flex-wrap>
                <v-flex xs12 md6 lg7 xl8>
                    <star-logo colored class="star_image" />
                </v-flex>
                <v-flex xs12 md6 lg5 xl4 px-5 px-md-0>
                    <v-flex md8>
                        <v-form class="signin_form" ref="form" @submit.prevent="submit()">
                            <h2 class="auth_form_title"><span class="main_text_color">הרשמה</span> לאתר</h2>
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
                            
                            <div class="spacer"></div>

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

                            <first-name-input
                                ref="firstName"
                                outlined
                                title
                                icon
                                @onChange="setFirstName" 
                            >
                            </first-name-input>

                            <div class="spacer"></div>

                            <last-name-input
                                ref="lastName"
                                outlined
                                title
                                icon
                                @onChange="setLastName" 
                            >
                            </last-name-input>
                            
                            <div class="spacer"></div>
                            
                            <team-input 
                                ref="team"
                                outlined
                                title
                                optional
                                icon
                                @onChange="setTeam" 
                            />

                            <div class="spacer"></div>

                            <city-input 
                                ref="city"
                                outlined
                                title
                                optional
                                icon
                                @onChange="setCity" 
                            />
                            
                            <div class="spacer"></div>

                            <div>
                                <small>
                                    בהתחברות אני מסכים/מה 
                                    <router-link to="/policies" target="_blank">
                                        <span class="link">
                                            לתנאי השימוש
                                        </span>
                                    </router-link>
                                    <router-link to="/policies" target="_blank">
                                        <span class="link">
                                            ומדיניות הפרטיות
                                        </span>
                                    </router-link>
                                </small>
                            </div>

                            <v-flex d-md-flex align-center justify-space-between class="text-center text-md-right mt-5">
                                <v-flex md5 mt-5 mt-md-0 v-if="$vuetify.breakpoint.mdAndUp">
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
                                            <strong class="white--text" v-if="loading">
                                                טוען...
                                            </strong>
                                            <strong class="white--text" v-else>
                                                הרשמה
                                            </strong>
                                        </template>
                                    </MainButton>
                                </v-flex>
                                <v-flex md5 mt-5 mt-md-0 v-if="$vuetify.breakpoint.smAndDown">
                                    <router-link to="/signin">
                                        <span class="link">
                                           רשומים? התחברו עכשיו 
                                        </span>
                                    </router-link>
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
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import MainButton from '../../components/Buttons/MainButton.vue'
import CenterLineText from '../../components/Texts/CenterLineText.vue'
import Divider from '../../components/General/Divider.vue'
import StarLogo from '../../components/General/StarLogo.vue'
import PlayerIconDecorator from '../../components/Decorators/playerIconDecorator.vue'
import FirstNameInput from '../../components/Form/Inputs/FirstNameInput.vue'
import LastNameInput from '../../components/Form/Inputs/LastNameInput.vue'
import TeamInput from '../../components/Form/Inputs/TeamInput.vue'
import CityInput from '../../components/Form/Inputs/CityInput.vue'

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
        PlayerIconDecorator,
        FirstNameInput,
        LastNameInput,
        TeamInput,
        CityInput,
    },
    
    data() {
        return {
            form: {
                email:      '',
                password:   '',
                first_name: '',
                last_name:  '',
                team:       '',
                city:       '',
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

            axios.post('auth/signup', this.form)
                .then(res => {
                    this.$router.push('/signin');
                    this.$store.dispatch('MessageState/addMessage', {message: 'נרשמת בהצלחה למערכת, ברוך הבא!'})
                }).catch(err => {
                    this.$store.dispatch('MessageState/addErrorMessage', { message: 'האימייל או הסיסמא אינם תקינים' })
                }).finally(() => {
                    this.loading = false;
                })

        },

        preSendActions() {
            this.loading    = true;
        },

        validate() {
            const isEmailValid      = this.$refs.email.validate();
            const isPasswordValid   = this.$refs.password.validate();
            const isFirstNameValid  = this.$refs.firstName.validate();
            const isLastNameValid   = this.$refs.lastName.validate();
            const isTeamValid       = this.$refs.team.validate();
            const isCityValid       = this.$refs.city.validate();

            return isEmailValid && isPasswordValid && isFirstNameValid && isLastNameValid && isTeamValid && isCityValid;
        },

        setEmail(email) {
            this.form.email = email;
        },
        
        setPassword(password) {
            this.form.password = password;
        },

        setFirstName(firstName) {
            this.form.first_name = firstName;
        },

        setLastName(lastName) {
            this.form.last_name = lastName;
        },

        setTeam(team) {
            this.form.team = team;
        },

        setCity(city) {
            this.form.city = city;
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
        height: 20px;
        width: 100%;
    }
    
    @media only screen and (max-width: 600px) {
        .star_image {
            display: none;
        }

        .spacer {
            height: 40px;
        }
    }


</style>
