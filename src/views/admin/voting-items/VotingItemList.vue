<template>
    <div class="item-list">
        <md-table>
            <md-table-row>
                <md-table-head>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Type</md-table-head>
            </md-table-row>

            <VotingItemListEntry v-for="entry in entries" :key="entry.uid" v-bind:entry="entry"
                                 v-on:remove-entry="removeEntry"/>
        </md-table>
    </div>
</template>

<script>
    import VotingItemListEntry from './VotingItemListEntry.vue';

    export default {
        name: 'VotingItemList',
        components: {
            VotingItemListEntry
        },
        props: {
            entries: Array
        },
        data: function () {
            return {};
        },
        methods: {
            removeEntry: function (entry) {
                alert(`remove entry: ${entry.id}`);
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
