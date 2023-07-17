<template>
    <v-flex 
        v-if="courseArea" 
        class="course_area_card_wrapper" 
        :class="{'pointer': !guest, 'rounded_course_area_card': rounded}" 
        @click="submit()"
        :style="`background-image: url('${courseArea.imageSrc}')`"
    >
        <!-- <img loading="lazy" :src="courseArea.imageSrc" alt="course area image"> -->
        <div class="course_area_darkner"></div>
        <arrows-decorator class="arrows_decoration" />
        <v-flex class="course_area_detail h100" d-flex flex-column justify-space-between>
            <v-flex>
                <h3 class="white_text_color">
                    {{ courseArea.name }}
                </h3>
                <p class="white_text_color">
                    {{ description }}
                </p>
            </v-flex>
            <v-flex d-flex align-end class="h100">
                <div class="w100">
                    <v-flex d-flex class="mb-2">
                        <strong class="white_text_color">
                            {{ totalLessons }} שיעורים
                        </strong>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <strong class="white_text_color">
                            {{ totalDuration }}    
                        </strong>
                    </v-flex>
                    <progress-bar
                        v-if="showProgress"
                        dark
                        slim
                        :progress="progress"
                    />
                </div>
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import ProgressBar from '../General/ProgressBar.vue';
import ArrowsDecorator from '../../components/Decorators/ArrowsDecorator.vue'

export default {
  components: {
    ProgressBar,
    ArrowsDecorator,
 },

    props: {
        courseArea: {
            type: Object,
            required: true
        },

        guest: {
            type: Boolean,
        },

        rounded: {
            type: Boolean,
            default: true
        },
    },

    computed: {
        description() {
            return this.courseArea.description;
        },

        totalLessons() {
            try {
                return this.courseArea.active_lessons.length;
            } catch(err) {
                error(err);
                return 0
            }
        },

        totalDuration() {
            const seconds = ContentService.countTotalCourseAreaDuration(this.courseArea.id);
            return ContentService.getTimeTextBySeconds(seconds);
        },

        isLogged() {
            return this.$store.getters['AuthState/isLogged'];
        },

        progress() {
            return ContentService.getCourseAreaProgressById(this.courseArea.id);
        },

        showProgress() {
            return this.isLogged && !this.guest;
        }
    },

    methods: {
        submit() {
            this.$emit('submit', this.courseArea);
        }
    }
}
</script>

<style scoped lang="scss">

    .rounded_course_area_card {
        border-radius: 6px;

        img {
            border-radius: 6px;
        }

        .course_area_darkner {
            border-radius: 6px;
        }
    }

    .course_area_card_wrapper {
        width: 100%;
        height: 180px;
        position: relative;
        transition: .2s box-shadow linear;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        // background-image: linear-gradient(324deg, transparent 0%, transparent 45%,rgba(186, 186, 186,0.04) 45%, rgba(186, 186, 186,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(208deg, transparent 0%, transparent 40%,rgba(186, 186, 186,0.04) 40%, rgba(186, 186, 186,0.04) 80%,transparent 80%, transparent 100%),linear-gradient(202deg, transparent 0%, transparent 20%,rgba(186, 186, 186,0.04) 20%, rgba(186, 186, 186,0.04) 40%,transparent 40%, transparent 100%),linear-gradient(338deg, transparent 0%, transparent 10%,rgba(186, 186, 186,0.04) 10%, rgba(186, 186, 186,0.04) 72%,transparent 72%, transparent 100%),linear-gradient(90deg, rgb(28,63,100),rgb(28,63,100));

        &:hover {
            box-shadow: 0 0 10px 1px #0005;
        }

        img {
            object-fit: cover;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
        }

        .course_area_darkner {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 2;
            background: linear-gradient(90deg, #0000, #000a 60%);
        }

        .course_area_detail {
            position: relative;
            z-index: 3;
            padding: 10px 20px;

            h3 {
                font-size: 1.4em;
            }
            
            p {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .arrows_decoration {
            height: 100%;
            position: absolute;
            z-index: 3;
            right: -30%;
            object-fit: contain;
        }
    }

</style>