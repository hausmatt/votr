<template>
    <div>
        <ActionBar>
            <VotingCreator class="right"/>
        </ActionBar>

        <md-list class="md-triple-line">
            <VotingListItem v-for="voting in votings"
                            v-bind:voting="voting"
                            v-on:remove-voting="removeVoting"
                            v-on:voting-selected="votingSelected"
                            :key="voting.uid"/>
        </md-list>


    </div>
</template>

<script>
    import VotingListItem from './VotingsListItem';
    import VotingCreator from './VotingCreator';
    import ActionBar from '@/components/ActionBar';
    import {REMOVE_VOTING} from "../../../store/actions";

    export default {
        name: 'VotingsList',
        components: {
            VotingListItem,
            VotingCreator,
            ActionBar
        },
        props: {
            votings: Array
        },
        methods: {
            removeVoting: function (voting) {
                this.$store.dispatch(REMOVE_VOTING, voting.uid);
            },
            votingSelected: function (voting) {
                this.$router.push({path: `/admin/${voting.uid}/voting-items`});
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
