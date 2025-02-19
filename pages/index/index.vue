<template>
	<view class="container">
		<view class="TopImg" style="background:url('/static/noproduct.jpg'); background-repeat: no-repeat; background-size:100% 100%;">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				indicator-active-color="#fff">
				<swiper-item v-for="(good,index) in picData" :key="index">
					<image :src="good.username" alt="" class="Img" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view style="width: 10vw;height: 10vw;position: absolute;top:0;left: 0;" @longpress="longpress"></view>


		<view class="body">
			<view class="list icon1" @click="TurnToGoods">
				<image src="/static/iconindex2.svg" alt="" class="image1" mode="aspectFit">
			</view>
			<view v-if="false" class="list icon2" @click="TurnToLiquid">
				<image src="/static/iconindex1.svg" alt="" class="image2" mode="aspectFit">
			</view>

			<view class="list icon3" @click="TurnToHelp">
				<image src="/static/iconindex3.svg" alt="" class="image3" mode="aspectFit">
			</view>
		</view>
		<view class="textlist">
			<text>Purchase goods</text>
			<text v-if="false">购买液体</text>
			<text>Common problems</text>
		</view>
		<!-- 二维码 -->
		<view class="QRcode" v-if="false">
			<view class="gongzonghao">
				<image src="../../static/gongzhonghao.jpg" mode="aspectFit"></image>
				<text class="text">关注公众号</text>
			</view>
			<view class="XiaoChengXu">
				<image src="../../static/WeChatLogo1.jpg" mode="aspectFit"></image>
				<text class="text">小程序充值</text>
			</view>
			<view class="Kefu">
				<image src="../../static/qiyeWeiXin.png" mode="aspectFit"></image>
				<text class="text">添加客服</text>
			</view>

			<view class="helpIcon">
				<!-- <image src="/static/helpicon.svg" alt="" class="img" mode="aspectFit"> -->
				<view class="helpbox" @click="TurnToHelp">
					<text class="help">常见问题</text>
				</view>
				<view class="Msgbox" @click="TurnToMsg">
					<text class="help">其他信息</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    var AfDocument = uni.requireNativePlugin("Aq-ChooseFile");
	export default {
		data() {
			return {

				list4: [{
					// 视频地址
					url: '/static/syjMP4.mp4',
					// 显示的标题
					title: '',
					// 切换时封面
					poster: ''
				}, ],
				showVideo: false,
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 1000,
				picData: [],
				timer: null,
				timer2: null,
				reStimer:null,
				xdtimeer:null
			}
		},
		onLoad() {
			var that = this;
			
			let sysinfo = uni.getSystemInfoSync();
			that.deviceId = sysinfo.deviceId;
			that.sysinfo = sysinfo;
			
			that.DOCPATH = uni.getStorageSync("DOCPATH");///storage/emulated/0/Android/data/uni.UNI40A4911/apps/__UNI__40A4911/doc/
			setInterval(function(){
				uni.request({
				    url: "https://duola.yunchuang.store/vending/register.php?dev="+that.deviceId,
				    data: {
				        text: 'request'
				    },
				    success: (res) => {
						//console.log("beats",res);
					}
				});
			},10000);
		},
		onShow() {
			/*uni.navigateTo({
				url: "/pages/AddGoods/AddGoods"
			});*/
			
			
			
			/************测试空间*/
			//uni.setStorageSync("list_img",true);
			//console.log(uni.env);

	
			/************测试空间*/
			
			
			
			
			
			//uni.setStorageSync("storeId","")
			
			if (uni.getStorageSync('storeId') == '' || uni.getStorageSync('storeId') == null || uni.getStorageSync(
					'storeId') == undefined) {
				uni.navigateTo({
					url: "/pages/Login/Login"
				})
			};
			this.storeId = uni.getStorageSync('storeId');
			if (uni.getStorageSync('IndexPic') == '' || uni.getStorageSync('storeId') == null || uni.getStorageSync(
					'storeId') == undefined) {
				this.getPic();
				
			} else {
				this.picData = uni.getStorageSync('IndexPic');
				this.getPic();
			}
			// this.handleTouchStart()
			// this.resetTimer();

			// console.log(this.$refs.myVideo);
			// this.ceshi()
			
			// this.reStimer = setTimeout(()=>{
			// 	plus.runtime.restart();
			// },1800000)
		},
		beforeDestroy() {
			// clearTimeout(this.reStimer);
			// clearTimeout(this.timer2);
			// this.timer2 = null;
		},
		onHide() {
			//clearInterval(this.xdtimeer);
			// this.showVideo = false
			// this.close()
			// clearTimeout(this.timer);
			// clearTimeout(this.timer2);
			// this.timer2 = null;
			// this.timer = null;
		},
		methods: {
			// 申请定位权限
			requestLocation(){
				plus.android.requestPermissions(['android.permission.READ_EXTERNAL_STORAGE','android.permission.WRITE_EXTERNAL_STORAGE'], function(e){
					if(e.deniedAlways.length>0){	//权限被永久拒绝
						// 弹出提示框解释为何需要定位权限，引导用户打开设置页面开启
						console.log('Always Denied!!! '+e.deniedAlways.toString());
					}
					if(e.deniedPresent.length>0){	//权限被临时拒绝
						// 弹出提示框解释为何需要定位权限，可再次调用plus.android.requestPermissions申请权限
						console.log('Present Denied!!! '+e.deniedPresent.toString());
					}
					if(e.granted.length>0){	//权限被允许
					    //调用依赖获取定位权限的代码
						console.log('Granted!!! '+e.granted.toString());
					}
				}, function(e){
				    console.log('Request Permissions error:'+JSON.stringify(e));
				});
			},
			longpress(){
				let password = uni.getStorageSync("password");
				if (!password) {
					password = "778899";
				}
				uni.showModal({
					title:"Please enter password",
					editable:true,
					placeholderText:"Please enter password",
					confirmText:"ok",
					cancelText:"cancel",
					success:(res)=>{
						if (res.confirm) {
							if (res.content == password) {
								console.log("back");
								plus.runtime.quit();
							} else {
								uni.$showMsg("password error");
							}
						}
					}
				});
			},
			close() {
				this.showVideo = false
				// 关闭弹窗时暂停视频播放
				uni.createVideoContext('myVideo', this).pause()
				this.resetTimer();
			},	
			//退出全屏时停止
			fullscreenchange(e) {
				if (e.detail.fullScreen) {
					let videoContext = uni.createVideoContext('myVideo', this)
					videoContext.exitFullScreen()
					this.showVideo = false
					this.resetTimer();
				}
			},
			resetTimer() {
				clearTimeout(this.timer2);
				this.timer2 = setTimeout(() => {
					this.showVideo = true

					let videoContext = uni.createVideoContext('myVideo', this)
					videoContext.requestFullScreen()

				}, 60000); // 设置1分钟定时器
			},
			handleTouchStart() {

				this.showVideo = false
				this.resetTimer();

				this.close()

				this.pauseVideoAndBack();
			},

			pauseVideoAndBack() {

				const videoContext = uni.createVideoContext('myVideo', this);
				videoContext.pause(); // 暂停视频
				// videoContext.exitFullScreen(); // 退出全屏
				this.showVideo = false
				this.$forceUpdate();
			},


			async getPic() {
				var that = this;
				/*const {
					data: res
				} = await uni.$http.get(`https://duola.yunchuang.store/flowermachine/api/getPic.php?storeId=${this.storeId}`);
				*/
			   let goods = uni.getStorageSync("goods");
			   let goodspic = [];
			   if (goods && goods.code==200) {
				  for (var i = 0; i < goods.data.length; i++) {
					  if (goods.data[i].status) {
					  	goodspic.push({
					  		"id": goods.data[i].doorid,
					  		"reqType": "CarouselMap",
					  		"phone": null,
					  		"username": goods.data[i].imageUrl,
					  		"question": null,
					  		"storeName": "1"
					  	});
					  }				  	
				  }
			   } 
			   else {
				   uni.$showMsg(res.message);
				   return;
				   
			   }
			   
			   if (!goodspic.length) {
					goodspic.push({
						"id": 1,
						"reqType": "CarouselMap",
						"phone": null,
						"username": that.DOCPATH + "../www/static/noproduct.jpg",
						"question": null,
						"storeName": "1"
					});
			   } else {
				   if (1) {
					
				   } else{
				   	
				   }
			   }
				console.log("goodspic",goodspic);

				this.picData = goodspic;
				uni.setStorageSync('IndexPic', this.picData);
			},
			// turnToFunction(){
			// 	uni.navigateTo({
			// 		url:'/pages/functionDebugging/functionDebugging'
			// 	})
			// },
			TurnToMsg() {
				uni.navigateTo({
					url: '/pages/OtherMsg/OtherMsg'
				})
			},
			TurnToHelp() {
				uni.navigateTo({
					url: '/pages/Help/Help'
				})
			},
			TurnMeal() {
				uni.navigateTo({
					url: '/pages/SetMeal/SetMeal'
				})
			},
			TurnToLiquid() {
				uni.navigateTo({
					url: '/pages/AddLiquid/AddLiquid'
				});
			},
			TurnToGoods() {
				//this.requestLocation();
				uni.navigateTo({
					url: '/pages/AddGoods/AddGoods'
				});
			},
			
			 
			
			

		}
	}
</script>

<style lang="scss" scoped>
	/deep/ .uni-video-cover {
		display: none;
	}

	.VideoText {
		color: white;
		height: 0;
		font-size: 3vw;
		position: relative;
		display: flex;
		justify-content: center;
		top: 9vh;
		    letter-spacing: 6px;
		
	}

	.videoClass {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		background: black;
		align-items: center;
		display: flex;
	}

	.CancerVideo {
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 99999;
	}

	uni-video {
		width: 100vw;
		height: 100vh;
	}

	// /deep/ .uni-video-video {
	// 	object-fit: cover !important;
	// }

	page {
		background-color: #fff;
	}

	//    .ceshi{
	//  width: 10vw;
	//  height: 5vh;
	//  background-color: #628ed8;
	//  font-size: 5vw;
	//  margin-top: 3vh;
	//  display: flex;
	//  justify-content: center;
	//  align-items: center;
	// }


	.QRcode {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 92.8vw;
		height: 13.5vh;
		margin: 3vw;
		margin-top: 7.7vh;
		border-radius: 2vw;
		background-color: #edf0f4;
		position: absolute;
		bottom: 10rpx;

		image {
			width: 16vw;
			height: 16vw;
			// margin-left: 3vw;
		}



		.helpIcon {
			// width: 21vw;
			// height: 12vw;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.Msgbox {
				width: 21vw;
				height: 8vw;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 1vh;
				background-color: #77b0dd;
				border-radius: 1vw;

				.help {
					color: #fff;
					font-size: 4vw;
					// font-weight: 700;
				}
			}

			.helpbox {
				background-color: #77b0dd;
				width: 21vw;
				height: 8vw;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 1vw;

				.help {
					color: #fff;
					font-size: 4vw;
					// font-weight: 700;
				}
			}


		}

		.helpbox:active {
			background-color: rgba(155, 187, 229, 0.6);
		}

		.Msgbox:active {
			background-color: rgba(155, 187, 229, 0.6);
		}

		.XiaoChengXu {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.text {
				font-size: 3.5vw;
				// color: rgba(80, 80, 80, 1);
				font-weight: 700;
				margin-top: 1vh;
			}
		}

		.gongzonghao {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.text {
				font-size: 3.5vw;
				// color: rgba(80, 80, 80, 1);
				font-weight: 700;
				margin-top: 1vh;
			}
		}

		.Kefu {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.text {
				font-size: 3.5vw;
				// color: rgba(80, 80, 80, 1);
				font-weight: 700;
				margin-top: 1vh;
			}
		}
	}


	.textlist {
		height: 4vh;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 1vh;

		text:nth-child(1) {
			font-size: 4vw;
			color: #e9bb68;
			font-weight: 700;
		}

		text:nth-child(2) {
			font-size: 4vw;
			color: #628ed8;
			font-weight: 700;
		}

		text:nth-child(3) {
			font-size: 4vw;
			color: #77b0dd;
			font-weight: 700;
		}
	}

	.body {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 4vh;

		.icon1 {
			background-color: #e9bb68;
		}

		.icon2 {
			background-color: #628ed8;
		}

		.icon3 {
			background-color: #77b0dd;
		}

		.list {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			border-radius: 50%;
			padding: 5rpx;
			height: 24vw;
			width: 24vw;
			box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(200, 200, 199, 1.0);

			.image1 {
				width: 13vw;
				height: 13vw;
			}

			.image2 {
				width: 16vw;
				height: 16vw;
			}

			.image3 {
				width: 14vw;
				height: 14vw;
			}

		}

		.list:active,
		{
		background-color: rgba(155, 187, 229, 0.6);
	}
	}

	.TopImg {
		// height: 56vh;
		height: 120vw;
		width: 100%;



		.swiper {
			height: 100%;
			width: 100%;
		}

		.Img {
			height: 100%;
			width: 100%;
		}
	}

	image {
		will-change: transform
	}
</style>