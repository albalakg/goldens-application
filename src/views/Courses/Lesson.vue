<template>
  <div class="auth_padding_top">
    <v-flex md7 xl6 mx-auto v-if="lesson" class="mt-5 mb-10">
      
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
            <div class="lessons_list white_bg_color mt-2 px-3 py-2" v-show="showList">
              <v-flex class="my-2 pointer" d-flex align-center justify-space-between v-for="(lesson, index) in lessons" :key="index" @click="enterLesson(lesson)">
                <small :class="{
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

      <p v-html="lesson.content">
      </p>

      <video-card 
        ref="video"
        :src="lesson.video.videoSrc"
        @playClicked="playVideo()"
        @onVideoPlay="onVideoPlay"
        @onVideoPaused="onVideoPaused"
      />
      <!-- <video 
        controlsList="nodownload"
        disablePictureInPicture
        id="lessonVideo" 
        class="w100" 
        controls
        @playing="onVideoPlay"
        @pause="onVideoPaused"
      >
        <source :src="lesson.video.videoSrc" type="video/mp4" />
        Your browser does not support the video tag.
      </video> -->

    </v-flex>
  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import ProfileCard from '../../components/Cards/ProfileCard.vue';
import VideoCard from '../../components/Cards/VideoCard.vue';
import Heart from '../../components/General/Heart.vue';
import LessonCompleted from '../../components/General/LessonCompleted.vue';

const SPACE_BETWEEN_VIDEO_PROGRESS_UPDATE = 3000;

export default {
  components: { MainButton, Heart, ProfileCard, LessonCompleted, VideoCard },

  data() {
    return {
      showList: false,
      updateLessonProgressInterval: null,
      videoProgress: {
        start_time:  0,
        end_time:    0,
        lesson_id: this.$route.params.lesson_id,
      }
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
    }
  },

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
    z-index: 2;
  }

  video {
    border-radius: 15px;
  }

</style>