<template>
  <section class="lesson_content_wrapper mx-3">
    <v-flex d-flex flex-wrap justify-space-between class="mt-2 mt-md-10">
      <v-flex xs12 order-1 order-md-0 md6 class="pa-2" v-if="lesson.skills.length">
        <lesson-details-card
          class="lesson_section"
          title="יכולות"
          info="היכולות עליהן נעבוד במהלך השיעור"
          icon="mdi-gymnastics"
        >
          <template slot="content">
            <v-flex d-flex align-start flex-wrap class="mt-3 skills_content">
              <skill-chip
                class="mb-3 mx-1"
                v-for="(skill, index) in lesson.skills"
                :key="index"
                :text="skill.name"
              />
            </v-flex>
          </template>
        </lesson-details-card>
      </v-flex>

      <v-flex order-0 order-md-1 align-self-start md6 class="pa-2" v-if="lesson.training_options.length">
        <v-flex class="lesson_section lesson_time_boxes_wrapper pa-2" d-flex flex-wrap>
          <v-flex d-flex justify-center py-1 px-1 xs4 v-for="(item, index) in lesson.training_options" :key="index">
            <v-flex
              class="lesson_time_box text-center"
              d-flex
              align-center
              justify-center
            >
              <div>
                <strong> 
                  {{ item.value }} 
                </strong>
                <br />
                <span> 
                  {{ item.name }}  
                </span>
              </div>
            </v-flex>
          </v-flex>
        </v-flex>
      </v-flex>

      <v-flex xs12 order-2 order-md-3 md6 class="pa-2" v-if="lesson.terms.length">
        <lesson-details-card
          class="lesson_section"
          title="מונחים"
          info="המונחים החדשים שנלמד במהלך השיעור, לחץ על המונח למידע נוסף"
          icon="mdi-book-open-page-variant"
        >
          <template slot="content">
            <v-flex d-flex align-start flex-wrap class="mt-3 terms_content">
              <term-chip
                class="mb-3 mx-1"
                v-for="(term, index) in lesson.terms"
                :key="index"
                :text="term.name"
                @submit="openTerm(term)"
              />
              <term-dialog 
                :show="termDialog"
                :term="activeTerm"
                @close="toggleTermDialog()"
              />
            </v-flex>
          </template>
        </lesson-details-card>
      </v-flex>

      <v-flex xs12 order-3 order-md-4 md6 class="pa-2" v-if="lesson.equipment.length">
        <lesson-details-card
          class="lesson_section"
          title="ציוד"
          info="הציוד הנדרש להתאמן באימון זה"
          icon="mdi-traffic-cone"
        >
          <template slot="content">
            <v-flex d-flex align-start flex-wrap class="mt-3 equipment_content">
              <equipment-chip
                class="mb-4 mx-1"
                v-for="(equipment, index) in lesson.equipment"
                :key="index"
                :text="equipment.name"
                icon="mdi-soccer"
              />
            </v-flex>
          </template>
        </lesson-details-card>
      </v-flex>
    </v-flex>

    <br />

    <v-flex d-flex flex-wrap class="mt-2 mt-md-5">
      <v-flex md7>
        <div class="px-5 px-md-0">
          <h2>
            <span class="main_text_color"> מה </span>
            <span class="dark_text_color"> נלמד </span>
          </h2>
          <p v-html="lesson.content"></p>
        </div>
      </v-flex>
      <v-flex align-self-start md5 class="mt-5 mt-md-0 pr-md-5">
        <simple-trainer-card :trainer="trainer" />
      </v-flex>
    </v-flex>
  </section>
</template>

<script>
import LessonDetailsCard from "../Cards/LessonDetailsCard.vue";
import SimpleTrainerCard from "../Cards/SimpleTrainerCard.vue";
import EquipmentChip from "../Chips/EquipmentChip.vue";
import SkillChip from "../Chips/SkillChip.vue";
import TermChip from "../Chips/TermChip.vue";
import TermDialog from '../Dialogs/TermDialog.vue';
export default {
  components: {
    SimpleTrainerCard,
    LessonDetailsCard,
    EquipmentChip,
    TermChip,
    SkillChip,
    TermDialog,
  },

  props: {
    lesson: {
      type: Object,
      required: true,
    },
    trainer: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      termDialog: false,
      activeTerm: {}
    }
  },

  methods: {
    openTerm(term) {
      this.activeTerm = term;
      this.toggleTermDialog();
    },

    toggleTermDialog() {
      this.termDialog = !this.termDialog;
    }
  }
};
</script>

<style scoped lang="scss">
.skills_content {
  overflow-y: auto;
  max-height: 98px;
}

.terms_content,
.equipment_content {
  overflow-y: auto;
  max-height: 85px;
}

.lesson_time_boxes_wrapper {
  overflow-y: auto;
}

.lesson_section {
  background-color: #eee8;
  height: 160px;
  padding: 10px;
  box-shadow: 0 2px 3px 1px #8883;

  .lesson_time_box {
    background-color: var(--subColor);
    color: #fff;
    border-radius: 4px;

    strong {
      font-size: 1.3em;
    }

    span {
      letter-spacing: 4px;
      font-size: 1.1em;
    }
  }
}
</style>
