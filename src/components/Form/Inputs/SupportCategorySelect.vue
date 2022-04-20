<template>
  <div class="first_name_input_wrapper" v-if="categories">
    <base-select-input
      :slim="slim"
      :outlined="outlined"
      :placeholder="placeholder ? text : ''"
      :items="categories"
      :title="text"
      :rules="rules"
      :icon="iconSrc"
      @onChange="onChange"
      ref="input"
    />
  </div>
</template>

<script>
import BaseSelectInput from "./BaseSelectInput.vue";

export default {
  components: {
    BaseSelectInput,
  },

  props: {
    slim: {
      type: Boolean
    },

    outlined: {
      type: Boolean,
      default: true
    },

    dark: {
      type: Boolean,
    },

    icon: {
      type: Boolean,
    },

    placeholder: {
      type: Boolean,
      default: true,
    },

    title: {
      type: Boolean,
    },
  },

  data() {
    return {
      maxlength: 100,
      text: "נושא הפנייה",
      iconSrc: "mdi-note-multiple",
      rules: [
        {
          rule: /^.+$/,
          message: "חובה לבחור את נושא הפנייה",
        },
      ],
    };
  },

  computed: {
    categories() {
      let supportCategories = this.$store.getters['SupportState/supportCategories'];
      if(!supportCategories) {
        return;
      }

      supportCategories = supportCategories.filter(supportCategory => supportCategory.name !== 'צור קשר')

      return supportCategories.map(supportCategory => {
        return {
          id:     supportCategory.id,
          value:  supportCategory.name
        }
      })
    },
  },

  methods: {
    onChange(value) {
      this.$emit("onChange", value);
    },

    validate() {
      return this.$refs.input.validate();
    },
  },
};
</script>

<style scoped>
</style>
