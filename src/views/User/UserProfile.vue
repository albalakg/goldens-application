<template>
    <div class="user_profile_wrapper px-4">
        
        <first-name-input
            ref="firstName"
            outlined
            title
            icon
            @onChange="setFirstName" 
        >
        </first-name-input>

        <last-name-input
            ref="lastName"
            outlined
            title
            icon
            @onChange="setLastName" 
        >
        </last-name-input>

    </div>
</template>

<script>
import FirstNameInput from '../../components/Form/Inputs/FirstNameInput.vue'
import LastNameInput from '../../components/Form/Inputs/LastNameInput.vue'
export default {
    components: { 
      FirstNameInput, 
      LastNameInput 
    },

    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
            }
        }
    },

    mounted() {
        this.setInitialData();
    },

    methods: {
        setInitialData() {
            this.$refs.firstName.setValue(this.$store.getters['UserState/firstName']);
            this.$refs.lastName.setValue(this.$store.getters['UserState/lastName']);
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
