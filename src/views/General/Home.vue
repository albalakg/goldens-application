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

        <div class="dark_bg_color pa-2">
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

        <ProfileCard
            :size="200"
            editable
        >
        </ProfileCard>

        <br><br>

        <DescriptionArea
            outlined
            icon
        >
        </DescriptionArea>

        <br><br>
    </v-flex>
    <v-flex xs7 mx-auto class="text-center">
        <SupportForm

        >
        </SupportForm>
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
import ProfileCard from '../../components/Cards/ProfileCard.vue'
import DescriptionArea from '../../components/Form/Inputs/DescriptionArea.vue'
import SupportForm from '../../components/Form/SupportForm.vue'

export default {
    components: {
        MainButton,
        BaseInput,
        FirstNameInput,
        LastNameInput,
        EmailInput,
        PasswordInput,
        PhoneInput,
        ProfileCard,
        DescriptionArea,
        SupportForm,
    },

    data() {
        return {

        }
    }   
}
</script>

<style scoped>
</style>