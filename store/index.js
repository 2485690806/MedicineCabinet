import Vue from 'vue'
import Vuex from 'vuex'
 
 
Vue.use(Vuex)
 
const store = new Vuex.Store({
    state: {
		// 记录最后一次点击时间的元素
		lastTime:new Date().getTime(),		
	},
    mutations: {
        //点击事件调用，刷新最后一次点击时间
		lastTimeUpdata: (state, lastTime) => {
		    state.lastTime = lastTime;
		}
	},
    actions: {}
})
export default store