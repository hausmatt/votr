<template>
    <div>
        <div class="md-layout md-gutter actions md-alignment-top-right">
            <div class="md-layout-item md-size-15">
                <VotingCreator/>
            </div>
        </div>

        <md-table>
            <md-table-row>
                <md-table-head>Name</md-table-head>
                <md-table-head>Type</md-table-head>
            </md-table-row>

            <VotingListItem v-for="voting in votings"
                            v-bind:voting="voting"
                            v-on:remove-voting="removeVoting"
                            v-on:voting-selected="votingSelected"
                            :key="voting.uid"/>
        </md-table>
    </div>
</template>

<script>
    import VotingListItem from './VotingsListItem';
    import VotingCreator from './VotingCreator';

    export default {
        name: 'VotingsList',
        components: {
            VotingListItem,
            VotingCreator
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
