<template>
    <md-table-row class="item-list-entry">
        <md-table-cell>{{entry.id}}</md-table-cell>
        <md-table-cell>{{entry.name}}</md-table-cell>
        <md-table-cell>{{entry.description}}</md-table-cell>
        <md-table-cell>{{entry.type}}</md-table-cell>
        <md-table-cell>
            <md-button class="md-accent" v-on:click="$emit('remove-entry', entry)">Remove</md-button>
        </md-table-cell>
    </md-table-row>
</template>

<script>
export default {
  name: 'ItemListEntry',
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
