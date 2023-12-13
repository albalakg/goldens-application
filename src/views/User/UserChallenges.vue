<template>
    <div class="user_challenge_wrapper">
        <template v-if="userChallenges">
            <template v-if="userChallenges.length">
                <v-flex d-flex flex-wrap v-if="$vuetify.breakpoint.mdAndUp">
                    <v-flex md3 v-for="challenge in viewChallenges" :key="challenge.course_challenge_id" class="mb-10">
                        <user-challenge-card shadow class="user_challenge_card" :userChallenge="challenge" @submit="enterChallenge" />
                    </v-flex>
                </v-flex>

                <v-flex v-else class="user_challenge_mobile">
                    <v-flex d-flex class="use_challenge_challenges_wrapper pr-10">
                        <v-flex v-for="challenge in viewChallenges" :key="challenge.course_challenge_id" class="pl-3">
                            <user-challenge-card shadow class="user_challenge_card my-10" :userChallenge="challenge" @submit="enterChallenge" />
                        </v-flex>
                    </v-flex>
                </v-flex>

                <br>
                <br>
            </template>
            <template v-else>
                <h1 class="text-center">
                    לא נמצאו אתגרים
                </h1>
            </template>

            <v-flex md6 mx-auto v-if="$vuetify.breakpoint.mdAndUp">
                <pagination 
                    :totalPages="totalPages"
                    :currentPage="page"
                    @setPage="setPage"
                />
            </v-flex>
        </template>

        <template v-else>
            <h2 class="text-center">
                טוען...
            </h2>
        </template>
    </div>
</template>

<script>
import UserChallengeCard from '../../components/Cards/UserChallengeCard.vue';
import Pagination from '../../components/General/Pagination.vue';

export default {
  components: { UserChallengeCard, Pagination },
    data() {
        return {
            page: 1,
            totalChallengesPerPage: 8,
            focusedChallengeIndex: 0
        }
    },

    created() {
        this.$store.dispatch('UserState/getChallenges');
    },

    computed: {
        userChallenges() {
            const userChallenges = this.$store.getters['UserState/challenges'];

            return userChallenges;
        },

        viewChallenges() {
            if(this.$vuetify.breakpoint.smAndDown) {
                return this.userChallenges;
            }

            const startIndex = (this.page - 1) * this.totalChallengesPerPage;
            const endIndex   = startIndex + this.totalChallengesPerPage;

            return this.userChallenges.slice(startIndex, endIndex)
                                    .filter(userChallenge => userChallenge.challenge);
        },

        totalPages() {
            return Math.ceil(this.viewChallenges.length / this.totalChallengesPerPage);
        }
    },

    methods: {
        setPage(page) {
            this.page = page;
        },

        enterChallenge(challenge) {
            this.$router.push(`/courses/${challenge.course_id}/challenges/${challenge.id}`)
        },
    }
}
</script>

<style scoped lang="scss">

    .user_challenge_card {
        height: 70vh;
        max-height: 350px;
    }

    .user_challenge_mobile {

        .use_challenge_challenges_wrapper {
            overflow-x: auto;
            position: relative;
            
            &::-webkit-scrollbar {
                display: none;
            }
    
            .user_challenge_card {
                min-width: 250px;
                margin-right: 10vw;
            }
        }
        
    }

</style>
