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
            state.order = order;
        },
    },

    actions: {
       getCoupon({}, code) {
            return new Promise((resolve, reject) => {
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

        submitOrder({ commit }, data) {
            return new Promise((resolve) => {
                axios.post('orders', data)
                    .then(res => {
                        commit('SET_ORDER', res.data.data);
                    }).finally(() => {
                        resolve()
                    });
            })
        },

    }
};

export default OrderState;