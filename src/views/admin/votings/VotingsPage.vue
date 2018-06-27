<template>
    <VotingsList v-bind:votings="votings"/>
</template>

<script>
    import VotingsList from './VotingsList';
    import {LOAD_VOTINGS} from '../../../store/actions';

    export default {
        name: 'Votings',
        components: {
            VotingsList
        },
        props: {},
        methods: {},
        computed: {
            votings() {
                return this.$store.getters.votings;
            }
        },
        created: function () {
            this.$store.dispatch(LOAD_VOTINGS);
        }
    };
</script>

<style lang="scss" scoped>
</style>
