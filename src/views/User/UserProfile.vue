<template>
    <div class="user_profile_wrapper px-4">
        
        <first-name-input
            ref="firstName"
            outlined
            title
            icon
            :readonly="!editMode"
            @onChange="setFirstName"
        >
        </first-name-input>

        <br>

        <last-name-input
            ref="lastName"
            outlined
            title
            icon
            :readonly="!editMode"
            @onChange="setLastName" 
        >
        </last-name-input>

        <br>

        <phone-input
            ref="phone"
            outlined
            title
            icon
            :readonly="!editMode"
            @onChange="setLastName" 
        >
        </phone-input>

    </div>
</template>

<script>
import FirstNameInput from '../../components/Form/Inputs/FirstNameInput.vue'
import LastNameInput from '../../components/Form/Inputs/LastNameInput.vue'
import PhoneInput from '../../components/Form/Inputs/PhoneInput.vue'
export default {
    components: { 
        FirstNameInput, 
        LastNameInput,
        PhoneInput,
    },

    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
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
            this.$refs.phone.setValue(this.$store.getters['UserState/phone']);
        },

        setFirstName(value) {
            this.form.firstName = value;
        },

        setLastName(value) {
            this.form.lastName = value;
        },

    }
}
</script>

<style scoped>
</style>
