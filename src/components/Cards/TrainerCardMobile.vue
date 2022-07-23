
<template>
  <div class="trainer_card_wrapper" :class="{'rounded': rounded}">
    <img loading="lazy" :src="trainer.image" alt="trainer image" :class="{'rounded': rounded}">
    <div class="trainer_card_darkner" :class="{'rounded': rounded}"></div>
    <div class="trainer_details" :class="{'rounded': rounded}">
      <h3>
        {{
          trainer.name
        }}
      </h3>
      <v-flex class="trainer_description sub_border_right pr-2 mt-5">
        <p class="white_text_color">
          {{
            trainer.title
          }}
        </p>
        <small class="white_text_color">
                      םודנדא דרפנומ סרולוק תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול
  רילק ץפונומ קיטסאלב ופידוא .ףודומ ףילחמע .חשגרמו ישגרמ ,ףוקליס
        </small>
      </v-flex>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    trainer: {
      type: Object,
      required: true
    },

    rounded: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      
    };
  }

}
</script>

<style scoped lang="scss">

  .trainer_card_wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;

    .trainer_card_darkner {
      width: 100%;
      height: 100%;
      position: absolute;
      background: linear-gradient(transparent, #00000088);
    }

    .trainer_details {
      text-align: right;
      position: relative;
      height: 50%;
      width: 100%;
      padding: 20px;
      background: linear-gradient(#0000 10%, #000c);

      small {
        opacity: .7;
      }
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    h3, p {
      z-index: 2;
    }

    h3 {
      bottom: 30px;
      font-size: 2.5em;
      color: #fff;
    }

    p {
      bottom: 0;
      font-weight: bold;
    }
  }

</style>