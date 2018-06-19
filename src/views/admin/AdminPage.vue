<template>
    <div class="admin-page">
        <h3>Hi, {{userName}}</h3>
        <item-list></item-list>
    </div>
</template>

<script>
import ItemList from './ItemList'

export default {
  name: 'AdminPage',
  components: {
    ItemList
  },
  computed: {
    userName () {
      return this.$store.getters.userDisplayName()
    }
  }
}
</script>
