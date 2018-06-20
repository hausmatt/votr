<template>
    <div>
        <ActionBar>
            <VotingCreator class="right"/>
        </ActionBar>

        <md-table>
            <md-table-row>
                <md-table-head>Name</md-table-head>
                <md-table-head>Type</md-table-head>
            </md-table-row>

            <VotingListItem v-bind:voting="voting" v-on:remove-voting="removeVoting"
                            v-on:voting-selected="votingSelected"/>
            <!--<ItemListEntry v-for="entry in entries" :key="entry.id" v-bind:entry="entry"
                           v-on:remove-entry="removeEntry"/>-->
        </md-table>
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
        props: {},
        data: function () {
            return {
                voting: {
                    name: 'the departed',
                    type: 'star'
                }
            };
        },
        methods: {
            removeVoting: function (voting) {
                alert('remove voting: ' + voting);
            },
            votingSelected: function (voting) {
                //TODO: fix routing
                voting.id = '123-asdf';
                this.$router.push({path: `/admin/${voting.id}/voting-items`});
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
