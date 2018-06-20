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
                alert('remove voting: ' + voting);
            },
            votingSelected: function (voting) {
                this.$router.push({path: `/admin/${voting.uid}/voting-items`});
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
