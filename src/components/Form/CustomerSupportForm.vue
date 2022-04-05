<template>
  <div class="support_form_wrapper">
    <v-form @submit.prevent="submit()" ref="form">
      <div class="main-content">
        <div class="mb-6">
          <h2><span>בקשת</span> <span class="main_text_color">תמיכה</span></h2>
          <p>מוזמנים לפנות אלינו בכל זמן לכל דבר</p>
        </div>

        <div>
          <v-flex c-flex class="mt-8">
            <div class="input-item">
              <EmailInput dark ref="email" @onChange="setEmail" />
            </div>
            <div class="input-item">
              <v-flex>
                <FullNameInput dark ref="name" @onChange="setName" />
              </v-flex>
            </div>
          </v-flex>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import DescriptionArea from "./Inputs/DescriptionArea.vue";
import EmailInput from "./Inputs/EmailInput.vue";
import FullNameInput from "./Inputs/FullNameInput.vue";
import SendButton from "./../Buttons/SendButton.vue";

export default {
  components: {
    DescriptionArea,
    EmailInput,
    FullNameInput,
    SendButton,
  },

  data() {
    return {
      form: {
        email: "",
        name: "",
        description: "",
      },
    };
  },

  computed: {
    isValid() {
      return (
        this.$refs.email.isValid &&
        this.$refs.description.isValid &&
        this.$refs.name.isValid
      );
    },
  },

  methods: {
    submit() {
      if (!this.validate()) {
        console.log("not valid");
        return;
      }

      alert("is valid");
    },

    validate() {
      const isEmailValid = this.$refs.email.validate();
      const isNameValid = this.$refs.name.validate();
      const isDescriptionValid = this.$refs.description.validate();

      return isEmailValid && isNameValid && isDescriptionValid;
    },

    setEmail(email) {
      this.form.email = email;
    },

    setName(name) {
      this.form.name = name;
    },

    setDescription(description) {
      this.form.description = description;
    },
  },
};
</script>

<style scoped lang="scss">
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-item {
  margin-bottom: 5vh;
  width: 50vw;
}
.support_form_wrapper {
  border: 2px solid red;

  h2 {
    text-align: center;
    font-size: 2em;
    margin-bottom: 12px;
  }

  p {
    color: rgb(126, 129, 134);
    font-weight: 100;
    font-size: 1em;
    letter-spacing: 1.5px;
  }
}
</style>