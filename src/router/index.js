import Vue from 'vue'
import VueRouter from 'vue-router'
import Guard from '../helpers/Guard'

Vue.use(VueRouter)

const routes = [

  // ***** AUTH START *****
  {
    path: '/signin',
    name: 'Login',
    beforeEnter: Guard.guest,
    component: () => import('../views/Auth/Signin.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    beforeEnter: Guard.guest,
    component: () => import('../views/Auth/Signup.vue')
  },
  {
    path: '/signout',
    name: 'Signout',
    beforeEnter: Guard.admin,
    component: () => import('../views/Auth/Signout.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    beforeEnter: Guard.admin,
    component: () => import('../views/Auth/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    beforeEnter: Guard.admin,
    component: () => import('../views/Auth/ResetPassword.vue')
  },
  // ***** AUTH END *****

  {
    path: '/',
    name: 'Home',
    beforeEnter: Guard.admin,
    component: () => import('../views/General/Home.vue')
  },

  {
    path: '*',
    name: 'PageNotFound',
    beforeEnter: Guard.admin,
    component: () => import('../views/Errors/PageNotFound.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
