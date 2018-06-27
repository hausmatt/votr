<template>
    <div>
        <md-progress-spinner v-if="loadingData" md-mode="indeterminate"/>
        <VotingsList v-bind:votings="votings"/>
    </div>
</template>

<script>
    import VotingsList from './VotingsList';
    import {LOAD_VOTINGS} from '../../../store/actions';

    export default {
        name: 'Votings',
        components: {
            VotingsList
        },
        props: {},
        methods: {},
        computed: {
            votings() {
                return this.$store.getters.votings;
            },
            loadingData() {
                return this.$store.state.voting.apiCalls.loadVotings.loading;
            }
        },
        created: function () {
            this.$store.dispatch(LOAD_VOTINGS);
        }
    };
</script>

<style lang="scss" scoped>
</style>
