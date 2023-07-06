<template>
    <v-form @submit.prevent="submit()">
        <v-flex d-flex flex-wrap>
            <v-flex ml-md-2>
                <first-name-input
                    autofocus
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
                    @onChange="setPhone" 
                />
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

        <v-flex d-flex flex-wrap mt-5>
            <v-flex ml-md-2>
                <birthdate-input 
                    ref="birthdate"
                    outlined
                    title
                    optional
                    icon
                    @onChange="setBirthdate"
                />
            </v-flex>
            <v-flex mr-md-2 mt-5 mt-md-0>
                <city-input 
                    ref="city"
                    optional
                    title
                    icon
                    outlined
                    :loading="loading"
                    @onChange="setCity" 
                />
            </v-flex>
        </v-flex>

        <v-flex d-flex flex-wrap mt-5>
            <v-flex md6 ml-md-2>
                <team-input 
                    ref="team"
                    title
                    icon
                    outlined
                    optional
                    :loading="loading"
                    @onChange="setTeam" 
                />
            </v-flex>
        </v-flex>

        <v-flex d-flex flex-wrap mt-5>
            <v-flex md6 ml-md-2>
                <v-checkbox v-model="form.is_subscribed" color="#d5b26e">
                <template v-slot:label>
                    <small>
                        אשמח לקבל עדכונים ומבצעים שווים באקדמיה
                    </small>
                </template>
                </v-checkbox>
            </v-flex>
            <v-flex xs12 lg3 md4 mr-auto d-flex align-center>
                <main-button 
                    :text="'עדכן פרטים'"
                    shadow
                    :disabled="!formHasChanged"
                    :loading="loading"
                />
            </v-flex>
        </v-flex>
    </v-form>
</template>

<script>
import { nextTick } from 'process'
import MainButton from '../../components/Buttons/MainButton.vue'
import FirstNameInput from '../../components/Form/Inputs/FirstNameInput.vue'
import GenderSelect from '../../components/Form/Inputs/GenderSelect.vue'
import LastNameInput from '../../components/Form/Inputs/LastNameInput.vue'
import PhoneInput from '../../components/Form/Inputs/PhoneInput.vue'
import BirthdateInput from './Inputs/BirthdateInput.vue'
import CityInput from './Inputs/CityInput.vue'
import TeamInput from './Inputs/TeamInput.vue'
export default {
    components: {
    FirstNameInput,
    LastNameInput,
    PhoneInput,
    GenderSelect,
    MainButton,
    CityInput,
    TeamInput,
    BirthdateInput
},

    data() {
        return {
            form: {
                first_name:     '',
                last_name:      '',
                phone:          '',
                gender:         '',
                team:           '',
                city:           '',
                birth_date:     '',
                is_subscribed:  false,
            },
            initForm: '',
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
        },

        formHasChanged() {
            return this.initForm !== JSON.stringify(this.form)
        }
    },

    methods: {
        setInitialData() {
            const profile = this.$store.getters['UserState/profile'];

            this.$refs.firstName.setValue(profile.first_name);
            this.$refs.lastName.setValue(profile.last_name);

            if(profile.phone) {
                this.$refs.phone.setValue(profile.phone);
            }

            if(profile.gender) {
                this.$refs.gender.setValue(profile.gender);
            }

            if(profile.team) {
                this.$refs.team.setValue(profile.team);
            }

            if(profile.city) {
                this.$refs.city.setValue(profile.city);
            }

            if(profile.birth_date) {
                this.$refs.birthdate.setValue(profile.birth_date);
            }

            this.form.is_subscribed = Boolean(profile.isSubscribed);

            this.$refs.firstName.$el.focus();
            this.loading = false;

            nextTick(() => {
                this.initForm = JSON.stringify(this.form);
            })
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

        setTeam(value) {
            this.form.team = value;
        },

        setCity(value) {
            this.form.city = value;
        },

        setPhone(value) {
            this.form.phone = value;
        },

        setBirthdate(birthdate) {
            this.form.birth_date = birthdate;
        },

        async submit() {
            if(this.loading || !this.validate()) {
                return;
            }

            this.loading = true;
            await this.$store.dispatch('UserState/updateProfile', this.form)
            this.loading = false;
        },
        
        validate() {
            let isValid     = true;
            const fields    = [
                'firstName', 'lastName', 'phone', 'team', 'city', 'gender', 'birthdate',
            ];

            fields.forEach(field => {
                const isFieldValid = this.$refs[field].validate();
                if(!isFieldValid) {
                    isValid = false;
                }
            })
            
            return isValid;
        },
    }
}
</script>

<style scoped>
</style>
