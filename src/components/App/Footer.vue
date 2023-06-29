<template>
<v-flex class="footer_wrapper second_dark_bg_color" d-flex align-center>
    
    <v-flex md10 lg8 xl6 mx-auto d-flex flex-wrap justify-center class="footer_content pa-5 pa-md-0">
        <v-flex xs12 md4>
            <v-flex xs8>
                <logo dark />
            </v-flex>
            <v-flex xs8 d-flex justify-space-between class="mt-4">
                <a :href="network.link" target="_blank" v-for="(network, index) in networks" :key="index">
                    <img loading="lazy" :src="network.src" :alt="network.name" class="pointer" />
                </a>
            </v-flex>
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
        <span class="rights_text">
            Goldens Sport Services LTD. © {{ year }}
        </span>
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
                // {
                //     name: 'Linkedin',
                //     link: 'https://instagram.com/goldens.fa?igshid=MjEwN2IyYWYwYw==',
                //     src: require('../../../public/assets/images/network/linkedin.png'),
                // },
                {
                    name: 'Instagram',
                    link: 'https://instagram.com/goldens.fa?igshid=MjEwN2IyYWYwYw==',
                    src: require('../../../public/assets/images/network/instagram.png'),
                },
                {
                    name: 'Facebook',
                    link: 'https://www.facebook.com/profile.php?id=100094130323045',
                    src: require('../../../public/assets/images/network/facebook.png'),
                },
                {
                    name: 'Tiktok',
                    link: 'https://www.tiktok.com/@goldens.fa?lang=en',
                    src: require('../../../public/assets/images/network/tik-tok.png'),
                },
                {
                    name: 'Youtube',
                    link: 'https://www.youtube.com/@GOLDENSACADEMY',
                    src: require('../../../public/assets/images/network/youtube.png'),
                },
            ],
            tabs: [
                {
                    title: 'תמיכה',
                    links: [
                        {
                            name: 'צור קשר',
                            url: 'contact-us'
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
                            name: 'הבית',
                            url: ''
                        },
                        {
                            name: 'מי אנחנו',
                            url: 'about'
                        },
                    ]
                },
                {
                    title: 'תנאים',
                    links: [
                        {
                            name: 'תנאי האתר',
                            url: 'policies'
                        }
                    ]
                },
            ]
        }
    },

    computed: {
        year() {
            return new Date().getFullYear()
        }
    }
}
</script>

<style scoped lang="scss">

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
        position: relative;
            
        .rights_text {
            position: absolute;
            bottom: 10px;
            color: #fff8;
        }
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

    img {
        width: 25px;
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