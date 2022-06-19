<template>
  <div class="auth_padding_top" :key="lesson.id">
    <v-flex md7 xl6 mx-auto v-if="lesson" class="lesson_page_content mt-5 mb-10">
      
      <v-flex d-flex align-center flex-wrap justify-space-between class="px-2 px-md-0">
        <h1 class="mb-0">
          {{ lesson.name }}
        </h1>

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

        <div class="heart_badge main_bg_color" v-else @submit="toggleFavorite()">
          <heart 
            @submit="toggleFavorite()"
            dark
            :filled="isFavorite"
          />
        </div>
      </v-flex>

      <div class="mt-2 px-2 px-md-0">
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

      <div class="lesson_video_wrapper pa-3 pa-md-0">
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
      
      <section class="lesson_content_wrapper">

        <v-flex d-flex flex-wrap class="mt-2 mt-md-10">
          <v-flex align-self-start md7 class="lesson_practice_wrapper">
            <lesson-practice-card :lesson="lesson" />
            <br>
            <div class="px-5 px-md-0">
              <h2>
                <span class="main_text_color"> מה </span>
                <span class="dark_text_color"> נלמד </span>
              </h2>
              <p v-html="lesson.content">
              </p>
            </div>
          </v-flex>
          <v-flex align-self-start md5 class="px-3 pl-md-0 pr-md-5 mt-8 mt-md-0">
            <simple-trainer-card :trainer="trainer" />
            <br>
            <course-area-card 
              class="mb-3" 
              :class="{
                'sub_border': courseArea.id === lesson.course_area_id
              }"
              v-for="(courseArea, index) in courseAreas" 
              :key="index" 
              rounded
              :courseArea="courseArea" 
              @submit="enterCourseArea"
            />
          </v-flex>
        </v-flex>

        <br>
  
      </section>
    </v-flex>

    <star-logo class="logo_decorator" :opacity=".5" />
  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import CourseAreaCard from '../../components/Cards/CourseAreaCard.vue';
import ProfileCard from '../../components/Cards/ProfileCard.vue';
import SimpleTrainerCard from '../../components/Cards/SimpleTrainerCard.vue';
import VideoCard from '../../components/Cards/VideoCard.vue';
import LessonPracticeCard from '../../components/Content/LessonPracticeCard.vue';
import LessonVideoEndScreen from '../../components/Content/LessonVideoEndScreen.vue';
import CircleDecorator from '../../components/Decorators/CircleDecorator.vue';
import Heart from '../../components/General/Heart.vue';
import LessonCompleted from '../../components/General/LessonCompleted.vue';
import StarLogo from '../../components/General/StarLogo.vue';

const SPACE_BETWEEN_VIDEO_PROGRESS_UPDATE = 3000;

export default {
  components: { MainButton, Heart, ProfileCard, LessonCompleted, VideoCard, LessonVideoEndScreen, LessonPracticeCard, SimpleTrainerCard, CourseAreaCard, StarLogo, CircleDecorator },

  data() {
    return {
      showList: false,
      updateLessonProgressInterval: null,
      videoProgress: {
        start_time:  0,
        end_time:    0,
        lesson_id: this.$route.params.lesson_id,
      },
      showEndLessonScreen: false
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
      const lessons = ContentService.getLessonsByCourseAreaId(this.lesson.course_area_id);
      lessons.forEach(lesson => {
        lesson.isCompleted = ContentService.isLessonCompleted(lesson.id);
      })

      return lessons;
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
      return ContentService.findTrainerByCourseAreaId(this.lesson.course_area_id);
    },

    courseAreas() {
      return ContentService.getCourseAreasByCourseId(this.lesson.course_id)
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
      this.showEndLessonScreen = false;
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
      clearInterval(this.updateLessonProgressInterval);
      const videoElement = video.target
      this.videoProgress.end_time = videoElement.currentTime;
      this.sendRequest();
    },

    onVideoEnd() {
      this.showEndLessonScreen = true;
    },

    setVideoStartTime() {
      this.$refs.video.setStartTime(this.startTime)
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
    }
  },

  beforeDestroy() {
    clearInterval(this.updateLessonProgressInterval);
  }

}
</script>

<style scoped>

  .lesson_trainer_card {
    height: 50px;
    width: 50px;
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

  .video_end_screen {
    position: absolute;
    height: 100%;
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

  .lesson_practice_wrapper {
    border-radius: 4px;
  }

  .lesson_practice_list > div {
    display: flex;
    align-items: center;
  }

  .lesson_practice_list strong {
    margin-right: 10px;
  }

  .badge {
    border-radius: 0 0 20px 20px;
    height: 70%;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 5px;
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

  .lesson_content_wrapper {
    z-index: 2;
    position: relative;
  }


  .heart_badge {
    z-index: 100;
    position: absolute;
    left: 0;
    top: -30px;
    width: 45px;
    border-radius: 0 25px 25px 0;
    padding: 5px;
    display: flex;
    justify-content: flex-end;
  }

</style>