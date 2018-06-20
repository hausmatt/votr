<template>
    <div>
        <ActionBar>
            <md-button to="/admin/votings" class="md-icon-button back-button left">
                <md-icon>arrow_back_ios</md-icon>
            </md-button>
            <VotingItemCreator class="right"/>
        </ActionBar>
        <VotingItemList v-bind:entries="entries"/>
    </div>

</template>

<script>
    import VotingItemList from './VotingItemList';
    import VotingItemCreator from './VotingItemCreator';
    import ActionBar from '@/components/ActionBar';

    export default {
        name: 'VotingItems',
        components: {
            VotingItemList,
            VotingItemCreator,
            ActionBar
        },
        props: {},
        data: function () {
            return {};
        },
        computed: {
            entries: function () {
                //TODO: filter all votings by votingId
                //return this.$route.params.votingId
                return [
                    {
                        id: '5653-asdfsd-23423-dfds',
                        name: 'The Departed',
                        description: 'Everybody dies in the end',
                        type: 'Rating'
                    },
                    {
                        id: '12312-ggztjt-54232-koioweN',
                        name: 'Inception',
                        description: 'Blows your mind',
                        type: 'Rating'
                    }
                ]
            }
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
    .back-button {
        display: block;
    }
</style>
