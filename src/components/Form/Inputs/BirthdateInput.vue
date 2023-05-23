<template>
    <div class="city_input_wrapper">
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="dates"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on">
                    <BaseInput ref="input" :outlined="outlined" :dark="dark" :slim="slim" :optional="optional"
                        :readonly="true" :loading="loading" :placeholder="placeholder ? text : ''"
                        :title="title ? text : ''" :icon="icon ? iconSrc : ''" :rules="rules" @onChange="onChange" />
                </div>
            </template>
            <v-date-picker color="#102a46" v-model="dates" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="#102a46" @click="menu = false">
                    ביטול
                </v-btn>
                <v-btn text color="#102a46" @click="$refs.menu.save(dates)">
                    אישור
                </v-btn>
            </v-date-picker>
        </v-menu>
    </div>
</template>

<script>
import BaseInput from './BaseInput.vue';

export default {
    components: {
        BaseInput
    },

    props: {
        outlined: {
            type: Boolean
        },

        optional: {
            type: Boolean
        },

        readonly: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },

        slim: {
            type: Boolean
        },

        loading: {
            type: Boolean
        },

        icon: {
            type: Boolean
        },

        placeholder: {
            type: Boolean,
            default: true
        },

        title: {
            type: Boolean,
        },
    },

    data() {
        return {
            text: 'תאריך לידה',
            iconSrc: 'mdi-calendar-range',
            rules: [
                {
                    rule: /^\d{4}-\d{2}-\d{2}$/,
                    message: 'הערך חייב להיות בפורמט של תאריך'
                }
            ],
            menu: false,
            dates: ''
        }
    },

    watch: {
        dates() {
            this.setValue(this.dates);
        }
    },

    methods: {
        onChange(value) {
            this.$emit('onChange', value);
        },

        validate() {
            return this.$refs.input.validate();
        },

        setValue(value) {
            return this.$refs.input.setValue(value);
        },

        clicked() {
            this.menu = !this.menu;
        }
    }
}
</script>

<style scoped></style>
