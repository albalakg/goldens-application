<template>
  <div class="auth_padding_top">
    <v-flex md10 xl8 mx-auto v-if="lesson">
      
      <v-flex d-flex align-center justify-space-between>
        <h1 class="mb-0">
          {{ lesson.name }}
        </h1>

        <div md4>
          <div>
            <main-button
              shadow
              :styleConfig="{
                padding: '7px 25px',
                borderRadius: '30',
              }"
              @submit="toggleFavorite()"
            >
                <template slot="content">
                    <v-flex d-flex align-center justify-center>
                      <strong class="white--text ml-3">
                        {{ favoriteButtonText }}
                      </strong>
                      <heart 
                        dark
                        :filled="isFavorite"
                      />
                    </v-flex>
                </template>
            </main-button>
          </div>
        </div>
      </v-flex>

      <div class="mt-2">
        <v-flex d-flex class="lesson_trainer_details">
          <profile-card class="lesson_trainer_card" />
          <div class="mr-3">
            <strong>
              {{ trainerName }}
            </strong>
            <br>
            <div class="pointer lessons_list_wrapper" @click="toggleList()">
              <small>
                {{ lesson.name }}
              </small>
              <v-icon>
                mdi-chevron-{{ arrowDirection }}
              </v-icon>
            </div>
            <div class="lessons_list mt-2 px-3 py-2" v-show="showList">
              <v-flex class="my-2 pointer" d-flex align-center justify-space-between v-for="(lesson, index) in lessons" :key="index" @click="enterLesson(lesson)">
                <small :class="{
                  'grey_text_color': lesson.isCompleted
                }">
                  {{ lesson.name }}
                </small>
                <lesson-completed v-if="lesson.isCompleted" />
              </v-flex>
            </div>
          </div>
        </v-flex>
      </div>

      <br>

      <p v-html="lesson.content">
      </p>

      <video class="w100" :src="lesson.video.videoSrc" controls></video>

    </v-flex>
  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import ProfileCard from '../../components/Cards/ProfileCard.vue';
import Heart from '../../components/General/Heart.vue';
import LessonCompleted from '../../components/General/LessonCompleted.vue';
export default {
  components: { MainButton, Heart, ProfileCard, LessonCompleted },

  data() {
    return {
      showList: false,
    }
  },

  computed: {
    lesson() {
      return ContentService.findLessonById(this.$route.params.lesson_id)
    },
    
    isCompleted() {
      return ContentService.isLessonCompleted(this.lesson.id);
    },

    isFavorite() {
      return ContentService.isLessonFavorite(this.lesson.id);
    },

    favoriteButtonText() {
      return this.isFavorite ? 'הורדה ממועדפים' : 'הוספה למועדפים'
    },

    trainerName() {
      return 'רונית לוי'
    },

    arrowDirection() {
      return this.showList ? 'up' : 'down';
    },

    lessons() {
      const lessons = ContentService.getLessonsByCourseAreaId(this.lesson.course_area_id);
      lessons.forEach(lesson => {
        lesson.isCompleted = ContentService.isLessonCompleted(lesson.id);
      })

      return lessons;
    }
  },

  methods: {
    async toggleFavorite() {
      if(this.loadingFavorite) {
          return;
      }

      this.loadingFavorite = true;
      await this.$store.dispatch('UserState/toggleFavorite', this.lesson.id)
      this.loadingFavorite = false;
    },

    toggleList() {
      this.showList = !this.showList;
    },

    enterLesson(lesson) {
      this.$router.push(`/courses/${lesson.course_id}/lessons/${lesson.id}`);
      this.toggleList();
    }
  }

}
</script>

<style scoped>

  .lesson_trainer_card {
    height: 50px;
    width: 50px;
  }

  .lessons_list_wrapper {
    position: relative;
  }

  .lessons_list {
    position: absolute;
    min-width: 150px;
    max-height: 150px;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px #0003;
  }

  video {
    border-radius: 15px;
  }

</style>