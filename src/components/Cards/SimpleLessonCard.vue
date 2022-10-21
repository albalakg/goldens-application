
<template>
    <v-flex 
        class="simple_lesson_card main_bg_color pr-2 white_text_color bold" 
        :class="{
            'active_lesson_card': isActive
        }"
        d-flex 
        align-center 
        @click="submit(lesson)"
    >
        <span>
            <small>{{index}}.</small> {{lesson.name}}
        </span>
        
        <completed-chip 
            v-if="isCompleted"
            class="completed_chip"
            :shadow="false"
        />
    </v-flex>
</template>

<script>
import CompletedChip from '../Chips/CompletedChip.vue';

export default {
  components: { CompletedChip },

  props: {
    lesson: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    },

    isActive: {
        type: Boolean,
    }
  },

  data() {
    return {
    }
  },

  computed: {
    isCompleted() {
        return ContentService.isLessonCompleted(this.lesson.id);
    },
  },

  methods: {
    submit(lesson) {
        this.$emit('submit', lesson);
    }
  }

}
</script>

<style scoped lang="scss">

    .simple_lesson_card {
        position: relative;
        height: 50px;
        cursor: pointer;

        .completed_chip {
            position: absolute;
            left: 0;
            top: 7px;
        }

        .simple_lesson_card_progress_bar {
            position: absolute;
            bottom: 0;
            right: 0;
        }

    }

    .active_lesson_card {
        box-shadow: 0 3px 5px 1px #000;
        border-right: 5px solid var(--subColor);
    }
</style>