<template>
  <div class="course_area_wrapper" v-if="course">
      <v-flex xs10 md6 lg5 xl3 mx-auto>
        <new-training-activity-form :lessons="lessons" :courseId="course.id" @submit="addNewTrainingActivity" />
      </v-flex>
      <v-flex xl10 md11 mx-auto justify-center class="mt-10">
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
              היום
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>יום</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>חודש</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600" dir="rtl">
          <v-calendar
            ref="calendar"
            locale="he"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          >
          </v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="selectedOpen = false">mdi-close</v-icon>
              </v-toolbar>
              <v-card-text>
                <div class="event_content mb-3">
                  <img class="event_image rounded" :src="selectedEvent.image" />
                  <div class="event_darkner rounded"></div>
                  <span v-html="selectedEvent.description"></span>
                </div>
                <v-date-picker
                  :color="selectedEvent.color"
                  v-model="selectedEvent.dateOnly"
                  class="w100"
                >
                </v-date-picker>
                <main-button
                  class="mt-3"
                  text="שמור שיעור"
                  shadow
                  :disabled="
                    isSameDay(selectedEvent.dateOnly, selectedEvent.start)
                  "
                  @submit="saveDateInCalendar(selectedEvent)"
                />
              </v-card-text>
              <v-card-actions> </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-flex>
  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import NewTrainingActivityForm from '../../components/Form/NewTrainingActivityForm.vue';
import { SCHEDULE_TRAINING_TYPE_ID } from '../../helpers/ContentService'

export default {
  components: { MainButton, NewTrainingActivityForm, },

  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      earliestDate: null,
      filterByDate: "",
      focus: '',
      type: "month",
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      months: [
        "ינואר",
        "פברואר",
        "מרץ"
      ],
      typeToLabel: {
        month: "חודש",
        day: "יום",
      },
      scheduleColors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green'],
      trainingScheduleColor: 'orange',
      courseAreaColors: {},
    };
  },

  mounted() {
    setTimeout(() => {
      this.updateRange();
      this.setFocus(this.earliestDate);

    }, 1000);
  },

  watch: {
    course: {
      deep: true,
      handler() {
        this.updateRange();
      }
    }
  },

  computed: {
    lessons() {
      try {
        return ContentService.getLessonsByCourseId(this.course.id);
      } catch (err) {
        error(err);
        return [];
      }
    },
  },

  methods: {
    updateRange() {
      const events      = [];
      let lessons       = [];
      this.earliestDate  = null;

      this.course.active_areas_with_active_lessons.forEach(course_area => {
        lessons = lessons.concat(course_area.active_lessons)
      })

      if (!lessons) {
        return;
      }

      this.course.schedules.forEach((schedule) => {
        const lesson = lessons.find(lesson => lesson.id === schedule.course_lesson_id);

        if(!lesson) {
          return;
        }

        if(!this.earliestDate || schedule.date < this.earliestDate) {
          this.earliestDate = schedule.date;
        }
        const year  = new Date(schedule.date).getFullYear();
        let month   = new Date(schedule.date).getMonth() + 1;
        month       = String(month).length === 1 ? "0" + month : month;
        let day     = new Date(schedule.date).getDate();
        day         = String(day).length === 1 ? "0" + day : day;
        
        events.push({
          scheduleId:   schedule.id,
          typeId:       schedule.type_id,
          lessonId:     lesson.id,
          name:         lesson.name,
          description:  lesson.description,
          image:        lesson.imageSrc,
          start:        new Date(schedule.date),
          end:          new Date(schedule.date),
          dateOnly:     year + "-" + month + "-" + day,
          allDay:       true,
          color:        schedule.type_id === SCHEDULE_TRAINING_TYPE_ID ? 
                                                            this.trainingScheduleColor : 
                                                            this.getCourseAreaColor(lesson.course_area_id),
        });
      });

      this.events = events;
    },
     
    setCourseAreaColor(courseAreaId) {
      const firstColorIndex   = 0;
      const color             = this.scheduleColors[firstColorIndex];
      this.scheduleColors.splice(firstColorIndex, 1);
      this.courseAreaColors[courseAreaId] = color;
    },
    
    getCourseAreaColor(courseAreaId) {
      if(!this.courseAreaColors[courseAreaId]) {
          this.setCourseAreaColor(courseAreaId);
      }

      return this.courseAreaColors[courseAreaId];
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    getEventColor(event) {
      return event.color;
    },

    setToday() {
      this.focus = "";
    },

    prev() {
      this.$refs.calendar.prev();
    },

    next() {
      this.$refs.calendar.next();
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },

    isSameDay(firstDay, secondDay) {
      firstDay  = new Date(firstDay);
      secondDay = new Date(secondDay);

      return  firstDay.getFullYear() === secondDay.getFullYear() &&
              firstDay.getMonth() === secondDay.getMonth() &&
              firstDay.getDate() === secondDay.getDate();
    },

    saveDateInCalendar(schedule) {
      this.$store.dispatch('UserState/saveLessonDateInCalendar', {
        date:        schedule.dateOnly,
        lesson_id:   schedule.lessonId,
        scheduleId:  schedule.scheduleId,
        type_id:     schedule.typeId,
      });

      this.selectedOpen = false;
      this.updateRange();
      this.$emit('refreshCourse');
      this.setFocus(schedule.dateOnly);
    },

    async addNewTrainingActivity(training) {
      await this.$store.dispatch('UserState/createTrainingSchedule', training);
      this.updateRange();
      this.setFocus(training.date);
    },

    setFocus(date) {
      this.focus = date;
    },

    updateScheduleMonth() {

    }
  },
};
</script>

<style scoped lang="scss">
.v-toolbar__content button.v-btn--round {
  rotate: 180deg;
}

.event_content {
  position: relative;

  .event_darkner {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60%;
    background: linear-gradient(#fff0, #000a, #000);
  }
  
  .event_image {
    width: 410px;
    height: 200px;
    object-fit: cover;
    max-width: 90vw;
  }

  span {
    position: absolute;
    right: 2%;
    bottom: 0;
    z-index: 2;
    color: #fff;
  }
}
</style>
