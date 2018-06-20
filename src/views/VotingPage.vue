<template>
    <div class="home">
        <Voting :voting="this.voting[0]"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Voting from '@/components/Voting.vue';

export default {
  name: 'VotingPage',
  components: {
    Voting
  },
  computed: {
    voting () {
      return this.$store.state.auth.user.votings;
    }
  }
};
</script>
