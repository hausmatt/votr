<template>
    <div>
        <md-button class="md-raised md-primary" v-on:click="showDialog=true">Add</md-button>
        <md-dialog :md-active.sync=showDialog>
            <md-dialog-title>New Voting</md-dialog-title>
            <md-dialog-content>
                <VotingCreatorForm/>
            </md-dialog-content>

        </md-dialog>
    </div>
</template>

<script>
    import VotingCreatorForm from './VotingCreatorForm';

    export default {
        name: 'ItemCreator',
        components: {
            VotingCreatorForm
        },
        data: function () {
            return {
                showDialog: false
            };
        }
    };
</script>

<style lang="scss" scoped>
</style>
