<template>
    <div class="admin-page">
        <h3>Hi, {{userName}}</h3>
        <ItemList v-bind:entries="entries"/>
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
      entries: [
        {
          id: '5653-asdfsd-23423-dfds',
          name: 'The Departed',
          description: 'Everybody dies in the end',
          type: 'Rating'
        },
        {
          id: '12312-ggztjt-54232-koioweN',
          name: 'Inception',
          description: 'Blows your mind',
          type: 'Rating'
        }
      ]
    }
  },
  computed: {
    userName () {
      return this.$store.getters.userDisplayName()
    }
  }
}
</script>
