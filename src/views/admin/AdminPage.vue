<template>
    <div class="admin-page">
        <h3>Hi, {{userName}}</h3>
        <router-view></router-view>
    </div>
</template>

<script>
import ItemList from './ItemList';

export default {
  name: 'AdminPage',
  components: {
    ItemList
  },
  data: function () {
    return {
    }
  },
  computed: {
    userName () {
      return this.$store.getters.userDisplayName()
    }
  }
}
</script>
