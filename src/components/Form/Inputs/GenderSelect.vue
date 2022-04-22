<template>
  <div class="gender_input_wrapper" v-if="genders">
    <base-select-input
      :slim="slim"
      :outlined="outlined"
      :placeholder="placeholder ? text : ''"
      :items="genders"
      :title="title ? text : ''"
      :rules="rules"
      :readonly="readonly"
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

    readonly: {
      type: Boolean,
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
      text: "בחר מין",
      iconSrc: "mdi-gender-non-binary",
      rules: [
      ],
    };
  },

  computed: {
    genders() {
      return [
        {
          id: 1,
          value: 'זכר',
        },
        {
          id: 2,
          value: 'נקבה',
        },
        {
          id: 3,
          value: 'אחר',
        },
      ];
    },
  },

  methods: {
    onChange(value) {
      this.$emit("onChange", value);
    },

    validate() {
      return this.$refs.input.validate();
    },

    setValue(value) {
      return this.$refs.input.setValue(value);
    },
  },
};
</script>

<style scoped>

</style>
