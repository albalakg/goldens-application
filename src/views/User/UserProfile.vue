<template>
    <div class="user_profile_wrapper">
        
        <v-form @submit="submit">
            <v-flex d-flex>
                <v-flex ml-2>
                    <first-name-input
                        ref="firstName"
                        outlined
                        title
                        icon
                        @onChange="setFirstName"
                    >
                    </first-name-input>
                </v-flex>

                <v-flex mr-2>
                    <last-name-input
                        ref="lastName"
                        outlined
                        title
                        icon
                        @onChange="setLastName" 
                    >
                    </last-name-input>
                </v-flex>
            </v-flex>

            <br>

            <v-flex d-flex>
                <v-flex ml-2>
                    <phone-input
                        ref="phone"
                        outlined
                        title
                        icon
                        optional
                        @onChange="setPhone" 
                    >
                    </phone-input>
                </v-flex>
                <v-flex mr-2>
                    <gender-select 
                        ref="gender"
                        title
                        @onChange="setGender" 
                    />
                </v-flex>
            </v-flex>

            <v-flex d-flex justify-end class="mt-5">
                <v-flex xs2>
                    <main-button 
                        :text="'שלח'"
                        shadow
                    />
                </v-flex>
            </v-flex>
        </v-form>

    </div>
</template>

<script>
import MainButton from '../../components/Buttons/MainButton.vue'
import FirstNameInput from '../../components/Form/Inputs/FirstNameInput.vue'
import GenderSelect from '../../components/Form/Inputs/GenderSelect.vue'
import LastNameInput from '../../components/Form/Inputs/LastNameInput.vue'
import PhoneInput from '../../components/Form/Inputs/PhoneInput.vue'
export default {
    components: { 
        FirstNameInput, 
        LastNameInput,
        PhoneInput,
        GenderSelect,
        MainButton,
    },

    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                phone: '',
                gender: '',
            },
            editMode: false,
        }
    },

    mounted() {
        this.setInitialData();
    },

    methods: {
        setInitialData() {
            this.$refs.firstName.setValue(this.$store.getters['UserState/firstName']);
            this.$refs.lastName.setValue(this.$store.getters['UserState/lastName']);
            
            if(this.$store.getters['UserState/gender']) {
                this.$refs.phone.setValue(this.$store.getters['UserState/phone']);
            }

            if(this.$store.getters['UserState/gender']) {
                this.$refs.gender.setValue(this.$store.getters['UserState/gender']);
            }
        },

        setFirstName(value) {
            this.form.first_name = value;
        },

        setLastName(value) {
            this.form.last_name = value;
        },

        setGender(value) {
            this.form.gender = value;
        },

        setPhone(value) {
            this.form.phone = value;
        },

        submit() {
            if(!this.validate()) {
                return;
            }

            this.loading = true;
            axios.post('profile/update', this.form)
                .then(res => {
                    
                    this.$store.dispatch('MessageState/addMessage', {message: 'פרטי המשתמש עודכנו בהצלחה'});
                    Auth.login(res.data.data);
                    this.$store.dispatch('AuthState/setLogStatus', true);
                    
                }).catch(err => {
                    this.$store.dispatch('MessageState/addErrorMessage', { message: 'מצטערים אך לא הצלחנו לעדכן את פרטי המשתמש' })
                }).finally(() => {
                    this.loading = false;
                })

        },
        
        validate() {
            const isFirstNameValid      = this.$refs.firstName.validate();
            const isLastNameValid       = this.$refs.lastName.validate();
            const isPhoneNameValid      = this.$refs.phone.validate();
            const isGenderValid         = this.$refs.gender.validate();

            return isFirstNameValid && isGenderValid && isLastNameValid && isPhoneNameValid;
        },

    }
}
</script>

<style scoped>
</style>
