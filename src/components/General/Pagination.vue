<template>
    <v-flex d-flex justify-center class="pagination_wrapper">
        <div :class="{
            'hidden_chip': !showBackChip
        }" class="page_chip" @click="setPage(currentPage - 1)">
            -
        </div>
        <div 
            class="page_chip" 
            :class="{
                'active_page' : currentPage === page
            }"
            v-for="page in totalChips" 
            :key="page"
            @click="setPage(page)"
        >
            {{ page }}
        </div>
        <div :class="{
            'hidden_chip': !showNextChip
        }" class="page_chip" @click="setPage(currentPage + 1)">
            +
        </div>
    </v-flex>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true
        },

        totalPages: {
            type: Number,
            required: true
        }
    },

    computed: {
        showBackChip() {
            return this.totalPages > 1 && this.currentPage > 1;
        },

        showNextChip() {
            return this.totalPages > 1 && this.currentPage !== this.totalPages;
        },

        totalChips() {
            // when the maximum pages fit
            if(this.totalPages <= 7) {
                return this.totalPages;
            } 

            // first pages
            if(this.currentPage <= 3) {
                return [
                    1, 2, 3, 4, 5, 6, this.totalPages
                ]
            }

            // last pages
            if((this.totalPages - this.currentPage) <= 2) {
                return [
                    1, this.totalPages - 5, this.totalPages - 4, this.totalPages - 3 ,this.totalPages - 2, this.totalPages - 1, this.totalPages
                ]
            }

            // middle pages
            return [
                1, this.currentPage - 2, this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, this.totalPages
            ];
        }
    },

    methods: {
        setPage(page) {
            this.$emit('setPage', page)
        }
    }
}
</script>

<style scoped>

    .page_chip {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        padding: 3px;
        height: 40px;
        width: 40px;
        background-color: #ddd;
        font-weight: bold;
        margin: 0 5px;
    }

    .active_page {
        background-color: #16588F;
        color: #fff;
    }

    .hidden_chip {
        opacity: 0;
        pointer-events: none;
    }

</style>