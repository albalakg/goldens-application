<template>
    <div class="h100">
        <div class="home_header_top">
            <div class="phone_card phone_card_on_side mx-auto">
                <img src="../../../public/assets/images/phone/header.png" alt="שלב ראשון">
            </div>
            <div class="phone_card phone_card_front mx-auto">
                <img src="../../../public/assets/images/phone/step1.png" alt="שלב ראשון">
            </div>
        </div>
        <br>
        <br>
        <div class="second_layer relative">
            <h1 order-2 :class="{
                'text-center': $vuetify.breakpoint.smAndDown,
                'mobile-title': $vuetify.breakpoint.smAndDown
            }">
                תלמד מהטובים ביותר,
                <div class="title_separator"></div>
                <span>
                    תהיה הטוב ביותר
                </span>
            </h1>
            <strong class="grey_text_color">
                הצטרף לאקדמיה מקצועית לכדורגל <br> והתאמן בכל זמן ובכל מקום
                <br>
                ראה שיפורים מידיים עם גישה לאיכות הגבוהה ביותר של אימון וקהילה תומכת
            </strong>
        </div>
        <div class="px-5 second_layer relative">
            <buy-button fill @submit="scrollToBuySection()" />
        </div>
        <div class="darkner"></div>
    </div>
</template>
  
<script>
import BuyButton from "../../components/Buttons/BuyButton.vue";

export default {
    components: { BuyButton, },

    methods: {
        scrollToBuySection() {
            this.$emit('scrollToBuySection')
        }
    },

}
</script>
  
<style scoped lang="scss">
h1 {
    position: relative;
    color: #fff;
    font-size: 3em;
    z-index: 3;

    &.mobile-title {
        font-size: 1.7em;
    }

    span {
        position: relative;
        bottom: 20px;
    }
}

strong {
    position: relative;
    top: -20px;
    padding: 0 10px;
}

.title_separator {
    height: 10px;
}

.home_header_top {
    position: relative;
    width: 100vw;
    height: 30vh;
    margin-top: 70px;
}

.phone_card {
    box-shadow: 0 0 5px 4px var(--subColor);
    border: 2px solid var(--mainColor);
    border-radius: 20px;
    position: absolute;


    img {
        height: calc(100% + 3px);
        width: calc(100% + 2px);
        border-radius: 20px;
        position: absolute;
        top: -1px;
        right: -1px;
    }

    p {
        bottom: -35%;
        position: absolute;
    }
}

.phone_card_on_side {
    height: 28vh;
    width: 14vh;
    left: 25%;
    top: 7%;
    rotate: -15deg;
}

.phone_card_front {
    left: 10%;
    right: 0;
    top: 0%;
    height: 34vh;
    width: 17vh;
}

.darkner {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55vh;
    background: linear-gradient(#fff0, #000a);
    z-index: 1;
}
</style>