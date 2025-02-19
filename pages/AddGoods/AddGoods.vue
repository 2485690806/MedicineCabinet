<template>	
	<view class="container" @click="AllClick">		
		<uni-nav-bar height="10vh" :border="false" left-icon="help" title="All products" @clickLeft="back" />
		<view class="GoodsContainer">
			<view class="GoodsBox" style="padding-left:1vw;">
				
				<!--6层货-->
				<view class="goodsItem" v-for="(good,index) in dataList" :key="index">
					<view class="pic">
						<image :src="good.img?good.img:'../../static/shopCar.png'" mode="scaleToFill" class="img" @click="openDetailsPop(good)">
						</image>
					</view>
					<view class="details">
						<view class="name">{{good.name?good.name:'Product'+(index+1)}}</view>
						<view class="price" style="font-family: 'Times New Roman', Times, serif;">Price:${{good.price}} Stock:{{good.num}}</view>
						<view class="vipPrice" v-if="false">preferential price:233</view>
						<view class="box" v-if="false">
							<view class="btn" v-if="good.num!=0">
								<view class="icon1" @click.stop="minusNum(good,index)">
									<text>-</text>
									<text>-</text>
								</view>
								<text class="num">{{good.Num}}</text>
								<view class="icon2" @click.stop="addNum(good,index)">
									<text>+</text>
								</view>
							</view>
							<view class="nonebox" v-if="good.num==0">
								<view class="none">
									<text>Sold out</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="footer" v-if="false">
			<view class="left">
				<view class="ShopCar" @click="openShopCar">
					<view><uni-icons type="cart-filled" size="50" color="#7dbbea"></uni-icons></view>
					<text class="choosen">Shopping Cart</text>
				</view>

			</view>
			<view class="Money">
				<view class="manjian" v-if="false">
					<text>{{ManJianText}}</text>
				</view>
				<view class="order">
					<text class="price">Total price:</text>
					<view class="num" style="font-family: 'Times New Roman', Times, serif;">${{TotalMoney}}</view>
				</view>
				<view class="youhuiText" v-if="false">
					<text class="youhuiNum">
						（Reduced{{YouHuiMoney}}）
					</text>
				</view>
			</view>
			<view class="Pay" @click="TurnToPayMoney">
				<text>Payment</text>
			</view>
		</view>
		<uni-popup ref="ShopCarPop" type="bottom" :animation="false" background-color="#fff">
			<view class="ShopCarPop">
				<view class="Title">
					<text>Amount details</text>
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
							<text class="price" style="font-family: 'Times New Roman', Times, serif;">${{good.salePrice}}/个</text>
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
						<text>original price</text>
						<text style="font-family: 'Times New Roman', Times, serif;">${{OriginalMoney}}</text>
					</view>
					<view class="youhui">
						<text>Co discount</text>
						<text style="font-family: 'Times New Roman', Times, serif;">${{YouHuiMoney}}</text>
					</view>
					<view class="Allprice">
						<text>Total</text>
						<text style="font-family: 'Times New Roman', Times, serif;">${{TotalMoney}}</text>
					</view>
				</view>
				<view class="footer">
					<!-- <view class="left">
						<view class="ShopCar" @click="openShopCar">
							<text><uni-icons type="cart-filled" size="80" color="#ff5733"></uni-icons></text>
							<text class="choosen">Shopping Cart</text>
						</view>
						
					</view> -->
					<view class="Money">
						<view class="manjian">
							<text>{{ManJianText}}</text>
						</view>
						<view class="order">
							<text class="price">Total price:</text>
							<text class="num" style="font-family: 'Times New Roman', Times, serif;">${{TotalMoney}}</text>
						</view>
					</view>
					<view class="Pay" @click="TurnToPayMoney">
						<text>Payment</text>
					</view>
				</view>
			</view>
		</uni-popup>
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
		<uni-popup ref="Paypopup" background-color="#fff">
			<view class="PayBox">
				<view class="Pricebox">
					<text class="price">Total price:</text>
					<text class="num" style="font-family: 'Times New Roman', Times, serif;">${{TotalMoney}}

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
						<text>{{productname}}</text>
					</view>
				</view>
				<view class="box" v-if="false">
					<view class="PayPic">
						<image src="/static/payMoney.png" mode="aspectFill" class="img"></image>
						<image src="/static/payMoney.png" mode="aspectFill" class="img"></image>
					</view>
				</view>
				
				<view class="paytype" v-if="pay_pay"> 
					<button>Payment via POS machine</button> 
					<view style="height: 30px;"></view>
				</view>
				
				<view class="paytype" v-if="pay_cash"> 
					<button @click="dodevcash()">Paper currency machine payment</button> 
					<view style="height: 30px;"></view>
				</view>
				
				<view class="paytype" v-if="pay_coin">
					<button @click="dodevcoin()">Coin payment</button> 
					<view style="height: 30px;"></view>
				</view>
				
				<view class="text">
					<view class="tipsbox">
						<view class="tips">Please select the corresponding payment method and complete the payment. 
						After the payment is completed, please wait for 3 minutes for shipment</view>
					</view>
				</view>
				
			</view>
		</uni-popup>
		<!-- 监听键盘 -->
		<keyboard-listener @keydown="PayKeyDowm"></keyboard-listener>

		<x-shop-modal :modalShow="isShowDetail" @close="closeDetail" :dataObj="goodDetail"
			@addCart="Buy"></x-shop-modal>

	</view>
</template>

<script>
	import keyboardListener from 'uniapp-keyboard-listener';
	import xShopModal from '../../components/x-shopModal/x-shopModal';

	export default {
		data() {
			return {
				isShowDetail: false,
				goodObj: {},
				dataList: [],
				storeId: '',
				isActive: '',
				// 加入购物车列表
				shopCarList: [],
				Tips: '',
				TimeOut: '',
				ManJianText: '',
				// 总价金额
				TotalMoney: 0,
				// 共优惠
				YouHuiMoney: 0,
				productname:"",
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
				// 节流
				requestStatus: true,
				orderNum: '',
				isOpen:false,
				isOpen1:false,
				isOpen2:false,
				pay_pay:false,
				pay_cash:false,
				pay_coin:false,
				time_money:null,
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				list6:[],
				lane:[5,10,10,10,8,10],
				deviceId:"",
				sysinfo:""
			};
		},
		components: {
			keyboardListener,
			xShopModal,
		},
		computed: {

		},
		onShow() {
			let that = this;
			this.storeId = uni.getStorageSync('storeId');
			if (uni.getStorageSync('goodsList') == '' || uni.getStorageSync('goodsList') == null || uni.getStorageSync(
					'goodsList') == undefined) {
				
			} else {
				
			}
			
			/*************列1矩阵开始***********/
			var list=[];
			let list1 = uni.getStorageSync("list1");
			for (var i = 0; i < list1.length; i++) {
				if (list1[i].num>0) {
					list.push(list1[i]);
				}
			}
			this.list1 = list;
			/*************列1矩阵结束***********/
			
			/*************列2矩阵开始***********/
			var list=[];
			let list2 = uni.getStorageSync("list2");
			for (var i = 0; i < list2.length; i++) {
				if (list2[i].num>0) {
					list.push(list2[i]);
				}
			}
			this.list2 = list;
			/*************列2矩阵结束***********/
			
			/*************列3矩阵开始***********/
			var list=[];
			let list3 = uni.getStorageSync("list3");
			for (var i = 0; i < list3.length; i++) {
				if (list3[i].num>0) {
					list.push(list3[i]);
				}
			}
			this.list3 = list;
			/*************列3矩阵结束***********/
			
			/*************列4矩阵开始***********/
			var list=[];
			let list4 = uni.getStorageSync("list4");
			for (var i = 0; i < list4.length; i++) {
				if (list4[i].num>0) {
					list.push(list4[i]);
				}
			}
			this.list4 = list;
			/*************列4矩阵结束***********/
			
			/*************列5矩阵开始***********/
			var list=[];
			let list5 = uni.getStorageSync("list5");
			for (var i = 0; i < list5.length; i++) {
				if (list5[i].num>0) {
					list.push(list5[i]);
				}
			}
			this.list5 = list;
			/*************列5矩阵结束***********/
			
			/*************列6矩阵开始***********/
			var list=[];
			let list6 = uni.getStorageSync("list6");
			for (var i = 0; i < list6.length; i++) {
				if (list6[i].num>0) {
					list.push(list6[i]);
				}
			}
			this.list6 = list;
			
			this.dataList = this.dataList.concat(this.list1);
			this.dataList = this.dataList.concat(this.list2);
			this.dataList = this.dataList.concat(this.list3);
			this.dataList = this.dataList.concat(this.list4);
			this.dataList = this.dataList.concat(this.list5);
			this.dataList = this.dataList.concat(this.list6);
			
			this.getAllGoods();
			/*setTimeout(function(){
				that.TurnToPayMoney();
			},3000);*/
			
		},
		onLoad() {
			let that = this;
			let sysinfo = uni.getSystemInfoSync();
			that.deviceId = sysinfo.deviceId;
			that.sysinfo = sysinfo;
			that.timeup();
			
			/**********************************************/
			let devcash = uni.getStorageSync("devcash");
			let devpay = uni.getStorageSync("devpay");
			let dev24 = uni.getStorageSync("dev24");
			let devcoin = uni.getStorageSync("devcoin");
			if (devcash) {
				that.pay_cash = true;
			}
			if (devpay) {
				that.pay_pay = true;
			}
			if (devcoin) {
				that.pay_coin = true;
			}
			/**********************************************/
			
		},
		onHide() {
			clearInterval(this.timer);
		},
		onUnload() {
			clearInterval(this.timer);
		},
		mounted() {

		},

		watch: {
			Seconds(newval) {
				let that = this;
				if (newval <= 0) {
					clearInterval(that.timer);
					// uni.navigateTo({
					// 	url: '/pages/index/index'
					// })
				}
			}

		},
		methods: {
			Buy(data) {
				var that = this;
				this.isShowDetail = false;
				/*******************改成唯一***/
				this.shopCarList = [];
				/*******************改成唯一***/
	
				
				// 如果不存在，就添加新的对象
				/*switch (data.Channel){
					case 1:
						this.dList = this.list1;
						break;
					case 2:
						this.dList = this.list2;
						break;
					case 3:
						this.dList = this.list3;
						break;
					case 4:
						this.dList = this.list4;
						break;
					case 5:
						this.dList = this.list5;
						break;
					default:
						this.dList = this.list6;
						break;
				}*/
				
				this.dList = uni.channel(data.Channel);
				
				this.dList.forEach(item => {
					if (item.doorid == data.materialId) {
						item.Num = data.count
						this.shopCarList.push(item);
					}
				})
				this.CountMoney(this.YouHuiQuan)
				
				
				
				/*let item = this.shopCarList.find((item) => item.id === data.materialId);
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
				};*/
				
				for (let i = 0; i < this.shopCarList.length; i++) {
					if (this.shopCarList[i].Num == 0) {
						this.shopCarList.splice(i, 1)
					}
				}
				
				this.productname = this.shopCarList[0].name				
				uni.setStorageSync('shopCarList', this.shopCarList);
				
				setTimeout(function(){
					that.TurnToPayMoney();
				},500)
				
			},
			closeDetail() {
				this.isShowDetail = false
			},			
			closePort() {
				this.isOpen = false;
				this.isOpen1 = false;
				this.isOpen2 = false;
			},
			sends(path,pot,str){
				
			},
			//监听数据
			onMessage() {
	
			},
			onMessage1() {				
		
			},
			onMessage2() {
				
			},
			ClosePayPop() {
				this.$refs.Paypopup.close('center');
			},
			AllClick() {
				this.Seconds = 90;
			},
			// 倒计时回调
			timeup() {
				let that = this;
				that.timer = setInterval(() => {
					that.Seconds -= 1;
				}, 1000)
			},
			// 统计金额
			async CountMoney(authCode) {
				// if (this.shopCarList == '') return this.HaveError('请您先选择商品')
				let goodsNum = [];
				let content = "";
				let price = 0;
				
				this.shopCarList.forEach(i => {
					let key = i.doorid
					let num = i.num
					let a = {
						[key]: num
					}
					goodsNum.push(a);
					content = i.name;
					price += parseFloat(i.price);
				})
				let data = {
					"goodsNum": goodsNum,
					"storeId": this.storeId,
					"isVip": 0,
					"orderPayMethod": 0,
					"authCode": authCode
				}
				/*const {
					data: res
				} = await uni.$http.post(`https://duola.yunchuang.store/flowermachine/api/CountMoney.php`, data);*/
				
				let res = {
				    "code": 200,
				    "data": {
				        "id": null,
				        "orderNum": null,
				        "reservedFyTraceNo": "",
				        "reservedFySettleDt": null,
				        "orderStatus": null,
				        "refundStatus": null,
				        "content": content,
				        "payMethod": null,
				        "price": price,
				        "wxUserId": null,
				        "storeId": 1,
				        "isInAccount": null,
				        "cashierId": null,
				        "isDelete": null,
				        "createTime": null,
				        "updateTime": null,
				        "discounts": "",
				        "couponOffers": "",
				        "originalPrice": price,
				        "couponId": ""
				    },
				    "message": "ok",
				    "description": ""
				}
				
				
				if (res.code !== 200) {
					this.$refs.Paypopup.close('center')
					this.HaveError(res.message);
					this.Paytext = "" // 手机付款码
					this.YouHuiQuan = null; //优惠券清空
					return
				}
				
				this.ManJianText = res.data.reservedFyTraceNo;
				this.TotalMoney = (res.data.price).toFixed(2);
				this.YouHuiMoney = (Number(res.data.originalPrice) - Number(res.data.price)).toFixed(2);
				this.OriginalMoney = (res.data.originalPrice).toFixed(2)
				this.DoYouHuiText(res.data.couponOffers);
				this.orderNum = res.data.couponId;
				//风哥暂时注console.log(res.data);
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
						//that.createPayOrder();
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
						//that.createPayOrder();
						setTimeout(() => {
							that.requestStatus = true;
						}, 3000)
					}
				} else {
					this.Paytext += e.key;
				}

			},
			TurnToPayMoney() {
				let that = this;
			
				if (this.shopCarList.length == 0) {
					this.Tips = 'Please select the product first';
					this.Paytext = "" // 手机付款码
					this.$refs.popup2.open('center')
					this.TimeOut = setTimeout(() => {
						this.$refs.popup2.close('center')
					}, 4000)

				} else {
					this.$refs.Paypopup.open('center');					
				}
			},
			dodevcash(){
				let that = this;
				console.log("dodevcash");
				uni.navigateTo({
					url: "/pages/Paycash/Paycash"
				});
			},
			dodevcoin(){
				let that = this;
				uni.navigateTo({
					url: "/pages/Paycoin/Paycoin"
				});
			},
			dodevpay(){
				
				
			},			
			ClosePop2() {
				clearTimeout(this.TimeOut)
			},
			minusNum(good, index) {
				this.Seconds = 90;
				console.log(this.Seconds = 90);
				if (good.Num <= 0) return uni.$showMsg('The number of units cannot be negative');
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
				if (good.Num >= (Number(good.num))) return uni.$showMsg('The maximum number of units has been reached');
				good.Num += 1;
				//风哥暂时注console.log(good);
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
			},// 得到商品
			async getAllGoods() {
				/*async 这个是放在fun前面 const {
					data: res
				} = await uni.$http.get(`https://duola.yunchuang.store/flowermachine/api/Goods.php?storeId=${this.storeId}`);
				*/
			   /*let res = uni.getStorageSync("goods");
				
				if (res.code !== 200) return uni.$showMsg(res.message);
				for (var i = 0; i < res.data.length; i++) {
					if (res.data[i].status) {
						this.dataList.push(res.data[i]);
					}	
				}
				//console.log(res.data);
				//this.dataList = res.data;
				this.dataList.forEach((item, index) => {
					item.Num = 0;
				});
				
				uni.setStorageSync("goodsList", this.dataList);*/
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
				//console.log(good);
				this.showDetail(good)
			},
			showDetail(baseListItem) {
				this.isShowDetail = true
				let a = {
					img: baseListItem.img?baseListItem.img:'../../static/shopCar.png',
					name: baseListItem.name,
					tags: baseListItem.name,
					priNum: baseListItem.price,
					showPrice: baseListItem.price,
					description: baseListItem.name,
					sellerUnit: "个",
					increase: 1,
					unit: 1,
					Channel: baseListItem.channel,
					Num: baseListItem.num,
					leastBuy: 0,
					mostBuy: 1000,
					// storage: item.storage,
					materialId: baseListItem.doorid,
					isSuit: false,
					type: 1,
				}
				this.goodDetail = a
			},

			CloseDetailsPop() {
				this.$refs.DetailsPop.close('center');
			},
			back() {
				
				
				// let password = uni.getStorageSync("password");
				// if (!password) {
				// 	uni.navigateTo({
				// 		url:'/pages/toHelp/toHelp'
				// 	});return;
				// }
				// uni.showModal({
				// 	title:"Please enter password",
				// 	editable:true,
				// 	placeholderText:"Please enter password",
				// 	confirmText:"ok",
				// 	cancelText:"cancel",
				// 	success:(res)=>{
				// 		if (res.confirm) {
				// 			if (res.content == password) {
				// 				uni.navigateTo({
				// 					url:'/pages/toHelp/toHelp'
				// 				});
				// 			} else {
				// 				uni.$showMsg("password error");
				// 			}
				// 		}
				// 	}
				// });
				
				
				uni.navigateTo({
					url: "/pages/Help/Help",
					animationType: "slide-in-left",
				})
			},
		}
	}
</script>

<style lang="scss">
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
			font-size: 3vw;
			line-height: 4vh;
			margin: 0 20px;
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
			margin-top: 0vh;
			width: 100%;
			height: 42vw;
			text-align: center;
			margin-left: 2vw;

			.img {
				width: 35vw;
				height: 35vw;
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
			.youhuiText{
				.youhuiNum{
						font-size: 2vw;
						color:red;
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

	.paytype{
		width: 80%;
		margin: 0 auto;
		button{
			height: 8vh;
			line-height: 8vh;
			background-color: #228afc;
			color: #edf0f4;
			font-size: 30px;
		}
	}
	
	.GoodsContainer {
		height: 80vh;
		width: 100%;
		padding-bottom: 12vh;
		overflow-y: auto;
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
			margin-left: 2vw;
			height: 22vh;
			// width: 25.9vw;
			width: 30%;
			border-radius: 30rpx;
			margin-top: 3vh;
			background-color: #edf0f4;

			.pic {
				// width: 25.9vw;
				width: 100%;
				height: 27vw;
				border-radius: 10rpx;

				.img {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
					border: 1px solid #edf0f4;
					border-bottom: 0px;
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
					margin-top: 0.5vh;
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