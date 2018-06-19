<template>
    <div>
        <md-button class="md-raised md-primary" v-on:click="showDialog=true">Add</md-button>
        <md-dialog :md-active.sync=showDialog>
            <md-dialog-title>New Entry</md-dialog-title>
            <div>
                TODO: implement form
            </div>
        </md-dialog>
    </div>
</template>

<script>
export default {
  name: 'ItemCreator',
  data: function () {
    return {
      showDialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
