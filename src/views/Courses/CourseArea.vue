<template>
  <div class="course_area_wrapper" v-if="course">

     <!-- small screen -->
    <template v-if="$vuetify.breakpoint.smAndDown">
      <template v-for="(lesson, index) in lessons">
        <v-flex xs11 mx-auto class="lesson_card_wrapper mb-5" :key="index">
          <router-link
            :to="`/courses/${course.id}/lessons/${lesson.id}`"
            class="simple_link"
          >
            <detailed-lesson-card :lesson="lesson" />
          </router-link>
        </v-flex>
      </template>
    </template>

    <template v-else>
      <v-flex d-flex md10 lg8 xl7 mx-auto justify-center class="mt-10">
        <v-flex md5 class="px-2">
          <h2 class="mb-0">
            רשימת השיעורים
           <small>({{ completedLessons.length }}/{{ lessons.length }})</small>
          </h2>
          <div class="lessons_list mt-1">
          <template v-for="(lesson, index) in lessons">
            <simple-lesson-card
              :key="index"
              :index="index + 1"
              :lesson="lesson" 
              :isActive="activeLesson && lesson.id === activeLesson.id"
              @submit="setActiveLesson(lesson)"
              :class="{
                'mb-3': (index + 1) < lessons.length
              }"
            />
          </template>
          </div>
        </v-flex>
        <v-flex md6 class="active_lesson_wrapper">

          <template v-if="activeLesson">
            <v-flex d-flex justify-space-between align-center>
                <h2 class="mb-0">
                  {{ activeLesson.name }}
                </h2>
                <heart
                  :filled="isFavorite"
                  @submit="toggleFavorite()"
                />
            </v-flex>
            <img :src="activeLesson.imageSrc" class="w100 mt-1" alt="lesson image">
            <div class="active_lesson_darkner"></div>
            <v-flex d-flex align-center justify-space-between class="active_lesson_content">
              <v-flex d-flex flex-column justify-space-between class="h100">
                <div>
                  <small class="white_text_color" v-html="activeLessonDescription">
                  </small>
                </div>
                <v-flex d-flex align-end justify-space-between class="w100">
                  <time-chip 
                    class="time_chip"
                    :seconds="seconds"
                  />

                  <v-flex md4>
                    <main-button 
                      text="הפעל שיעור"
                      shadow
                      slim
                      @submit="enterLesson()"
                    />
                  </v-flex>
                </v-flex>
              </v-flex>
            </v-flex>
          </template>

        </v-flex>
      </v-flex>
    </template>

    <trainer-dialog :show="showTrainerDialog" :trainer="trainer" @closed="toggleTrainerDialog()" />
  </div>
</template>

<script>
import MainButton         from '../../components/Buttons/MainButton.vue';
import DetailedLessonCard from '../../components/Cards/DetailedLessonCard.vue';
import SimpleLessonCard   from '../../components/Cards/SimpleLessonCard.vue';
import TimeChip           from '../../components/Chips/TimeChip.vue';
import Heart              from '../../components/General/Heart.vue';
import TrainerDialog      from '../../components/Dialogs/TrainerDialog.vue';
export default {
  components: { TrainerDialog, SimpleLessonCard, MainButton, DetailedLessonCard, TimeChip, Heart },

  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showTrainerDialog: false,
      activeLesson: null,
      loadingFavorite: false
    };
  },

  mounted() {
    if(this.lessons.length) {
      this.setActiveLesson(this.lessons[0])
    }
  },

  computed: {
    seconds() {
      return this.activeLesson.video.video_length ?? 0;
    },

    courseArea() {
      const courseAreaId = this.$route.query.courseArea;
      if (!courseAreaId) {
        return null;
      }

      return ContentService.findCourseAreaById(courseAreaId);
    },

    courseAreas() {
      return this.course?.active_areas_with_active_lessons;
    },

    lessons() {
      try {
        if (this.courseArea) {
          return ContentService.getLessonsByCourseAreaId(this.courseArea.id);
        }

        return ContentService.getLessonsByCourseId(this.course.id);
      } catch (err) {
        error(err);
        return [];
      }
    },

    completedLessons() {
      return this.lessons.filter(lesson => lesson.progress?.finished_at)
    },

    isFavorite() {
      return ContentService.isLessonFavorite(this.activeLesson.id);
    },

    showTrainerIcon() {
      return Boolean(this.$route.query.courseArea);
    },

    trainer() {
      const courseAreaId = this.$route.query.courseArea;
      const trainer = ContentService.findTrainerByCourseAreaId(courseAreaId);
      return trainer;
    },

    activeLessonDescription() {
      const MAX_CHARS = 250;
      return ContentService.getLessonShortDescription(this.activeLesson, MAX_CHARS);
    }
  },

  methods: {
    isActiveCourseArea(courseAreaId) {
      return courseAreaId == this.$route.query.courseArea;
    },

    enterCourseArea(courseArea) {
      if (this.$route.query.courseArea != courseArea.id) {
        this.$router.push(
          `/courses/${courseArea.course_id}/lessons?courseArea=${courseArea.id}`
        );
      }
    },

    toggleTrainerDialog() {
      this.showTrainerDialog = !this.showTrainerDialog;
    },

    setActiveLesson(lesson) {
      this.activeLesson = lesson;
    },

    enterLesson() {
      this.$router.push(
        `/courses/${this.activeLesson.course_area_id}/lessons/${this.activeLesson.id}`
      );
    },

    async toggleFavorite() {
        if(this.loadingFavorite) {
            return;
        }

        this.loadingFavorite = true;
        await this.$store.dispatch('UserState/toggleFavorite', this.activeLesson.id)
        this.loadingFavorite = false;
    }
  },
};
</script>

<style scoped lang="scss">
.lesson_card_wrapper {
  height: 200px;
  width: 100%;
}

.active_lesson_darkner {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 50%;
  background: linear-gradient(#0000, #000c, #000 90%);
}

.active_lesson_content {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 15px 10px;
  height: 35%;
}

@media only screen and (min-width: 600px) {
  .course_area_wrapper {
    position: relative;
    top: -50px;
    z-index: 3;
  }
}

.active_lesson_wrapper {
  position: relative;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
  }
    
  .time_chip {
    
  }
}

.lessons_list {
  height: 400px;
  overflow-y: auto;
}

</style>
