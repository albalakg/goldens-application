<template>
  <base-dialog 
    :show="show"
    @close="close()"
  >
    <template slot="content">
      <div 
        class="search_dialog_wrapper pa-5"
        :style="`
          ${minHeight ? `min-height: ${minHeight}px;` : ''}
        `"
      >
        <search-input
          ref="search"
          outlined
          icon
          slim
          @onChange="onChange"
        >
        </search-input>

        <div class="lessons_found_wrapper" v-if="search">
          <div class="lesson_found_box" v-for="(lesson, index) in lessonsFound" :key="index">
            <router-link class="simple_link" :to="`/courses/${lesson.course_id}/${lesson.course_area_id}/${lesson.id}`">
              {{lesson.name}}
            </router-link>
          </div>
        </div>
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

    minHeight: {
      type: Number,
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
      search: ''
    };
  },

  computed: {
    lessons() {
      return this.$store.getters['UserState/lessons'];
    },

    lessonsFound() {
      return this.lessons.filter(lesson => {
        if( 
          lesson.name.toLowerCase().includes(this.search.toLowerCase()) ||
          lesson.content.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return lesson;
        }
      });
    }
  },

  methods: {
    onChange(value) {
      this.search = value;
    },

    close() {
      this.$emit('close');
    }
  }

}
</script>

<style scoped>

  .search_dialog_wrapper {

  }

</style>