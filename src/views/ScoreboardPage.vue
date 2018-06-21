<template>
    <div class="home">
        <Scoreboard :voting="this.voting[0]"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Scoreboard from '@/components/Scoreboard.vue';

export default {
  name: 'VotingPage',
  components: {
    Scoreboard
  },
  computed: {
    voting () {
      return this.$store.state.login.auth.user.votings;
    }
  }
};
</script>
