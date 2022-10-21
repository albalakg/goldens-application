
<template>
    <v-flex class="detailed_lesson_card_wrapper pointer second_dark_bg_color">

        <completed-chip 
            v-if="isCompleted"
            class="completed_chip"
        />

        <v-flex class="h100" d-flex flex-column justify-space-between>
            <v-flex d-flex class="lesson_card_header">
                <v-flex xs3>
                    <div class="image_wrapper">
                        <img :src="lesson.imageSrc" alt="lesson image">
                        <time-chip 
                            class="time_chip"
                            :seconds="seconds"
                        />
                    </div>
                </v-flex>
                <v-flex xs7 d-flex align-center class="pr-3">
                        <div>
                            <p class="mb-0">
                                <strong>
                                    {{lesson.name}}
                                </strong>
                            </p>
                            <small class="grey_text_color">
                                {{courseAreaName}}
                            </small>
                        </div>
                </v-flex>
            </v-flex>
            <v-flex class="mt-3">
                <p class="grey_text_color" v-html="lessonDescription">
                </p>
            </v-flex>
            <div class="text-left" v-if="isLogged">
                <heart
                    dark
                    :filled="isFavorite"
                    @submit="toggleFavorite()"
                />
            </div>
        </v-flex>
    </v-flex>
</template>

<script>
import CompletedChip from '../Chips/CompletedChip.vue';
import TimeChip from '../Chips/TimeChip.vue';
import Heart from '../General/Heart.vue';

export default {
  components: { TimeChip, Heart, CompletedChip },

  props: {
    lesson: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
        loadingFavorite: false
    }
  },

  computed: {
    seconds() {
        return this.lesson.video.video_length ?? 0;
    },

    courseAreaName() {
        return ContentService.findCourseAreaById(this.lesson.course_area_id)?.name
    },

    lessonDescription() {
        return ContentService.getLessonShortDescription(this.lesson);
    },

    isCompleted() {
        return ContentService.isLessonCompleted(this.lesson.id);
    },

    isFavorite() {
        return ContentService.isLessonFavorite(this.lesson.id);
    },
    
    isLogged() {
      return this.$store.getters['AuthState/isLogged'];
    },
  },

  methods: {
    async toggleFavorite() {
        if(this.loadingFavorite) {
            return;
        }

        this.loadingFavorite = true;
        await this.$store.dispatch('UserState/toggleFavorite', this.lesson.id)
        this.loadingFavorite = false;
    }
  }

}
</script>

<style scoped lang="scss">

  .detailed_lesson_card_wrapper {
    height: 100%;
    width: 100%;
    padding: 10px;
    position: relative;
    border-radius: 8px;

    &:hover {
        box-shadow: 0 0 10px 1px #0005;
    }

    * {
        color: #fff;
    }

    .completed_chip {
        position: absolute;
        z-index: 2;
        left: -5px;
        top: 15px;
    }

    .lesson_card_header {
        height: 30%;
    }

    small {
        position: relative;
        top: -7px;
    }

    .image_wrapper {
        width: 100%;
        height: 100%;
        position: relative;

        img {
            height: 100%;
            width: 100%;
            border-radius: 4px;
            object-fit: cover;
        }

        .time_chip {
            position: absolute;
            bottom: 5px;
            left: 5px;
        }
    }

  }

  @media only screen and (min-width: 601px) {
    .detailed_lesson_card_wrapper {
        border-radius: 8px;
    }
  }
</style>