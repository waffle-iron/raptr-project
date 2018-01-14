import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: (resolve) => {
        require(['@/components/Dashboard'], resolve)
      }
    }
  ]
})

export default router
