<template>
  <v-flex
    class="support_wrapper px-2 px-md-0 text-center app_padding_top"
    md5
    lg4
    xl3
    mx-auto
    d-flex
    justify-center
  >
    <div class="w100 px-2 px-md-0">
      <div class="w100">
        <h1>
          <span class="dark_text_color">בקשת </span>
          <span class="main_text_color">תמיכה</span>
        </h1>
        <p>תרגישו חופשי לשלוח איזו בקשה שרוצים</p>
      </div>

      <v-form class="text-right" @submit="submit()">
        <support-category-select @onChange="setSupportCategory" ref="supportCategory" />

        <div class="spacer"></div>

        <template v-if="!isLogged">
          <full-name-input title outlined icon @onChange="setFullName" ref="fullName" />

          <div class="spacer"></div>

          <email-input title outlined icon @onChange="setEmail" ref="email" />

          <div class="spacer"></div>
        </template>

        <base-text-area
          outlined
          title="איך אפשר לעזור"
          ref="description"
          @onChange="setDescription"
        />

        <div class="spacer"></div>

        <v-flex d-flex md6 lg4 mr-auto>
          <!-- button -->
          <main-button text="שליחה" :loading="loading"/>
        </v-flex>

        <div class="spacer"></div>
      </v-form>
    </div>
  </v-flex>
</template>

<script>
import MainButton from "../../components/Buttons/MainButton.vue";
import BaseTextArea from "../../components/Form/Inputs/BaseTextArea.vue";
import EmailInput from "../../components/Form/Inputs/EmailInput.vue";
import FullNameInput from "../../components/Form/Inputs/FullNameInput.vue";
import SupportCategorySelect from "../../components/Form/Inputs/SupportCategorySelect.vue";
export default {
  components: {
    SupportCategorySelect,
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
    };
  },

  created() {
    this.$store.dispatch('SupportState/getSupportCategories');
  },

  computed: {
    isLogged() {
      return this.$store.getters['AuthState/isLogged'];
    }
  },

  methods: {
    setDescription(description) {
      this.form.description = description;
    },

    setEmail(email) {
      this.form.email = email;
    },

    setSupportCategory(support_category_id) {
      this.form.support_category_id = support_category_id;
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

        this.$store.dispatch('MessageState/addInfoMessage', {
          message: 'הבקשת תמיכה נשלחה בהצלחה'
        });

        this.$router.push('/')
      } catch(err) {
        this.$store.dispatch('MessageState/addInfoMessage', {
          message: 'מצטערים אבל נכשלה הבקשה ליצירת בקשה תמיכה חדשה',
          type: 'error',
        });
      }

      this.loading = false;
    },

    validate() {
      const isSupportCategoryValid = this.$refs.supportCategory.validate();
      const isFullNameValid = this.isLogged ? true : this.$refs.fullName.validate();
      const isEmailValid = this.isLogged ? true : this.$refs.email.validate();
      const isDescriptionValid = this.$refs.description.validate();

      return isSupportCategoryValid && isFullNameValid && isEmailValid && isDescriptionValid;
    },
  },
};
</script>

<style scoped>
.spacer {
  height: 30px;
  width: 100%;
}
</style>