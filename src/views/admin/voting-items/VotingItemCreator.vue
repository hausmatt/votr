<template>
    <div>
        <md-button class="md-raised md-primary" v-on:click="showDialog=true">Add</md-button>
        <md-dialog :md-active.sync=showDialog>
            <md-dialog-title>New Entry</md-dialog-title>
            <md-dialog-content>
                <VotingItemCreatorForm v-on:onCreateVotingItem="createVotingItem"/>
            </md-dialog-content>

        </md-dialog>
    </div>
</template>

<script>
    import VotingItemCreatorForm from './VotingItemCreatorForm';
    import {ADD_VOTING_ITEM} from '../../../store/actions';

    export default {
        name: 'VotingItemCreator',
        components: {
            VotingItemCreatorForm
        },
        props: {
            votingId: String
        },
        data: function () {
            return {
                showDialog: false
            };
        },
        methods: {
            async createVotingItem(item) {
                await this.$store.dispatch(ADD_VOTING_ITEM, {
                    item: item,
                    votingId: this.votingId
                });
                this.showDialog = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
