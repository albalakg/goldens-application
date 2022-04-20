<template>
<v-flex class="footer_wrapper second_dark_bg_color" d-flex align-center>
    
    <v-flex md10 lg8 xl6 mx-auto d-flex flex-wrap justify-center class="footer_content pa-5 pa-md-0">
        <v-flex xs12 md4>
            <v-flex xs8>
                <logo dark />
            </v-flex>
            <v-flex d-flex class="mt-2">
                <img v-for="(network, index) in networks" :key="index" :src="network.src" :alt="network.name" class="ml-10 pointer">
            </v-flex>
            <br>
            <p class="grey_text_color">
                                            םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
        רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס      
            </p>
        </v-flex>

        <v-flex md2></v-flex>

        <v-flex md6 d-flex flex-wrap>
            <v-flex v-for="(tab, index) in tabs" :key="index" class="pl-3 pr-md-3 ml-10 mb-10 ml-md-0 mb-md-0">
               <h3 class="white_text_color">{{tab.title}}</h3> 
               <div class="line my-3 sub_bg_color"></div>
               <div>
                   <div v-for="(link, linkIndex) in tab.links" :key="linkIndex" class="my-2">
                       <router-link :to="`/${link.url}`" class="simple_link grey_text_color">
                           {{ link.name }}
                       </router-link>
                   </div>
               </div>
            </v-flex>
        </v-flex>
    </v-flex>

    <star-logo class="star_decorator" :gstar="false" :opacity=".1" />
    <circle-decorator class="circle_decorator" :opacity=".6" />
</v-flex>
</template>

<script>
import CircleDecorator from '../Decorators/CircleDecorator.vue'
import Logo from "../General/Logo.vue"
import StarLogo from '../General/StarLogo.vue'

export default {
  components: { Logo, StarLogo, CircleDecorator },
    data() {
        return {
            networks: [
                {
                    name: 'linkedin',
                    src: require('../../../public/assets/images/network/linkedin.svg'),
                },
                {
                    name: 'google',
                    src: require('../../../public/assets/images/network/google.svg'),
                },
                {
                    name: 'facebook',
                    src: require('../../../public/assets/images/network/facebook.svg'),
                },
            ],
            tabs: [
                {
                    title: 'תמיכה',
                    links: [
                        {
                            name: 'צור קשר',
                            url: 'contact'
                        },
                        {
                            name: 'בקשת תמיכה',
                            url: 'support'
                        },
                    ]
                },
                {
                    title: 'מידע',
                    links: [
                        {
                            name: 'מי אנחנו',
                            url: 'about'
                        }
                    ]
                },
                {
                    title: 'תנאים',
                    links: [
                        {
                            name: 'תנאי האתר',
                            url: 'terms-and-conditions'
                        }
                    ]
                },
            ]
        }
    }
}
</script>

<style scoped>

    .footer_wrapper {
        background-color: #102a46;
        height: 50vh;
        max-height: 500px;
        min-height: 420px;
        position: relative;
        overflow: hidden;
    }

    .footer_content {
        height: 60%;
        border-bottom: 2px solid #fff1;
        z-index: 2;
    }

    .line {
        height: 4px;
        width: 20px;
    }

    ::v-deep .star_decorator {
        position: absolute;
        left: -40%;
        top: 30%;
        transform: scale(1.4);
        z-index: 1;
    }

    ::v-deep .circle_decorator {
        position: absolute;
        right: -35%;
        top: 10%;
        z-index: 1;
    }

    @media only screen and (max-width: 600px) {
        .footer_wrapper {
            height: 80vh;
            max-height: 1000px
        }

        .footer_content {
            height: 90%;
        }

        ::v-deep .circle_decorator {
            top: -40%;
        }
    }

</style>