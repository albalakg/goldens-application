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
    component: () => import('../views/Auth/Signin.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    beforeEnter: Guard.guest,
    component: () => import('../views/Auth/Signup.vue'),
  },
  {
    path: '/signout',
    name: 'Signout',
    beforeEnter: Guard.user,
    component: () => import('../views/Auth/Signout.vue')
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    beforeEnter: Guard.guest,
    component: () => import('../views/Auth/ForgotPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    beforeEnter: Guard.guest,
    component: () => import('../views/Auth/ResetPassword.vue')
  },
  {
    path: '/email-confirmation',
    name: 'Email Confirmation',
    component: () => import('../views/Auth/EmailConfirmation.vue')
  },
  // ***** AUTH END *****



  // ***** GENERAL PAGES END *****
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/General/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/General/About.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../views/General/Support.vue')
  },
  {
    path: '/contact-us',
    name: 'Contact Us',
    component: () => import('../views/General/ContactUs.vue')
  },
  {
    path: '/policies',
    name: 'Policies',
    component: () => import('../views/General/Policies.vue')
  },
  // ***** GENERAL PAGES END *****


  // ***** PROFILE START *****
  {
    path: '/user',
    beforeEnter: Guard.user,
    component: () => import('../views/User/UserIndex.vue'),
    children: [
      {
        path: '',
        name: 'User Profile',
        beforeEnter: Guard.user,
        component: () => import('../views/User/UserProfile.vue')
      },
      {
        path: 'favorites',
        name: 'User Favorites',
        beforeEnter: Guard.user,
        component: () => import('../views/User/UserFavorites.vue')
      },
      {
        path: 'history',
        name: 'User History',
        beforeEnter: Guard.user,
        component: () => import('../views/User/UserHistory.vue')
      },
      {
        path: 'orders',
        name: 'User Orders',
        beforeEnter: Guard.user,
        component: () => import('../views/User/UserOrders.vue')
      },
      {
        path: 'support',
        name: 'User Support Tickets',
        beforeEnter: Guard.user,
        component: () => import('../views/User/UserSupportTickets.vue')
      },
    ]
  },
  // ***** PROFILE END *****
  

  // ***** COURSES START *****
  {
    path: '/courses/:course_id',
    name: 'Course',
    component: () => import('../views/Courses/Course.vue'),
    children: [
      {
        path: '',
        name: 'Course',
        component: () => import('../views/Courses/CourseContent.vue'),
      },
      {
        path: '/courses/:course_id/lessons',
        name: 'Course Lessons',
        beforeEnter: Guard.user,
        component: () => import('../views/Courses/CourseArea.vue'),
      },
      {
        path: '/courses/:course_id/schedule',
        name: 'Course Schedule',
        beforeEnter: Guard.user,
        component: () => import('../views/Courses/CourseSchedule.vue'),
      },
    ]
  },
  {
    path: '/courses/:course_id/lessons/:lesson_id',
    name: 'Lesson',
    component: () => import('../views/Courses/Lesson.vue'),
  },
  // ***** COURSES END *****


  // ***** ORDERS START *****
  {
    path: '/orders',
    beforeEnter: Guard.user,
    component: () => import('../views/Orders/Order.vue'),
  },
  {
    path: '/orders/success',
    beforeEnter: Guard.user,
    component: () => import('../views/Orders/OrderSuccess.vue'),
  },
  // ***** ORDERS END *****


  {
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/Errors/PageNotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  
  base: process.env.BASE_URL,
  routes
})

function hasQueryParams(route) {
  return !!Object.keys(route.query).length
}

router.beforeEach((to, from, next) => {
  document.title = 'GOLDENS | ' + to.name;

  window.scrollTo(0, 0);
  if(!hasQueryParams(to) && hasQueryParams(from)){
   next({name: to.name, query: from.query});
 } else {
   next()
 }
})

export default router
