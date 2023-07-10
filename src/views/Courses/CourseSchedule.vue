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
            absolute
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
            max-width="400px"
            class="event_calendar"
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon @click="selectedOpen = false">mdi-close</v-icon>
                <v-tooltip top color="black">
                  <span class="white_text_color">
                    התחל שיעור
                  </span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <div class="event_content mb-3">
                  <img class="event_image rounded" :src="selectedEvent.image" />
                  <v-icon
                      class="enter_lesson_button" 
                      color="black"
                      @click="enterLesson(selectedEvent)"
                    >
                    mdi-play
                  </v-icon>
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
                  :text="selectedEvent.typeId === trainingTypeId ? 'שמור אימון' : 'שמור שיעור'"
                  shadow
                  :disabled="
                    isSameDay(selectedEvent.dateOnly, selectedEvent.start)
                  "
                  @submit="saveDateInCalendar(selectedEvent)"
                />
                <main-button
                  class="mt-3"
                  text="מחק אימון"
                  dark
                  v-if="selectedEvent.isSetByUser"
                  @submit="deleteTrainingSchedule(selectedEvent)"
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
import MainButton                     from '../../components/Buttons/MainButton.vue';
import NewTrainingActivityForm        from '../../components/Form/NewTrainingActivityForm.vue';
import { SCHEDULE_TRAINING_TYPE_ID }  from '../../helpers/ContentService'

const WEEKEND_DAYS_IN_NUMBERS                 = [5,6];
const NUMBER_OF_BASE_CALC_TILL_END_OF_WEEKEND = 7;
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
      trainingTypeId: SCHEDULE_TRAINING_TYPE_ID,
      loading: false,
      filterByDate: "",
      focus: '',
      earliestScheduledDate: '',
      type: "month",
      events: [],
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      startDiffInDays: 0,
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      typeToLabel: {
        month: "חודש",
        day: "יום",
      },
      scheduleColors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green'],
      trainingScheduleColor: 'orange',
      courseAreaColors: {},
      hasFocused: false,
      daysForwardToEvents: 0
    };
  },

  mounted() {
    this.updateRange();
  },

  watch: {
    course: {
      deep: true,
      handler() {
        this.updateRange();
      }
    },
    hasFocused() {
      if(!this.earliestScheduledDate) {
        return;
      }

      if(this.startDiffInDays > 0) {
        return this.setFocus(this.getEventDate((new Date(this.earliestScheduledDate).addDays(this.startDiffInDays))));
      }

      return this.setFocus(this.earliestScheduledDate);
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
      if(this.hasFocused) {
        return;
      }

      const events  = [];
      const lessons = this.getCourseLessons();

      if (!lessons) {
        return;
      }

      this.course.schedules.forEach((schedule) => {
        const lesson = lessons.find(lesson => lesson.id === schedule.course_lesson_id);

        if(!lesson) {
          return;
        }

        events.push({
          scheduleId:     schedule.id,
          typeId:         schedule.type_id,
          isSetByUser:    Boolean(schedule.isSetByUser),
          isDateUpdated:  schedule.is_date_updated,
          lessonId:       lesson.id,
          name:           lesson.name,
          description:    lesson.description,
          image:          lesson.imageSrc,
          scheduleDate:   new Date(schedule.date),
          allDay:         true,
          color:          schedule.type_id === SCHEDULE_TRAINING_TYPE_ID ? 
                                                            this.trainingScheduleColor : 
                                                            this.getCourseAreaColor(lesson.course_area_id),
        });
      });

      this.events     = this.pushEventsForwardByCourseStartDate(events);
      this.hasFocused = true;
    },

    getCourseLessons() {
      let lessons = [];
      
      this.course.active_areas_with_active_lessons.forEach(course_area => {
        lessons = lessons.concat(course_area.active_lessons)
      })

      return lessons;
    },

    getEventDate(date) {
      const year  = new Date(date).getFullYear();
      let month   = new Date(date).getMonth() + 1;
      month       = String(month).length === 1 ? "0" + month : month;
      let day     = new Date(date).getDate();
      day         = String(day).length === 1 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },

    pushEventsForwardByCourseStartDate(events) {
      const startDate           = new Date(this.course.schedule_start_date);
      const earliestEventDate   = new Date(this.course.earliest_scheduled_date);
      const diffInTime          = startDate.getTime() - earliestEventDate.getTime();
      this.startDiffInDays      = Math.floor(diffInTime / (1000 * 3600 * 24));
      return events.map(event => {
        const isEventUpdated  = event.isSetByUser || event.isDateUpdated;
        let eventDate         = isEventUpdated ? this.getEventDate(event.scheduleDate) : this.getEventDate(event.scheduleDate.addDays(this.startDiffInDays));
        if(!isEventUpdated) {
          eventDate = this.getEventDate(this.getRelevantEventDate(new Date(eventDate)));
        }
        event.dateOnly  = eventDate;
        event.start     = eventDate;
        event.end       = eventDate;

        if(!this.earliestScheduledDate || this.earliestScheduledDate > event.start) {
          this.earliestScheduledDate = event.start; 
        }

        return event;
      })
    },

    getRelevantEventDate(date) {
      date = date.addDays(this.daysForwardToEvents);
      
      if(!this.isWeekend(date)) {
        return date;
      }
      
      const daysTillEndOfWeekend = this.daysToAddTillEndOfWeekend(date);
      this.daysForwardToEvents = this.daysForwardToEvents + daysTillEndOfWeekend;
      date = date.addDays(daysTillEndOfWeekend);
      return date;
    },

    isWeekend(date) {
      const dateDay = date.getDay();
      return WEEKEND_DAYS_IN_NUMBERS.includes(dateDay);
    },

    daysToAddTillEndOfWeekend(date) {
      const dateDay = date.getDay();
      return NUMBER_OF_BASE_CALC_TILL_END_OF_WEEKEND - dateDay;
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

    enterLesson(schedule) {
      this.$router.push('/courses/' + this.course.id + '/lessons/' + schedule.lessonId)
    },

    saveDateInCalendar(schedule) {
      if(schedule.isSetByUser) {
        this.$store.dispatch('UserState/updateTrainingSchedule', {
          date:        schedule.dateOnly,
          lesson_id:   schedule.lessonId,
          scheduleId:  schedule.scheduleId,
          type_id:     schedule.typeId,
        });
      } else {
        this.$store.dispatch('UserState/saveLessonDateInCalendar', {
          date:        schedule.dateOnly,
          lesson_id:   schedule.lessonId,
          scheduleId:  schedule.scheduleId,
          type_id:     schedule.typeId,
        });
      }

      this.selectedOpen = false;
      this.updateEvent(schedule);
      this.$emit('refreshCourse');
      this.setFocus(schedule.dateOnly);
    },

    updateEvent(updatedEvent) {
      this.events = this.events.map(event => {
        if(event.scheduleId === updatedEvent.scheduleId) {
          event.dateOnly  = updatedEvent.dateOnly;
          event.start     = updatedEvent.dateOnly;
          event.end       = updatedEvent.dateOnly;
        }
        return event;
      })
    },

    addEvent(newEvent) {
      const lastEvent = this.course.schedules[this.course.schedules.length - 1];
      if(newEvent.id !== lastEvent.id) {
        console.warn('new event not equal to last event');
        return;
      }

      const lessons = this.getCourseLessons();
      const lesson  = lessons.find(lesson => lesson.id === lastEvent.course_lesson_id);
      if(!lesson) {
        console.warn('lesson not found related to new event', lesson, newEvent, lastEvent);
        return;
      }

      this.events.push({
        scheduleId:     lastEvent.id,
        typeId:         lastEvent.type_id,
        isSetByUser:    true,
        isDateUpdated:  false,
        lessonId:       lastEvent.course_lesson_id,
        name:           lesson.name,
        description:    lesson.description,
        image:          lesson.imageSrc,
        dateOnly:       lastEvent.date,
        start:          lastEvent.date,
        end:            lastEvent.date,
        allDay:         true,
        color:          this.trainingScheduleColor
      });
    },

    deleteTrainingSchedule(schedule) {
      this.$store.dispatch('UserState/deleteTrainingSchedule', schedule.scheduleId);
      this.events = this.events.filter(event => schedule.scheduleId !== event.scheduleId)
      this.selectedOpen = false;
    },

    async addNewTrainingActivity(training) {
      await this.$store.dispatch('UserState/createTrainingSchedule', training);
      this.addEvent(training);
      this.setFocus(training.date);
    },

    setFocus(date) {
      this.focus = date;
    }
  },
};
</script>

<style scoped lang="scss">
.v-toolbar__content button.v-btn--round {
  rotate: 180deg;
}

.enter_lesson_button {
  font-size: 2.5em;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  inset: 0;
  width: 45px;
  height: 45px;
  margin: auto;
  transform: rotate(180deg);
  z-index: 2;
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
    width: 100%;
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

.event_calendar {
  z-index: 100;
}
</style>
