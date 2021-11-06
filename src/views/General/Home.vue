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
                placeholder="אינפוט לרקע כהה"
            >
            </BaseInput>
        </div>

        <br><br>

        <EmailInput
            outlined
            title
            icon
        >
        </EmailInput>

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
import BaseInput from '../../components/Form/Inputs/BaseInput.vue'
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'

export default {
    components: {
        BaseInput,
        EmailInput,
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