<template>
    <v-flex class="challenges_wrapper app_padding_top">

        <br><br>

        <section class="mx-3 mx-md-0">
            <v-flex xl8 lg9 md10 mx-auto text-center>
                <h1>
                    האתגר הזמני
                </h1>

                <br>

                <v-flex md8 mx-auto v-if="activeChallenge" class="text-right">
                    <h2>
                        {{ activeChallenge.name }}
                    </h2>
                    <VideoCard :src="challengeVideo" />
                    <v-flex d-flex flex-wrap>
                        <v-flex md6>
                            <h3>
                                תיאור האתגר
                            </h3>
                            <p v-html="activeChallenge.description">
                            </p>
                        </v-flex>
                        <v-flex md6>
                            <template v-if="trainingOptions">
                                <h3>
                                    מונחי האתגר
                                </h3>
                                <v-flex d-flex align-start flex-wrap class="mt-3 skills_content">
                                    <SkillChip class="mb-3 mx-1" v-for="(trainingOption, index) in trainingOptions"
                                        :key="index" :text="trainingOption.name" />
                                </v-flex>
                            </template>
                        </v-flex>
                    </v-flex>

                    <v-flex d-flex flex-wrap class="my-5 mx-md-0"
                        :class="{
                            'disabled': !canSubmitChallenge
                        }"
                    >
                        <v-flex md0 xl10>
                            <v-flex 
                            class="file_input_wrapper"
                            
                            >
                                <FileInput @onChange="setFile" :text="fileInputText" />
                            </v-flex>
                        </v-flex>
                        <v-flex md3 xl2 class="pr-md-7 mt-5 mt-md-0">
                            <div 
                            class="submit_challenge_button main_bg_color" 
                            :class="{
                                'disabled': isSubmitChallengeDisabled
                            }"
                            @click="submitChallenge()"
                            >
                                <span>
                                    {{ submitButtonText }}
                                </span>
                                <player-icon-decorator class="player_icon mr-3" />
                            </div>
                        </v-flex>
                        <v-flex>
                            <v-container
                                class="px-0"
                                fluid
                            >
                                <v-checkbox
                                    v-model="form.is_public"
                                    label="באישור זה נוכל להשתמש בתוכן הזה בשימוש מסחרי"
                                ></v-checkbox>
                            </v-container>
                        </v-flex>
                    </v-flex>

                </v-flex>
            </v-flex>
        </section>
    </v-flex>
</template>
  
<script>
import VideoCard from '../../components/Cards/VideoCard.vue';
import SkillChip from "../../components/Chips/SkillChip.vue";
import FileInput from '../../components/Form/Inputs/FileInput.vue';
import PlayerIconDecorator from '../../components/Decorators/playerIconDecorator.vue'

export default {
    components: {
        VideoCard,
        SkillChip,
        FileInput,
        PlayerIconDecorator,
    },

    data() {
        return {
            form: {
                video: null,
                is_public: true
            },
            loading: false
        };
    },

    created() {
        this.$store.dispatch('ChallengeState/getActiveChallenge');
        this.$store.dispatch('UserState/getChallenges');
    },

    computed: {
        activeChallenge() {
            return this.$store.getters['ChallengeState/activeChallenge'];
        },

        isFirstAttempt() {
            return !this.activeChallenge.progress;
        },

        challengeVideo() {
            return this.activeChallenge ? this.activeChallenge.video.videoSrc : null;
        },

        trainingOptions() {
            return this.activeChallenge ? this.activeChallenge.training_options : null;
        },

        isSubmitChallengeDisabled() {
            return !this.form.video || this.loading;
        },

        submitButtonText() {
            if(this.loading) {
                console.log('טוען');
                return 'טוען...';
            }
            console.log('לא טוען');
            return this.isFirstAttempt ? 'שגר תאתגר' : 'נסה שוב'
        },

        fileInputText() {
            return this.$vuetify.breakpoint.mdAndUp ? 'זרוק או לחץ בשביל לעלות את האתגר' : 'לחץ בשביל לעלות את האתגר'
        },

        canSubmitChallenge() {
            return ContentService.canSubmitChallenge(this.$store.getters['ChallengeState/activeChallenge'])
        }
    },

    methods: {
        async submitChallenge() {
            this.loading = true;
            await this.$store.dispatch('UserState/submitChallenge', {
                ...this.form,
                id: this.activeChallenge.id,
                is_public: this.form.is_public ? 1 : 0,
                video: this.form.video
            });
            this.loading = false;
            this.$forceUpdate();
        },

        setFile(file) {
            this.form.video = file;
        }
    },
}
</script>
  
<style scoped lang="scss">
.challenges_wrapper {

    h1 {
        font-size: 3em;
    }

    .file_input_wrapper {
        height: 100px;
    }

    .submit_challenge_button {
        border-radius: 8px;
        border: 2px dashed;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        color: #fff;
        padding: 0 1.2em;
        cursor: pointer;
        transition: .2s all linear;

        &:hover {
            transform: scale(1.1);
        }
    }

    .player_icon {
        height: 35px;
        width: 35px;
    }

}
</style>