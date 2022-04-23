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
            <span class="pointer" :class="{'white_text_color': dark}">
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
const SPACE_BEHIND_THE_TAB  = 20;

export default {
    props: {
        tabs: {
            type: Array,
            required: true,
            validator(value) {
                if(value.length === 0) {
                    return true;
                }
             
                return -1 !== value.findIndex(item => {
                    if(item.title) {
                        return item;
                    }
                })
            }
        },

        activeTab: {
            type: Number,
            default: 0
        },

        routeable: {
            type: Boolean
        },

        dark: {
            type: Boolean
        },
    },

    data() {
        return {
            isMounted: false,
            tabWidth: 0
        }
    },

    mounted() {
        this.isMounted = true;
    },

    computed: {
        cssVars() {
            this.isMounted;

            const wrapper = document.querySelector('.main_tabs_wrapper');
            if(!wrapper) {
                return;
            }
            
            this.tabWidth = wrapper.scrollWidth / this.tabs.length;
            return {
                '--active-tab-width': this.tabWidth + 'px'
            }
        }
    },

    watch: {
        activeTab() {
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

            line.style.right = this.calcLinePosition(index) + 'px';
        },

        calcLinePosition(activeTabIndex) {
            return (this.tabWidth * activeTabIndex);
        }
    }
}
</script>

<style scoped lang="scss">

    .main_tabs_wrapper {
        position: relative;

        .main_tab {
            padding: 0 5px;
            border-bottom: 1px solid #CCC;
            padding-bottom: 20px;
        }

        @media only screen and (max-width: 600px) {
            
            .main_tab {
                padding: 0 5px;
                min-width: 30%;
                border-bottom: 1px solid #CCC;
                padding-bottom: 20px;
            }
            
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
            bottom: -1px;
            transition: .5s right ease-out;
            height: 3px;
            width: var(--active-tab-width);
            max-width: 200px;
        }
    }

</style>