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
                            <h2 class="auth_form_title"><span class="main_text_color">אימות כתובת המייל</span> לאתר</h2>
                            <h3 class="auth_form_subtitle">חשוב לאמת את כתובת המייל לצורך הודעות מערכת</h3>
                            <Divider :space="8" />

                            <strong v-if="loading">
                                מאמת את הכתובת...
                            </strong>
                        </v-form>
                    </v-flex>
                </v-flex>
            </v-flex>
        </main>
    </div>
</template>

<script>
import Divider  from '../../components/General/Divider.vue'
import StarLogo from '../../components/General/StarLogo.vue'

export default {
    components: {
        Divider,
        StarLogo,
    },
    
    data() {
        return {
            form: {
                email: '',
                token: '',
            },
            loading: true,
        }
    },

    created() {
        this.setURLParams();
        this.submit();
    },

    methods: {
        setURLParams() {
            this.form.email = this.$route.query.email;
            this.form.token = this.$route.query.token;
        },

        submit() {
            axios.post('auth/email-verification', this.form)
                .then(() => {
                    this.$store.dispatch('MessageState/addInfoMessage', { message: 'תודה, אימתנו בהצלחה כתובת המייל שלך' })
                }).catch(() => {
                    this.$store.dispatch('MessageState/addErrorMessage', { message: 'מצטערים, אך לא הצלחנו לאמת כתובת המייל שלך' })
                }).finally(() => {
                    this.loading = false;
                    setTimeout(() => {
                        this.$router.push('/signin');
                    }, 500);
                })
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
