<template>
	<view class="container">
		<view class="Choosegoods">
			<view class="info" @click="openDetailsPop">
				<view class="img">
					<img src="/static/coco.jpeg" alt="" class="pic">
				</view>
				<view class="text">
					<text>肥皂</text>
				</view>
				<view class="price">
					<text>原价</text>
					<text>3.00</text>
				</view>
				<view class="vip">
					<text>活动价</text>
					<text>￥1.00</text>
				</view>
			</view>
			<view class="info">
				<view class="img">
					<img src="/static/coco.jpeg" alt="" class="pic">
				</view>
				<view class="text">
					<text>瓶子</text>
				</view>
				<view class="price">
					<text>原价</text>
					<text>3.00</text>
				</view>
				<view class="vip">
					<text>活动价</text>
					<text>￥1.00</text>
				</view>
			</view>
			<view class="info">
				<view class="img">
					<img src="/static/coco.jpeg" alt="" class="pic">
				</view>
				<view class="text">
					<text>瓶子</text>
				</view>
				<view class="price">
					<text>原价</text>
					<text>3.00</text>
				</view>
				<view class="vip">
					<text>活动价</text>
					<text>￥1.00</text>
				</view>
			</view>

		</view>
		<view class="goodsBox">
			<view class="goodsList">
				<view class="listTitle">
					<text>商品列表</text>
					<text>(1)</text>
				</view>
				<view class="item">
					<view class="left">
						<img src="/static/coco.jpeg" alt="" class="img">
					</view>
					<view class="right">
						<text class="name">肥皂</text>
						<view class="price">
							<text>￥</text>
							<text>5.00</text>
						</view>
						<view class="icon">
							<text>-</text>
							<text>1</text>
							<text>+</text>
						</view>
					</view>
				</view>
			</view>
			<view class="allAccount">
				<text>合计:</text>
				<text>￥10.00</text>
			</view>
			<view class="YouHui">
				<text>共减￥</text>
				<text>5.00</text>
			</view>
			<view class="SurePay" @click="openPay">
				<text>确认支付</text>
			</view>
		</view>
		<view class="">
			<uni-popup ref="DetailsPopup" type="center" :animation="true" background-color="#fff">
				<view class="DetailsPop-Content">
					<view class="icon" @click="CloseDetailsPopup">
						<uni-icons type="closeempty" size="50"></uni-icons>
					</view>
					<view class="DetailsList">
						<view class="left">
							<image src="../../static/coco.jpeg" alt="" class="img">
						</view>
						<view class="right">
							<text>肥皂是脂肪酸金属盐的总称。其中rcoo为脂肪酸根，M为金属离子。日常肥皂中脂肪酸的碳数通常为10-18。金属主要是碱金属，如乙醇胺和三乙醇胺也用于制造专用肥皂。通过油、蜡、松香或脂肪酸与碱的皂化或中和获得的脂肪酸盐可以称为肥皂。</text>
							<view class="AddShop">
								<text>购买商品</text>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<!-- 付款页面 -->
		<uni-popup ref="Paypopup" background-color="#fff" @change="ChangePopup" :animation="false">
			<view class="PayPopIndex">
				<view class="PayPopDel" @click="ClosePayPop">
					<image src="../../static/PayPopDel.svg" mode=""></image>
				</view>
				<view class="PayPopTitle">
					<view class="PayPopTitleHeJi">
						合计：
					</view>
					<view class="PayPopTitleMoney">
						￥{{total}}
					</view>
				</view>
				<view class="PayPopXian"></view>

				<view v-if="MoRenPay == false" class="ChangePayClass">
					<view class="PayPopFangShi">
						请扫描屏幕二维码
					</view>
					<view class="PayPopPNG">
						<image :src="payUrl" mode=""></image>
					</view>
					<view class="PayPopSmallText">
						(请打开微信支付扫一扫屏幕二维码付款)
					</view>
				</view>

				<view v-if="MoRenPay == true " class="ChangePayClass">

					<view class="PayPopFangShi">
						请出示手机付款码
					</view>
					<view class="ShouJiFuKuan">
						<image src="../../static/ShouJiPay.jpg" mode=""></image>
					</view>
					<view class="ShouJiDi1"></view>
					<view class="ShouJiDiDIV2">
						<view class="ShouJiDi2"></view>
					</view>

					<!-- <view class="PayPopBottom" @click="ShouJiFuKuan">
						<image src="../../static/PayPop.svg" mode=""></image>
						<view class="PayPopBottomText">
							二维码支付
						</view>
					</view> -->
				</view>
			</view>
		</uni-popup>
		<!-- 监听键盘 -->
		<!-- <keyboard-listener @keydown="PayKeyDowm"></keyboard-listener> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	// import keyboardListener from 'uniapp-keyboard-listener';
	export default {
		name: "PurchaseGoods",
		components: {
			keyboardListener
		},
		data() {
			return {
				// 商品集合
				BuyList: [],
				total: 0, // 合计钱
				totalShuLiang: 0,
				Paytext: '', // 用户付款码
				MoRenPay: true,
				text: '',
				orderId: null, // 订单id
				ShowEWM: false,
				options: {
					code: '', // 生成二维码的值
					size: 460, // 460代表生成的二维码的宽高均为460rpx
				},
			}
		},
		mounted() {
			this.getAllGoods();
		},
		computed: {
			...mapState('m_common', ['StoreId'])
		},
		watch: {
			BuyList: {
				handler: function(oldV, newV) {
					this.total = 0
					this.totalShuLiang = 0
					for (let i = 0; i < this.BuyList.length; i++) {
						this.total += Number(this.BuyList[i].salePrice) * Number(this.BuyList[i].num)

						this.BuyList[i].salePrice = Number(this.BuyList[i].salePrice).toFixed(2)

						this.totalShuLiang += Number(this.BuyList[i].num)
					}

					for (let i = 0; i < this.BuyList.length; i++) {
						if (this.BuyList[i].num == 0) {
							this.BuyList.splice(i, 1)
						}
					}

					this.total = this.total.toFixed(2)
				},
				deep: true
			},

			// value(newvalue) {
			// 	if (this.value.length > -1) {
			// 		this.ShowTitle = false
			// 	} else if (this.value == "") {
			// 		this.ShowTitle = true
			// 	} else {
			// 		this.ShowTitle = true
			// 	}
			// }
		},
		methods: {
			// 监听键盘事件
			PayKeyDowm(e) {
				console.log(e);
				if (e.key === "Enter") {
					// 手机付款码支付

					this.FukuanmaPay()
				} else {
					this.Paytext += e.key
					// uni.showToast({
					// 	icon: "none",
					// 	title: this.Paytext,
					// 	duration: 2000
					// });
				}

			},
			async FukuanmaPay() {
				this.text = ''

				let data = {
					"authCode": this.Paytext,
					"orderId": this.orderId,
					"payType": 0,
					"storeId": this.storeId
				}
				const {
					data: res
				} = await uni.$http.post(`/YzsPay/payByFY`, data);
				// 成功支付
				if (res.data.payState == '0') {
					this.Paytext = "" // 手机付款码				
					uni.$showMsg('支付成功!')
				} else {
					this.Paytext = "" // 手机付款码					
					this.$refs.popup.close('center')
					uni.$showMsg('支付失败!')
					// this.HaveError("支付失败！")
				}			

			},
			createPayOrder(n) {
				let goodsNum = []
				this.BuyList.forEach(i => {
					let key = i.id
					let num = i.num
					let a = {
						[key]: num
					}
					goodsNum.push(a)
				})
				let data = {
					"goodsNum": goodsNum,
					"storeId": this.storeId,
					"orderPayMethod": n,
					"cashirId": this.cashierId,
				}
				this.$request(this.$api.createPayOrder, data, "POST", false).then(res => { // 创建订单
					if (res.code == '200') {
						this.orderId = res.data.ordeId
						if (n == 0) {
							this.$refs.popup.open('center')
						}
						if (n == 2) {
							this.Paytext = JSON.parse(JSON.stringify(this.text))
							this.FukuanmaPay()
						}						
					} else {
						this.HaveError(res.message)
					}
				})
			},
			ClosePayPop() {
				this.$refs.Paypopup.close('center')
			},
			openPay() {
				this.$refs.Paypopup.open('center')
			},
			// 得到商品
			async getAllGoods() {
				const {
					data: res
				} = await uni.$http.get(`/goods/queryGoodsByStoreId?StoreId=${this.StoreId}&type=${1}`);
				if (res.code !== 200) return uni.$showMsg(res.msg);
				uni.hideLoading();
				console.log(res.data, '1111');
			},
			openDetailsPop() {
				this.$refs.DetailsPopup.open('center')
			},
			CloseDetailsPopup() {
				this.$refs.DetailsPopup.close('center')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 55vh;
		display: flex;

		// 付款弹框页面
		.PayPopIndex {
			min-width: 71vw;
			min-height: 50vh;
			background-color: #4575c2;
			text-align: center;
			color: white;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 1vw;
			padding: 0 2vw;
		}

		.PayPopDel {
			height: 0;
			width: 100%;
			display: flex;
			justify-content: flex-end;
			position: relative;
			top: 2vh;
			right: 3vw;
		}

		.PayPopDel image {
			width: 3vw;
			height: 3vw;
		}

		.PayPopTitle {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			margin-top: 3vh;

			.PayPopTitleHeJi {
				font-size: 3.7vw;
			}

			.PayPopTitleMoney {
				color: #e9bc4a;
				font-size: 7vw;
				font-weight: 900;
			}
		}

		.PayPopXian {
			height: 0.7vw;
			width: 50vw;
			border-bottom: 0.6vw solid white;
			margin: 2vh 0;
		}

		.ChangePayClass {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 3vh;

			.PayPopFangShi {
				font-size: 8vw;
				font-weight: 600;
				letter-spacing: 0.6vw;
				margin-bottom: 3vh;
			}

			.PayPopPNG {
				width: 28vw;
				height: 28vw;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.PayPopSmallText {
				font-size: 2vw;
				font-weight: 500;
				letter-spacing: 0.3vw;
				margin-top: 2vh;
				color: aliceblue;

			}

			.ShouJiFuKuan image {
				width: 40vw;
				height: 40vw;
				border-radius: 1vw;
				margin-top: 1.7vh;
				z-index: 9999;
			}

			.ShouJiDi1 {
				background-color: rgba(255, 255, 255, 0.2);
				height: 2.7vh;
				width: 35vw;
				position: relative;
				bottom: 2vh;
				border-radius: 1vw;
			}

			.ShouJiDiDIV2 {
				height: 0;
			}

			.ShouJiDi2 {
				background-color: rgba(255, 255, 255, 0.1);
				height: 4.2vh;
				width: 31vw;
				position: relative;
				bottom: 5vh;
				border-radius: 0.7vw;
			}

			.PayPopBottom {
				display: flex;
				align-items: center;
				margin-top: 3.5vh;
				margin-bottom: 2vh;
				/* background-color:#2b8b34; */
				background: linear-gradient(to right, rgba(47, 180, 10, 1.0) 0%, rgba(51, 200, 37, 1.0) 50%, rgba(47, 180, 10, 1.0)100%);

				width: 32vw;
				height: 4.2vh;
				justify-content: center;
				font-size: 3vw;
				font-weight: 900;
				letter-spacing: 0.8vw;
				border-radius: 0.7vw;

				box-shadow: 0px 0px 1vw 0.5vw white;

				border-bottom: 0.5vw solid rgba(0, 0, 0, 0.2);
				border-top: 0.1vw solid rgba(0, 0, 0, 0.2);
				border-right: 0.5vw solid rgba(0, 0, 0, 0.2);
				border-left: 0.3vw solid rgba(0, 0, 0, 0.2);
			}

			.PayPopBottom image {
				width: 4vw;
				height: 4vw;
				margin-right: 2vw;
			}
		}

		.DetailsPop-Content {
			width: 75vw;
			height: 36vh;
			border-radius: 20rpx;
			position: relative;

			.icon {
				position: absolute;
				top: 40rpx;
				right: 30rpx;
			}

			.DetailsList {
				margin-top: 2vh;
				display: flex;
				// justify-content: center;
				padding: 30rpx;
				height: 90%;
				width: 100%;

				.left {
					width: 40%;
					height: 95%;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.right {
					width: 45%;
					height: 90%;
					margin-left: 5vw;
					font-size: 2vh;
					line-height: 2vh;

					.AddShop {
						width: 30%;
						height: 15%;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 20rpx;
						background: -webkit-linear-gradient(left, #e7ebd2, #74cbe5);
						color: #2e629b;
						position: absolute;
						bottom: 1vh;
						right: 10vw;
					}
				}
			}
		}

		.Choosegoods {
			display: flex;
			flex-wrap: wrap;
			width: 68%;
			height: 90%;

			// background-color: #aaaaff;
			.info:active {
				background-color: rgba(207, 204, 200, 0.4);
			}

			.info {
				// width: 230rpx;
				width: 32%;
				height: 20vh;
				box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(200, 200, 199, 1.0);
				border-radius: 20rpx;
				margin-left: 15rpx;
				margin-top: 20rpx;

				.img {
					background: -webkit-linear-gradient(left, #74cbe5, #b1c3eb);
					height: 8vh;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 20rpx;

					img {
						height: 12vw;
						width: 13vw;
					}
				}

				.text {
					font-size: 2vh;
					margin-left: 20rpx;
					margin-top: 30rpx;
				}

				.price {
					margin-left: 20rpx;
					margin-top: 40rpx;

					text:nth-child(1) {
						color: #000;
						font-size: 3vw;
					}

					text:nth-child(2) {
						margin-left: 20rpx;
						color: #ff0000;
						font-size: 3vw;
					}
				}

				.vip {
					margin-top: 40rpx;
					margin-left: 20rpx;

					text:nth-child(1) {
						background-color: #d5e7d0;
						color: #ff1d3b;
						padding: 3rpx;
						border-radius: 5rpx;
						font-size: 3vw;
					}

					text:nth-child(2) {
						background-color: #ffd68f;
						padding: 3rpx;
						font-size: 3vw;
						border-radius: 5rpx;
					}
				}

			}
		}

		.goodsBox {
			width: 30%;
			height: 90%;

			.allAccount {
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ff0000;
				font-size: 3vw;
				margin-top: 1vh;
			}

			.YouHui {
				color: #ff0000;
				font-size: 3vw;
				margin-top: 1vh;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.SurePay {
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #2e629b;
				color: #fff;
				width: 90%;
				background-color: #2e629b;
				border-radius: 20rpx;
				padding: 45rpx;
				margin-left: 20rpx;
				margin-top: 1vh;
				font-size: 2vh;
			}
		}

		.goodsList {
			width: 100%;
			height: 90%;
			overflow-y: auto;
			background: -webkit-linear-gradient(left, #e7ebef, #f2f8ee);
			margin-left: 20rpx;
			margin-top: 30rpx;

			.listTitle {
				margin-top: 30rpx;
				margin-left: 20rpx;
				font-size: 2vh;
				font-weight: 700;
			}

			.item {
				display: flex;
				margin-top: 1vh;
				// margin: 10rpx;
				background-color: #fff;
				height: 7vh;

				.left {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 30%;

				}

				.img {
					width: 100%;
					height: 90%;
					margin-left: 10rpx;
				}

				.right {

					// display: flex;
					// flex-direction: column;				
					// align-items: center;
					.name {
						font-size: 2vh;
						margin-left: 20rpx;
						margin-top: 30rpx;
					}

					.price {
						font-size: 2vh;
						color: #fe007f;
						margin-left: 10rpx;
						margin-top: 30rpx;
						// margin-bottom: 10rpx;
					}
				}
			}

			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 10rpx;
				margin-top: 1vh;

				text:nth-child(1) {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 55rpx;
					width: 55rpx;
					border-radius: 50%;
					background-color: #ff0000;
					color: #fff;
					font-size: 2vh;
				}

				text:nth-child(2) {
					font-size: 2vh;
					margin-left: 10rpx;
				}

				text:nth-child(3) {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 65rpx;
					width: 65rpx;
					border-radius: 50%;
					background-color: #ff0000;
					color: #fff;
					margin-left: 10rpx;
					font-size: 2vh;
				}
			}

		}
	}
</style>