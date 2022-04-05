<template>
  <v-container fluid class="home_wrapper">
    <v-flex xs11 mx-auto class="text-center">
      <div class="form-container">
        <ContactUsForm />
      </div>
    </v-flex>
  </v-container>
</template>
<script>
import ContactUsForm from "../../components/Form/ContactUsForm.vue";
export default {
  components: { ContactUsForm },
};
</script>
<style>
.form-container {
  display: flex;
  justify-content: center;
}
</style>