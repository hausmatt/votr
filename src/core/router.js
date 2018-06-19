import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/HomePage.vue'
import About from '../views/AboutPage.vue'
import AdminPage from '../views/admin/AdminPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage
    }
  ]
})
