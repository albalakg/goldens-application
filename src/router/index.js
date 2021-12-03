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



  // ***** GENERAL PAGES END *****
  {
    path: '/',
    name: 'Home',
    beforeEnter: Guard.admin,
    component: () => import('../views/General/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    beforeEnter: Guard.admin,
    component: () => import('../views/General/About.vue')
  },
  {
    path: '/policies',
    name: 'Policies',
    beforeEnter: Guard.admin,
    component: () => import('../views/General/Policies.vue')
  },
  {
    path: '/support',
    name: 'Support',
    beforeEnter: Guard.admin,
    component: () => import('../views/General/Support.vue')
  },
  // ***** GENERAL PAGES END *****


  // ***** PROFILE START *****
  {
    path: '/user',
    name: 'User',
    beforeEnter: Guard.admin,
    component: () => import('../views/User/UserIndex.vue'),
    children: [
      {
        path: '/',
        name: 'UserProfile',
        beforeEnter: Guard.admin,
        component: () => import('../views/User/UserProfile.vue')
      },
      {
        path: '/favorites',
        name: 'UserFavorites',
        beforeEnter: Guard.admin,
        component: () => import('../views/User/UserFavorites.vue')
      },
      {
        path: '/history',
        name: 'UserHistory',
        beforeEnter: Guard.admin,
        component: () => import('../views/User/UserHistory.vue')
      },
      {
        path: '/orders',
        name: 'UserOrders',
        beforeEnter: Guard.admin,
        component: () => import('../views/User/UserOrders.vue')
      },
      {
        path: '/support',
        name: 'UserSupportTickets',
        beforeEnter: Guard.admin,
        component: () => import('../views/User/UserSupportTickets.vue')
      },
    ]
  },
  // ***** PROFILE END *****
  

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
