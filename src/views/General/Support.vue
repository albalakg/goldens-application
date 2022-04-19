<template>
  <v-flex class="px-2 px-md-0 text-center" md8 lg7 xl6 mx-auto d-flex justify-center>
    <div>
      <div>
        <h1>
          <span class="dark_text_color">בקשת </span>
          <span class="main_text_color">תמיכה</span> 
        </h1>
        <p>
          תרגישו חופשי לשלוח איזו בקשה שרוצים
        </p>
      </div>

      <div class="text-right">
        <base-select-input 
          :title="'נושא הפנייה'"
          :icon="'mdi-note-multiple'"
          slim
          outlined
          :items="categories"
        />
      </div>
    </div>
  </v-flex>
</template>

<script>
import BaseSelectInput from '../../components/Form/Inputs/BaseSelectInput.vue';
export default {
  components: { BaseSelectInput },

  data() {
    return {
      
    };
  },

  computed: {
    categories() {
      return [
        {
          id: 1,
          value: 'גשדדגגש'
        },
        {
          id: 2,
          value: 'בקגשדגכ'
        },
        {
          id: 3,
          value: 'גשדגשדגשגש'
        },
        {
          id: 4,
          value: 'בדגשקגכ'
        },
        {
          id: 5,
          value: 'גששדגדגש'
        },
        {
          id: 6,
          value: 'בקגשדגשדגגכ'
        },
        {
          id: 7,
          value: 'גשדגדגשדדגש'
        },
        {
          id: 8,
          value: 'בקגגשדגכ'
        },
      ];
    }
  }

}
</script>

<style scoped>

</style>