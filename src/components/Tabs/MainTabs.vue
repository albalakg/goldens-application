<template>
<v-flex d-flex class="main_tabs_wrapper pr-3" :style="cssVars">
    <template v-for="(tab, index) in tabs">
        <v-flex
            xs2
            class="main_tab pointer"
            :key="index" 
            :class="{
                'active_tab': activeTab === index,
            }"
            :ref="`mainTab_${index}`"
            @click="submit(index)"
        >
            <span>
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
const SPACE_BEHIND_THE_TAB = 10;

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

    methods: {
        submit(index) {
            this.$emit('submit', index);

            if(this.routeable) {
                this.$router.push(this.tabs[index].url)
            }

            setTimeout(() => {
                this.moveActiveTabLine(index);
            }, 100);
        },

        moveActiveTabLine(index) {
            const line      = this.$refs.activeTabLine;
            const activeTab = document.querySelector('.active_tab');
            const wrapper   = document.querySelector('.main_tabs_wrapper')
            
            if(!line) {
                return error('Failed to find the active tab line');
            }
            
            if(!activeTab) {
                return error('Failed to find the active tab');
            }

            const rightPosition = this.calcLinePosition(wrapper, activeTab);
            line.style.right = rightPosition + 'px'
        },

        calcLinePosition(wrapper, activeTab) {
            const position = (wrapper.clientWidth * (10/12)) - activeTab.offsetLeft - SPACE_BEHIND_THE_TAB;
            return position > SPACE_BEHIND_THE_TAB ? position : 0;
        }
    }
}
</script>

<style scoped lang="scss">

    .main_tabs_wrapper {
        border-bottom: 1px solid #CCC;
        padding-bottom: 20px;
        position: relative;

        .main_tab:hover {
            font-weight: bold;
        }

        .active_tab {
            font-weight: bold;
        }

        .active_tab_line {
            position: absolute;
            right: 0;
            bottom: -2px;
            transition: .5s right ease-out;
            height: 4px;
            width: var(--active-tab-width);
        }
    }

</style>