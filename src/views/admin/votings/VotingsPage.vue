<template>
    <VotingsList v-bind:votings="votings"/>
</template>

<script>
    import VotingsList from './VotingsList';

    export default {
        name: 'Votings',
        components: {
            VotingsList
        },
        props: {},
        methods: {},
        computed: {
            votings() {
                return this.$store.getters.adminVotings;
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
