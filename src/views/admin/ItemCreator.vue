<template>
    <div>
        <md-button class="md-raised md-primary" v-on:click="showDialog=true">Add</md-button>
        <md-dialog :md-active.sync=showDialog>
            <md-dialog-title>New Entry</md-dialog-title>
            <md-dialog-content>
                <ItemCreatorForm/>
            </md-dialog-content>

        </md-dialog>
    </div>
</template>

<script>
import ItemCreatorForm from './ItemCreatorForm';

export default {
  name: 'ItemCreator',
  components: {
    ItemCreatorForm
  },
  data: function () {
    return {
      showDialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
