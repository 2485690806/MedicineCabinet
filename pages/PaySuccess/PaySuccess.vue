<template>
	<view>
		<uni-nav-bar height="6vh" :border="false" left-icon="left" title="In shipment" @clickLeft="back" />
		<view class="text">
			<view class="tips">
				<view class="details">
					<text>Thank you for your support!</text>
				</view>
				<view class="details">
					<text>{{pickup}}</text>
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
				<text>{{productname}}</text>

			</view>
		</view>
		<view class="Carbonbox">
			<view class="detailsbox">
				<view class="two">
					<text>Please collect the g oods in a timely manner</text>

				</view>
				<view class="three">
					<text>If you have any questions, please contact us</text>
				</view>
			</view>
		</view>
		<!-- 提示 -->
		<uni-popup ref="popup2" background-color="#fff" duration="3000" @change="ClosePop2">
			<view class="PoPIndex1">
				<view class="PoTitle1" style="color: rosybrown;">
					温馨提示
				</view>
				<view class="PoDesc1 XianSaoMa">
					{{ Tips }}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const SP24 = uni.requireNativePlugin('Fvv-UniSerialPort');
	//const xdsp = uni.requireNativePlugin('Xd-serialPort');

	export default {
		data() {
			return {
				// 倒计时秒数
				Seconds: 20,
				//定时器
				timer: null,
				productname: "No products available",
				pickup: "Please claim the product",
				Imageurl: "../../static/SuccessPay.png",
				doorid: 0,
				Tips: '',
				datalist: [],
				channel: "",
				TimeOut: '',
				dev24: ''
			};
		},
		onLoad(e) {
			var that = this;
			try{
				clearInterval(that.timer);
				that.timer=null;
			}catch(e){
				//TODO handle the exception
			}
			that.timeup();

			that.shopPayList = uni.getStorageSync('shopPayList');
			if (!that.shopPayList) {
				uni.reLaunch({
					url: "/pages/AddGoods/AddGoods",
					animationType: "slide-in-left",
				})
				// uni.reLaunch({
				// 	url: "/pages/index/index",
				// 	animationType: "slide-in-left",
				// })
				return;
			}

			that.channel = that.shopPayList[0].channel;
			that.datalist = uni.channel(that.channel);
			that.productname = that.shopPayList[0].name;
			that.Totalmoney = that.shopPayList[0].price;
			that.Imageurl = that.shopPayList[0].img;

			let doorid = that.shopPayList[0].doorid;
			that.doorid = doorid;
			// try{
			// 	that.openTTL();
			// }catch(e){
			// 	//TODO handle the exception
			// }
			
			// uni.showToast({
			// 	title: "Shipping",
			// 	duration: 4000,
			// });
		},
		onShow() {
			this.dev24 = uni.getStorageSync("dev24");
			var that = this;
			let doorid = that.doorid;

			
			setTimeout(()=>{
				if (doorid) { //出货					
					that.ChuHuo(doorid);
					
						uni.showToast({
							title: 'Shipping...',
							duration: 12000,
						});
				}
			}, 2000);
		},
		onHide() {
			try{
				clearInterval(this.timer);
				this.closePort();
			}catch(e){
				//TODO handle the exception
			}
		},
		onUnload() {
			try{
				clearInterval(this.timer);
				this.closePort();
			}catch(e){
				//TODO handle the exception
			}
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
			ChuHuo(id) {
				// this.dodev24(id);  // ------ 原来命令
				let lie = id.substring(0, 1);
				let han = id.substring(1, 2);
				lie = parseInt(lie) + 1;
				
				
				try{
					this.opendoor(han, lie)
				}catch(e){
					//TODO handle the exception
				}
				try{
					this.dockJian(id);
				}catch(e){
					//TODO handle the exception
				}
			},
			dodev24(id) {
				let that = this;
				let dev24 = uni.getStorageSync("dev24");
				id = parseInt(id);
				let id16 = id.toString(16);
				id16 = uni.prefix(id16, 2);


				let dev24text = "585011" + id16 + "00004c";

				SP24.setBaudRate(115200);
				SP24.setStopBits(1);
				SP24.setDataBits(8);
				SP24.setParity(0);
				SP24.setPath(dev24);

				SP24.open(res => {
					if (!res.status) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: "none"
						});
						return
					}
					uni.showToast({
						title: "connected-24",
						duration: 2000,
					});



					SP24.onMessageHex(rec => {
						rec = rec.toLowerCase();
						console.log("rec0", rec);
						if (rec == "aa0b0102" + id16 + "0000000000bb") {
							console.log("门锁24已开" + id);
							that.pickup = "Please go to Gate " + id + " to receive the order";
							uni.$showMsg(
								"The transaction is successful and the door lock has been opened!",
								3000);
							that.closePort();
						}
						if (rec == "aa0b0103" + id16 + "0000000000bb") {
							console.log("出货OK-e" + id);
							that.pickup = "Please go to Gate " + id + " to receive the order";
							uni.$showMsg("Shipping success! " + id, 3000);
							that.closePort();
						}
					}, send => {
						console.log("send0", send);
						uni.setStorageSync('shopPayList', "");
					});




					let newgoods = [];
					for (var k = 0; k < that.datalist.length; k++) {
						if (that.datalist[k].doorid == id) {
							that.datalist[k].num = that.datalist[k].num - 1;
						}
						newgoods.push(that.datalist[k]);
					}
					that.datalist = newgoods;

					console.log("channel", that.channel);
					console.log("list", that.datalist);
					uni.setStorageSync('list' + that.channel, that.datalist);

					setTimeout(function() {
						SP24.sendHex(dev24text);
						console.log("正在出货中 " + id);
						uni.showToast({
							title: 'Shipping...',
							duration: 12000,
						});
					}, 1000);
				});
			},
			// 判断是否打开串口，如果打开了，就return，没有就打开（打开关闭会占用资源）
			// 售货
			IsOpenPort() {

			},
			//关闭串口
			closePort() {
				console.log("SP24.CLOSE");
				SP24.close();
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
				// uni.reLaunch({
				// 	url: "/pages/index/index",
				// 	animationType: "slide-in-left",
				// })
			},





			openTTL() {

				SP24.setBaudRate(115200);
				SP24.setStopBits(1);
				SP24.setDataBits(8);
				SP24.setParity(0);
				SP24.setPath(this.dev24);

				SP24.open(res => {
					if (!res.status) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: "none"
						});
						return
					}
					// uni.showToast({
					// 	title: "connected-24",
					// 	duration: 2000,
					// });
				});
				
				
				/*****************************************/
				SP24.onMessageHex(rec => {
				
					rec = rec.toLowerCase();
					console.log("rec0", rec);
					uni.$showMsg("door lock has been opened " + rec0, 3000);
					
					if (rec.substring(0, 10) == "5850110101") {
						console.log("出货OK-e" + id);

					}
				}, send => {
					console.log("send0", send);
				});
			},
			opendoor(han, lie) {
				console.log(han, lie);
				// console.log("opendoor",item);
				// let id = item.doorid;
				// id = parseInt(id);

				try {
					this.openTTL()
				} catch (e) {
					//TODO handle the exception
				}

				let that = this;

				setTimeout(() => {
					// han = parseInt(han);
					// lie = parseInt(lie);
					// let han16 = han.toString(16);
					// let lie16 = lie.toString(16);
					// // id16 = uni.prefix(id16,2);
					// han16 = uni.prefix(han16, 2);
					// lie16 = uni.prefix(lie16, 2);
					// let dev24text = "585011" + han16 + lie16 + "00004c";

					let dev24text = this.addition_isCorrect(han, lie)

					console.log(dev24text);

					setTimeout(() => {
						SP24.sendHex(dev24text);
						console.log("Opening " + id);
					}, 500);



				}, 500)
			},
			dockJian(id){
				
				let that = this;
				let newgoods = [];
				for (var k = 0; k < that.datalist.length; k++) {
					if (that.datalist[k].doorid == id) {
						that.datalist[k].num = that.datalist[k].num - 1;
					}
					newgoods.push(that.datalist[k]);
				}
				that.datalist = newgoods;
				
				console.log("channel", that.channel);
				console.log("list", that.datalist);
				uni.setStorageSync('list' + that.channel, that.datalist);
				
				// setTimeout(()=>{

				// 	uni.showToast({
				// 		title: 'Shipping Success',
				// 		duration: 12000,
				// 	});
				// }, 10000);
				
			},
			// 加密命令
			addition_isCorrect(row, clo) {
				// let row = 0x06;
				// let clo = 0x09;

				let javaStr = row.toString(16).padStart(2, '0') + clo.toString(16).padStart(2, '0');
				// console.log(javaStr);

				let bytes = this.hexStringToByte(javaStr);
				let bths = this.bytesToHexString(bytes.map(byte => ~byte & 0xFF));
				// console.log(bths); // Taking complement operation

				let arr = [0x58, 0x50, 0x11, row, clo, 0x02];
				let jywStr = this.jyw(arr);
				// console.log(jywStr);

				// console.log("Final Result:");
				// console.log("585011" + bths + "02" + jywStr + "4c");
				return "585011" + bths + "02" + jywStr + "4c";
			},

			jyw(codes) {
				let result = codes.reduce((acc, code) => acc ^ code, 0);
				return result.toString(16).padStart(2, '0');
			},

			hexStringToByte(hex) {
				let len = hex.length / 2;
				let result = new Uint8Array(len);
				for (let i = 0; i < len; i++) {
					let pos = i * 2;
					result[i] = parseInt(hex.substr(pos, 2), 16);
				}
				return result;
			},

			bytesToHexString(src) {
				let hexString = '';
				for (let i = 0; i < src.length; i++) {
					let hv = src[i].toString(16);
					if (hv.length < 2) {
						hexString += '0';
					}
					hexString += hv;
				}
				return hexString;
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

	// /deep/.uni-navbar--border {
	// 	border-bottom-width: 0;
	// }

	// /deep/ .uni-navbar__header {
	// 	height: 7vh !important;
	// 	background-color: #77b0dd !important;
	// 	line-height: 100px;
	// }

	// /deep/ .uni-nav-bar-text {
	// 	font-size: 5vw !important;
	// 	color: white !important;
	// 	font-weight: 900;
	// }

	// /deep/ .uni-navbar-btn-text uni-text {
	// 	font-size: 3vw !important;
	// 	font-weight: 900;
	// 	color: white !important;
	// }

	// /deep/ .uni-navbar__header-btns-left {
	// 	width: auto !important;
	// }

	// /deep/ .uni-navbar__content_view uni-text {
	// 	font-size: 6vw !important;
	// 	color: white !important;
	// 	font-weight: 900;
	// }

	// /deep/ .uni-navbar__header-btns-right {
	// 	width: 0 !important;
	// }
</style>