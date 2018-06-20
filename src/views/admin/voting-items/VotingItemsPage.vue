<template>
    <div>
        <div class="md-layout md-alignment-top-left">
            <div class="md-layout-item md-size-80">
                <md-button to="/admin/votings" class="md-icon-button back-button">
                    <md-icon>arrow_back_ios</md-icon>
                </md-button>
            </div>
            <div class="md-layout-item md-size-20">
                <VotingItemCreator/>
            </div>
        </div>
        <VotingItemList v-bind:entries="entries"/>
    </div>

</template>

<script>
    import VotingItemList from './VotingItemList';
    import VotingItemCreator from './VotingItemCreator';

    export default {
        name: 'VotingItems',
        components: {
            VotingItemList,
            VotingItemCreator
        },
        props: {},
        computed: {
            entries: function () {
                return this.$store.getters.votingById(this.$route.params.votingId);
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
