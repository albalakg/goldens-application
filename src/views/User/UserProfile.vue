<template>
    <div class="user_profile_wrapper">
        
        <v-form @submit="submit" class="px-5 px-md-0">
            <v-flex d-flex flex-wrap>
                <v-flex ml-md-2>
                    <first-name-input
                        ref="firstName"
                        :loading="loading"
                        outlined
                        title
                        icon
                        @onChange="setFirstName"
                    >
                    </first-name-input>
                </v-flex>

                <v-flex mr-md-2 mt-5 mt-md-0>
                    <last-name-input
                        ref="lastName"
                        :loading="loading"
                        outlined
                        title
                        icon
                        @onChange="setLastName" 
                    >
                    </last-name-input>
                </v-flex>
            </v-flex>

            <v-flex d-flex flex-wrap mt-5>
                <v-flex ml-md-2>
                    <phone-input
                        ref="phone"
                        :loading="loading"
                        outlined
                        title
                        icon
                        optional
                        @onChange="setPhone" 
                    >
                    </phone-input>
                </v-flex>
                <v-flex mr-md-2 mt-5 mt-md-0>
                    <gender-select 
                        ref="gender"
                        title
                        :loading="loading"
                        @onChange="setGender" 
                    />
                </v-flex>
            </v-flex>

            <v-flex d-flex justify-end mt-10 mt-md-5>
                <v-flex xs12 md4 lg2>
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
            loading: true,
        }
    },

    watch: {
        firstName() {
            this.setInitialData();
        }
    },

    mounted() {
        if(this.firstName) {
            this.setInitialData();
        }
    },

    computed: {
        firstName() {
            return this.$store.getters['UserState/firstName']
        }
    },

    methods: {
        setInitialData() {
            this.$refs.firstName.setValue(this.$store.getters['UserState/firstName']);
            this.$refs.lastName.setValue(this.$store.getters['UserState/lastName']);
            if(this.$store.getters['UserState/phone']) {
                this.$refs.phone.setValue(this.$store.getters['UserState/phone']);
            }

            if(this.$store.getters['UserState/gender']) {
                this.$refs.gender.setValue(this.$store.getters['UserState/gender']);
            }

            this.loading = false;
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

        async submit() {
            if(!this.validate()) {
                return;
            }

            this.loading = true;
            await this.$store.dispatch('UserState/updateProfile', this.form)
            this.loading = false;
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
