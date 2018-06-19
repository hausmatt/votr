<template>
    <md-table-row class="item-list-entry" v-on:click="$emit('voting-selected', voting)">
        <md-table-cell>{{voting.name}}</md-table-cell>
        <md-table-cell>{{voting.type}}</md-table-cell>
        <md-table-cell>
            <md-button class="md-accent" v-on:click="$emit('remove-voting', voting)">Remove</md-button>
        </md-table-cell>
    </md-table-row>
</template>

<script>

    export default {
        name: 'VotingsListItem',
        components: {},
        props: {
            voting: Object
        },
        data: function () {
            return {};
        },
        methods: {}
    };
</script>

<style lang="scss" scoped>
</style>
