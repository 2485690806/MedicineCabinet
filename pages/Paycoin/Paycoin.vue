<template>
	<view>
		<uni-nav-bar height="6vh" :border="false" left-icon="left" title="Paper currency machine payment" @clickLeft="back" />		
		<view class="text">
			<view class="tips">
				<view class="details">
					<text>You need to pay ${{Number(Totalmoney).toFixed(2)}}</text>
				</view>
				<view class="details">
					<view>Received ${{Number(GETmoney).toFixed(2)}}</view>
				</view>
			</view>
		</view>
		<view class="PayPic">
			<view class="pic">
				<image :src="Imageurl" mode="aspectFit" class="img"></image>
			</view>
		</view>
		<view class="plasticBottles">
			<view class="text">
				<text>{{name}}</text>

			</view>
		</view>
		<view class="Carbonbox">
			<view class="detailsbox">
				<view class="two">
					<text>Please deposit coins</text>
				</view>
				<view class="three">
					<text>{{pickup}}</text>

				</view>
			</view>
		</view>
		<!-- 提示 -->
		<uni-popup ref="popup2" background-color="#fff" duration="3000" @change="ClosePop2">
			<view class="PoPIndex1">
				<view class="PoTitle1" style="color: rosybrown;">
					Tips
				</view>
				<view class="PoDesc1 XianSaoMa">
					{{ Tips }}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const SPcoin = uni.requireNativePlugin('Fvv-UniSerialPort');
	const SP = uni.requireNativePlugin('Fvv-UniSerialPort');
	const SP24 = uni.requireNativePlugin('Fvv-UniSerialPort');
	
	export default {
		data() {
			return {
				// 倒计时秒数
				Seconds: 100,
				//定时器
				timer: null,
				pickup:"Please make payment before picking up the goods",
				Tips: '',
				name:"No products available",
				GETmoney:0,
				doorid:0,
				Imageurl:"../../static/PaySuccessbotton.png",
				Totalmoney:99999,
				TimeOut: '',
				deviceId:"",
				sysinfo:""
			};
		},
		onLoad() {
			let that = this;
			let sysinfo = uni.getSystemInfoSync();
			that.deviceId = sysinfo.deviceId;
			that.sysinfo = sysinfo;
			that.timeup();
			
			that.shopCarList = uni.getStorageSync('shopCarList');

			that.name = that.shopCarList[0].name;
			that.Totalmoney = parseFloat(that.shopCarList[0].price);
			
			
			that.Imageurl = that.shopCarList[0].img;
			
			if(that.shopCarList.length<1){
				console.log('小于1,要做错误判断');
			}
			
			let doorid = that.shopCarList[0].doorid;
			that.doorid = doorid;		
			
			
			that.GETmoney = Number(uni.getStorageSync("GETmoney"));
			
			if ( that.GETmoney >= that.Totalmoney ) {
				
				
				uni.request({
				    url: "https://duola.yunchuang.store/vending/status.php?dev="+that.deviceId+"&total_fee="+(that.GETmoney),
				    data: {
				        text: 'request'
				    },
				    success: (res) => {}
				});
				
				that.GETmoney =that.GETmoney - that.Totalmoney;
				uni.setStorageSync("GETmoney",that.GETmoney)
				
				SPcoin.close();
				
				
				uni.setStorageSync('shopPayList', that.shopCarList);
				uni.navigateTo({
					url: "/pages/PaySuccess/PaySuccess?data="+that.doorid
				});
			}

		},
		onShow() {
			let that = this;
			setTimeout(function(){
				if(that.doorid){
					// 支付
					that.Tocash();
				}
			},1000);
			
		},
		onHide() {
			console.log("SPcoin close");
			clearInterval(this.timer);
			this.closePort();
		},
		onUnload() {
			clearInterval(this.timer);
			this.closePort();
		},
		watch: {
			Seconds(newval) {
				let that = this;
				if (newval <= 0) {
					clearInterval(that.timer);
					uni.reLaunch({
						url: "/pages/AddGoods/AddGoods",
						animationType: "slide-in-left",
					})
					// uni.reLaunch({
					// 	url: "/pages/index/index",
					// 	animationType: "slide-in-left",
					// })
				}
			}
		},
		methods: {
			Tocash() {
				this.dodevcoin();
			},
			dodevcoin(){
				let that = this;		
				let devcoin = uni.getStorageSync("devcoin");
				// let id16 = that.doorid.toString(16);
				// id16 = uni.prefix(id16,2);
				SPcoin.setBaudRate(115200);
				SPcoin.setStopBits(1);
				SPcoin.setDataBits(8);
				SPcoin.setParity(0);
				SPcoin.setPath(devcoin);

				SPcoin.open(res => {
					if(!res.status){
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon:"none"
						}); 
						return
					}  
					uni.showToast({
						title: "cash-connected",
						duration: 2000, 
					});
	
					
					/*****************************************/
					SPcoin.onMessageHex(rec => {
						console.log("rec0",rec);	
						rec = rec.toLowerCase();
						
						
						if( rec.substring(0, 4) == "4858" ){
							let puls = rec.substr(rec.length - 1, 1);
							let money = uni.getStorageSync("coinpuls"+puls)
							
							
							that.GETmoney += Number(money);
							uni.setStorageSync("GETmoney",that.GETmoney)
							console.log('已收款',that.GETmoney);
							if ( that.GETmoney >= that.Totalmoney ) {
								
								
								uni.request({
								    url: "https://duola.yunchuang.store/vending/status.php?dev="+that.deviceId+"&total_fee="+(that.GETmoney),
								    data: {
								        text: 'request'
								    },
								    success: (res) => {}
								});
								
								that.GETmoney =that.GETmoney - that.Totalmoney;
								uni.setStorageSync("GETmoney",that.GETmoney)
								
								SPcoin.close();
								
								
								uni.setStorageSync('shopPayList', that.shopCarList);
								uni.navigateTo({
									url: "/pages/PaySuccess/PaySuccess?data="+that.doorid
								});
							}
						}				
					},send => {
						console.log("send0",send);
					});
					/********************************以上是侦听信息***************/
					

					setTimeout(function(){			
						console.log("投币器OK");
					},1000);
				});
			},
			// 判断是否打开串口，如果打开了，就return，没有就打开（打开关闭会占用资源）
			// 售货
			IsOpenPort() {
				
			},
			//关闭串口
			closePort() {
				SPcoin.close();
			},
			HaveError(message) {
				this.Tips = message
				this.$refs.popup2.open('center')
				this.TimeOut = setTimeout(() => {
					this.$refs.popup2.close('center')
				}, 9000)

			},
			ClosePop2() {
				clearTimeout(this.TimeOut)
			},
			// 倒计时回调
			timeup() {
				let that = this;
				that.timer = setInterval(() => {
					that.Seconds -= 1;
				}, 1000);				
			},
			back() {
				uni.reLaunch({
					url: "/pages/AddGoods/AddGoods",
					animationType: "slide-in-left",
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.plasticBottles {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2vh;

		.text {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 10vw;
			font-weight: 700;
		}
	}

	.BottleBox {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3vh;

		.pic {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 15vw;
			height: 15vw;
		}

		.img {
			width: 100%;
			height: 100%;
		}
	}

	.Carbonbox {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 5vh;
	}

	.detailsbox {
		font-size: 4vw;
		// color: #;		
		line-height: 3vh;
		margin-top: 2vh;
		padding: 3vw;
		font-weight: 700;

		.three,
		.two {
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
	}

	.successtips {
		color: #000000;
		line-height: 4vh;
		margin-top: 1vh;
		padding: 3vw;

		.one,
		.two,
		.three {
			font-weight: 700;
		}

		.one {
			font-size: 4vw;
			font-weight: 700;
			margin-left: 10vw;
		}

		.two,
		.three {
			font-size: 4vw;
			margin-left: 13vw;
		}
	}

	.textbox {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 10vh;

		.count {
			font-size: 9vw;
			color: #7dbbea;
		}
	}

	.PoPIndex1 {
		width: 80vw;
		min-height: 20vh;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		align-content: center;

		.PoTitle1 {
			text-align: center;
			margin-top: 2vh;
			margin-bottom: 1vh;
			font-size: 3.5vw;
			font-weight: 900;
		}

		.PoDesc1 {
			font-size: 3vw;
			color: rgba(86, 116, 133, 1);
			margin-bottom: 2vh;
			line-height: 2vh;
		}

		.XianSaoMa {
			margin-top: 3vh;
			width: 70vw;
			text-align: center;
			line-height: 2vh;
		}
	}

	.tips {
		// display: flex;
		// justify-content: center;
		// align-items: center;
		font-size: 6vw;
		// color: #00aaff;
		// font-weight: 700;
		line-height: 5vh;
		padding: 5vw;
		margin: 3vw;

		.details {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.text {
		margin-top: 2vh;

	}

	.text,
	.tipsbox {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.PayPic {
		// margin-top: 5vh;
		// width: 60vw;
		// height: 32vh;
		display: flex;
		justify-content: center;
		align-items: center;

		.pic {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 60vw;
			height: 32vh;

			.img {
				width: 100%;
				height: 100%;
			}
		}

	}

	/deep/.uni-navbar--border {
		border-bottom-width: 0;
	}

	/deep/ .uni-navbar__header {
		height: 7vh !important;
		background-color: #77b0dd !important;
		line-height: 100px;
	}

	/deep/ .uni-nav-bar-text {
		font-size: 5vw !important;
		color: white !important;
		font-weight: 900;
	}

	/deep/ .uni-navbar-btn-text uni-text {
		font-size: 3vw !important;
		font-weight: 900;
		color: white !important;
	}

	/deep/ .uni-navbar__header-btns-left {
		width: auto !important;
	}

	/deep/ .uni-navbar__content_view uni-text {
		font-size: 6vw !important;
		color: white !important;
		font-weight: 900;
	}

	/deep/ .uni-navbar__header-btns-right {
		width: 0 !important;
	}
</style>