<template>
<div class="support_form_wrapper">
    <v-form @submit.prevent="submit()" ref="form">
        
        <div class="mb-6">
            <h2>
                <span>צרו</span> <span class="main_text_color">קשר</span>
            </h2>
            <p>
                מוזמנים לפנות אלינו בכל זמן לכל דבר 
            </p>
        </div>

        <div>
            <DescriptionArea 
                dark
                :placeholder="false"
                ref="description"
                @onChange="setDescription"
            />
            <v-flex d-flex class="mt-8">
                <v-flex xs6 class="ml-4">
                    <EmailInput 
                        dark 
                        ref="email"
                        @onChange="setEmail" 
                    />
                </v-flex>
                <v-flex d-flex xs6 class="mr-4">
                    <v-flex xs6>
                        <FullNameInput 
                            dark
                            ref="name"
                            @onChange="setName" 
                        />
                    </v-flex>
                    <v-flex xs6 d-flex justify-end>
                        <SendButton @submit="submit()" />
                    </v-flex>
                </v-flex>
            </v-flex>
        </div>

    </v-form>
</div>
</template>

<script>
import DescriptionArea  from './Inputs/DescriptionArea.vue';
import EmailInput       from './Inputs/EmailInput.vue';
import FullNameInput    from './Inputs/FullNameInput.vue';
import SendButton       from './../Buttons/SendButton.vue';

export default {
    components: {
        DescriptionArea,
        EmailInput,
        FullNameInput,
        SendButton,
    },

    data() {
        return {
            form: {
                email:          '',
                name:           '',
                description:    '',
            },
        }   
    },

    computed: {
        isValid() {
            return (
                this.$refs.email.isValid &&
                this.$refs.description.isValid &&
                this.$refs.name.isValid
            );
        }
    },

    methods: {
        submit() {
            if(!this.validate()) {
                console.log('not valid');
                return
            }

            alert('is valid');
        },

        validate() {
            let isEmailValid        = this.$refs.email.validate();
            let isNameValid         = this.$refs.name.validate();
            let isDescriptionValid  = this.$refs.description.validate();

        console.log(isEmailValid,
            isNameValid,
            isDescriptionValid);

            return isEmailValid && isNameValid && isDescriptionValid;
        },

        setEmail(email) {
            this.form.email = email;
        },

        setName(name) {
            this.form.name = name;
        },

        setDescription(description) {
            this.form.description = description;
        },
    }
}
</script>

<style scoped lang="scss">

    .support_form_wrapper {

        h2 {
            font-size: 2em;
            margin-bottom: 12px;
        }

        p {
            color: rgb(126, 129, 134);
            font-weight: 100;
            font-size: 1em;
            letter-spacing: 1.5px;
        }
    }
    
</style>