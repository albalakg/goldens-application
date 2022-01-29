<template>
<v-flex d-flex class="main_tabs_wrapper" :style="cssVars">
    <template v-for="(tab, index) in tabs">
        <v-flex
            class="main_tab"
            :key="index" 
            :class="{
                'active_tab': activeTab === index,
            }"
            :ref="`mainTab_${index}`"
            @click="submit(index)"
        >
            <span class="pointer">
                {{ tab.title }}
            </span>
        </v-flex>
    </template>

    <div 
        class="active_tab_line main_bg_color"
        ref="activeTabLine"
    ></div>
</v-flex>
</template>

<script>
const SPACE_BEHIND_THE_TAB  = 10;
const TAB_WIDTH             = 6/12;

export default {
    props: {
        tabs: {
            type: Array,
            required: true
        },

        activeTab: {
            type: Number,
            default: 0
        },

        routeable: {
            type: Boolean
        }
    },

    computed: {
        cssVars() {
            return {
                '--active-tab-width': 100 / (this.tabs.length + 3) + '%'
            }
        }
    },

    watch: {
        activeTab() {
            console.log('activeTab', this.activeTab);
            setTimeout(() => {
                this.moveActiveTabLine(this.activeTab)
            }, 0);
        }
    },

    methods: {
        submit(index) {
            this.$emit('submit', index);

            if(this.routeable) {
                this.$router.push(this.tabs[index].url)
            }
        },

        moveActiveTabLine(index) {
            const line      = this.$refs.activeTabLine;
            const activeTab = document.querySelector('.active_tab');
            const wrapper   = document.querySelector('.main_tabs_wrapper');
            
            if(!line || !activeTab || !wrapper) {
                return error('Failed to move the active line since one of the elements was not found');
            }

            line.style.right = this.calcLinePosition(wrapper, activeTab) + 'px'
        },

        calcLinePosition(wrapper, activeTab) {
            return (wrapper.scrollWidth * (TAB_WIDTH)) - activeTab.offsetLeft - SPACE_BEHIND_THE_TAB;
        }
    }
}
</script>

<style scoped lang="scss">

    .main_tabs_wrapper {
        position: relative;

        .main_tab {
            padding: 0 5px;
            min-width: 30%;
            border-bottom: 1px solid #CCC;
            padding-bottom: 20px;
        }

        .main_tab span:hover {
            font-weight: bold;
        }

        .active_tab {
            text-shadow: 0px 0px black;
        }

        .active_tab_line {
            position: absolute;
            right: 0;
            bottom: -2px;
            transition: .5s right ease-out;
            height: 4px;
            width: 30%;
            // width: var(--active-tab-width);
        }
    }

</style>