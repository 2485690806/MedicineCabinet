<template>
	<view class="container" @click="AllClick">
		<uni-nav-bar height="10vh" :border="false" left-icon="left" title="选择套餐" @clickLeft="back" />
		<view class="MealBody">
			<view class="list">
				<view class="info" v-for="(good,index) in dataList" :key="index" :class="{'active':isActive==index}"
					@click="getActive(good,index)">
					<view class="pic">
						<image :src="good.imageUrl" mode="scaleToFill" class="img" @click="openDetailsPop(good)">
						</image>
					</view>
					<view class="box">
						<view class="item" v-for="(good2,index2) in good.storeGoodsList" :key="index2">
							<text class="name">{{good2.name}}</text>
							<!-- <text>.........</text> -->
							<!-- <text class="num">×{{good2.num}}</text> -->
						</view>
					</view>
					<view class="details">
						<view class="name">{{good.suitName}}</view>
						<view class="price">
							<text>{{good.suitPrice}}元</text>
						</view>
					</view>

				</view>
			</view>
		</view>

		<view class="footer">
			<view class="left">
				<view class="ShopCar" @click="openShopCar">
					<text><uni-icons type="cart-filled" size="50" color="#7dbbea"></uni-icons></text>
					<text class="choosen">购物车</text>
				</view>

			</view>
			<view class="Money">
				<!-- <view class="manjian">
					<text>再买100元，可减30元</text>
				</view> -->
				<view class="order">
					<text class="price">总价:</text>
					<text class="num">￥{{TotalMoney}}</text>
				</view>
			</view>
			<view class="Pay" @click="TurnToPayMoney">
				<text>去付款</text>
			</view>
		</view>
		<uni-popup ref="ShopCarPop" type="bottom" :animation="false" background-color="#fff">
			<view class="ShopCarPop">
				<view class="Title">
					<text>金额明细</text>
				</view>
				<view class="TitleIcon" @click="CloseShopCar">
					<uni-icons type="closeempty" size="60"></uni-icons>
				</view>
				<view class="ShopCarPopList">
					<view class="shopitem" v-for="(good,index) in shopCarList" :key="index">
						<view class="pic">
							<image :src="good.imageUrl" mode="aspectFit" class="img"></image>
						</view>
						<view class="shopdetails">
							<text class="name">{{good.suitName}}</text>
							<text class="price">￥{{good.suitPrice}}</text>
						</view>
						<view class="btn">
							<!-- <view class="icon1">
								<text>-</text>
							</view> -->
							<text class="num">*1</text>
							<!-- <view class="icon2">
								<text>+</text>
							</view> -->
						</view>
					</view>

				</view>
				<view class="OrderList">
					<!-- <view class="one">
						<text>商品总价</text>
						<text>￥64.00</text>
					</view>
					<view class="youhui">
						<text>共优惠</text>
						<text>￥40.00</text>
					</view> -->
					<view class="Allprice">
						<text>合计</text>
						<text>￥{{TotalMoney}}</text>
					</view>
				</view>
				<view class="footer">
					<view class="Money">
						<!-- <view class="manjian">
							<text>再买100元，可减30元</text>
						</view> -->
						<view class="order">
							<text class="price">总价:</text>
							<text class="num">￥{{TotalMoney}}</text>
						</view>
					</view>
					<view class="Pay" @click="TurnToPayMoney">
						<text>去付款</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 监听键盘 -->
		<keyboard-listener @keydown="PayKeyDowm"></keyboard-listener>
		<uni-popup ref="Paypopup" background-color="#fff">
			<view class="PayBox">
				<view class="Pricebox">
					<text class="price">总价:</text>
					<text class="num">￥{{TotalMoney}}</text>
				</view>
				<view class="TitleIcon" @click="ClosePayPop">
					<uni-icons type="closeempty" size="60"></uni-icons>
				</view>
				<view class="box3">
					<view class="YouHuiText">
						<text>{{this.YouHuiText}}</text>
					</view>
				</view>
				<!-- <view class="box2">
					<view class="YouHuiTips">
						<text>付款前可以使用小程序的优惠券~对准扫码口就可以使用哦~</text>
					</view>
				</view> -->
				<view class="box">
					<view class="PayPic">
						<image src="/static/payMoney.png" mode="aspectFill" class="img"></image>
					</view>
				</view>
				<view class="text">
					<view class="tipsbox">
						<view class="tips">请出示手机微信/支付宝【付款码】</view>
						<view class="tips">对准下方扫码口即可完成支付</view>
					</view>
				</view>
			</view>
		</uni-popup>
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

		<x-shop-modal :modalShow="isShowDetail" @close="closeDetail" :dataObj="goodDetail"
			@addCart="Buy"></x-shop-modal>
	</view>
</template>

<script>
	import keyboardListener from 'uniapp-keyboard-listener';
	import xShopModal from '../../components/x-shopModal/x-shopModal'
	export default {
		data() {
			return {
				goodDetail: {},
				isShowDetail: false,
				goodObj: {},

				dataList: [],
				storeId: '',
				// 限制选一种
				isActive: -1,
				// 加入购物车列表
				shopCarList: [],
				Tips: '',
				TimeOut: '',
				ManJianText: '',
				// 总价金额
				TotalMoney: 0,
				// 共优惠
				YouHuiMoney: 0,
				// 原价
				OriginalMoney: 0,
				Paytext: '', // 用户付款码
				goodSave: '',
				// 订单id
				orderId: '',
				// 付款后优惠券介绍
				YouHuiText: '',
				// 套餐id
				suitId: '',
				// 倒计时秒数
				Seconds: 90,
				//定时器
				timer: null,
				// 节流
				requestStatus: true,
				// serialPort: uni.requireNativePlugin('Fvv-UniSerialPort'), // 固体
				// serialPort2: uni.requireNativePlugin('Fvv-UniSerialPort2'), // 液体
				// 光电传感
				LiquidState: '',
			};
		},
		onShow() {
			this.storeId = uni.getStorageSync('storeId')


			if (uni.getStorageSync('geyAllMeals') == '' || uni.getStorageSync('geyAllMeals') == null || uni.getStorageSync(
					'geyAllMeals') == undefined) {
				this.geyAllMeals()
			} else {
				this.dataList = uni.getStorageSync('geyAllMeals');
				this.geyAllMeals()
			}

			// this.IsOpenPort()

		},
		onLoad() {
			this.timeup();
			// try {
			// 	this.IsOpenPort2();
			// } catch (e) {
			// 	//TODO handle the exception
			// };
			// try {
			// 	this.onMessage();
			// } catch (e) {
			// 	//TODO handle the exception
			// }
			try {
				this.checkStateLiquid();
			} catch (e) {
				//TODO handle the exception
			}

		},
		onHide() {
			clearInterval(this.timer);
			// this.closePort()
		},
		onUnload() {
			clearInterval(this.timer);
			// this.closePort()
		},
		watch: {
			Seconds(newval) {
				let that = this;
				if (newval <= 0) {
					clearInterval(that.timer);
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			}
		},
		components: {
			keyboardListener,
			xShopModal,
		},
		methods: {
			Buy(data) {
				this.isShowDetail = false
			},
			closeDetail() {
				this.isShowDetail = false
			},
			openDetailsPop(good) {
				// this.isActive = index;
				// this.$refs.DetailsPop.open('center');
				console.log(good);
				this.showDetail(good)
			},
			showDetail(baseListItem) {
				this.isShowDetail = true
				let a = {
					img: baseListItem.descImage,
					name: baseListItem.suitName,
					tags: baseListItem.title,
					priNum: baseListItem.suitPrice,
					showPrice: baseListItem.suitPrice,
					description: baseListItem.suitDesc,
					sellerUnit: "个",

					increase: 1,
					unit: 1,

					Channel: baseListItem.channel,
					Num: 1,
					leastBuy: 0,
					mostBuy: 1000,
					// storage: item.storage,
					materialId: baseListItem.id,
					type: 2,
					isSuit: true,
				}
				this.goodDetail = a
			},
			// 判断是否打开串口，如果打开了，就return，没有就打开（打开关闭会占用资源）
			// IsOpenPort() {

			// 	let isOpen = this.serialPort.isOpen();
			// 	if (isOpen)
			// 		return;
			// 	this.serialPort.setBaudRate(9600);
			// 	this.serialPort.setStopBits(1);
			// 	this.serialPort.setDataBits(8);
			// 	this.serialPort.setParity(0);
			// 	this.serialPort.setPath('/dev/ttyS4')
			// 	this.serialPort.open(res => {
			// 		if (!res.status) {
			// 			uni.showToast({
			// 				title: res.msg,
			// 				duration: 2000,
			// 				icon: "none"
			// 			});
			// 			setTimeout(() => {
			// 				this.IsOpenPort()
			// 			}, 5000)
			// 			return
			// 		}
			// 	})
			// },
			IsOpenPort2() {
				// let isOpen = serialPort2.isOpen();
				// if (isOpen)
				// 	return;
				serialPort2.setBaudRate(9600);
				serialPort2.setStopBits(1);
				serialPort2.setDataBits(8);
				serialPort2.setParity(0);
				serialPort2.setPath('/dev/ttyS7')
				serialPort2.open(res => {
					if (!res.status) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: "none"
						});
						setTimeout(() => {
							this.IsOpenPort2()
						}, 5000)
						return
					}
				})
			},
			//关闭串口
			closePort() {
				// serialPort2.close();
			},
			//监听数据
			onMessage() {
				
			},
			// 发送液体商品库存预警
			async PostWarningChannel() {
				
			},
			ClosePayPop() {
				this.$refs.Paypopup.close('center')
			},
			AllClick() {
				this.Seconds = 90;
				console.log(this.Seconds);
			},
			// 倒计时回调
			timeup() {
				let that = this;
				that.timer = setInterval(() => {
					that.Seconds -= 1;
				}, 1000)
			},
			async FukuanmaPay() {
				

			},
			// changepath2(payGuResultVoList) {
			// 	this.IsOpenPort()

			// 	payGuResultVoList.forEach(item => {
			// 		this.serialPort.sendHex(item.channel)
			// 	})										
			// },
			// changepath3(payYeResultVoList) {
			// 	this.IsOpenPort2()

			// 	payYeResultVoList.forEach(item => {
			// 		this.serialPort2.sendHex(item.channel)
			// 	})			
			// },
			// 检查设备状态
			checkStateLiquid() {
				try {
					this.IsOpenPort2()
				} catch (e) {
					//TODO handle the exception
				}
				setTimeout(() => {
					serialPort2.sendHex('AA0101000000BB')
				}, 2000)
			},
			async createPayOrder() {
				
			},			
			HaveError(message) {
				this.Tips = message
				this.$refs.popup2.open('center')
				this.TimeOut = setTimeout(() => {
					this.$refs.popup2.close('center')
				}, 3000)

			},
			ClosePop2() {
				clearTimeout(this.TimeOut)
			},
			getActive(good, index) {
				this.isActive = index;
				this.shopCarList = [];
				this.shopCarList.push(good);
				this.goodSave = good;
				this.TotalMoney = (good.suitPrice).toFixed(2);

			},
			// 监听键盘事件
			PayKeyDowm(e) {
				console.log(e);
				if (!this.requestStatus) {
					return
				};

				if (e.key === "Enter") {
					let that = this;
					this.requestStatus = false;
					if (this.Paytext.substring(0, 6) == 'ShiftX') {
						that.HaveError('该商品不可用优惠券');
						that.Paytext = '';
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					} else if (this.Paytext.substring(0, 6) == 'ShiftV') {
						that.HaveError('该商品不可用余额支付');
						that.Paytext = '';
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					} else if (this.Paytext[0] == 'X') {
						that.HaveError('该商品不可用优惠券');
						that.Paytext = '';
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					} else {
						that.createPayOrder();
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					}
				} else {
					this.Paytext += e.key;
				}

			},
			TurnToPayMoney() {

				if (this.shopCarList.length == 0) {
					this.Tips = '请您先选择商品';
					this.Paytext = "" // 手机付款码
					this.$refs.popup2.open('center')
					this.TimeOut = setTimeout(() => {
						this.$refs.popup2.close('center')
					}, 3000)

				} else {
					this.$refs.Paypopup.open('center')

				}

			},
			// 获取套餐
			async geyAllMeals() {
				
			},
			openShopCar() {
				this.$refs.ShopCarPop.open('bottom')
			},
			CloseShopCar() {
				this.$refs.ShopCarPop.close('bottom')
			},
			back() {
				uni.navigateTo({
					url: "/pages/index/index",
					animationType: "slide-in-left",
				})
			},
		}
	}
</script>

<style lang="scss">
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

	page {
		background-color: #fff;
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

	.PayBox {
		height: 80vh;
		width: 85vw;
		padding: 1vw;

		.TitleIcon {
			position: absolute;
			top: 2vh;
			right: 5vw;
		}

		.YouHuiText {
			font-size: 3vw;
			color: #707eff;
			font-weight: 700;
			margin-top: 2vh;
			line-height: 3vh;
		}

		.YouHuiTips {
			font-size: 4vw;
			color: #3a9fdd;
			line-height: 5vh;
			margin: 3vw;
			margin-top: 1vh;

			text {
				font-weight: 700;
			}
		}

		.Pricebox {
			margin-top: 5vh;

			.price {
				font-size: 6vw;
				font-weight: 700;
			}

			.num {
				font-size: 7vw;
				// color: #ff5733;
				font-weight: 700;
			}
		}

		.tipsbox {
			margin-top: 5vh;
		}

		.tips {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 4vw;
			// color: #77b0dd;
			font-weight: 700;
			line-height: 4vh;
		}

		.box,
		.text,
		.Pricebox,
		.box2,
		.box3 {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.PayPic {
			margin-top: 1vh;
			width: 85.6vw;
			height: 38.3vh;

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.ShopCarPop {
		width: 100%;
		height: 80vh;
		position: relative;

		.OrderList {
			margin: 4vw;

			.one {
				display: flex;
				justify-content: space-between;

				text:nth-child(1) {
					font-size: 4vw;
					font-weight: 700;
				}

				text:nth-child(2) {
					font-size: 5vw;
					font-weight: 700;
				}
			}

			.youhui {
				display: flex;
				justify-content: space-between;
				margin-top: 3vh;

				text:nth-child(1) {
					font-size: 4vw;
					font-weight: 700;
				}

				text:nth-child(2) {
					font-size: 4vw;
					font-weight: 700;
					color: #ff8d1a;
				}
			}

			.Allprice {
				display: flex;
				justify-content: space-between;
				margin-top: 10vh;

				text:nth-child(1) {
					font-size: 4vw;
					font-weight: 700;
				}

				text:nth-child(2) {
					font-size: 5vw;
					font-weight: 700;
					// color: #ff0000;
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 8.5vh;
			width: 100%;
			background-color: #fff;
			border-top: 3px solid #7dbbea;
			display: flex;
			align-items: center;

			.left {
				width: 30%;
				height: 100%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				border-right: 3px solid #7dbbea;
				border-top: 3px solid #7dbbea;
				border-bottom: 3px solid #7dbbea;

				.ShopCar {
					margin-top: 1vh;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.choosen {
						color: #7dbbea;
						font-size: 4vw;
						margin-left: 2vw;
						font-weight: 700;
						margin-top: 1vh;
					}
				}

			}


			.Money {
				width: 50%;
				margin-left: 3vw;
				font-weight: 700;

				.manjian {
					display: flex;
					flex-wrap: wrap;
					color: #ff5733;
					font-size: 3vw;
					font-weight: 700;
					margin-left: 3vw;
				}

				.order {
					margin-top: 2vh;
					margin-left: 7vw;
				}

				.price {
					// color: #bdc0c3;
					font-size: 4.5vw;
					margin-top: 2vh;
				}

				.num {
					// color: #ff5733;
					font-size: 5vw;
					margin-left: 1vw;
					margin-top: 2vh;
				}
			}

			.Pay {
				width: 50%;
				background-color: #7dbbea;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				font-size: 5vw;
				font-weight: 700;
			}
		}

		.Title {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 5vw;
			font-weight: 700;
			margin-top: 3vh;

		}

		.TitleIcon {
			position: absolute;
			top: 2vh;
			right: 5vw;
		}

		.ShopCarPopList {
			height: 50vh;
			margin-top: 2vh;
			overflow-y: auto;
			margin: 3vw;
		}

		.shopitem {
			display: flex;
			align-items: center;
			height: 10vh;
			width: 100%;
			position: relative;
			margin-top: 2vh;

			.pic {
				width: 20vw;
				height: 10vh;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.shopdetails {
				margin-left: 5vw;
				font-size: 4vw;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.name {
					font-size: 3.5vw;
					font-weight: 700;
				}

				.price {
					// color: #ff5733;
					margin-top: 2vh;
					font-size: 3.5vw;
					font-weight: 700;
				}
			}

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				right: 6vw;

				.icon1 {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 6vw;
					height: 6vw;
					margin-left: 1vw;
					border-radius: 50%;
					font-size: 7vw;
					background-color: #ff5733;

					text {
						color: #fff;

					}
				}

				.icon2 {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 6vw;
					height: 6vw;
					margin-left: 2vw;
					border-radius: 50%;
					font-size: 5vw;
					background-color: #ff5733;

					text {
						color: #fff;

					}
				}

				.icon1:active,
				.icon2:active {
					background-color: rgba(148, 188, 230, 0.9);
				}

				.num {
					font-size: 4vw;
					margin-left: 2vw;
					font-weight: 700;
				}

			}
		}
	}

	.Logo {
		height: 5vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2vh;

		.pic {
			height: 5vh;
			width: 22.4vw;

			.img {
				width: 100%;
				height: 100%;
			}
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 8.5vh;
		width: 100%;
		background-color: #fff;
		border-top: 3px solid #7dbbea;
		display: flex;
		align-items: center;

		.left {
			width: 30%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			border-right: 3px solid #7dbbea;
			border-top: 3px solid #7dbbea;
			border-bottom: 3px solid #7dbbea;

			.ShopCar {
				margin-top: 1vh;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.choosen {
					color: #7dbbea;
					font-size: 3.2vw;
					margin-left: 2vw;
					font-weight: 700;
					// margin-top: 0.5vh;
					// margin-top: 1vh;
				}
			}

		}


		.Money {
			width: 35%;
			margin-left: 2vw;
			font-weight: 700;

			.manjian {
				display: flex;
				flex-wrap: wrap;
				color: #ff5733;
				font-size: 3vw;
				font-weight: 700;
			}

			.order {
				margin-top: 1vh;
			}

			.price {
				// color: #bdc0c3;
				font-size: 3.8vw;
				margin-top: 2vh;
			}

			.num {
				// color: #ff5733;
				font-size: 4.5vw;
				margin-left: 1vw;
				margin-top: 2vh;
			}
		}

		.Pay {
			width: 35%;
			background-color: #7dbbea;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 4.5vw;
			font-weight: 700;
		}
	}

	.MealBody {
		height: 77vh;
		width: 100%;
		padding-bottom: 12vh;
		overflow-y: auto;

		.active {
			// color: $uni-color-primary;
			// padding-bottom: 20rpx;
			border: 3px solid #77b0dd;
		}

		.list {
			// height: 77vh;
			width: 100%;
			// padding: 10rpx;
			display: flex;
			// justify-content: space-around;
			flex-wrap: wrap;

			.info {
				border-radius: 10rpx;
				padding: 10rpx;
				// margin: 10rpx;
				height: 32vh;
				width: 41.6vw;
				border-radius: 30rpx;
				margin-top: 3vh;
				background-color: #edf0f4;
				margin-left: 4vw;

				.box {
					width: 100%;
					height: 8vh;
					margin: 1vw;
					overflow-y: auto;

					.item {
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 0.5vh;
						font-size: 3vw;
						// color: #36759b;

						.name {
							font-weight: 700;
						}

						.num {
							margin-left: 3vw;
							font-weight: 700;
						}
					}
				}

				.pic {
					width: 41.6vw;
					height: 13.8vh;
					border-radius: 15rpx;

					.img {
						width: 100%;
						height: 100%;
						border-radius: 15rpx;
					}
				}

				.details {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

					.name {
						// color: #2e629b;
						font-size: 4vw;
						font-weight: 700;
						// color: #43afdd;
						// margin-left: 3vw;
						margin-top: 1.5vh;
					}

					.price {
						// color: #ff8d1a;
						font-size: 4vw;
						font-weight: 700;
						// margin-left: 3vw;
						margin-top: 1.3vh;
					}


				}


			}

		}
	}
</style>