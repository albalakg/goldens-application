
<template>
    <v-flex class="detailed_lesson_card_wrapper pointer">
        <img :src="lesson.imageSrc" alt="lesson image">
        <div class="lesson_card_darkner"></div>
        <time-chip 
            class="time_chip"
            :seconds="seconds"
        />

        <completed-chip 
            v-if="isCompleted"
            class="completed_chip"
        />

        <div class="text-left favorite_chip" v-if="isLogged">
            <heart
                dark
                :filled="isFavorite"
                @submit="toggleFavorite()"
            />
        </div>

        <v-flex class="h100 lesson_card_content pr-2">
            <v-flex d-flex align-center>
                    <div>
                        <p class="mb-0 lesson_card_name">
                            <strong>
                                {{lesson.name}}
                            </strong>
                        </p>
                        <small class="grey_text_color">
                            {{courseAreaName}}
                        </small>
                    </div>
            </v-flex>
            <v-flex>
                <p class="lesson_card_description" v-html="lessonDescription">
                </p>
            </v-flex>
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
    box-shadow: 0 0 10px 1px #0005;

    img {
        border-radius: 8px;
        object-fit: cover;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
    }

    .lesson_card_darkner {
        border-radius: 8px;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
        background: linear-gradient(90deg, #0005, #000b, #000e);
    }

    .time_chip {
        border-radius: 8px;
        position: absolute;
        bottom: 5px;
        left: 5px;
        z-index: 3;
        background-color: #222;
        box-shadow: 0 0 10px 1px #000a;
    }

    .favorite_chip {
        border-radius: 8px;
        position: absolute;
        bottom: 10px;
        right: 15px;
        z-index: 4;
    }

    .completed_chip {
        position: absolute;
        z-index: 2;
        left: -5px;
        top: 20px;
    }

    .lesson_card_content {
        position: absolute;
        z-index: 3;
        width: 100%;

        .lesson_card_name {
            font-size: 2em;
        }

        .lesson_card_description {
            color: #ddd;
        }
    
        small {
            position: relative;
            top: -10px;
        }
    }

    * {
        color: #fff;
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

        
    }

  }

  @media only screen and (min-width: 601px) {
    .detailed_lesson_card_wrapper {
        border-radius: 8px;
    }
  }
</style>