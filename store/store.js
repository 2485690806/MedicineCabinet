import Vue from 'vue'
import Vuex from 'vuex'
import Common from '@/store/common.js'

Vue.use(Vuex)

const store =new Vuex.Store({
  modules:{    
	m_common:Common,	
  },
})

export default store