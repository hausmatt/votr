<template>
    <div class="admin-page">
        <h3>Hi, {{userName}}</h3>
        <md-progress-spinner v-if="loadingData" md-mode="indeterminate"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import VotingItemList from './voting-items/VotingItemList';
    import {LOAD_VOTINGS} from "../../store/actions";

    export default {
        name: 'AdminPage',
        components: {
            VotingItemList
        },
        data: function () {
            return {}
        },
        computed: {
            userName() {
                return this.$store.getters.userDisplayName
            },
            loadingData() {
                return this.$store.state.voting.apiCalls.loadVotings.loading;
            }
        },
        created: function () {
            this.$store.dispatch(LOAD_VOTINGS);
        }
    }
</script>
