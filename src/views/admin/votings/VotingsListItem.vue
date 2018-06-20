<template>
    <div>
        <md-list-item @click="$emit('voting-selected', voting)">
            <div class="md-list-item-text">
                <span>{{voting.name}}</span>
                <span>Type: {{voting.type}}</span>
            </div>

            <md-button @click="deleteClick" class="md-icon-button md-list-action">
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
        methods: {
            deleteClick: function(event){
                event.stopPropagation();
                this.$emit('remove-voting', this.voting);
            }
        }
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
