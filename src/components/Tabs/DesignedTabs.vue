<template>
<v-flex d-flex class="main_tabs_wrapper" :style="cssVars">
    <template v-for="(tab, index) in tabs">
        <v-flex
            class="main_tab pointer"
            :key="index" 
            :class="{
                'active_tab': activeTab === index,
            }"
            :ref="`mainTab_${index}`"
            @click="submit(index)"
        >
            <span :class="{'white_text_color': dark}">
                {{ tab.title }}
            </span>
        </v-flex>
    </template>

    <div 
        class="active_tab_line second_dark_bg_color"
        :class="{
            'sub_bg_color': subColor
        }"
        ref="activeTabLine"
    ></div>
</v-flex>
</template>

<script>

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

        subColor: {
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
        this.setTabWidth();
    },

    computed: {
        cssVars() {
            return {
                '--active-tab-width': this.tabWidth / 1.2 + 'px'
            }
        }
    },

    watch: {
        activeTab() {
            setTimeout(() => {
                this.moveActiveTabLine()
            }, 0);
        },
    },

    methods: {
        setTabWidth() {
            const wrapper = document.querySelector('.main_tabs_wrapper');
            if(!wrapper) {
                return;
            }
            
            this.tabWidth = wrapper.scrollWidth / this.tabs.length;
        },
        
        submit(index) {
            this.$emit('submit', index);

            if(this.routeable) {
                this.$router.push(this.tabs[index].url)
            }
        },

        moveActiveTabLine() {
            const line      = this.$refs.activeTabLine;
            const activeTab = document.querySelector('.active_tab');
            const wrapper   = document.querySelector('.main_tabs_wrapper');

            if(!line || !activeTab || !wrapper) {
                return error('Failed to move the active line since one of the elements was not found');
            }

            line.style.right = this.calcLinePosition(wrapper, activeTab) + 'px';
        },

        calcLinePosition(wrapper, activeTab) {
            return wrapper.clientWidth - activeTab.offsetLeft - activeTab.clientWidth * 1.25;
        }
    }
}
</script>

<style scoped lang="scss">

    .main_tabs_wrapper {
        position: relative;

        .main_tab {
            padding: 0 5px;
            border-bottom: 1px solid var(--mainSecondDarkColorWithOpacity);
            padding-bottom: 10px;
            z-index: 2;
            transition-delay: .3s;
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
            text-shadow: 0 0 #000;
        }

        .active_tab {
            text-shadow: 0px 0px black;
            color: #fff;
            font-weight: bold;
        }

        .active_tab_line {
            position: absolute;
            right: -50px;
            bottom: 3px;
            transition: .5s right ease-out;
            height: 37px;
            transform: skew(-30deg);
            width: var(--active-tab-width);
            max-width: 200px;
            box-shadow: 0 0 1px 1px var(--subColor), 0 0 1px 3px var(--mainSecondDarkColor);
        }
    }

</style>