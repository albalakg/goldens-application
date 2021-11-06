
<template>
<div class="order_summary_card">
    <h2>
        <span class="main_text_color">סיכום</span> <span>הזמנה</span>
    </h2>

    <br><br>

    <template v-for="(record, index) in records">
        <div :key="index">
            <v-flex 
                d-flex 
                justify-space-between
                class="order_summary_record"
                :class="{
                    'order_summary_record_outlined': record.outlined,
                    'order_summary_record_background': record.background,
                    'order_summary_record_bold': record.bold,
                    'order_summary_record_large': record.large,
                }" 
            >
                <span>
                    {{ record.text }}
                </span>
                <span>
                    {{ record.price }}
                </span>
            </v-flex>
        </div>
    </template>

    <br><br><br>

    <v-flex md10 mx-auto class="order_summary_button">
        <MainButton
            shadow
            text="תשלום"
            :height="50"
            :styleConfig="buttonStyleConfig"
            @submit="submit()"
        />
    </v-flex>
    
</div>
</template>

<script>
import MainButton from './../Buttons/MainButton.vue';

export default {
    components: {
        MainButton,
    },

    props: {
        records: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            buttonStyleConfig: {
                height: 50,
                borderRadius: 30
            }
        }
    },

    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style scoped lang="scss">

    .order_summary_card {
        border-radius: 12px;
        width: 100%;
        box-shadow: 0 0 15px 4px rgb(49, 53, 61, 0.2);
        min-height: 400px;
        text-align: center;
        padding: 40px 0;
        position: relative;

        h2 {
            font-size: 2.7em;
        }

        .order_summary_record {
            width: 100%;
            padding: 15px 40px;
        }

        .order_summary_record_outlined {
            border-top: 1px solid #DDD;
            border-bottom: 1px solid #DDD;
        }

        .order_summary_record_background {
            background-color: #EEEEEE55;
        }

        .order_summary_record_bold span {
            font-weight: bold;
        }

        .order_summary_record_large span {
            font-size: 20px;
        }

        .order_summary_button {
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            margin: auto;
        }
    }

</style>