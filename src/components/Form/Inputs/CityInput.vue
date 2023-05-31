<template>
    <div class="city_input_wrapper">
        <BaseAutocompleteInput 
            title
            ref="input"
            :outlined="outlined"
            :items="cities"
            :text="text"
            :placeholder="placeholder"
            :dark="dark"
            :icon="iconSrc"
            :emptyResultMessage="emptyResultMessage"
            :resize="resize"
            @onChange="onChange"
        />
    </div>
</template>

<script>
import BaseAutocompleteInput from './BaseAutocompleteInput.vue';
import citiesJson from '../../../helpers/cities.json'; 

export default {
    components: {
        BaseAutocompleteInput,
    },

    props: {
        outlined: {
            type: Boolean
        },
        
        resize: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },
        
        title: {
            type: Boolean,
        },
    },

    computed: {
        cities() {
            return citiesJson.cities;
        }
    },

    data() {
        return {
            text: 'עיר',
            placeholder: 'חפש עיר',
            iconSrc:    'mdi-city-variant-outline',
            emptyResultMessage: 'מצטערים, אך לא מצאנו את העיר',
            errorMessage: 'צריך לבחור עיר מהרשימה',
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },

        validate() {
            const isValid = this.$refs.input.validate();
            this.setErrorMessage(isValid)
            return isValid;
        },

        setErrorMessage(isValid) {
            this.$refs.input.setErrorMessage(isValid ? '' : this.errorMessage)
        },

        setValue(value) {
            this.$refs.input.setValue(value);
        }
    }
}
</script>

<style scoped>
</style>
