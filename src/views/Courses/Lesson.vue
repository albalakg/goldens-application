<template>
  <div class="auth_padding_top" :key="lesson.id">
    <v-flex md7 xl6 mx-auto v-if="lesson" class="mt-5 mb-10">
      
      <v-flex d-flex align-center justify-space-between class="px-2 px-md-0">
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
        <small v-html="lesson.content">
        </small>
      </div>

      <div class="lesson_video_wrapper">
        <video-card 
          :rounded="$vuetify.breakpoint.mdAndUp"
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

      <v-flex d-flex class="lesson_content_wrapper mt-10">
        <v-flex d-flex xs12 md8 justify-space-between class="grey_bg_color lesson_practice_wrapper">
          <v-flex md10 lg9 d-flex justify-space-between align-center class="lesson_practice_list pa-5">
            <div>
              <document />
              <strong>
                {{ lesson.rehearsals}}
                חזרות
              </strong>
            </div>
            <div>
              <clock />
              <strong>
                {{ activityTimeText }}
              </strong>
            </div>
            <div>
              <calendar />
              <strong>
                {{ activityPeriodText }}
              </strong>
            </div>
          </v-flex>
          <v-flex md4 d-flex justify-end>
            <div class="badge main_dark_bg_color ml-4">
              <settings-mark />
            </div>
          </v-flex>
        </v-flex>
      </v-flex>
    </v-flex>

  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import ProfileCard from '../../components/Cards/ProfileCard.vue';
import VideoCard from '../../components/Cards/VideoCard.vue';
import LessonVideoEndScreen from '../../components/Content/LessonVideoEndScreen.vue';
import Calendar from '../../components/General/Calendar.vue';
import Clock from '../../components/General/Clock.vue';
import Document from '../../components/General/Document.vue';
import Heart from '../../components/General/Heart.vue';
import LessonCompleted from '../../components/General/LessonCompleted.vue';
import SettingsMark from '../../components/General/SettingsMark.vue';

const SPACE_BETWEEN_VIDEO_PROGRESS_UPDATE = 3000;

export default {
  components: { MainButton, Heart, ProfileCard, LessonCompleted, VideoCard, LessonVideoEndScreen, Document, Clock, Calendar, SettingsMark },

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

    // the data is in hours
    activityPeriodText() {
      let type = 'שעות';
      let time = this.lesson.activity_period;

      if(!time) {
        time = 48;
      }
      
      if(time === 1) {
        return 'שעה אחת'
      }
      // there are 168 hours in a week
      else if(time >= 168) {
        type = 'שבועות';
        time = Math.floor(time / 168);
      }
      else if(time >= 48) {
        type = 'ימים';
        time = Math.floor(time / 24);
      }

      return time + ' ' + type;
    },

    // the data is in hours
    activityTimeText() {
      let type = 'שעות';
      let time = this.lesson.activity_time;

      if(!time) {
        time = 48;
      }
      
      if(time === 1) {
        return 'שעה אחת'
      }
      // there are 168 hours in a week
      else if(time >= 168) {
        type = 'שבועות';
        time = Math.floor(time / 168);
      }
      else if(time >= 48) {
        type = 'ימים';
        time = Math.floor(time / 24);
      }

      return time + ' ' + type;
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

</style>