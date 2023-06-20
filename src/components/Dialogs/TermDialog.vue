<template>
  <v-dialog
    persistent
    v-model="show"
    max-width="400"
  >
    <v-card
    class="term_card_wrapper"
    :class="{
      'term_card_wrapper_closing': closing
    }"
    >
      <div class="term_card_left_border"></div>
      <div class="term_card_top_border"></div>
      <div class="term_card_right_border"></div>
      <div class="term_card_bottom_border"></div>
      <div class="term_card_content">
        <h2 class="term_card_title">
          {{
            term.name
          }}
        </h2>
        
        <div class="term_card_separator"></div>

        <v-card-text class="term_card_description">
          {{
            term.description
          }}
        </v-card-text>
        <div class="term_card_actions px-7">
          <v-flex xs5 d-flex class="term_card_action_close">
            <main-button 
              text="סגירה"
              dark
              slim
              @submit="close()"
            />
          </v-flex>
        </div>
      </div>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="toggleTermDialog()"
        >
          Disagree
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="toggleTermDialog()"
        >
          Agree
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script>
import MainButton from '../Buttons/MainButton.vue';
export default {
  components: {
    MainButton,
  },

  props: {
    show: {
     type: Boolean,
    },

    term: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      closing: false
    }
  },

  watch: {
    show() {
      if(this.show) {
        this.closing = false;
      } 

      this.showDialog = this.show;
    }
  },

  methods: {
    onChange(value) {
      this.search = value;
    },

    close() {
      this.closing = true;
      setTimeout(() => {
        this.$emit('close');
      }, 500);
    }
  }

}
</script>

<style scoped lang="scss">

  .term_card_wrapper_closing {
    animation: closingTerm .45s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes closingTerm {
    0% {
      transform: rotateY(0deg);
      opacity: 1;
    }

    100% {
      transform: rotateY(90deg);
      opacity: 0;
    }
  }

  .term_card_wrapper {
    // background: linear-gradient(90deg, var(--subColor), var(--subColorWithOpacity), var(--subColor));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 2px 2px #000 inset;
    position: relative;
    overflow: hidden;
    color: #fff;
    transition: .45s transform ease-out;
    width: 100%;
    height: 75vh;
    max-height: 550px;
    border-radius: 0;

    .term_card_left_border {
      height: 105%;
      width: 2.5%;
      top: -2.5;
      left: 0;
      z-index: 2;
      position: absolute;
      background: linear-gradient(90deg, #614e28, #967a42, #bd9e61,#eccf95, #e7ba60, #796133);
      box-shadow: 0px -17px 2px 1px #000000a1 inset, 
                  0px 17px 2px 1px #000000b1 inset;
    }

    .term_card_top_border {
      height: 2%;
      width: 95%;
      top: 0;
      right: 2.5%;
      position: absolute;
      background: linear-gradient(#796133, #e7ba60, #eccf95, #bd9e61, #967a42, #614e28);
      box-shadow: 3px 0px 5px 1px #000a inset,
                  -3px 0px 5px 1px #000a inset;
    }

    .term_card_right_border {
      height: 100%;
      width: 2.5%;
      top: 0;
      right: 0;
      z-index: 2;
      position: absolute;
      background: linear-gradient(90deg, #796133, #c09b51, #eccf95, #bd9e61, #967a42, #614e28);
      box-shadow: 0px -2.5px 2px 1px #000000a1 inset, 
                  0px 2.5px 2px 1px #000000b1 inset;
    }

    .term_card_bottom_border {
      height: 2%;
      width: 95%;
      bottom: 0;
      right: 2.5%;
      position: absolute;
      background: linear-gradient(#614e28, #967a42, #bd9e61,#eccf95, #e7ba60, #796133);
      box-shadow: 3px 0px 5px 1px #000a inset,
                  -3px 0px 5px 1px #000a inset;
    }


    .term_card_content {
      position: absolute;
      height: 97.5%;
      width: 95%;
      background-color: var(--mainColor);
      box-shadow: 0px 0px 20px 5px #000 inset;
      padding: 8px;

      .term_card_title {
        font-size: 2.5em;
        text-shadow: 3px 3px #000c;
      }

      .term_card_description {
        font-size: 1.3em;
        text-shadow: 3px 3px #0008;
        max-height: 76%;
        overflow-y: auto;
        margin-top: 10px;
      }

      .term_card_separator {
        height: 2px;
        border-radius: 15px;
        box-shadow: 0 1px 2px 1px #0008;
        background-color: var(--subColor);
        margin-right: 5%;
        width: 10%;
      }

      .term_card_actions {
        position: absolute;
        bottom: 0;
        height: 10%;
        width: 100%;      

        .term_card_action_close {
          margin-right: auto;

          > button {
            box-shadow: 1px 1px 3px 1px #000c;
          }
        }
      }
    }

  }

  @media only screen and (max-width: 600px) {
    .term_card_wrapper {
      width: 100vw;
      height: 90vh;

      .trainer_content {
        padding: 25px;
        margin-top: 0;
      }
    }
  }
</style>