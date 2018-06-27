<template>
    <div>
        <md-list-item>
            <div class="md-list-item-text">
                <span>{{entry.name}}</span>
                <span>{{entry.description}}</span>
            </div>

            <div>
                <md-button @click="$emit('remove-entry', entry)" class="md-icon-button md-list-action">
                    <md-icon class="md-primary">delete</md-icon>
                </md-button>
            </div>
        </md-list-item>
        <md-divider/>
    </div>
</template>

<script>
    export default {
        name: 'VotingItemListEntry',
        props: {
            entry: Object
        }
    };
</script>

<style lang="scss" scoped>
    .md-table-cell {
        text-align: left;
    }
</style>
