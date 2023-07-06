const OrderState = {
    namespaced: true,

    state: {
        order: null
    },

    getters: {
        order: state   => state.order,
    },

    mutations: {
        SET_ORDER(state, order) {
            state.order = order ?? {};
        },
    },

    actions: {
       // eslint-disable-next-line no-empty-pattern
       getCoupon({}, code) {
            return new Promise((resolve) => {
                axios.get('orders/coupon?code=' + code)
                    .then(res => {
                        return resolve(res.data.data);
                    })
                    .catch(err => {
                        warning(err);
                        resolve(null);
                    })
            })
        },
      
        getUserLastOrder({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('orders/recent')
                    .then(res => {
                        commit('SET_ORDER', res.data.data);
                        resolve()
                    }).catch(() => {   
                        reject()
                    })
            })
        },

        submitOrder({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('orders', data)
                    .then(res => {
                        commit('SET_ORDER', res.data.data);
                        resolve(res.data.data)
                    }).catch(() => {   
                        reject()
                    })
            })
        },

    }
};

export default OrderState;