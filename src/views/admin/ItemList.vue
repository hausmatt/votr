<template>
    <div class="item-list">

        <div class="md-layout md-gutter actions md-alignment-top-right">
            <div class="md-layout-item md-size-15">
                <ItemCreator/>
            </div>
        </div>

        <md-table>
            <md-table-row>
                <md-table-head>ID</md-table-head>
                <md-table-head>Name</md-table-head>
                <md-table-head>Description</md-table-head>
                <md-table-head>Type</md-table-head>
            </md-table-row>

            <ItemListEntry v-for="entry in entries" :key="entry.id" v-bind:entry="entry"
                           v-on:remove-entry="removeEntry"/>
        </md-table>
    </div>
</template>

<script>
import ItemListEntry from './ItemListEntry.vue';
import ItemCreator from './ItemCreator';

export default {
  name: 'ItemList',
  components: {
    ItemListEntry,
    ItemCreator
  },
  props: {
    entries: Array
  },
  data: function () {
    return {
    };
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
