
<template>
  <v-flex mx-auto class="h100" v-if="lessonData" @click="submit()">
    <div class="lesson_card_wrapper pointer">
      <img loading="lazy" :src="lessonData.imageSrc" alt="lesson image">
      <div class="lesson_card_darkner"></div>
      <div class="lesson_card_details px-1 text-center">
        <h2 class="white_text_color">{{ lessonData.name }}</h2>
        <div class="line sub_bg_color"></div>
        <div class="lesson_card_content mt-1 white_text_color" v-html="lessonContent">
        </div>
      </div>
      <v-flex d-flex justify-center class="lesson_card_date w100">
        <v-flex xs6 d-flex align-center justify-center class="lesson_date_chip dark_shadow main_bg_color">
          <strong>
            <small class="white_text_color">
              {{ finishedDate }}
            </small>
          </strong>
        </v-flex>
      </v-flex>
    </div>
  </v-flex>
</template>

<script>
import Divider from '../General/Divider.vue';

const MAX_LESSON_CONTENT_CHARS = 50;

export default {
  components: { Divider },

  props: {
    lesson: {
      type: Object,
      required: true
    }
  },

  computed: {
    lessonContent() {
      return this.lessonData.content.length < MAX_LESSON_CONTENT_CHARS ? this.lessonData.content : this.lessonData.content.slice(0, MAX_LESSON_CONTENT_CHARS) + '...';
    },

    lessonData() {
      return ContentService.findLessonById(this.lesson.course_lesson_id);
    },

    finishedDate() {
      return this.lesson.finished_at.replaceAll('-', '.')
    }
  },

  methods: {
    submit() {
      this.$emit('submit', this.lessonData)
    }
  }

}
</script>

<style scoped lang="scss">

  .lesson_card_wrapper {
    height: 100%;
    width: 100%;
    max-width: 225px;
    position: relative;
    border-radius: 8px;
    transition: .3s box-shadow, .3s transform;

    img {
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 8px;
    }

    .lesson_card_details {
      z-index: 3;
      width: 100%;
      position: absolute;
      bottom: 5%;

      h2 {
        font-weight: 100;
      }
    
      .line {
          height: 3px;
          width: 10%;
          margin: auto;
      }

      small {
        font-size: .7em;
      }
    }

    .lesson_card_darkner {
      z-index: 2;
      position: absolute;
      height: 100%;
      width: 100%;
      background: linear-gradient(#0000 40%, #000f);
      border-radius: 8px;
    }

    .lesson_card_date {
      position: absolute;
      z-index: 2;
      bottom: -15px;
      height: 30px;

      .lesson_date_chip {
        border-radius: 20px;
        border: 2px solid #fff;

        small {
          position: relative;
          top: -1px;
        }
      }
    }
  }

  .lesson_card_wrapper:hover {
    box-shadow: 0 0 10px 2px #0005;
    transform: scale(1.05);
  }

  ::v-deep .lesson_card_content * {
    color: #fff;
    font-size: .9em;
    font-weight: bold;
  }
</style>