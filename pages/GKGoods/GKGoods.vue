<template>
	<view class="container" @click="AllClick">
		<uni-nav-bar height="10vh" :border="false" title="自助售货机" @clickLeft="back" />

		<view class="LogOutClass" @click="Logout">

		</view>


		<!-- left-icon="help" -->
		<view class="GoodsContainer">
			<view class="GoodsBox">
				<view class="goodsItem" v-for="(good,index) in dataList" :key="index">
					<view class="pic">
						<image :src="good.imageUrl" mode="scaleToFill" class="img" @click="openDetailsPop(good)">
						</image>
					</view>
					<view class="details">
						<view class="name">{{good.name}}</view>
						<view class="price">￥{{good.salePrice}}元/个</view>
						<!-- <view class="vipPrice">充值价:{{good.vipPrice}}元起</view> -->
						<view class="box">
							<view class="btn" v-if="good.stock!=0">
								<view class="icon1" @click.stop="minusNum(good,index)">
									<text>-</text>
								</view>
								<text class="num">{{good.Num}}</text>
								<view class="icon2" @click.stop="addNum(good,index)">
									<text>+</text>
								</view>
							</view>
							<view class="nonebox" v-if="good.stock==0">
								<view class="none">
									<text>已售罄</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 			<view class="tipsText">
				<view class="textbox">
					<text>满69减5，满109减10，满149-15</text>
				</view>
			</view> -->
		</view>


		<!-- 		<view class="DiBigDiview">
			<view class="InputMa" @click="open">
				手动输入条码
			</view>
			<view class="DiView">
				<view class="ShopCar" @click="openShopCar">
					<text><uni-icons type="cart-filled" size="50" color="#7dbbea"></uni-icons></text>
					<text class="choosen">购物车</text>
				</view>

				<view class="DiLeftDiv" @click="scanToGetData">
					<image src="../../static/index/KeFu.svg" mode=""></image>
					客服
				</view>
				<view class="DiRightDiv">
					<view class="DiCenterDiv" style="margin-right: 1vw;">
						共 <view class="DiCenterShuLiang">
							{{ totalShuLiang }}
						</view> 件
					</view>
					<view class="DiCenterDiv">
						<view class="HeJi">
							合计
						</view>
						<view class="MaoHao">
							:
						</view>
						<view class="DiCenterNum">
							￥{{ total==0?'0.00':total }}
						</view>
					</view>
					<view class="DiBigRightDiv">
						<view class="Pay" @click="Pay">
							去支付
						</view>
					</view>
				</view>
			</view>
		</view> -->


		<view class="footer">
			<view class="left">
				<view class="ShopCar" @click="openShopCar">
					<text><uni-icons type="cart-filled" size="50" color="#7dbbea"></uni-icons></text>
					<text class="choosen">购物车</text>
				</view>

			</view>
			<view class="Money">
				<view class="manjian">
					<text>{{ManJianText}}</text>
				</view>
				<view class="order">
					<text class="price">总价:</text>
					<text class="num">￥{{TotalMoney}}
					</text>
				</view>
			</view>
			<view class="Pay" @click="TurnToPayMoney">
				<text>去付款</text>
			</view>
		</view>

		<!-- 		<uni-popup ref="DetailsPop" type="center" :animation="false" background-color="#fff">
			<view class="DetailsPop">
				<view class="DetailsList">
					<view class="left">
						<image :src="goodDetail.imageUrl" alt="" class="img" mode="scaleToFill">
					</view>
					<view class="right">
						<text>{{goodDetail.description}}</text>

					</view>
				</view>
				<view class="btn">
					<view class="back" @click="CloseDetailsPop">
						<text>返回</text>
					</view>
				</view>
			</view>
		</uni-popup> -->
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
							<text class="name">{{good.name}}</text>
							<text class="price">￥{{good.salePrice}}/个</text>
						</view>
						<view class="btn">
							<view class="icon1" @click="minusNum(good,index)">
								<text>-</text>
							</view>
							<text class="num">{{good.Num}}</text>
							<view class="icon2" @click="addNum(good,index)">
								<text>+</text>
							</view>
						</view>
					</view>

				</view>
				<view class="OrderList">
					<view class="one">
						<text>商品原价</text>
						<text>￥{{OriginalMoney}}</text>
					</view>
					<view class="youhui">
						<text>共优惠</text>
						<text>￥{{YouHuiMoney}}</text>
					</view>
					<view class="Allprice">
						<text>合计</text>
						<text>￥{{TotalMoney}}</text>
					</view>
				</view>
				<view class="footer">
					<!-- <view class="left">
						<view class="ShopCar" @click="openShopCar">
							<text><uni-icons type="cart-filled" size="80" color="#ff5733"></uni-icons></text>
							<text class="choosen">购物车</text>
						</view>
						
					</view> -->
					<view class="Money">
						<view class="manjian">
							<text>{{ManJianText}}</text>
						</view>
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
		<uni-popup ref="Paypopup" background-color="#fff">
			<view class="PayBox">
				<view class="Pricebox">
					<text class="price">总价:</text>
					<text class="num">￥{{TotalMoney}}

					</text>
				</view>
				<view class="TitleIcon" @click="ClosePayPop">
					<uni-icons type="closeempty" size="60"></uni-icons>
				</view>
				<view class="box3">
					<view class="YouHuiText">
						<text>{{this.YouHuiText}}</text>
					</view>
				</view>
				<view class="box2">
					<view class="YouHuiTips">
						<text>扫描小程序,领券/充值更优惠哦</text>
					</view>
				</view>
				<view class="box">
					<view class="PayPic">
						<image src="/static/payMoney.png" mode="aspectFill" class="img"></image>
					</view>
				</view>
				<!-- <view class="text">
					<view class="tipsbox">
						<view class="tips">请依次出示优惠券码和微信/支付宝【付款码】</view>
						<view class="tips">或充值用户出示小程序【付款码】</view>
						<view class="tips">对准下方扫码口即可完成支付</view>
					</view>
				</view> -->
			</view>
		</uni-popup>

		<uni-popup ref="popup" background-color="#fff" @change="ChangePopup" :animation="false" v-show="showPopup">
			<view class="PayPopIndex">
				<view class="PayPopDel" @click="ClosePayPop">
					<image src="../../static/PayPopDel.svg" mode=""></image>
				</view>
				<view class="PayPopTitle">
					<view class="PayPopTitleHeJi">
						合计：
					</view>
					<view class="PayPopTitleMoney">
						￥{{TotalMoney}}
					</view>
				</view>
				<view class="PayPopXian"></view>

				<view class="ChangePayClass">
					<view class="PayPopFangShi">
						请扫描屏幕二维码
					</view>
					<view class="PayPopPNG">
						<image :src="payUrl" mode="scaleToFill" v-if="ShowEWM"></image>
					</view>
					<view class="PayPopSmallText">
						(请打开微信支付扫一扫屏幕二维码付款)
					</view>

				</view>
			</view>
		</uni-popup>


		<uni-popup ref="paySuccesspopup" background-color="#fff" :animation="false">

			<view class="PayPopIndex">
				<view class="PayPopDel" @click="ClosePayPop">
					<image src="../../static/PayPopDel.svg" mode=""></image>
				</view>
				<view class="PayPopTitle">
					<view class="TopDiv">
						支付成功
					</view>
				</view>
				<!-- <view class="PayPopXian"></view> -->
				<loading7 v-if="!isFinishChuHuo"></loading7>
				<loading6 v-if="isFinishChuHuo"></loading6>

			</view>

			<!-- 			<view class="TopDiv">
				<image src="/static/PaySuccess.png" mode=""></image>
				支付成功
			</view> -->

		</uni-popup>

		<!-- 监听键盘 -->
		<keyboard-listener @keydown="PayKeyDowm"></keyboard-listener>


		<!-- 		<view class="big" v-if="ShowEWM">
			<w-qrcode :options="options" @generate='generate' v-if="ShowEWM"></w-qrcode>
		</view> -->


		<x-shop-modal :modalShow="isShowDetail" @close="closeDetail" :dataObj="goodDetail"
			@addCart="Buy"></x-shop-modal>

	</view>
</template>

<script>
	const deviceUtil = uni.requireNativePlugin("mt-device-info");
	import keyboardListener from 'uniapp-keyboard-listener';
	import xShopModal from '../../components/x-shopModal/x-shopModal'
	import WQrcode from '@/uni_modules/wmf-code/components/w-qrcode/w-qrcode.vue' //@uni-ui/code-ui/components/w-qrcode/index.vue
	const SPcoin = uni.requireNativePlugin('Fvv-UniSerialPort');
	import loading7 from "@/components/loading/loading7.vue"
	import loading6 from "@/components/loading/loading6.vue"
	export default {

		data() {
			return {
				isShowDetail: false,
				isFinishChuHuo: false,
				ShowEWM: false,
				showPopup: true,
				goodObj: {},
				options: {
					code: '', // 生成二维码的值
					size: 500, // 460代表生成的二维码的宽高均为460rpx
					border: {
						color: ['#fff'], //边框颜色支持渐变色 最多10种颜色 如果默认黑色此属性不需要传
						opacity: 0.6, //边框透明度 默认为1不透明 0~1
						lineWidth: 6, //边框宽度
						degree: 15 //边框圆角度数 默认5
					},
				},


				dataList: [],
				storeId: '',
				isActive: '',
				// 加入购物车列表
				shopCarList: [],
				// serialPort: uni.requireNativePlugin('Fvv-UniSerialPort'),
				Tips: '',
				TimeOut: '',
				ManJianText: '',
				baudRate: '9600',
				CashierPath: '/dev/ttyS2',
				// 总价金额
				TotalMoney: 0,
				totalGoodsNum: 0, // 总数量
				// 共优惠
				YouHuiMoney: 0,
				// 原价
				OriginalMoney: 0,
				Paytext: '', // 用户付款码
				// 订单id
				orderId: '',
				totalShuLiang: 0,
				// 付款后优惠券介绍
				YouHuiText: '',
				// 保存优惠券
				YouHuiQuan: null,
				// 商品详情保存
				goodDetail: {},
				// 倒计时秒数
				Seconds: 90,
				//定时器
				timer: null,
				logouttimer: null,
				Timer: null,
				// 节流
				requestStatus: true,
				orderNum: '',
				waitTime: 800, // 该时间间隔内点击才算连续点击（单位：ms）
				lastTime: new Date().getTime(), // 上次点击时间
				count: 0, // 连续点击次数
			};
		},
		components: {
			keyboardListener,
			xShopModal,
			loading7,
			loading6,
			WQrcode
		},
		computed: {

		},
		onShow() {

			// deviceUtil.getDeviceInfoStr((deviceInfo) => {
			//   console.log(deviceInfo);
			//   this.storeId =deviceInfo.androidID

			// });
			if (uni.getStorageSync('storeId') == '' || uni.getStorageSync('storeId') == null || uni.getStorageSync(
					'storeId') == undefined) {
				uni.navigateTo({
					url: "/pages/GKogin/login"
				})
				return;
			};

			// this.storeId = "gekoushouhuoji"
			this.storeId = uni.getStorageSync('storeId')
			if (uni.getStorageSync('goodsList') == '' || uni.getStorageSync('goodsList') == null || uni.getStorageSync(
					'goodsList') == undefined) {
				this.getAllGoods()
			} else {
				this.dataList = uni.getStorageSync('goodsList');
				this.getAllGoods()
			}

			// if (res.code !== 200) return uni.$showMsg(res.message);
			this.getPath()

			// this.CountMoney(this.YouHuiQuan)

			// this.IsOpenPort();
			// this.onMessage()
		},
		onLoad() {
			// this.timeup()
			
			// setTimeout(() => {
			// 	this.$refs.popup.open('center')
			// }, 2000)
		},
		onHide() {
			// clearInterval(this.timer);
			// this.closePort()
		},
		onUnload() {
			clearInterval(this.timer);
			// this.closePort()
		},
		mounted() {

		},

		watch: {
			// Seconds(newval) {
			// 	let that = this;
			// 	if (newval <= 0) {
			// 		clearInterval(that.timer);
			// 		uni.navigateTo({
			// 			url: '/pages/index/index'
			// 		})
			// 	}
			// }

		},
		methods: {

			dodevcoin() {
				SPcoin.setBaudRate(this.baudRate);
				SPcoin.setStopBits(1);
				SPcoin.setDataBits(8);
				SPcoin.setParity(0);
				SPcoin.setPath(this.CashierPath);

				SPcoin.open(res => {
					if (!res.status) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: "none"
						});
						return
					}
					// uni.showToast({
					// 	title: "cash-connected",
					// 	duration: 2000,
					// });


					/*****************************************/
					SPcoin.onMessageHex(rec => {
						console.log("rec0", rec);
						rec = rec.toLowerCase();



					}, send => {
						console.log("send0", send);
					});
					/********************************以上是侦听信息***************/

				});
			},

			Logout() {
				var currentTime = new Date().getTime();
				// 计算两次相连的点击时间间隔
				this.count = (currentTime - this.lastTime) < this.waitTime ? this.count + 1 : 1;
				this.lastTime = new Date().getTime();
				clearTimeout(this.logouttimer);
				this.logouttimer = setTimeout(() => {
					clearTimeout(this.logouttimer);
					// 处理点击事件 
					if (this.count > 5) {
						// 连续点击五次或者五次以上的点击事件
						// console.log('点击超过4次了')
						// uni.clearStorageSync()
						// uni.navigateTo({
						// 	url: "/pages/Login/login"
						// })
						uni.showModal({
							title: "当前id:" + this.storeId,
							editable: true,
							placeholderText: "请输入密码",
							confirmText: "确认",
							cancelText: "取消",
							success: async (res) => {
								let content = res.content;
								console.log(content);
								if (res.confirm) {
									if(content==uni.getStorageSync("password")){
											uni.navigateTo({
												url: "/pages/admin_send_cmd/admin_send_cmd"
											})
									}

								}
							}
						});
					}
				}, this.waitTime + 20)
			},

			ChangePopup(e) {
				if (e.show == true) {
					this.MoRenPay = true // 扫二维码支付

					this.ShowListener = false // 开启付款码支付
					try {
						this.speechModule.speak("。。请出示付款码，对准扫码头支付", 1);
						// this.speechModule.speak2("。。请出示付款码，对准扫码头支付", res => {})
					} catch {}
				}
				if (e.show == false) { // 取消支付
					this.MeiTuanPay = false
					this.ShowListener = true // 扫商品码
					this.Paytext = "" // 用户手机付款码
					this.ShowEWM = false

					clearInterval(this.Timer)
					
					let timeFinish = (this.totalGoodsNum+7) *1000
					setTimeout(()=>{
						clearInterval(this.timer);
					},timeFinish)
					
					this.Timer = null
					try {
						this.speechModule.speak("。。取消支付", 1);
						// this.speechModule.speak2("。。取消支付", res => {})
					} catch {}
				}
			},
			generate(e) {
				console.log(e);
				this.payUrl = e.img.tempFilePath

			},
			queryOrderPayStatus() {
				this.Timer = setInterval(async () => {
					let data = {
						"orderId": this.orderId,
						"storeId": this.storeId
					}
					const {
						data: res
					} = await uni.$http.post(`/YzsPay/queryOrderPayStatus`, data);

					if (res.data.payState == 1) {
						this.ShowListener = true // 扫商品码
						this.Paytext = "" // 用户手机付款码
						this.ShowEWM = false
						clearInterval(this.Timer)
						this.Timer = null
						try {
							this.speechModule.speak("。。支付失败", 1);
							// this.speechModule.speak2("。。取消支付", res => {})
						} catch {}

					} else if (res.data.payState == 0) { // 支付成功
						clearInterval(this.Timer)
						this.Timer = null

						this.Paytext = "" // 手机付款码
						this.ShowListener = true // 重新展示回原来的键盘

						// uni.navigateTo({
						// 	url: "/pages/PaySuccess/PaySuccess"
						// })
						this.$refs.paySuccesspopup.open('center')
						this.showPopup = false
						
						let timeFinish = (this.totalGoodsNum+7) *1000
						setTimeout(()=>{
							clearInterval(this.timer);
							this.showPopup = true
							this.$refs.popup.close('center')
						},timeFinish)

					} else if (res.data.payState == 2) { // 等待支付


					} else {
						this.ShowListener = true // 扫商品码
						this.Paytext = "" // 用户手机付款码
						this.ShowEWM = false
						clearInterval(this.Timer)
						this.Timer = null
						try {
							this.speechModule.speak("。。取消支付", 1);
							// this.speechModule.speak2("。。取消支付", res => {})
						} catch {}
					}
					// res.data.num = 1,
					// res.data.text = JSON.parse(JSON.stringify(this.text))
					// this.BuyList.push(res.data)
					// this.text = ""

				}, 2000)
			},
			paySuccess() {
				this.$refs.paySuccesspopup.open('center')

			},
			Buy(data) {
				let item = this.shopCarList.find((item) => item.id === data.materialId);
				this.isShowDetail = false;
				if (item) {
					this.dataList.forEach(item => {
						if (item.id == data.materialId) {
							item.Num = data.count
						}
					})
					// 如果存在，就修改该对象的属性
					item.Num = data.count;
					this.CountMoney(this.YouHuiQuan)
				} else {
					// 如果不存在，就添加新的对象
					this.dataList.forEach(item => {
						if (item.id == data.materialId) {
							item.Num = data.count
							this.shopCarList.push(item);
						}
					})
					this.CountMoney(this.YouHuiQuan)
				};
				for (let i = 0; i < this.shopCarList.length; i++) {
					if (this.shopCarList[i].Num == 0) {
						this.shopCarList.splice(i, 1)
					}
				}
			},
			closeDetail() {
				this.isShowDetail = false
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
			//关闭串口
			// closePort() {
			// 	serialPort.close();
			// },
			//监听数据
			// onMessage() {
			// 	this.serialPort.onMessageHex(rec => { //(去掉;符号)
			// 			// 固体出货失败
			// 			if(rec.substring(0,8)=="aa0b0103"||rec.substring(11,12)=="00"){
			// 				this.HaveError2('出货失败!请联系客服')
			// 			}

			// 	}, send => {})

			// },
			ClosePayPop() {
				this.$refs.popup.close('center')
				this.$refs.paySuccesspopup.close('center')
				clearInterval(this.timer);
			},
			AllClick() {
				// this.Seconds = 90;
				// console.log(this.Seconds);
			},
			// 倒计时回调
			timeup() {
				let that = this;
				that.timer = setInterval(async () => {
					// that.Seconds -= 1;
					// 弹簧机查看通道
					let storeId = that.storeId;


					// 弹簧机查看是否有命令下发
					const {
						data: res1
					} = await uni.$http.get(`/cashier/getCommand?deviceNum=${storeId}`);
					console.log(res1);
					if (res1.code !== 200) return uni.$showMsg(res1.message);

					if (res1.data != null || res1.data != "") {

						that.dodevcoin()
						setTimeout(() => {
							SPcoin.sendHex(res1.data);
						}, 500)

						setTimeout(() => {

							that.isFinishChuHuo = true
							setTimeout(() => {
								that.$refs.paySuccesspopup.close('center')
								that.getAllGoods()
								that.getPath()
							}, 3000)

						}, 3000)
					}
				}, 1000)
			},
			// 统计金额
			async CountMoney(authCode) {
				// if (this.shopCarList == '') return this.HaveError('请您先选择商品')
				let goodsNum = [];
				this.shopCarList.forEach(i => {
					let key = i.id
					let num = i.Num
					let a = {
						[key]: num
					}
					goodsNum.push(a)
				})
				let data = {
					"goodsNum": goodsNum,
					"storeId": this.storeId,
					"isVip": 0,
					"orderPayMethod": 0,
					"authCode": authCode
				}
				const {
					data: res
				} = await uni.$http.post(`/Order/CountMoney`, data);
				if (res.code !== 200) {
					this.$refs.Paypopup.close('center')
					this.HaveError(res.message);
					this.Paytext = "" // 手机付款码
					this.YouHuiQuan = null; //优惠券清空
					return
				}
				// this.ManJianText = res.data.reservedFyTraceNo;
				this.TotalMoney = (res.data).toFixed(2);
				// this.YouHuiMoney = (Number(res.data.originalPrice) - Number(res.data.price)).toFixed(2);
				this.OriginalMoney = (res.data).toFixed(2)
				// this.DoYouHuiText(res.data.couponOffers);
				// this.orderNum = res.data.couponId;
				console.log(res.data);
				if (this.shopCarList.length == 0) {
					this.TotalMoney = 0;
					this.YouHuiMoney = 0;
					this.OriginalMoney = 0;
					this.ManJianText = '';
				}
			},
			// 处理优惠券text
			DoYouHuiText(text) {
				if (text !== '') {
					this.YouHuiText = text.split(':')[1]
					console.log(this.YouHuiText);
				} else {
					this.YouHuiText = '';
				}
			},
			async FukuanmaPay() {
				let data = {
					"authCode": this.Paytext,
					"orderId": this.orderId,
					"payType": 0,
					"storeId": this.storeId
				}
				const {
					data: res
				} = await uni.$http.post(`/YzsPay/payByFY`, data);
				if (res.code == 200) {
					if (res.data.payState == '0') {
						this.Paytext = "" // 手机付款码	
						this.YouHuiQuan = '';
						// this.changepath2(res.data.payGuResultVoList)
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/PaySuccess/PaySuccess?data=" + JSON.stringify(res.data)
							})
						}, 1000)

					} else {
						this.Paytext = "" // 手机付款码						
						this.$refs.Paypopup.close('center')
						this.HaveError("支付失败！")
					}
				} else {
					this.Paytext = "" // 手机付款码					
					this.$refs.Paypopup.close('center')
					this.HaveError(res.message)
				}

			},
			// changepath2(payResultVoList) {
			// 	this.IsOpenPort()
			// 	payResultVoList.forEach(item => {
			// 		this.serialPort.sendHex(item.channel)
			// 	})
			// 	// uni.showToast({
			// 	// 	title: "已打开串口",
			// 	// 	duration: 2000,
			// 	// });
			// 	// this.onMessage()
			// },
			async createPayOrder() {
				let goodsNum = []
				this.totalGoodsNum= 0;
				this.shopCarList.forEach(good => {
					let key = good.id
					let num = good.Num
					let a = {
						[key]: num
					}
					goodsNum.push(a)
					this.totalGoodsNum +=good.Num
				})
				if (this.orderNum == null || this.orderNum == undefined) {
					this.orderNum = '';
				} else {
					this.orderNum = "&" + this.orderNum;
				}

				let data = {
					"goodsNum": goodsNum,
					"storeId": this.storeId,
					"isVip": 0,
					"orderPayMethod": 1,
				}
				const {
					data: res
				} = await uni.$http.post(`/Order/createPayOrder`, data);
				if (res.code !== 200) {
					this.HaveError(res.message);
					this.Paytext = "" // 手机付款码					
					return
				}
				this.orderId = res.data.ordeId

				// this.options.code = res.data.qrCodepayVo.payUrl

				this.payUrl = res.data.qrCodepayVo.payUrl;
				this.ShowEWM = false // 展示二维码
				console.log(this.payUrl);

				this.ShowEWM = true // 展示二维码
				this.$refs.popup.open('center')
				this.queryOrderPayStatus() // 开启查商品状态
				this.timeup(); // 开启查询指令
				
				// setTimeout(()=>{
				// 	clearInterval(this.timer);
				// },120000)

				try {
					this.speechModule.speak("。。请扫描屏幕二维码进行支付", 1);
					// this.speechModule.speak2("。。请选择支付方式", res => {})
				} catch {}

				// this.FukuanmaPay()
			},
			HaveError(message) {
				this.Tips = message
				this.$refs.popup2.open('center')
				this.TimeOut = setTimeout(() => {
					this.$refs.popup2.close('center')
				}, 5000)

			},
			HaveError2(message) {
				this.Tips = message
				this.$refs.popup2.open('center')
				this.TimeOut = setTimeout(() => {
					this.$refs.popup2.close('center')
				}, 10000)

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
						let a = that.Paytext.substring(5);
						// 保存优惠券
						that.YouHuiQuan = that.Paytext.substring(5);
						that.CountMoney(a);
						that.Paytext = '';
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					} else if (this.Paytext.substring(0, 6) == 'ShiftV') {
						this.Paytext = this.Paytext.substring(5);
						that.createPayOrder();
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					} else if (this.Paytext[0] == 'X') {
						let a = that.Paytext;
						// 保存优惠券
						that.YouHuiQuan = that.Paytext;
						that.CountMoney(a);
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
					}, 4000)

				} else {
					// this.$refs.Paypopup.open('center')
					this.createPayOrder()
				}

			},
			ClosePop2() {
				clearTimeout(this.TimeOut)
			},
			minusNum(good, index) {
				this.Seconds = 90;
				console.log(this.Seconds = 90);
				if (good.Num <= 0) return uni.$showMsg('商品数量不能为负');
				good.Num -= 1;
				for (let i = 0; i < this.shopCarList.length; i++) {
					if (this.shopCarList[i].Num == 0) {
						this.shopCarList.splice(i, 1)
					}
				}
				console.log(good);
				this.$forceUpdate();
				// 计算金额
				this.CountMoney(this.YouHuiQuan)
			},
			addNum(good, index) {
				this.Seconds = 90;
				console.log(this.Seconds = 90);
				if (good.Num >= (Number(good.stock))) return uni.$showMsg('已达到商品最大数量');
				good.Num += 1;
				console.log(good);
				this.$forceUpdate();

				let item = this.shopCarList.find((item) => item.id === good.id);

				if (item) {
					// 如果存在，就修改该对象的属性
					item.Num = good.Num;
				} else {
					// 如果不存在，就添加新的对象
					this.shopCarList.push(good);
				}

				// 计算金额
				this.CountMoney(this.YouHuiQuan)
			},
			async getPath() {

				const {
					data: res
				} =await uni.$http.get(`/cashier/getCashierPath2?deviceNum=${this.storeId}`);

				console.log(res);
				this.CashierPath = res.data.path
				this.baudRate = res.data.baudRate
				try{
					this.dodevcoin()
				}catch(e){
					//TODO handle the exception
				}

			},
			// 得到商品
			async getAllGoods() {
				const {
					data: res
				} = await uni.$http.get(`/cashier/queryGoodsByPage?storeId=${this.storeId}`);
				if (res.code !== 200) return uni.$showMsg(res.message);
				console.log(res.data);
				this.dataList = res.data;
				this.dataList.forEach((item, index) => {
					item.Num = 0;
				})
				uni.setStorageSync("goodsList", this.dataList)




			},
			openShopCar() {
				this.$refs.ShopCarPop.open('bottom')
			},
			CloseShopCar() {
				this.$refs.ShopCarPop.close('bottom')
			},
			openDetailsPop(good) {
				// this.isActive = index;
				// this.$refs.DetailsPop.open('center');
				// this.goodDetail = good;
				console.log(good);
				this.showDetail(good)
			},
			showDetail(baseListItem) {
				this.isShowDetail = true
				let a = {
					img: baseListItem.imageUrl,
					name: baseListItem.name,
					tags: baseListItem.title,
					priNum: baseListItem.salePrice,
					showPrice: baseListItem.salePrice,
					description: baseListItem.description,
					sellerUnit: "个",
					increase: 1,
					unit: 1,

					Channel: baseListItem.channel,
					Num: baseListItem.Num,
					leastBuy: 0,
					mostBuy: 1000,
					// storage: item.storage,
					materialId: baseListItem.id,
					isSuit: false,
					type: 1,
				}
				this.goodDetail = a
			},

			CloseDetailsPop() {
				this.$refs.DetailsPop.close('center');
			},
			back() {

				uni.navigateTo({
					url: "/pages/Help/Help",
					animationType: "slide-in-left",
				})

				// uni.navigateTo({
				// 	url: "/pages/index/index",
				// 	animationType: "slide-in-left",
				// })
			},
		}
	}
</script>

<style lang="scss">
	.PayPopXian {
		height: 0.7vw;
		width: 50vw;
		border-bottom: 0.6vw solid white;
		margin: 2vh 0;
	}

	.LogOutClass {
		width: 10vh;
		height: 10vh;
		position: absolute;
		top: 0;
		left: 0;
	}

	.toTestClass {
		width: 10vh;
		height: 10vh;
		position: absolute;
		top: 0;
		right: 0;
	}


	.TopDiv image {
		width: 80vw;
		height: 55vw;
	}

	.TopDiv {
		color: rgba(253, 196, 54, 1);
		font-size: 7.5vw;
		line-height: 150%;
		text-align: left;
		font-weight: bold;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.DiBigDiview {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: white;
		min-height: 14vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 1vh;

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
			}
		}


		.PopupTitle {
			height: 0;
			color: rgba(103, 103, 103, 1);
			position: relative;
			top: 2vh;
			left: 2vw;
			font-size: 4vw;
		}

		.InputMa {
			color: rgba(42, 130, 228, 1);
			font-size: 4vw;
			line-height: 120%;
			text-align: right;
			font-weight: bold;
			margin-right: 14vw;
			width: 100%;
			margin-bottom: 1.5vw;
		}

		.DiRightDiv {
			display: flex;
			align-items: center;
			margin-right: 3vw;
		}


		.DiBigRightDiv {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			margin-left: 2vw
		}

		.Pay {
			width: 45vw;
			height: 8vh;
			color: rgba(255, 255, 255, 1);
			background-color: rgba(255, 82, 82, 1);

			/* background: linear-gradient(to right, rgba(255, 82, 82, 1) 0%, rgba(231, 70, 87, 1.0) 50%, rgba(255, 82, 82, 1)100%); */

			border-radius: 1vw;
			font-size: 6vw;
			font-weight: 900;
			line-height: 150%;
			text-align: center;
			font-weight: bold;

			display: flex;
			align-items: center;
			justify-content: center;
		}


		.DiView {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
		}




		.DiCenterDiv {
			font-size: 3vw;
			text-align: center;
			width: auto;
			display: flex;
			align-items: center;
		}

		/deep/ .uni-table-tr {
			width: 100vw !important;
			display: flex !important;
			justify-content: space-around !important;
			align-items: center !important;
		}

		/deep/ .uni-table {
			min-width: auto !important;
		}

		.DiLeftDiv image {
			width: 8vw;
			height: 8vw;
			color: rgba(255, 141, 26, 1);
			margin-bottom: 2px;
		}

		.MaoHao {
			margin-right: 0.5vw;
		}

		.DiCenterNum {
			color: rgba(250, 45, 36, 1);
			/* margin: 0 0.5vw; */
			font-size: 6vw;
			font-weight: 600;
		}

		.DiCenterShuLiang {
			color: rgba(250, 45, 36, 1);
			margin: 0 0.5vw;
			font-size: 4vw;
			font-weight: 900;
		}

		.DiLeftDiv {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			color: rgba(255, 141, 26, 1);
			font-size: 3vw;
			line-height: 150%;
			text-align: left;

			margin-left: 3vw;
			position: relative;
			bottom: 0.5vh;
		}

	}

	.PayPopIndex {
		min-width: 71vw;
		min-height: 40vh;
		background-color: #4575c2;
		text-align: center;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 1vw;
		padding: 0 2vw;

		.ChangePayClass {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 3vh;
			margin-top: 2vh;
		}

		.PayPopDel image {
			width: 3vw;
			height: 3vw;
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



		.PayPopTitle {
			display: flex;
			align-items: flex-end;
			justify-content: center;
			margin-top: 3vh;
		}

		.PayPopFangShi {
			font-size: 8vw;
			font-weight: 600;
			letter-spacing: 0.6vw;
			margin-bottom: 3vh;
		}

		.PayPopTitleHeJi {
			font-size: 3.7vw;
		}

		.PayPopSmallText {
			font-size: 2vw;
			font-weight: 500;
			letter-spacing: 0.3vw;
			margin-top: 2vh;
			color: aliceblue;

		}

		.PayPopTitleMoney {
			color: #e9bc4a;
			font-size: 7vw;
			font-weight: 900;
		}

		.PayPopPNG {
			width: 29vw;
			height: 29vw;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.big {
			display: flex;
			justify-content: center;
			position: fixed;
			left: 100vw;
		}

		.PayPopPNG image {
			width: 28vw;
			height: 28vw;
		}

		/* uni-canvas{
		width: 28vw !important;
		height: 28vw !important;
	} */

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
			// color: #3a9fdd;
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
				// color: #2e629b;
				font-weight: 700;

				.youhuiNum {
					font-size: 4vw;
				}
			}
		}

		.tips {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 4vw;
			// color: #3a9fdd;
			font-weight: 700;
			line-height: 4vh;

		}

		.tipsbox {
			margin-top: 3vh;
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
				margin-top: 1vh;

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
				margin-top: 1vh;

				text:nth-child(1) {
					font-size: 4vw;
					font-weight: 700;
				}

				text:nth-child(2) {
					font-size: 5vw;
					font-weight: 700;
					// color: #2e629b;
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
						font-size: 3vw;
						margin-left: 2vw;
						font-weight: 700;
						// margin-top: 1vh;
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
					margin-left: 8vw;
					margin-top: 1vh;
				}

				.order {
					margin-top: 0.8vh;
					margin-left: 7vw;


				}

				.price {
					color: #000000;
					font-size: 4.5vw;
					margin-top: 2vh;
				}

				.num {
					color: #000000;
					// color: #77b0dd;
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
			height: 48vh;
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
				width: 45vw;
				margin-left: 1vw;
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
					// align-items: center;
					justify-content: center;
					width: 6vw;
					height: 6vw;
					margin-left: 1vw;
					border-radius: 50%;
					font-size: 7vw;
					background-color: #7dbbea;
					line-height: 5vw;

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
					background-color: #7dbbea;

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
				}

			}
		}
	}

	.DetailsPop {
		width: 79vw;
		height: 45vh;
		border-radius: 20rpx;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 4vh;
		}

		.back {
			width: 43vw;
			height: 5vh;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 5vw;
			font-size: 4vw;
			background-color: #228afc;
			color: #fff;
		}

		.DetailsList {
			margin-top: 2vh;
			margin-left: 2vh;
			display: flex;

			.left {
				width: 38vw;
				height: 34vh;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				height: 43vh;
				overflow-y: scroll;

				width: 39%;
				// height: 90%;
				margin-left: 5vw;
				font-size: 2vh;
				line-height: 2.4vh;

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
				}
			}

		}


		.Money {
			width: 35%;
			margin-left: 2vw;
			font-weight: 700;

			.youhuiText {
				.youhuiNum {
					font-size: 2vw;
					color: red;
				}
			}

			.manjian {
				display: flex;
				flex-wrap: wrap;
				color: #ff5733;
				font-size: 3vw;
				font-weight: 700;
				margin-left: 1vw;
			}

			.num {
				// color: #36759b;
				font-size: 4.5vw;
				margin-left: 1vw;
				margin-top: 1vh;
			}

			.order {
				// margin-top: 1vh;
				margin-left: 1vw;

			}

			.price {
				// color: #36759b;
				font-size: 3.8vw;
				// margin-top: 1vh;
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

	.GoodsContainer {
		height: 80vh;
		width: 100%;
		padding-bottom: 12vh;
		overflow-y: auto;


		.tipsText {
			width: 100%;
			display: flex;
			// margin-left: 3vw;
			justify-content: center;
			align-items: center;
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
			bottom: 12vh;

			.textbox {
				font-size: 4vw;
				font-weight: 700;
			}
		}
	}

	.GoodsBox {
		// height: 77vh;		
		width: 100%;
		// overflow-y: auto;
		display: flex;
		flex-wrap: wrap;
		// justify-content: space-around;


		.goodsItem {
			border-radius: 10rpx;
			// padding: 10rpx;
			margin-left: 4vw;
			height: 27vh;
			// width: 25.9vw;
			width: 28%;
			border-radius: 30rpx;
			margin-top: 3vh;
			background-color: #edf0f4;

			.pic {
				// width: 25.9vw;
				width: 100%;
				height: 25.9vw;
				border-radius: 10rpx;

				.img {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}

			.details {
				display: flex;
				flex-direction: column;

				.name {
					// color: #2e629b;、
					font-size: 3vw;
					font-weight: 700;
					// color: #77b0dd;
					margin-top: 0.2vh;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.vipPrice {
					font-size: 3vw;
					// color: #2e629b;
					font-weight: 700;
					margin-top: 0.2vh;
					display: flex;
					// margin-left: 3vw;
					justify-content: center;
					align-items: center;
				}

				.price {
					font-size: 3vw;
					// color: #2e629b;
					font-weight: 700;
					margin-top: 0.2vh;
					display: flex;
					// margin-left: 3vw;
					justify-content: center;
					align-items: center;
				}

				.box {
					display: flex;
					justify-content: space-around;
					align-items: center;

					// margin-top: 1vh;
					.nonebox {
						display: flex;
						justify-content: center;
						align-items: center;

						.none {
							width: 15vw;
							height: 5vw;
							background-color: #797979;
							border-radius: 2vw;
							display: flex;
							justify-content: center;
							align-items: center;
							font-size: 3vw;
							color: #fff;
						}
					}

					.btn {
						display: flex;
						align-items: center;
						justify-content: center;

						.icon1 {
							display: flex;
							// align-items: center;
							justify-content: center;
							width: 5vw;
							height: 5vw;
							margin-left: 1vw;
							border-radius: 50%;
							font-size: 6vw;
							background-color: #7dbbea;
							line-height: 4vw;

							text {
								color: #fff;
							}
						}

						.icon2 {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 5vw;
							height: 5vw;
							margin-left: 1vw;
							border-radius: 50%;
							font-size: 5vw;
							background-color: #7dbbea;

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
							margin-left: 1vw;
						}


					}
				}

			}
		}
	}

	/deep/.uni-navbar--border {
		border-bottom-width: 0;
	}

	/deep/ .uni-navbar__header {
		height: 7vh !important;
		background-color: #7dbbea !important;
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

	page {
		background-color: #fff;
	}
</style>