const state = {
    manager: {
        dropMenu: {

        }
    }
};

const getters = {
    manager: state => state.manager
};

const actions = {};

const mutations = {
    addDropMenu(state, payload) {
        state.manager.dropMenu[payload.uuid] = payload.instance;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};