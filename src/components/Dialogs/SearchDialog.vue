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
          @onChange="onChange"
        >
        </search-input>

        <div class="lessons_found_wrapper" v-if="search">
            <small>נמצאו {{ lessonsFound.length }} שיעורים</small>
            <br>
            <div class="lesson_found_box" v-for="(lesson, index) in lessonsFound" :key="index" @click="close()">
              <router-link class="simple_link dark_text_color" :to="`/courses/${lesson.course_id}/lessons/${lesson.id}`">
                <strong>
                  {{lesson.name}}
                </strong>
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
    height: 45vh;
  }

  .lessons_found_wrapper {
    margin-top: 20px;
    height: 32vh;
    max-height: 32vh;
    overflow: auto;
  }
  
  .lesson_found_box {
    padding: 10px 5px;
    margin: 5px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 5px 5px #8888;
  }

</style>