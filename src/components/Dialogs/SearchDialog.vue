<template>
  <base-dialog 
    :show="show"
    @close="close()"
  >
    <template slot="content">
      <div class="class_dialog_wrapper pa-5">
        <search-input
          ref="search"
          outlined
          icon
          slim
          @onChange="onChange"
        >
        </search-input>
      </div>
    </template>
  </base-dialog>
</template>

<script>
import SearchInput from '../Form/Inputs/SearchInput.vue';
import BaseDialog from './BaseDialog.vue';

export default {
  components:{
    BaseDialog,
    SearchInput,
  },

  props: {

    show: {
      type: Boolean,
    },

    maxWidth: {
      type: Number,
    },
    
    overlay: {
      type: Boolean,
    },
    
    persistent: {
      type: Boolean,
    },

  },

  data() {
    return {
      search: '',
    };
  },

  methods: {
    onChange(value) {
      this.search = value;
      this.searchLessons();
    },

    searchLessons() {
      
    },

    close() {
      this.$emit('close');
    }
  }

}
</script>

<style scoped>

  .class_dialog_wrapper {

  }

</style>