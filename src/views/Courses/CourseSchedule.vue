<template>
  <div class="course_area_wrapper" v-if="course">
    <!-- small screen -->
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

export default {
  components: { MainButton, },

  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      refreshKey: 1,
      loading: false,
      filterByDate: "",
      focus: new Date("2023-01-01"),
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
      courseAreaColors: {
        1: "blue",
        2: "indigo",
        3: "deep-purple",
        4: "cyan",
        5: "green",
        6: "orange",
      },
    };
  },

  mounted() {
    setTimeout(() => {
      this.updateRange();
    }, 1000);
  },

  watch: {
    course: {
      deep: true,
      handler() {
        this.updateRange()
      }
    }
  },

  methods: {
    updateRange() {
      const events = [];
      
      let lessons = [];
      this.course.active_areas_with_active_lessons.forEach(course_area => {
        lessons = lessons.concat(course_area.active_lessons)
      })
      // const lessons = this.$store.getters["LessonState/lessons"];
      if (!lessons) {
        return;
      }

      lessons.forEach((lesson) => {
        let date = lesson.schedule ? lesson.schedule.date : "";

        if (!date) {
          return;
        }

        const year = new Date(date).getFullYear();
        let month = new Date(date).getMonth() + 1;
        month = String(month).length === 1 ? "0" + month : month;
        let day = new Date(date).getDate();
        day = String(day).length === 1 ? "0" + day : day;

        events.push({
          lessonId: lesson.id,
          name: lesson.name,
          description: lesson.description,
          image: lesson.imageSrc,
          color: this.courseAreaColors[lesson.course_area_id],
          start: new Date(date),
          end: new Date(date),
          dateOnly: year + "-" + month + "-" + day,
          allDay: true,
        });
      });

      this.events = events;
    },

    async submit() {
      this.loading = true;

      const lessons = this.$store.getters["LessonState/lessons"];
      const data = {
        id: lessons[0].course_id,
        lessonsId: lessons.map((lesson) => {
          return {
            id:   lesson.id,
            date: lesson.schedule?.date,
          };
        }),
      };
      await this.$store.dispatch("CourseState/saveCourseSchedule", data);
      this.loading = false;
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

    saveDateInCalendar(lesson) {
      this.$store.dispatch('UserState/saveLessonDateInCalendar', {
        id:   lesson.lessonId,
        date: lesson.dateOnly
      });

      this.selectedOpen = false;
      this.refreshKey++;
      this.$emit('refreshCourse');
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
