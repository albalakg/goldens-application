<template>
<v-container class="ma-10">
    <v-flex xs10 xl7 mx-auto>
        
        <MainTabs
            :tabs="mainTabs"
            :activeTab="activeTab"
            @submit="setActiveTab"
        >
        </MainTabs>
        <br><br>
        
        <OrderCourseCard
            :course="orderedCourse"
        >
        </OrderCourseCard>
        <br><br>

    </v-flex>
    <v-flex xs5 xl3 class="px-5" mx-auto>

        <v-flex xs6>

            
            <DataCard
                title="100 שעות"
                subtitle="אורך הקורס"
            >
            </DataCard>

            <br><br>
            
        </v-flex>
        <ClientReviewCard
            name="שחר פאר"
            course="לומדת כדורגל"
            review="סתם משהו שאני לא יודעת בכלל אם אני אוהבת, אבל אם משהו רוצה לעשות משהו מעניין מתישהו שיפנה אלי ואענה לו בחזרה בההתאם."
        >
        </ClientReviewCard>

        <br><br>

        <SectionHeader
            title="דן"
            backgroundTitle="וגל"
            subtitle="אתה שואל לגבי זה עכשיו"
        >
        </SectionHeader>
    </v-flex>
    <v-flex xs4>
        <!-- <MainButton
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

        <br><br> -->


        <ExpandedTabs
            :tabs="questions"
        >
        </ExpandedTabs>

        <br><br>

        <SectionHeader
            title="חברות שותפות"
            backgroundTitle="שותפות"
            subtitle="אתה שואל לגבי זה עכשיו"
        >
        </SectionHeader>

        <br><br>

        <ContentImageCard
            :image="contentImageCard.image"
            :name="contentImageCard.name"
            :subtitle="contentImageCard.subtitle"
        >
        </ContentImageCard>

        <br><br>

        <LastNameInput
            dark
            title
        >
        </LastNameInput>

        <br><br>

        <SubmitedInput
            dark
            buttonText="הפעלה"
            placeholder="קוד קופון"
        >
        </SubmitedInput>

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

        <v-flex xs11 xl8 mx-auto>
            <OrderSummeryCard :records="records">
            </OrderSummeryCard>
        </v-flex>

        <br><br>

        <UnfavoriteChip>
        </UnfavoriteChip>

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
    <v-flex xs7 xl5 mx-auto class="text-center">
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
import UnfavoriteChip from '../../components/Chips/UnfavoriteChip.vue'
import ProfileCard from '../../components/Cards/ProfileCard.vue'
import DescriptionArea from '../../components/Form/Inputs/DescriptionArea.vue'
import SupportForm from '../../components/Form/SupportForm.vue'
import OrderSummeryCard from '../../components/Cards/OrderSummeryCard.vue'
import SubmitedInput from '../../components/Form/Inputs/SubmitedInput.vue'
import ContentImageCard from '../../components/Cards/ContentImageCard.vue'
import SectionHeader from '../../components/Texts/SectionHeader.vue'
import ClientReviewCard from '../../components/Cards/ClientReviewCard.vue'
import ExpandedTabs from '../../components/Tabs/ExpandedTabs.vue'
import DataCard from '../../components/Cards/DataCard.vue'
import OrderCourseCard from '../../components/Cards/OrderCourseCard.vue'
import MainTabs from '../../components/Tabs/MainTabs.vue'

export default {
    components: {
        MainButton,
        BaseInput,
        FirstNameInput,
        LastNameInput,
        EmailInput,
        PasswordInput,
        PhoneInput,
        UnfavoriteChip,
        ProfileCard,
        DescriptionArea,
        SupportForm,
        OrderSummeryCard,
        SubmitedInput,
        ContentImageCard,
        SectionHeader,
        ClientReviewCard,
        ExpandedTabs,
        DataCard,
        OrderCourseCard,
        MainTabs,
    },

    data() {
        return {
            records: [
                {
                    text: 'קורס בסיסי',
                    price: '₪100',
                    outlined: true
                },
                {
                    text: 'קוד קופון',
                    price: '-',
                },
                {
                    text: 'מע"מ',
                    price: '₪117',
                    background: true,
                    bold: true,
                },
                {
                    text: 'סה"כ',
                    price: '₪117',
                    large: true
                },
            ],
            contentImageCard: {
                image: FILES_PATH + 'content_image.jfif',
                name: 'קורס בסיסי',
                subtitle: 'סתם משהו שלא באמת קשור לקורס'
            },
            questions: [
                {
                    title:  'סתם שאלה מספר 1',
                    content: 'סתם טקסט חופשי שאין לו קשר לשום דבר למוצר כדי למלא סתם תוכן ריק'
                },
                {
                    title:  'סתם שאלה מספר 2',
                    content: 'סתם טקסט חופשי שאין לו קשר לשום דבר למוצר כדי למלא סתם תוכן ריק'
                },
                {
                    title:  'סתם שאלה מספר 3',
                    content: 'סתם טקסט חופשי שאין לו קשר לשום דבר למוצר כדי למלא סתם תוכן ריק'
                },
                {
                    title:  'סתם שאלה מספר 4',
                    content: 'סתם טקסט חופשי שאין לו קשר לשום דבר למוצר כדי למלא סתם תוכן ריק'
                },
            ],
            orderedCourse: {
                title: 'קורס מתחילים',
                description: "לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף מודוף. אודיפו בלאסטיק מונופץ קליר תילא גניסיפידא ררוטקסנוק ,טמא טיס רולוד םוספיא םרול ףילחמע .חשגרמו ישגרמ ,ףוקליס םודנדא דרפנומ סרולוק רילק ץפונומ קיטסאלב ופידוא .ףודומ",
                price: '100',
                expiration: 'תקף לשנה',
                trailer: FILES_PATH + 'UwncLuZnK0VA8OhniaLVdjTYthBknz5UoiuPqqtw.mp4',
            },
            mainTabs: [
                {
                    title: 'פרטים אישיים',
                    url: '/user'
                },
                {
                    title: 'אימונים קודמים',
                    url: '/user/history'
                },
                {
                    title: 'מועדפים',
                    url: '/user/favorites'
                },
                {
                    title: 'הזמנות',
                    url: '/user/orders'
                },
                {
                    title: 'פניות ותמיכה',
                    url: '/user/support'
                },
            ],
            activeTab: 0,
        }
    },

    methods: {
        setActiveTab(index) {
            this.activeTab = index;
        }
    }
}
</script>

<style scoped>
</style>