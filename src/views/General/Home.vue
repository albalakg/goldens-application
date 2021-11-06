<template>
<v-container class="ma-10">
    <v-flex xs4>
        <MainButton
            shadow
            text="כפתור רגיל"
        >
        </MainButton>

        <br><br>

        <MainButton
            shadow
            dark
            text="כפתור כהה"
        >
        </MainButton>

        <br><br>

        <div class="darkBgColor pa-2">
            <BaseInput
                placeholder="אימייל"
            >
            </BaseInput>
        </div>

        <br><br>

        <BaseInput
            placeholder="אימייל"
            dark
        >
        </BaseInput>

        <br><br>

        <BaseInput
            placeholder="סיסמא"
            outlined
        >
        </BaseInput>

        <br><br>

        <BaseInput
            placeholder="שם מלא"
            icon="mdi-view-dashboard"
            title="שם מלא"
            outlined
        >
        </BaseInput>
    </v-flex>
</v-container>
</template>

<script>
import MainButton from './../../components/Buttons/MainButton.vue'
import BaseInput from './../../components/Form/BaseInput.vue'

export default {
    components: {
        BaseInput,
        MainButton,
    },

    data() {
        return {

        }
    }   
}
</script>

<style scoped>
</style>