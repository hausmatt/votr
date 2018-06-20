<template>
    <div class="admin-page">
        <h3>Hi, {{userName}}</h3>
        <router-view></router-view>
    </div>
</template>

<script>
    import VotingItemList from './voting-items/VotingItemList';
    import {LOAD_ADMIN_USER} from "../../store/actions";

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
                return this.$store.getters.userDisplayName()
            }
        },
        created: function () {
            this.$store.dispatch(LOAD_ADMIN_USER);
        }
    }
</script>
