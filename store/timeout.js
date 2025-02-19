//引用vuex
import store from './index.js';
export const timeOut = () => {
	// 上一次点击时间
	let lastTime = null
	// 当前时间
	let currentTime = null       
	// 超时时间【可以自己设置】
	let sys_timeout = 5 * 60 * 1000
	// 每隔多长时间检查是否超时【可以自己设置】
	let check_time = 5 * 60 * 1000
	// 计时器【此为功能实现的方法，现在为空】	
	let goOut = null
	const isTimeOut = () => {
	  // 页面上一次的点击时间
	  lastTime = store.state.lastTime
	  currentTime = new Date().getTime()
	  // 超时了
	  if((currentTime - lastTime) > sys_timeout) {
	    return true;
	  } else {
	    return false;
	  }
	}
	const isLoginOut = () => {
		clearInterval(goOut);
        //setInterval方法来确定多长时间检测一次有没有超时
		goOut = setInterval(() => {
		// 判断一下是否超时，如果超时了就退出
		if (isTimeOut()) {
			// 需要转到的页面【这里用你自己的跳转方法和地址】
		    uni.reLaunch({
		      	url: `/pages/AddGoods/AddGoods`,
		    });
			//已经超时跳转到相应界面，不需要计时了
		    clearInterval(goOut)
		  }else {
			  
		  }
		}, check_time);   
	}
	isLoginOut();
}