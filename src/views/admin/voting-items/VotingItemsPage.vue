<template>
    <div>
        <ActionBar>
            <md-button to="/admin/votings" class="md-icon-button back-button left">
                <md-icon>arrow_back_ios</md-icon>
            </md-button>
            <VotingItemCreator class="right" v-bind:votingId="votingId"/>
        </ActionBar>
        <VotingItemList v-bind:entries="entries" v-bind:votingId="votingId"/>
    </div>

</template>

<script>
    import VotingItemList from './VotingItemList';
    import VotingItemCreator from './VotingItemCreator';
    import ActionBar from '../../../components/ActionBar';
    import {LOAD_VOTING_ITEMS} from '../../../store/actions';

    export default {
        name: 'VotingItems',
        components: {
            VotingItemList,
            VotingItemCreator,
            ActionBar
        },
        props: {},
        computed: {
            entries: function () {
                return this.$store.getters.votingItems;
            },
            votingId: function () {
                return this.$route.params.votingId;
            }
        },
        methods: {},
        created: function () {
            this.$store.dispatch(LOAD_VOTING_ITEMS, this.votingId);
        }
    };
</script>

<style lang="scss" scoped>
    .back-button {
        display: block;
    }
</style>
