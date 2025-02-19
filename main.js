
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import { $http } from '@escook/request-miniprogram'

// main.js
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


Vue.config.productionTip = false
//封装弹框的方法
uni.$showMsg=function(title='数据请求失败!',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

//uni.SP = uni.requireNativePlugin('Fvv-UniSerialPort');
// 导入网络请求包
uni.$http=$http
//请求的根路径
// $http.baseUrl='http://175.178.150.60:8096' ;
$http.baseUrl='https://shht.wteam.club/api';
// $http.baseUrl='https://thj.wteam.club/thj' ;

//请求开始前
// $http.beforeRequest=function(options){
//   uni.showLoading({
//   	title:'数据加载中...', 
//   }) 
//   // 判断请求头
//    // if(store.state.m_user.head==''){
//    //         store.state.m_user.head='';
//    //    }else{
//    //        options.header.Authorization=store.state.m_user.token;
//    //    }
	
// }
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})


// #ifdef APP-PLUS
	let main = plus.android.runtimeMainActivity();
	//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
	/*plus.runtime.quit = function() {
		// main.moveTaskToBack(false);
		startRestartTimer()			
	};*/
	//重写toast方法如果内容为 ‘再次返回退出应用’ 就隐藏应用，其他正常toast 
	plus.nativeUI.toast = (function(str) {
		/*if (str =='再次返回退出应用') {
			// plus.runtime.quit();
			startRestartTimer();
		} else {
			uni.showToast({
				title: '再次返回退出应用',//可以自定义其他弹出显示的内容
				icon: 'none'
			})
		}*/
		plus.runtime.quit();
	});
// #endif



app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif




// main.js 或 App.vue
let restartTimer

function startRestartTimer() {
  restartTimer = setTimeout(() => {
    // 重新启动应用
    restartApp()
  }, 5000) // 设置定时器时间，单位为毫秒，这里是5秒
}

function restartApp() {
  // 调用 uni.reLaunch 方法重新启动应用
  uni.reLaunch({
    url: '/pages/AddGoods/AddGoods' // 设置首页路径
  })
  // uni.reLaunch({
  //   url: '/pages/index/index' // 设置首页路径
  // })
}

// 清除定时器的方法，可在需要的地方调用
function clearRestartTimer() {
  if (restartTimer) {
    clearTimeout(restartTimer)
    restartTimer = null
  }
}






uni.prefix = function(num, n) {
    return (Array(n).join(0) + num).slice(-n);
}

uni.crc = function(buffers) {
  let buffer = [];
  for (let i = 0; i < buffers.length; i += 2) {
	buffer.push("0x"+buffers.substring(i, i + 2));
  }
	
	//console.log(buffer);
  var crc = 0xFFFF;
  var i, j, l;
  
  for (i = 0, l = buffer.length; i < l; i++) {
    crc ^= buffer[i];
    
    for (j = 0; j < 8; j++) {
      if (crc & 0x0001) {
        crc = (crc >> 1) ^ 0xA001;
      } else {
        crc = crc >> 1;
      }
    }
  }
  
  // 将结果拆分为低字节和高字节
  var crcLow = crc & 0xFF;
  var crcHigh = (crc >> 8) & 0xFF;
  
  // 返回校验结果
  return [uni.prefix(crcLow.toString(16),2), uni.prefix(crcHigh.toString(16),2)];
}

uni.filewrite = function(url,data){
	plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(success) {
		success.root.getFile(url, {
			create: true
		}, function(fileEntry) {
			console.log('创建了一个新的文件',(fileEntry) );
			var Path = fileEntry.toURL(); //获取当前文件的路径
			console.log('当前路径',Path);
			fileEntry.createWriter(function(rd) {
				rd.write(data);
				console.log('写入成功',rd);
			}, function(e) {
				console.log('写入失败',e);
			});
		});
	}, function(e) {
		console.log('我是调用失败的回调',e);
	})
}


uni.fileget = function(url){
	let turl = "_doc/"+url;
	console.log("turl",turl);
	plus.io.resolveLocalFileSystemURL(turl, function(entry) {
		console.log("读取文件",entry);
		
		entry.file(function(file) {
			console.log("entry",file);
			var fileReader = new plus.io.FileReader();
			fileReader.readAsText(file, 'utf-8');
			fileReader.onloadend = function(evt) {
				console.log("内容:",evt);
				//return evt.target.fileName;
			}
		});
	});
}


// 读取json文件
uni.getJsonData = function(path) { //path:路径
	console.log("getData");
	return new Promise(resolve => { //文件读写是一个异步请求 用promise包起来方便使用时的async+await
		plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, fs => { //请求文件系统
				fs.root.getFile(
					path, { //请求地址文件  '/storage/emulated/0/config.txt'为根目录  '/config.txt'为/storage/Android/data/io.dcloud.HBuilder（包名）/documents/config.js
						create: true //当文件不存在时创建
					}, fileEntry => {
						fileEntry.file(function(file) {
							let fileReader = new plus.io
								.FileReader(); //new一个可以用来读取文件的对象fileReader
							fileReader.readAsText(file, "utf-8"); //读文件的格式
							fileReader.onerror = e => { //读文件失败
								console.log("获取文件失败", fileReader.error);
								plus.nativeUI.toast("获取文件失败,请重启应用", {
									background: "rgba(255, 255, 255, 0.6)",
								});
								return;
							};
							fileReader.onload = e => { //读文件成功
								console.log("读取文件成功");
								let txtData = e.target.result;
								// console.log(txtData);
								resolve(txtData); //回调函数内的值想返回到函数外部  就用promise+resolve来返回出去
							};
						});
					}, error => {
						console.log("2新建获取文件失败", error);
						plus.nativeUI.toast("获取文件失败,请重启应用", {
							background: "rgba(255, 255, 255, 0.6)",
						});
						return;
					});
			},
			e => {
				console.log("1请求文件系统失败", e.message);
				plus.nativeUI.toast("请求系统失败,请重启应用", {
					background:  "rgba(255, 255, 255, 0.6)",
				});
				return;
			}
		);
	});
};

uni.channel = function(c){
	let datalist = [];
	switch (c) {
	  case 1:
		datalist = uni.getStorageSync("list1");
		break;
	  case 2:
		datalist = uni.getStorageSync("list2");
		break;
	  case 3:
		datalist = uni.getStorageSync("list3");
		break;
	  case 4:
		datalist = uni.getStorageSync("list4");
		break;
	  case 5:
		datalist = uni.getStorageSync("list5");
		break;
	  default:
	  	datalist = uni.getStorageSync("list6");
	  	break;
	}
	return datalist;
}