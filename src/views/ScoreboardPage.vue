<template>
    <div class="home">
        <Scoreboard :votingItems="this.votingItems"/>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Scoreboard from '@/components/Scoreboard.vue';
    import {LOAD_VOTING_ITEMS} from "../store/actions";

    export default {
        name: 'VotingPage',
        components: {
            Scoreboard
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
    };
</script>
