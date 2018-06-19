<template>
    <div class="admin-page">
        <item-list></item-list>
    </div>
</template>

<script>
import ItemList from './ItemList'

export default {
  name: 'AdminPage',
  components: {
    ItemList
  }
}
</script>
