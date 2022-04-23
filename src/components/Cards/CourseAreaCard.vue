<template>
    <v-flex class="course_area_card_wrapper pointer" @click="submit()">
        <img :src="courseArea.imageSrc" alt="course area image">
        <div class="course_area_darkner"></div>
        <v-flex xs8 class="course_area_detail h100" d-flex flex-column justify-space-between>
            <div>
                <h3 class="white_text_color">
                    {{ courseArea.name }}
                </h3>
                <p class="white_text_color">
                    {{ description }}
                </p>
            </div>
            <div v-flex align-end class="h100">
                8 ahgurho
            </div>
        </v-flex>
    </v-flex>
</template>

<script>
export default {
    props: {
        courseArea: {
            type: Object,
            required: true
        }
    },

    computed: {
        description() {
            const dots = this.courseArea.description.length > 70 ? '...' : '';
            return this.courseArea.description.substring(0, 70) + dots;
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

    .course_area_card_wrapper {
        width: 100%;
        height: 100%;
        min-height: 175px;
        border-radius: 8px;
        position: relative;
        transition: .2s transform linear;

        &:hover {
            transform: scale(1.05);
        }

        img {
            object-fit: cover;
            border-radius: 8px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 1;
        }

        .course_area_darkner {
            border-radius: 8px;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 2;
            background: linear-gradient(90deg, #0000, #000a);
        }

        .course_area_detail {
            position: relative;
            z-index: 3;
            padding: 10px 20px;

            h3 {
                font-size: 1.4em;
            }
        }
    }

</style>