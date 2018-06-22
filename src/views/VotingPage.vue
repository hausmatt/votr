<template>
    <div class="home">
        <Voting :votingItems="votingItems" :votingId="votingId"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Voting from '@/components/Voting.vue';
    import {LOAD_VOTING_ITEMS} from "../store/actions";

    export default {
        name: 'VotingPage',
        components: {
            Voting
        },
        computed: {
            votingItems() {
                return this.$store.getters.votingItems;
            },
            votingId() {
                return this.$route.params.votingId;
            }
        },
        created: function () {
            this.$store.dispatch(LOAD_VOTING_ITEMS, this.votingId);
        }
    }
    ;
</script>
