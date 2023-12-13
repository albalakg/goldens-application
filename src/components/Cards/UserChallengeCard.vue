
<template>
  <v-flex mx-auto class="h100 px-2">
    <div class="user_challenge_card_wrapper" :class="{
      'shadow': shadow
    }">
      <completed-chip 
        v-if="isCompleted"
        class="completed_chip"
      />
      <VideoCard
        roundedTop
        class="challenge_image_video"
        :src="'https://vod-progressive.akamaized.net/exp=1702148859~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4848%2F18%2F474243696%2F2114652623.mp4~hmac=3f17da30ae88b06a9089fe9697cde61a3a3f79bc1a11eb39171067a8988ac8d7/vimeo-prod-skyfire-std-us/01/4848/18/474243696/2114652623.mp4'" 
        :imagePlaceholder="challengeImage"    
        @onVideoEnd="resetWatching()"
        ref="videoCard"
      />
      <div class="user_challenge_body pa-1">
        <div>
          <p class="text-center">
            {{ challengeName }}
          </p>

          <small>
            נסיונות: {{ totalAttempts }}/3
          </small>
          <br>
          <small>
            ניסיון אחרון: {{ lastAttemptTime }}
          </small>
          <br>
          <small>
            סטטוס: <strong :class="userChallengeColor">{{ userChallengeStatus }}</strong>
          </small>
        </div>

        <v-flex d-flex justify-space-between class="text-left">
          <v-flex d-flex align-end>
            <small 
              class="challenge_card_status rounded white_text_color px-1" 
              :class="{
                'sub_bg_color': isChallengeActive,
                'dark_bg_color': !isChallengeActive,
              }"
            >
              {{ challengeStatus}}
            </small>
          </v-flex>
          <v-flex d-flex sm4 align-end class="try_again">
            <MainButton
              v-if="canSubmitChallenge"
              :styleConfig="{
                height: 25,
                padding: 3,
              }"
              text="נסה שוב"
              @submit="goToChallenge()"
              />
          </v-flex>
        </v-flex>

      </div>
    </div>
  </v-flex>
</template>

<script>
const MAX_USER_CHALLENGE_CONTENT_CHARS = 50;

import MainButton from '../Buttons/MainButton.vue';
import CompletedChip from '../Chips/CompletedChip.vue';
import VideoCard from './VideoCard.vue';

export default {
  components: {
    CompletedChip,
    VideoCard,
    MainButton
},

  props: {
    userChallenge: {
      type: Object,
      required: true
    },

    shadow: {
      type: Boolean,
    }
  },

  data() {
    return {
      challengeColors: [
        'main_text_color', 'sub_text_color', 'dark_text_color'
      ],
      displayVideo: false,
    }
  },

  computed: {
    userChallengeDescription() {
      const textKey = this.userChallenge.description ? 'description' : 'content';
      return this.userChallenge[textKey].length < MAX_USER_CHALLENGE_CONTENT_CHARS ? this.userChallenge[textKey] : this.userChallenge[textKey].slice(0, MAX_USER_CHALLENGE_CONTENT_CHARS) + '...';
    },
    
    isCompleted() {
      return ContentService.isUserChallengeCompleted(this.userChallenge);
    },
    
    isPending() {
      return ContentService.isUserChallengePending(this.userChallenge);
    },

    challengeName() {
      return this.userChallenge.challenge.name;
    },

    challengeVideo() {
      return this.userChallenge.challenge.video.videoSrc;
    },

    challengeImage() {
      return this.userChallenge.challenge.imageSrc;
    },

    challengeStatus() {
      return StatusService.getStatusAsString(this.userChallenge.challenge.status);
    },

    totalAttempts() {
      return this.userChallenge.attempts_count;
    },

    userChallengeStatus() {
      return StatusService.getChallengeStatusAsString(this.userChallenge.last_attempt.status);
    },

    userChallengeColor() {
      return this.challengeColors[this.userChallenge.last_attempt.status];
    },

    lastAttemptTime() {
      return TimeService.getTimeInHebrew(this.userChallenge.last_attempt.human_time);
    },

    isChallengeActive() {
      return ContentService.isChallengeActive(this.userChallenge.challenge);
    },

    canSubmitChallenge() {
      return ContentService.canSubmitChallenge(this.userChallenge.challenge);
    },
  },

  methods: {
    toggleVideo() {
      this.displayVideo = !this.displayVideo;
    },

    resetWatching() {
      this.$refs.videoCard.resetWatching();
    },

    goToChallenge() {
      this.$router.push('/challenges');
    }
  }

}
</script>

<style scoped lang="scss">

  .shadow {
    box-shadow: 0 10px 12px 1px #000b;
  }

  .user_challenge_card_wrapper {
    height: 100%;
    width: 100%;
    max-width: 250px;
    position: relative;
    border-radius: 8px;
    transition: .3s box-shadow, .3s transform;
    
    .challenge_image_video {
      border-radius: 8px 8px 0 0;
      height: 40%;
      width: 100%;
    }
    
    .completed_chip {
      position: absolute;
      z-index: 2;
      left: -5px;
      top: 20px;
    }

    .user_challenge_body {
      height: 60%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

  }
  .challenge_card_button {
    transition: .3 all linear;
  }

  .challenge_card_button:hover {
    transform: scale(1.1);
  }

  .try_again {
    font-size: 0.8em;
  }
  
</style>