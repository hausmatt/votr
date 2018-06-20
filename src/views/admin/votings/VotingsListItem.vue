<template>
    <div>
        <md-list-item>
            <div class="md-list-item-text" v-on:click="$emit('voting-selected', voting)">
                <span>{{voting.name}}</span>
                <span>Type: {{voting.type}}</span>
            </div>

            <md-button v-on:click="$emit('remove-voting', voting)" class="md-icon-button md-list-action">
                <md-icon class="md-primary">delete</md-icon>
            </md-button>
        </md-list-item>

        <md-divider/>
    </div>
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
    .md-table-cell {
        text-align: left;
        .md-button {
            float: right;
        }
    }
</style>
