import Vue                  from 'vue'
import Vuex                 from 'vuex'

import UserState            from './modules/UserState'
import AuthState            from './modules/AuthState'
import CourseCategoryState            from './modules/CourseCategoryState'
import MessageState            from './modules/MessageState'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserState,
    AuthState,
    CourseCategoryState,
    MessageState,
  }
})
