<template>
  <div class="lesson_category_input_wrapper" v-if="items">
    <base-select-input
      :slim="slim"
      :outlined="outlined"
      :placeholder="placeholder ? text : ''"
      :items="lessons"
      :title="title ? text : ''"
      :rules="rules"
      :icon="iconSrc"
      @onChange="onChange"
      @onChangeSearchValue="onChangeSearchValue"
      ref="input"
      autocomplete
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
      default: true
    },
    
    items: {
      type: Array,
      required: true
    },
  },

  data() {
    return {
      value: '',
      maxlength: 100,
      text: "רשימת שיעורים",
      iconSrc: "mdi-soccer",
      rules: [
        {
          rule: /^.+$/,
          message: "חובה לבחור שיעור מהרשימה",
        },
      ],
    };
  },
  
  computed: {
    lessons() {
      const lessons = this.items.filter(lesson => lesson.name.toLowerCase().includes(this.value))
      return lessons.map(lesson => {
        return {
          id: lesson.id,
          value: lesson.name
        }
      })
    }
  },

  methods: {
    onChange(value) {
      this.$emit("onChange", value);
    },

    onChangeSearchValue(value) {
      this.value = value;
    },

    setValue(value) {
      this.value = value;
      this.$refs.input.setValue('');
    },

    validate() {
      return this.$refs.input.validate();
    },
  },
};
</script>

<style scoped>
</style>
