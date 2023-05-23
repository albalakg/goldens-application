<template>
  <v-dialog
      v-model="showDialog"
      scrollable
      max-width="800px"
      transition="dialog-transition"
    >
      <div class="trainer_dialog_wrapper">
        <img loading="lazy" :src="trainer.imageSrc" alt="trainer" />

        <div class="trainer_darkner"></div>

        <v-flex d-flex class="trainer_content">
          <v-flex md6>
            <h2>
              {{ trainer.name }}
            </h2>
            <p class="mt-2">
              {{ trainer.title }}
            </p>

            <div class="divider my-md-4"></div>

            <p v-html="trainer.description">
            </p>
          </v-flex>
        </v-flex>
      </div>
    </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },

    minHeight: {
      type: Number,
    },

    maxWidth: {
      type: Number,
    },
    
    overlay: {
      type: Boolean,
    },
    
    persistent: {
      type: Boolean,
    },

    trainer: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      showDialog: false
    }
  },

  watch: {
    show() {
      this.showDialog = this.show;
    },

    showDialog() {
      if(!this.showDialog) {
        this.$emit('closed');
      }
    }
  },

  methods: {
    onChange(value) {
      this.search = value;
    },

    close() {
      this.$emit('close');
    }
  }

}
</script>

<style scoped lang="scss">

  .trainer_dialog_wrapper {
    position: relative;
    height: 50vh;
    width: 50vw;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
    }

    .trainer_darkner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 2;
      background: linear-gradient(90deg, #0000, var(--mainColorWithOpacity) 50%);
    }

    .trainer_content {
      margin-top: 20px;
      padding: 50px;
      position: relative;
      z-index: 2;
      color: #fff;

      .divider {
        height: 4px;
        width: 15%;
        position: relative;
        z-index: 3;
        background-color: #d5b26e;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .trainer_dialog_wrapper {
      width: 100vw;

      .trainer_content {
        padding: 25px;
        margin-top: 0;
      }
    }
  }
</style>