<template>
    <div id="app" class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">{{ this.$router.currentRoute.name }}</span>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible">
                <md-list>
                    <md-list-item to="/" v-on:click="menuVisible = false">
                        <md-icon>home</md-icon>
                        <span class="nav-label">Home</span>
                    </md-list-item>
                    <md-list-item v-if="isUserLoggedIn" to="/admin/votings" v-on:click="menuVisible = false">
                        <md-icon>settings</md-icon>
                        <span class="nav-label">Admin</span>
                    </md-list-item>
                    <md-list-item v-if="!isUserLoggedIn" v-on:click="login">
                        <md-icon>person</md-icon>
                        <span class="nav-label">Login</span>
                    </md-list-item>
                    <md-list-item v-if="isUserLoggedIn" v-on:click="logout">
                        <md-icon>person_outline</md-icon>
                        <span class="nav-label">Logout</span>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <router-view/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import * as actionTypes from './store/actions';

    export default {
        name: 'App',
        data: () => ({
            menuVisible: false
        }),
        computed: {
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn;
            }
        },
        methods: {
            login: function () {
                this.$store.dispatch(actionTypes.LOGIN_WITH_GOOGLE);
            },
            logout: function () {
                this.$store.dispatch(actionTypes.LOGOUT);
                this.$router.push({path: `/`});
            }
        },
        created: function () {
        }
    };
</script>

<style lang="scss" scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

    }

    .md-app {
        border: 1px solid rgba(#000, .12);
        min-height: 100vh;
    }

    .md-drawer {
        width: 230px;
    }

    .md-list-item .nav-label {
        text-align: left;
        width: 100%;
    }
</style>
