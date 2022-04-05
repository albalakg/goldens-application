<template>
  <div class="support_form_wrapper">
    <v-form @submit.prevent="submit()" ref="form" id="form">
      <div class="support-container">
        <h2>
          <span class="first-color"> השאירו לנו</span>
          <span class="second-color">הודעה !</span>
        </h2>
        <p>מוזמנים לפנות אלינו בכל זמן לכל דבר</p>
        <div class="support-form">
          <div class="form-input">
            <EmailInput dark ref="email" @onChange="setEmail" />
          </div>
          <div class="form-input">
            <FullNameInput dark ref="name" @onChange="setName" />
          </div>
          <div class="form-input">
            <DescriptionArea
              dark
              :placeholder="false"
              ref="description"
              @onChange="setDescription"
            />
          </div>
          <div class="form-input">
            <SendButton @submit="submit()" />
          </div>
        </div>
      </div>
    </v-form>
    <div class="contact-info">
      <h3>צרו קשר</h3>
      <span>בוגרשוב אלף מאה תל אביב</span>
      <span>03-3333333</span>
      <span>contact@goldens.com</span>
    </div>
  </div>
</template>

<script>
import DescriptionArea from "./Inputs/DescriptionArea.vue";
import EmailInput from "./Inputs/EmailInput.vue";
import FullNameInput from "./Inputs/FullNameInput.vue";
import SendButton from "./../Buttons/SendButton.vue";

export default {
  name: "ContactUsForm",
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
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");
.support_form_wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  background-image: url("../../../public/assets/images/ContactUs/map.svg");
  h2 {
    margin-bottom: 12px;
  }

  p {
    font-family: "Arimo";
    font-style: normal;
    font-weight: 400;
    font-size: 1vw;
    line-height: 28px;
    /* or 175% */

    text-align: center;

    /* grey */

    color: #31353d;

    mix-blend-mode: normal;
    opacity: 0.7;
  }
  span {
    font-size: 2.5vw;
  }
}

.first-color {
  margin-left: 0.3em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 90px;
  /* or 251% */

  /* brand */

  color: #16588f;
}

.second-color {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 90px;
  /* or 251% */

  /* brand */

  color: #16588f;
}
.support-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 50vh;

  background: #ffffff;
  /* 1 */

  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 20px;
  margin-left: 10vw;
}

.support-form {
  display: flex;
  flex-direction: column;

  margin-left: auto;
  margin-right: auto;
  width: 70%;
}

.form-input {
  margin-bottom: 1em;
}

.form-input:last-of-type {
  margin-left: auto;
  margin-right: auto;
  width: 30%;

  transform: translateY(8vh) translateX(-10vw);
}

.contact-info {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 42%;
  background: #102a46;
  /* 1 */

  box-shadow: 0px 20px 48.5714px rgba(49, 54, 62, 0.1);
  border-radius: 20px;
}

.contact-info h3 {
  font-family: "Arimo";
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 90px;
  margin-top: 1em;
  margin-bottom: 2em;
  /* or 226% */

  color: white;
}

.contact-info span {
  margin-right: 1em;
  font-family: "Arimo";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;
  margin-bottom: 1em;
  /* identical to box height, or 127% */

  /* white */

  color: #ffffff;
}
</style>