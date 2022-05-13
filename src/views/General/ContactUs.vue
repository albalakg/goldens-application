<template>
  <v-flex d-flex justify-center align-center class="contact_us_wrapper app_padding_top">
    <img loading="lazy" class="contact_us_background" :src="backgroundImage" alt="map">
    <v-flex d-flex flex-wrap align-center md8 lg7 xl6 class="contact_us_content h100">
      <v-flex xs10 mx-auto md4 class="contact_us_details_wrapper second_dark_bg_color py-10 mt-10 mt-md-0">

        <h1 class="white_text_color text-center mt-5">
          צרו קשר
        </h1>

        <div class="spacer"></div>

        <v-flex class="pb-3 pb-md-6 pb-xl-10 pr-10" d-flex v-for="(item, index) in contactDetails" :key="index">
          <v-flex xs2>
            <img loading="lazy" :src="item.image" alt="">
          </v-flex>
          <v-flex xs10>
            <a v-if="item.link" class="simple_link white_text_color" :href="item.link">{{item.text}}</a>
            <span v-else class="white_text_color">{{item.text}}</span>
          </v-flex>
        </v-flex>
      </v-flex>
      <v-flex xs11 mx-auto md8 class="contact_us_form_wrapper white_bg_color dark_shadow">
        <img loading="lazy" class="contact_us_location_mark" :src="locationMarkImage" alt="location mark">

        <v-flex xs10 mx-auto class="text-center">
          <h2>
            <span class="dark_text_color">השאירו לנו </span>
            <span class="main_text_color">הודעה</span>
          </h2>          
          <p>תכתבו מה שבא לכם ואנחנו נענה</p>

          <div class="spacer"></div>

          <v-form class="text-right" @submit="submit()">
            <email-input dark @onChange="setEmail" ref="email" />

            <div class="spacer"></div>

            <full-name-input dark @onChange="setFullName" ref="fullName" />

            <div class="spacer"></div>

            <base-text-area
              dark
              ref="description"
              @onChange="setDescription"
            />

            <div class="spacer"></div>

            <v-flex d-flex md6 lg4 mr-auto>
              <!-- button -->
              <main-button class="contact_us_button_wrapper" subColor text="שליחה" :loading="loading"/>
            </v-flex>

            <div class="spacer"></div>
          </v-form>
        </v-flex>
      </v-flex>
      <div class="spacer"></div>
      <div class="spacer"></div>
    </v-flex>
  </v-flex>
</template>

<script>
import MainButton from "../../components/Buttons/MainButton.vue";
import BaseTextArea from "../../components/Form/Inputs/BaseTextArea.vue";
import EmailInput from "../../components/Form/Inputs/EmailInput.vue";
import FullNameInput from "../../components/Form/Inputs/FullNameInput.vue";
export default {
  components: {
    FullNameInput,
    EmailInput,
    BaseTextArea,
    MainButton,
  },

  data() {
    return {
      form: {
        support_category_id: "",
        full_name: "",
        email: "",
        description: "",
      },
      loading: false,
      backgroundImage: require('../../../public/assets/images/general/contact.png'),
      locationMarkImage: require('../../../public/assets/images/general/goldens_location_mark.svg'),
      contactDetails: [
        {
          text: 'קדימה-צורן, הברוש 109',
          image: require('../../../public/assets/images/general/location.svg'), 
          link: false
        },
        {
          text: '052-8556745',
          image: require('../../../public/assets/images/general/phone.svg'), 
          link: 'tel:052-8556745'
        },
        {
          text: 'contact@goldens.com',
          image: require('../../../public/assets/images/general/mail.svg'), 
          link: 'mailto:contact@goldens.com'
        }
      ],
    };
  },

  created() {
    this.$store.dispatch('SupportState/getSupportCategories');
  },

  mounted() {
    this.setInitEmail();
  },

  computed: {
    categories() {
      return this.$store.getters['SupportState/supportCategories'];
    }
  },

  watch: {
    categories() {
      this.setSupportCategory();
    }
  },

  methods: {
    setDescription(description) {
      this.form.description = description;
    },

    setEmail(email) {
      this.form.email = email;
    },

    setSupportCategory() {
      if(this.categories) {
        const supportCategory = this.categories.find(supportCategory => supportCategory.name === 'צור קשר')
        this.form.support_category_id = supportCategory ? supportCategory.id : 1;
      }
    },

    setFullName(full_name) {
      this.form.full_name = full_name;
    },

    async submit() {
      try {
        if (!this.validate()) {
          return;
        }

        this.loading = true;
        await this.$store.dispatch('SupportState/createSupportTicket', this.form);

        this.$store.dispatch('MessageState/addMessage', {
          message: 'ההודעה נשלחה בהצלחה'
        });

        this.$router.push('/')
      } catch(err) {
        console.error('err', err);
        this.$store.dispatch('MessageState/addMessage', {
          message: 'מצטערים אבל נכשלה הבקשה ליצירת קשר',
          type: 'error',
        });
      }

      this.loading = false;
    },

    validate() {
      const isFullNameValid = this.$refs.fullName.validate();
      const isEmailValid = this.$refs.email.validate();
      const isDescriptionValid = this.$refs.description.validate();

      return isFullNameValid && isEmailValid && isDescriptionValid;
    },

    setInitEmail() {
      if(this.$refs.email) {
        this.$refs.email.setValue(this.$store.getters['UserState/email']);
      }
    }
  },
};
</script>

<style scoped>
  
  .contact_us_wrapper {
    position: relative;
    min-height: 100vh;
  }
  
  .contact_us_background {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }

  .contact_us_location_mark {
    position: absolute;
    z-index: 3;
    top: 0%;
    right: 20%;
  }

  .contact_us_content {
    position: relative;
    z-index: 2;
  }

  .contact_us_button_wrapper {
    position: relative;
    top: 80px;
  }

  .contact_us_form_wrapper {
    border-radius: 15px;
    padding: 30px 0;
  }

  .contact_us_details_wrapper {
    border-radius: 0 15px 15px 0;
    height: 50%;
    width: 50%;
  }

  .spacer {
    height: 30px;
    width: 100%;
  }

  @media only screen and (max-width: 600px) {
      
    .contact_us_form_wrapper {

    }

    .contact_us_details_wrapper {
      border-radius: 15px 15px 0 0;
    }
      
  }
</style>