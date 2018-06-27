<template>
    <div class="item-list">
        <md-list class="md-triple-line">
            <VotingItemListEntry v-for="entry in entries" :key="entry.uid" v-bind:entry="entry"
                                 v-on:remove-entry="removeEntry"/>
        </md-list>
    </div>
</template>

<script>
    import VotingItemListEntry from './VotingItemListEntry.vue';
    import {REMOVE_VOTING_ITEM} from '../../../store/actions';

    export default {
        name: 'VotingItemList',
        components: {
            VotingItemListEntry
        },
        props: {
            entries: Array,
            votingId: String
        },
        data: function () {
            return {};
        },
        methods: {
            removeEntry: function (entry) {
                this.$store.dispatch(REMOVE_VOTING_ITEM, {
                    itemId: entry.id,
                    votingId: this.votingId
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
