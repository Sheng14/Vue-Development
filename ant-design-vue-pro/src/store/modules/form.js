import router from '../../router/index';
import request from '../../utils/request';

const state = {
    step: {
        payAccount: "123456"
    }
}

const actions = {
    async submitStepForm( {commit}, {payload} ) {
        await request({
            url: "/api/form",
            method: "POST",
            data: payload
        }); // 调用mock数据假装提交表单
        commit("saveStepFormData", payload); // 交给mutations修改state
        router.push('/form/step-form/result');
    }
}

const mutations = {
    saveStepFormData(state, { payload }) {
        state.step = {
            ...state.step,
            ...payload
        } // 用payload修改step，都展开了修改
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}