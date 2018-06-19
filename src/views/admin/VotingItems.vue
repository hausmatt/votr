<template>
    <div>
        <div class="md-layout md-alignment-top-left">
            <div class="md-layout-item md-size-80">
                <md-button to="/admin/votings" class="md-icon-button back-button">
                    <md-icon>arrow_back_ios</md-icon>
                </md-button>
            </div>
            <div class="md-layout-item md-size-20">
                <ItemCreator/>
            </div>
        </div>
        <ItemList v-bind:entries="entries"/>
    </div>

</template>

<script>
    import ItemList from './ItemList';
    import ItemCreator from './ItemCreator';

    export default {
        name: 'VotingItems',
        components: {
            ItemList,
            ItemCreator
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
    .back-button{
        display: block;
    }
</style>
