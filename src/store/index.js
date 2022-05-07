import Vue                  from 'vue'
import Vuex                 from 'vuex'

import UserState            from './modules/UserState'
import AppState            from './modules/AppState'
import AuthState            from './modules/AuthState'
import SupportState         from './modules/SupportState'
import ContentState         from './modules/ContentState'
import MessageState         from './modules/MessageState'
import OrderState         from './modules/OrderState'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserState,
    AppState,
    AuthState,
    SupportState,
    ContentState,
    MessageState,
    OrderState,
  }
})
