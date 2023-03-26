<template>
  <div v-if="Boolean(lesson)" class="auth_padding_top" :key="lesson.id">
    <v-flex md7 xl6 mx-auto v-if="lesson" class="lesson_page_content mt-5 mb-10">
      
      <v-flex d-flex align-start flex-wrap justify-space-between class="px-2 px-md-0">
        <v-flex xs9>
          <h1 class="mb-0">
            {{ lesson.name }}
          </h1>
        </v-flex>

        <div md4 v-if="$vuetify.breakpoint.mdAndUp">
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
                      <strong class="white--text ml-3" v-if="$vuetify.breakpoint.mdAndUp">
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

        <div class="heart_badge main_bg_color mt-4" v-else @submit="toggleFavorite()">
          <heart 
            @submit="toggleFavorite()"
            dark
            :filled="isFavorite"
          />
        </div>
      </v-flex>

      <div class="mt-2 px-2 px-md-0">
        <v-flex d-flex class="lesson_trainer_details">
          <profile-card :image="trainer.imageSrc" class="lesson_trainer_card" />
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
            <div class="lessons_list white_bg_color mt-2 px-3 py-2" v-show="showList">
              <v-flex class="my-2 pointer" d-flex align-center justify-space-between v-for="(lesson, index) in lessons" :key="index" @click="enterLesson(lesson)">
                <small class="ml-1" :class="{
                  'sub_text_color' : lesson.id == lessonId,
                  'grey_text_color': lesson.isCompleted,
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

      <div class="px-2 px-md-0s">
        <small v-html="lesson.description">
        </small>
      </div>

      <div class="lesson_video_wrapper ma-3 pa-md-0">
        <video-card 
          ref="video"
          :src="lesson.video.videoSrc"
          @playClicked="playVideo()"
          @onVideoPlay="onVideoPlay"
          @onVideoPaused="onVideoPaused"
          @onVideoEnd="onVideoEnd"
        />

        <lesson-video-end-screen 
          v-if="showEndLessonScreen && nextLesson"
          :lesson="nextLesson" 
          class="video_end_screen" 
          @nextLesson="playNextLesson"
          @closeEndScreen="closeEndScreen"
        />
      </div>

      <circle-decorator class="circle_decorator" :dark="false" />
     
      <lesson-details-section 
        :lesson="lesson"
        :trainer="trainer"
      />
    </v-flex>

    <star-logo class="logo_decorator" :opacity=".5" />
  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import ProfileCard from '../../components/Cards/ProfileCard.vue';
import VideoCard from '../../components/Cards/VideoCard.vue';
import LessonDetailsSection from '../../components/Content/LessonDetailsSection.vue';
import LessonVideoEndScreen from '../../components/Content/LessonVideoEndScreen.vue';
import CircleDecorator from '../../components/Decorators/CircleDecorator.vue';
import Heart from '../../components/General/Heart.vue';
import LessonCompleted from '../../components/General/LessonCompleted.vue';
import StarLogo from '../../components/General/StarLogo.vue';

const SPACE_BETWEEN_VIDEO_PROGRESS_UPDATE = 3000;
const FINISHED_LESSON_TITLES = [
  'כל הכבוד',
  'מצויין',
  'זו הדרך',
  'תמשיך ככה',
];

export default {
  components: { MainButton, Heart, ProfileCard, LessonCompleted, VideoCard, LessonVideoEndScreen, StarLogo, CircleDecorator, LessonDetailsSection },

  data() {
    return {
      showList: false,
      updateLessonProgressInterval: null,
      videoProgress: {
        start_time:  0,
        end_time:    0,
        lesson_id: this.$route.params.lesson_id,
      },
      showEndLessonScreen: false,
      alertedALessonHasSkipped: false,
    }
  },

  mounted() {
    this.setVideoStartTime();
  },

  computed: {
    lesson() {
      return ContentService.findLessonById(this.$route.params.lesson_id)
    },

    lessonId() {
      return this.$route.params.lesson_id
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
      return this.trainer ? this.trainer.name : '';
    },

    arrowDirection() {
      return this.showList ? 'up' : 'down';
    },

    lessons() {
      if(!this.lesson) {
        return null;
      }

      const lessons = ContentService.getLessonsByCourseAreaId(this.lesson.course_area_id);
      lessons.forEach(lesson => {
        lesson.isCompleted = ContentService.isLessonCompleted(lesson.id);
      })

      return lessons;
    },

    progress() {
      return this.$store.getters['UserState/progress'];
    },

    startTime() {
      try {
        return this.lesson.video.video_length * (this.lesson.progress.progress / 100)
      } catch (err) {
        return 0;
      }
    },

    nextLesson() {
      const currentLessonIndex = this.lessons.findIndex(lesson => lesson.id === this.lesson.id);
      return this.lessons[currentLessonIndex + 1]; 
    },

    trainer() {
      if(!this.lesson) {
        return null;
      }
      
      return ContentService.findTrainerByCourseAreaId(this.lesson.course_area_id);
    },
  },

  watch: {
    lesson: {
      immediate: true,
      deep: true,
      handler() {
        this.stopUpdateProgress();
        // TODO: fix this line
        this.videoProgress.lesson_id = this.lesson.id;
        this.alertedALessonHasSkipped = false;
        this.alertIfSkippedLessons();
      }
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
      if(lesson.id !== this.lesson.id) {
        this.$router.push(`/courses/${lesson.course_id}/lessons/${lesson.id}`);
      }

      this.toggleList();
      this.showEndLessonScreen      = false;
      this.alertedALessonHasSkipped = false;
    },

    onVideoPlay(video) {
      const videoElement = video.target
      this.videoProgress.start_time = videoElement.currentTime;
      this.updateLessonProgressInterval = setInterval(() => {
        this.videoProgress.end_time = videoElement.currentTime;
        this.sendRequest();
        this.videoProgress.start_time = videoElement.currentTime;

      }, SPACE_BETWEEN_VIDEO_PROGRESS_UPDATE);
    },

    onVideoPaused(video) {
      this.stopUpdateProgress();
      const videoElement = video.target
      this.videoProgress.end_time = videoElement.currentTime;
      this.sendRequest();
    },

    onVideoEnd() {
      this.showEndLessonScreen = true;
      this.$store.dispatch('MessageState/addSuccessMessage', {title: this.getRandomTitle(), message: `סיימת את שיעור ${this.lesson.name}`})
    },
    
    getRandomTitle() {
      return FINISHED_LESSON_TITLES[Math.floor(Math.random() * FINISHED_LESSON_TITLES.length)];
    },

    setVideoStartTime() {
      if(this.$refs.video) {
        this.$refs.video.setStartTime(this.startTime)
      }
    },

    async sendRequest() {
      if(this.videoProgressLoading) {
        return;
      }

      this.videoProgressLoading = true;
      await this.$store.dispatch('UserState/updateUserVideoProgress', this.videoProgress)
      this.videoProgressLoading = false;
    },

    playVideo() {
      this.$refs.video.playVideo();
    },

    playNextLesson(lesson) {
      if(lesson.id !== this.lesson.id) {
        this.$router.push(`/courses/${lesson.course_id}/lessons/${lesson.id}`);
      }

      this.closeEndScreen()
    },

    closeEndScreen() {
      this.showEndLessonScreen = false;
    },

    enterCourseArea(courseArea) {
      this.$router.push(`/courses/${courseArea.course_id}/lessons?courseArea=${courseArea.id}`)
    },

    alertIfSkippedLessons() {
      const lessons = this.lessons;
      if(!lessons || this.alertedALessonHasSkipped || !this.progress) {
        return;
      }

      for(let index = 0; index < lessons.length; index++) {
        const lesson = lessons[index];
        if(lesson.isCompleted === undefined) {
          return;
        }

        if(lesson.id === this.lesson.id) {
          this.alertedALessonHasSkipped = true;
          return;
        }

        if(lesson.id !== this.lesson.id && !lesson.isCompleted) {
          this.$store.dispatch('MessageState/addWarningMessage', { time: 5000, title: 'דילגת על שיעור',message: `דילגת על שיעור ${lesson.name}, אנחנו ממליצים לראות לפי הסדר` });
          this.alertedALessonHasSkipped = true;
          return;
        }
      }
    },

    stopUpdateProgress() {
      clearInterval(this.updateLessonProgressInterval);
    }
  },

  beforeDestroy() {
    this.stopUpdateProgress();
  }

}
</script>

<style scoped lang="scss">

  .lesson_trainer_card {
    height: 50px !important;
    width: 50px !important;
  }

  .lesson_page_content {
    position: relative;
    z-index: 2;
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
    z-index: 3;
  }

  .lesson_video_wrapper {
    position: relative;
    z-index: 2;
  }

  .lesson_section {
    min-height: 160px;
  }

  .video_end_screen {
    position: absolute;
    height: 98%;
    top: 0;
    width: 100%;
    z-index: 2;
    background-color: #111d;
    border-radius: 12px;
  }

  video {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

  h2 {
    font-size: 2em;
  }

  .logo_decorator {
    position: fixed;
    height: 50vw;
    width: 50vw;
    top: 0vw;
    right: -10vw;
    min-width: 350px;
    min-height: 350px;
  }

  .circle_decorator {
    position: absolute;
    height: 50vw;
    width: 50vw;
    min-width: 250px;
    min-height: 250px;
    left: -55vw;
    top: 20vh;
    z-index: 0;
  }

  .heart_badge {
    z-index: 100;
    position: absolute;
    left: 0;
    width: 45px;
    border-radius: 0 25px 25px 0;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
  }

</style>