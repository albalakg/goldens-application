<template>
    <div 
        class="course_area_item main_bg_color pointer pa-5 white_text_color" 
        :class="{
            'active_course_area': courseArea.id === activeCourseId,
            'course_area_item_separated': separated
        }"
        @click="submit()" 
    >
        <!-- <img class="course_image" loading="lazy" :src="courseArea.imageSrc" alt="course area image"> -->
        <div class="course_area_darkner"></div>
        <div class="course_area_content">
            <strong>
                {{ courseArea.name }}
            </strong>
            <br>
            <div class="mt-3">
                <span class="course_area_subtitle">
                    {{ courseArea.description }}
                </span>
            </div>
        </div>

        <arrows-decorator class="arrows_decoration" />

        <img v-if="!guest" class="play_button" loading="lazy" :src="playButtonImage" alt="play button" />
        <div class="progress_wrapper" v-if="!guest">
            <progress-bar 
                dark
                verySlim
                :rounded="false"
                :progress="progress"
            />
        </div>
    </div>
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

        activeCourseId: {
            type: Number,
        },

        guest: {
            type: Boolean,
        },

        separated: {
            type: Boolean,
        },
        
    },

    data() {
        return {
            playButtonImage: require("../../../public/assets/images/general/play.svg"),
        }
    },

    computed: {
        progress() {
            return ContentService.getCourseAreaProgressById(this.courseArea.id);
        },
    },

    methods: {
        submit() {
            this.$emit('submit', this.courseArea);
        }
    }

}
</script>

<style lang="scss" scoped>
    .course_area_item {
        border-left: 2px solid var(--subColor);
        border-right: 2px solid var(--subColor);
        border-bottom: 1px solid var(--subColor);
        border-top: 1px solid var(--subColor);
        position: relative;
        display: flex;
        align-items: center;
        transition: .3s transform linear;
        border-radius: 18px;
        background-image: linear-gradient(324deg, transparent 0%, transparent 45%,rgba(186, 186, 186,0.04) 45%, rgba(186, 186, 186,0.04) 47%,transparent 47%, transparent 100%),linear-gradient(208deg, transparent 0%, transparent 40%,rgba(186, 186, 186,0.04) 40%, rgba(186, 186, 186,0.04) 80%,transparent 80%, transparent 100%),linear-gradient(202deg, transparent 0%, transparent 20%,rgba(186, 186, 186,0.04) 20%, rgba(186, 186, 186,0.04) 40%,transparent 40%, transparent 100%),linear-gradient(338deg, transparent 0%, transparent 10%,rgba(186, 186, 186,0.04) 10%, rgba(186, 186, 186,0.04) 72%,transparent 72%, transparent 100%),linear-gradient(90deg, rgb(28,63,100),rgb(28,63,100));

        &:hover {
            transform: scale(1.05);
        }

        strong {
            position: absolute;
            z-index: 2;
            font-size: 1.9em;
            letter-spacing: 0.3em;
            font-style: italic;
        }

        img.course_image {
            object-fit: cover;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
            opacity: .5;
            border-radius: 18px;
        }
        
        .course_area_darkner {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 2;
            background: linear-gradient(90deg, #0000, #0007 60%);
            border-radius: 18px;
        }

        .play_button {
            position: absolute;
            z-index: 2;
            transform: rotate(180deg);
            left: 15px;
        }

        .progress_wrapper {
            position: absolute;
            z-index: 2;
            width: 100%;
            bottom: 0;
            right: 0;
        }
    }

    .course_area_subtitle {
        letter-spacing: 2px;
        font-size: 1em;
    }

    .active_course_area {
        transform: scale(1.05);
        z-index: 3;
        box-shadow: 0 0 5px 1px #000;
    }

    .course_area_item_separated {
        border-bottom: 2px solid var(--subColor);
        border-top: 2px solid var(--subColor);
    }

    .arrows_decoration {
        height: 100%;
        position: absolute;
        z-index: 3;
        left: -30%;
    }
</style>