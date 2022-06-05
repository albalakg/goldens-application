<template>
  <v-flex d-flex justify-space-between align-center class="main_bg_color lesson_practice_list">
    <div class="pa-5">
      <document />
      <strong>
      {{ lesson.rehearsals}}
      חזרות
      </strong>
    </div>
    <div class="pa-5">
      <clock />
      <strong>
      {{ activityTimeText }}
      </strong>
    </div>
    <div class="pa-5">
      <calendar />
      <strong>
      {{ activityPeriodText }}
      </strong>
    </div>
    <v-flex md2 d-flex justify-end align-self-start class="badge_wrapper">
      <div class="badge sub_bg_color ml-4">
        <settings-mark />
      </div>
    </v-flex>
  </v-flex>
</template>

<script>
import Calendar from '../../components/General/Calendar.vue';
import Clock from '../../components/General/Clock.vue';
import Document from '../../components/General/Document.vue';
import SettingsMark from '../../components/General/SettingsMark.vue';

export default {
  components: { Document, Clock, Calendar, SettingsMark },

  props: {
    lesson: {
        type: Object,
        required: true
    }
  },

  mounted() {
  },

  computed: {
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

}
</script>

<style scoped>

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

  strong {
    color: #fff;
  }

  .badge {
    border-radius: 0 0 20px 20px;
    height: 50px;
    width: 36px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 5px;
    position: relative;
  }

  @media only screen and (max-width: 600px) {
    .badge_wrapper {
      position: absolute;
      left: -3px;
    }

    .lesson_practice_list {
      height: 100px;
      align-items: flex-end !important;
    }
  }

</style>