export default{
	//开启命名空间
	namespaced:true,
	//数据
	state:()=>({		
		
		storeId:'',		
	}),
	 
	//方法 
	mutations:{			
		updatestoreId(state,storeId){
			state.storeId=storeId;		
			this.commit('storeId/saveStoreIdToStorage') 
		},
		saveStoreIdToStorage(state){
			uni.setStorageSync('storeId',state.storeId)
		},
		
	},
	
	getters:{
		
	}
}