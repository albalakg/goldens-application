<template>
<div class="expanded_tabs_wrapper">

    <template v-for="(tab, index) in tabs">
        <v-flex d-flex justify-space-between class="expanded_tab pa-3 mb-3" :key="index">
            <span>
                {{ tab.title }}
            </span>
            <span class="arrow">
                v
            </span>
        </v-flex>
    </template>

</div>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            activeTab: null
        }
    },

    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        }
    }
}
</script>

<style scoped lang="scss">

    .expanded_tabs_wrapper {

        .expanded_tab {
            background-color: rgb(85, 94, 111);
            border-radius: 4px;

            span {
                color: #fff;
                font-weight: 100;
                font-size: .8em;
            }

            .arrow {
                color: rgb(236, 89, 42);
                cursor: pointer;
            }
        }
    }

</style>