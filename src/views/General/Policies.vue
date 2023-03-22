<template>
  <v-flex class="tnc_wrapper h100 w100 px-3 app_padding_top">
    <v-flex md8 lg5 xl4 mx-auto class="mt-8 mt-md-0">
      <br>

      <h1>
        <span class="main_text_color">תנאי </span>
        <span class="dark_text_color">האתר</span>
      </h1>  

      <br>
    
      <div class="tnc_content" v-if="terms && terms.content" v-html="terms.content"></div>
      <div class="tnc_content" v-else>
        <p>
          מצטערים אך קרתה תקלה ולא הצלחנו למשוך את תנאי האתר.
          <br>
          נשמח אם תוכלו להעדכן אותנו בהקדם.
          <br>
          תודה
        </p>
      </div>

      <br>
    </v-flex>
  </v-flex>
</template>

<script>
export default {

  created() {
    this.$store.dispatch('PoliciesState/getTermsAndConditions');
  },

  computed: {
    terms() {
      return this.$store.getters['PoliciesState/termsAndConditions'];
    }
  }
}
</script>

<style scoped>

  .tnc_wrapper {
    background-color: #eeeeee;
    opacity: .8;
  }

</style>