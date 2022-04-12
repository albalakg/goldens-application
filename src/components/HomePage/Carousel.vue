<template>
  <v-container>
    <CoachesTitle />

    <v-row v-if="width > 630">
      <v-card class="d-inline" v-for="(item, i) in cardData" :key="i">
        <v-img contain :src="item.img" class="white--text align-end">
          <v-card-title class="justify-center"> {{ item.title }} </v-card-title>
          <v-card-text class="text-center">
            {{ item.text }}
          </v-card-text>
        </v-img>
      </v-card>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-carousel hide-delimiters>
          <v-carousel-item v-for="(item, i) in cardData" :key="i">
            <v-card class="d-inline">
              <v-img contain :src="item.img" class="white--text align-end">
                <v-card-title class="justify-center">
                  {{ item.title }}
                </v-card-title>
                <v-card-text class="text-center">
                  {{ item.text }}
                </v-card-text>
              </v-img>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CoachesTitle from "../Titles/CoachesTitle.vue";
import image from "../../../public/assets/images/Coaches/image1.png";
import imag2 from "../../../public/assets/images/Coaches/image1.png";
export default {
  name: "Carousel",
  components: { CoachesTitle },

  data: () => ({
    width: 0,
    cardData: [
      {
        title: "Hola1",
        text: "Lorem ipsum dolor sit ",
        img: image,
      },
      {
        title: "Hola2",
        text: "Lorem ipsum dolor sit ",
        img: imag2,
      },
      {
        title: "Hola3",
        text: "Lorem ipsum dolor sit ",
        img: image,
      },
      {
        title: "Hola4",
        text: "Lorem ipsum dolor sit ",
        img: imag2,
      },
      {
        title: "Hola5",
        text: "Lorem ipsum dolor sit ",
        img: image,
      },
    ],
  }),
  methods: {
    onresize(e) {
      this.width = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("resize", this.onresize);
  },
  mounted() {
    this.width = window.innerWidth;
  },
};
</script>

<style scoped>
.row {
  padding: 0;
  padding-bottom: 60px;
  background-color: #1b2b4d;
}
.container {
  max-width: 2000px;
  margin: 0;
  padding: 10px 0;
}
.col {
  padding: 0;
  padding-bottom: 60px;
}
.v-card__text {
  color: #e6b260;
}
.v-image {
  max-width: 100%;
}
@media screen and (min-width: 630px) {
  .v-card {
    max-width: calc(100% / 5);
    transition: transform 0.2s;
  }
  .v-card :hover {
    transform: scale(1.2);
    z-index: 1;
  }
}

@media screen and (max-width: 850px) {
  .v-card__text {
    padding: 5px;
    font-size: 0.7rem;
  }
  .v-card__title {
    padding: 0;
    font-size: 1rem;
  }
}
@media screen and (max-width: 630px) {
  .v-card {
    max-height: 100%;
    margin: 0 auto;
    z-index: 1;
  }
  .v-item-group {
    max-width: 60vw;
    margin: 0 auto;
  }
  .v-card__text {
    font-size: 1rem;
  }
  .v-card__title {
    font-size: 1.5rem;
  }
}
</style>
