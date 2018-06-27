<template>
    <div class="home">
        <h1>Welcome to Votr!</h1>
        <p>Enter a voting ID to participate in a vote or view current scores</p>
        <md-field>
            <label>Voting ID</label>
            <md-input v-model="votingId"></md-input>
        </md-field>
        <md-button @click="openVoting()">vote</md-button>
        <md-button class="md-primary" @click="openScoreboard()">show current scores</md-button>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        components: {},
        data: function () {
            return {
                votingId: ''
            };
        },
        methods: {
            openVoting() {
                this.$router.push({path: `/voting/${this.votingId}`});
            },
            openScoreboard() {
                this.$router.push({path: `/scoreboard/${this.votingId}`});
            }
        }
    };
</script>
