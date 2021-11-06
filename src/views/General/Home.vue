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

        <FirstNameInput
            outlined
            icon
        >
        </FirstNameInput>

        <br><br>

        <LastNameInput
            dark
            title
            icon
        >
        </LastNameInput>

        <br><br>
       
        <PasswordInput
            outlined
        >
        </PasswordInput>

        <br><br>
       
        <PhoneInput
            outlined
            icon
        >
        </PhoneInput>

        <br><br>

        <DescriptionArea
            outlined
            icon
        >
        </DescriptionArea>
    </v-flex>
</v-container>
</template>

<script>
import MainButton from './../../components/Buttons/MainButton.vue'
import BaseInput from '../../components/Form/Inputs/BaseInput.vue'
import FirstNameInput from '../../components/Form/Inputs/FirstNameInput.vue'
import LastNameInput from '../../components/Form/Inputs/LastNameInput.vue'
import EmailInput from '../../components/Form/Inputs/EmailInput.vue'
import PasswordInput from '../../components/Form/Inputs/PasswordInput.vue'
import PhoneInput from '../../components/Form/Inputs/PhoneInput.vue'
import DescriptionArea from '../../components/Form/Inputs/DescriptionArea.vue'

export default {
    components: {
        MainButton,
        BaseInput,
        FirstNameInput,
        LastNameInput,
        EmailInput,
        PasswordInput,
        PhoneInput,
        DescriptionArea,
    },

    data() {
        return {

        }
    }   
}
</script>

<style scoped>
</style>