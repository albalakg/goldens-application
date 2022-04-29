<template>
  <div class="auth_padding_top">
    <v-flex md10 xl8 mx-auto v-if="lesson">
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
                      <strong class="white--text ml-3">
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
    </v-flex>
  </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue';
import Heart from '../../components/General/Heart.vue';
export default {
  components: { MainButton, Heart },

  computed: {
    lesson() {
      return ContentService.findLessonById(this.$route.params.lesson_id)
    },
    
    isCompleted() {
      return ContentService.isLessonCompleted(this.lesson.id);
    },

    isFavorite() {
      return ContentService.isLessonFavorite(this.lesson.id);
    },

    favoriteButtonText() {
      return this.isFavorite ? 'הורדה ממועדפים' : 'הוספה למועדפים'
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
    }
  }

}
</script>

<style scoped>

</style>