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
                <md-toolbar class="md-transparent" md-elevation="0">
                    Navigation
                </md-toolbar>

                <md-list>
                    <md-list-item to="/" v-on:click="menuVisible = false">
                        <md-icon>home</md-icon>
                        <span>Home</span>
                    </md-list-item>
                    <md-list-item to="/about" v-on:click="menuVisible = false">
                        <md-icon>info</md-icon>
                        <span>About</span>
                    </md-list-item>
                    <md-list-item v-if="isUserLoggedIn" to="/admin" v-on:click="menuVisible = false">
                        <md-icon>settings</md-icon>
                        <span>Admin</span>
                    </md-list-item>
                    <md-list-item v-if="!isUserLoggedIn" v-on:click="login">
                        <md-icon>person</md-icon>
                        <span>Login</span>
                    </md-list-item>
                    <md-list-item v-if="isUserLoggedIn" v-on:click="logout">
                        <md-icon>person_outline</md-icon>
                        <span>Logout</span>
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
import * as actionTypes from './store/actions'
export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  }),
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn()
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch(actionTypes.LOGIN_WITH_GOOGLE)
    },
    logout: function () {
      this.$store.dispatch(actionTypes.LOGOUT)
    }
  }
}
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
        width: 25vw;
    }

    .md-list-item span {
        text-align: left;
        width: 100%;
    }
</style>
