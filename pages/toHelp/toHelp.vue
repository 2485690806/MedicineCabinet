<template>
	<view class="container">
		<uni-nav-bar height="10vh" :border="false" left-icon="left" title="Backend management" @clickLeft="back" />
		<view class="Body">
			<view class="Index" v-if="false">
				<view>
					<button style="background-color: gold;color: black;" class='ButtonONE' @click="allok">
						All products are listed
					</button>
				</view>
			</view>
			<view class="listbox">
				<view style="margin: 10px auto 0 auto;text-align: center"><text>第{{item1}}排货道</text></view>
				<view class="list" v-for="(item,index) in list1" :key="index" style="margin-bottom: 10px;">
					<view>
						<image :src="item.img" style="width: 100%;height: 40vw;" @click="upimg('1',index)"></image>
					</view>
					<button
						:style="item.num>0?'background-color:#2767ff;color:#000000;':'background-color:#ffffff;color:#000000;'"
						class='ButtonClass' @click="opendoor('1',index)">
						Open
					</button>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Name</text><input
							:value="item.name" @input="uplist" :id="'1,name,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入商品名" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Price</text><input
							:value="item.price" @input="uplist" :id="'1,price,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入单价" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Inventory</text><input
							:value="item.num" @input="uplist" :id="'1,num,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入库存" /></view>
				</view>
			</view>


			<view class="listbox">
				<view style="margin: 10px auto 0 auto;text-align: center"><text>第2排货道</text></view>
				<view class="list" v-for="(item,index) in list2" :key="index" style="margin-bottom: 10px;">
					<view>
						<image :src="item.img" style="width: 100%;height: 40vw;" @click="upimg('2',index)"></image>
					</view>
					<button
						:style="item.num>0?'background-color:#2767ff;color:#000000;':'background-color:#ffffff;color:#000000;'"
						class='ButtonClass' @click="opendoor('2',index)">
						Open
					</button>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Name</text><input
							:value="item.name" @input="uplist" :id="'2,name,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入商品名" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Price</text><input
							:value="item.price" @input="uplist" :id="'2,price,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入单价" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Inventory</text><input
							:value="item.num" @input="uplist" :id="'2,num,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入库存" /></view>
				</view>
			</view>
			<view class="listbox">
				<view style="margin: 10px auto 0 auto;text-align: center"><text>第3排货道</text></view>
				<view class="list" v-for="(item,index) in list3" :key="index" style="margin-bottom: 10px;">
					<view>
						<image :src="item.img" style="width: 100%;height: 40vw;" @click="upimg('3',index)"></image>
					</view>
					<button
						:style="item.num>0?'background-color:#2767ff;color:#000000;':'background-color:#ffffff;color:#000000;'"
						class='ButtonClass' @click="opendoor('3',index)">
						Open
					</button>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Name</text><input
							:value="item.name" @input="uplist" :id="'3,name,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入商品名" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Price</text><input
							:value="item.price" @input="uplist" :id="'3,price,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入单价" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Inventory</text><input
							:value="item.num" @input="uplist" :id="'3,num,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入库存" /></view>
				</view>
			</view>
			<view class="listbox">
				<view style="margin: 10px auto 0 auto;text-align: center"><text>第4排货道</text></view>
				<view class="list" v-for="(item,index) in list4" :key="index" style="margin-bottom: 10px;">
					<view>
						<image :src="item.img" style="width: 100%;height: 40vw;" @click="upimg('4',index)"></image>
					</view>
					<button
						:style="item.num>0?'background-color:#2767ff;color:#000000;':'background-color:#ffffff;color:#000000;'"
						class='ButtonClass' @click="opendoor('4',index)">
						Open
					</button>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Name</text><input
							:value="item.name" @input="uplist" :id="'4,name,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入商品名" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Price</text><input
							:value="item.price" @input="uplist" :id="'4,price,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入单价" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Inventory</text><input
							:value="item.num" @input="uplist" :id="'4,num,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入库存" /></view>
				</view>
			</view>
			<view class="listbox">
				<view style="margin: 10px auto 0 auto;text-align: center"><text>第5排货道</text></view>
				<view class="list" v-for="(item,index) in list5" :key="index" style="margin-bottom: 10px;">
					<view>
						<image :src="item.img" style="width: 100%;height: 40vw;" @click="upimg('5',index)"></image>
					</view>
					<button
						:style="item.num>0?'background-color:#2767ff;color:#000000;':'background-color:#ffffff;color:#000000;'"
						class='ButtonClass' @click="opendoor('5',index)">
						Open
					</button>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Name</text><input
							:value="item.name" @input="uplist" :id="'5,name,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入商品名" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Price</text><input
							:value="item.price" @input="uplist" :id="'5,price,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入单价" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Inventory</text><input
							:value="item.num" @input="uplist" :id="'5,num,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入库存" /></view>
				</view>
			</view>
			<view class="listbox">
				<view style="margin: 10px auto 0 auto;text-align: center"><text>第6排货道</text></view>
				<view class="list" v-for="(item,index) in list6" :key="index" style="margin-bottom: 10px;">
					<view>
						<image :src="item.img" style="width: 100%;height: 40vw;" @click="upimg('6',index)"></image>
					</view>
					<button
						:style="item.num>0?'background-color:#2767ff;color:#000000;':'background-color:#ffffff;color:#000000;'"
						class='ButtonClass' @click="opendoor('6',index)">
						Open
					</button>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Name</text><input
							:value="item.name" @input="uplist" :id="'6,name,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入商品名" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Price</text><input
							:value="item.price" @input="uplist" :id="'6,price,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入单价" /></view>
					<view style="margin-left: 10px;clear: both;"><text style="float: left;">Inventory</text><input
							:value="item.num" @input="uplist" :id="'6,num,'+index"
							style="margin-left: 10px;float: left;" class="uni-input" placeholder="请输入库存" /></view>
				</view>
			</view>





			<view class="listbox" v-if="false">
				<view class="list" v-for="(item,index) in buttons" :key="index">
					<button :style="item.status?'background-color:#2767ff;color:#fff;':''"
						:disabled="item.name?false:true" class='ButtonClass' @click="opendoor(item)">
						Open {{item.doorid}}
					</button>
					<button :style="item.status?'background-color:#2767ff;color:#fff;':''"
						:disabled="item.name?false:true" class='ButtonClass bt_r' @click="up(item)">
						{{item.status?"Off":"ON"}}
					</button>
				</view>
			</view>

			<view class="clear"></view>
			<view class="Index">
				<view><!--Synchronize products from a USB drive-->
					<button style="background-color: gold;color: black;" class='ButtonONE' @click="update()">
						Data initialization
					</button>
				</view>

				<view>
					<button style="background-color: gold;color: black;" class='ButtonONE' @click="changepassword()">
						change password
					</button>
				</view>
				
				<view>
					<button style="background-color: gold;color: black;" class='ButtonONE' @click="logout()">
						logout app
					</button>
				</view>

				<view>
					<button style="background-color: gold;color: black;" class='ButtonONE' @click="ziJian()">
						自检
					</button>
				</view>

			</view>
			<view style="height: 20px;"></view>
		</view>
	</view>
</template>

<script>
	const SP24 = uni.requireNativePlugin('Fvv-UniSerialPort');

	export default {
		data() {
			return {
				dev24: null,
				buttons: [],
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				list5: [],
				list6: [],
				//lane:[5,10,10,10,8,10],
				lane: [10, 10, 10, 10, 10, 10],
				keygoods: {}
			}
		},
		onShow() {
			this.dev24 = uni.getStorageSync("dev24");
			this.openTTL();



			/********************************以上是侦听信息***************/
		},
		onUnload() {
			console.log("Unload.SP24.close");
			SP24.close();
		},
		onHide() {
			console.log("Hide.SP24.close");
			SP24.close();
		},
		onLoad() {
			var that = this;
			let res = uni.getStorageSync("goods");

			/*uni.setStorageSync("list1","");
			uni.setStorageSync("list2","");
			uni.setStorageSync("list3","");
			uni.setStorageSync("list4","");
			uni.setStorageSync("list5","");
			uni.setStorageSync("list6","");
			数据初始化
			*/
			let product_id = 1;
			/*************列1矩阵开始***********/
			let list1 = uni.getStorageSync("list1");
			if (!list1) {
				list1 = [];
				for (var i = 0; i < that.lane[0]; i++) {
					let a = {
						doorid: i + "1",
						img: "../../static/PingZi.png",
						name: "Product" + product_id,
						price: 999,
						num: 0,
						channel: 1
					};
					list1.push(a);
					product_id += 1;
				}
				uni.setStorageSync("list1", list1);
			}
			this.list1 = list1;
			/*************列1矩阵结束***********/

			/*************列2矩阵开始***********/
			let list2 = uni.getStorageSync("list2");
			if (!list2) {
				list2 = [];
				for (var i = 0; i < that.lane[1]; i++) {
					let a = {
						doorid: i + "2",
						img: "../../static/PingZi.png",
						name: "Product" + product_id,
						price: 999,
						num: 0,
						channel: 2
					};
					list2.push(a);
					product_id += 1;
				}
				uni.setStorageSync("list2", list2);
			}
			this.list2 = list2;
			/*************列2矩阵结束***********/

			/*************列3矩阵开始***********/
			let list3 = uni.getStorageSync("list3");
			if (!list3) {
				list3 = [];
				for (var i = 0; i < that.lane[2]; i++) {
					let a = {
						doorid: i + "3",
						img: "../../static/PingZi.png",
						name: "Product" + product_id,
						price: 999,
						num: 0,
						channel: 3
					};
					list3.push(a);
					product_id += 1;
				}
				uni.setStorageSync("list3", list3);
			}
			this.list3 = list3;
			/*************列3矩阵结束***********/

			/*************列4矩阵开始***********/
			let list4 = uni.getStorageSync("list4");
			if (!list4) {
				list4 = [];
				for (var i = 0; i < that.lane[3]; i++) {
					let a = {
						doorid: i + "4",
						img: "../../static/PingZi.png",
						name: "Product" + product_id,
						price: 999,
						num: 0,
						channel: 4
					};
					list4.push(a);
					product_id += 1;
				}
				uni.setStorageSync("list4", list4);
			}
			this.list4 = list4;
			/*************列4矩阵结束***********/

			/*************列5矩阵开始***********/
			let list5 = uni.getStorageSync("list5");
			if (!list5) {
				list5 = [];
				for (var i = 0; i < that.lane[4]; i++) {
					let a = {
						doorid: i + "5",
						img: "../../static/PingZi.png",
						name: "Product" + product_id,
						price: 999,
						num: 0,
						channel: 5
					};
					list5.push(a);
					product_id += 1;
				}
				uni.setStorageSync("list5", list5);
			}
			this.list5 = list5;
			/*************列5矩阵结束***********/

			/*************列6矩阵开始***********/
			let list6 = uni.getStorageSync("list6");
			if (!list6) {
				list6 = [];
				for (var i = 0; i < that.lane[5]; i++) {
					let a = {
						doorid: i + "6",
						img: "../../static/PingZi.png",
						name: "Product" + product_id,
						price: 999,
						num: 0,
						channel: 6
					};
					list6.push(a);
					product_id += 1;
				}
				uni.setStorageSync("list6", list6);
			}
			this.list6 = list6;
			/*************列6矩阵结束***********/


			that.goods = res.data;
			let keygoods = {};

			if (!that.goods) {
				that.goods = [];
			}

			for (var i = 0; i < that.goods.length; i++) {
				var goodsname = "goods" + that.goods[i].doorid;
				eval('Object.assign(keygoods,{' + goodsname + ':that.goods[i]});');
			}
			that.keygoods = keygoods;


			for (var i = 1; i < 25; i++) {
				var n = "";
				for (var j = 0; j < that.goods.length; j++) {
					if (that.goods[j].doorid == i) {
						n = that.goods[j];
					}
				}
				if (n) {
					this.buttons.push(n);
				} else {
					this.buttons.push({
						doorid: i,
						name: "",
						status: false
					});
				}
			}

		},
		methods: {
			logout(){
				uni.reLaunch({
					url: "/pages/Login/Login"
				})
			},
			ziJian() {
				let yanshi = 5000; // 每次循环的延迟时间（以毫秒为单位）
				let num = 0;

				for (let i = 1; i <= 6; i++) {

					for (let j = 1; j <= 10; j++) {

						setTimeout(() => {
							this.opendoor(i, j);
						}, yanshi * num);
						num++;
					}
				}

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
					uni.$showMsg("door lock has been opened " + rec0, 10000);
					
					if (rec.substring(0, 10) == "5850110101") {
						console.log("出货OK-e" + id);
						
						
						// let newgoods = [];
						// for (var k = 0; k < that.datalist.length; k++) {
						// 	if (that.datalist[k].doorid == doorid) {
						// 		that.datalist[k].num = that.datalist[k].num - 1;
						// 	}
						// 	newgoods.push(that.datalist[k]);
						// }
						// that.datalist = newgoods;
						
						// console.log("channel", that.channel);
						// console.log("list", that.datalist);
						// uni.setStorageSync('list' + that.channel, that.datalist);
						
						// setTimeout(function() {
						// 	SP24.sendHex(dev24text);
						// 	console.log("正在出货中 " + id);
						// 	uni.showToast({
						// 		title: 'Shipping...',
						// 		duration: 12000,
						// 	});
						// }, 1000);
					}
				}, send => {
					console.log("send0", send);
				});
			},
			upimg(c, id) {
				/*const fs = uni.getFileSystemManager();
				uni.navigateTo({
					url:'/pages/SetMeal/test'
				})*/
				console.log(c+"-----"+id);
				var that = this;
				uni.chooseImage({
					count: 1,
					success: (res) => {
						let img = res.tempFilePaths[0];
						uni.saveImageToPhotosAlbum({
							filePath: img,
							success(res) {
								console.log("ok", res);
								img = res.path;
								let listid = parseInt(c);
								let datalist = uni.channel(listid);

								let list = [];
								for (var i = 0; i < datalist.length; i++) {
									if (i == id) {
										datalist[i].img = img;
									}
									list.push(datalist[i]);
								}

								uni.setStorageSync("list" + listid, list);
								switch (listid) {
									case 1:
										that.list1 = list;
										break;
									case 2:
										that.list2 = list;
										break;
									case 3:
										that.list3 = list;
										break;
									case 4:
										that.list4 = list;
										break;
									case 5:
										that.list5 = list;
										break;
									default:
										that.list6 = list;
										break;
								}

								console.log("list", list);
							},
							fail(e) {
								uni.showModal({
									content: "保存相册失败，errCode：" + e.errCode + "，errMsg：" + e
										.errMsg + "，errSubject：" + e.errSubject,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log("err: ", err);
					}
				})
			},
			uplist(e) {
				var that = this;
				console.log(e);

				if (e.target.id && e.target.value) {
					let value = e.target.value;
					let arrid = e.target.id.split(",");
					let listid = arrid[0];
					let listitem = arrid[1];
					let listindex = arrid[2];

					if (listitem == 'price' || listitem == 'num') {
						if (!isNaN(parseFloat(value)) && isFinite(value)) {

						} else {
							uni.$showMsg("please enter a number");
							return;
						}
					}

					let datalist = [];
					if (listid && listitem && listindex) {
						listid = parseInt(listid);
						datalist = uni.channel(listid);

						let list = [];
						for (var i = 0; i < datalist.length; i++) {
							if (i == listindex) {
								switch (listitem) {
									case "num":
										datalist[i].num = parseInt(value);
										break;
									case "price":
										datalist[i].price = parseFloat(value);
										break;
									case "name":
										datalist[i].name = value;
										break;
								}
							}
							list.push(datalist[i]);
						}

						uni.setStorageSync("list" + listid, list);
						switch (listid) {
							case 1:
								that.list1 = list;
								break;
							case 2:
								that.list2 = list;
								break;
							case 3:
								that.list3 = list;
								break;
							case 4:
								that.list4 = list;
								break;
							case 5:
								that.list5 = list;
								break;
							default:
								that.list6 = list;
								break;
						}
						console.log("list", list);
					}
				}

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

					uni.showToast({
						title: 'Opening...',
						duration: 5000,
					});
					setTimeout(() => {
						SP24.sendHex(dev24text);
						console.log("Opening " + id);
					}, 1000);



				}, 1000)
			},
			changepassword() {
				uni.showModal({
					title: "input password",
					editable: true,
					placeholderText: "input password",
					confirmText: "ok",
					cancelText: "cancel",
					success: (res) => {
						if (res.confirm) {
							if (res.content.length < 6) {
								uni.$showMsg("Password must be greater than 6 digits");
							} else {
								uni.$showMsg(
									"Password set successfully, please remember password " +
									res
									.content, 6000);
								uni.setStorageSync("password", res.content);
							}
						}
					}
				});
			},
			up(item) {
				let id = item.doorid;
				let that = this;

				/*for (var i = 0; i < Things.length; i++) {
					Things[i]
				}*/

				let newgoods = [];
				for (var k = 0; k < that.goods.length; k++) {
					if (that.goods[k].doorid == id) {
						if (that.goods[k].status == true) {
							that.goods[k].status = false;
						} else {
							that.goods[k].status = true;
						}

					}

					newgoods.push(that.goods[k]);
				}
				that.goods = newgoods;
				var flower = {
					"code": 200,
					"data": newgoods,
					"message": "ok",
					"description": ""
				};
				uni.setStorageSync('goods', flower);

				that.buttons = [];
				for (var i = 1; i < 25; i++) {
					var n = "";
					for (var j = 0; j < that.goods.length; j++) {
						if (that.goods[j].doorid == i) {
							n = that.goods[j];
						}
					}
					if (n) {
						that.buttons.push(n);
					} else {
						that.buttons.push({
							doorid: i,
							name: "",
							status: false
						});
					}
				}


				console.log("goods", that.goods);
				console.log("up", id);
				/*that.goods = res.data;
				let keygoods = {};
				for (var i = 0; i < that.goods.length; i++) {
					var goodsname = "goods"+that.goods[i].doorid;
					eval('Object.assign(keygoods,{'+goodsname+':that.goods[i]});');
				}
				that.keygoods = keygoods;
				console.log("keygoods",keygoods);
				console.log("up",id);*/
			},
			update() {
				uni.$showMsg("Data is currently being synchronized...", 6000);
				uni.setStorageSync("list1", "");
				uni.setStorageSync("list2", "");
				uni.setStorageSync("list3", "");
				uni.setStorageSync("list4", "");
				uni.setStorageSync("list5", "");
				uni.setStorageSync("list6", "");

				setTimeout(function() {
					uni.showModal({
						content: "Data synchronization completed",
						showCancel: false
					});

					uni.navigateTo({
						url: '/pages/AddGoods/AddGoods'
						// url: '/pages/index/index'
					})
				}, 6000);

				//this.updateproduct();
			},
			updateproduct() {
				var that = this;
				that.deletefile("_doc/main/");

				uni.$showMsg("数据正在同步中...", 6000);
				that.mainjson("main");
				setTimeout(function() {
					for (var i = 1; i < 25; i++) {
						that.choosefile(i);
					}
					setTimeout(function() {
						uni.$showMsg("数据同步完成！");
					}, 3000);
				}, 3000);
			},
			mainjson(filename) {
				var that = this;
				var soursePath = 'file:///storage/USBDisk0/main/' + filename + '.json';

				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					fs.root.getFile(soursePath, {
						create: false
					}, function(fileEntry) {
						fileEntry.file(function(file) {

							let reader = new plus.io.FileReader();
							reader.readAsText(file);
							reader.onloadend = function(e) {
								console.log("ee", e);
								uni.setStorageSync('goods', "");

								try {
									let data = JSON.parse(e.target.result);
									console.log("Read ", data);
									var dataarr = [];

									for (var i = 0; i < data.length; i++) {
										dataarr.push({
											"id": i + 1,
											"storeId": 1,
											"doorid": data[i].doorid,
											"name": data[i].name,
											"barcode": null,
											"imageUrl": fs.root.fullPath +
												"main/" +
												data[i].doorid + ".jpg",
											"costPrice": 0,
											"salePrice": data[i].salePrice,
											"vipPrice": data[i].salePrice,
											"num": 36,
											"status": false,
											"description": "",
											"scribedPrice": data[i]
												.salePrice,
											"title": null,
											"unit": null,
											"rechargeUnits": "",
											"increase": null,
											"channel": null
										});
									}

									var flower = {
										"code": 200,
										"data": dataarr,
										"message": "ok",
										"description": ""
									};
									uni.setStorageSync('goods', flower);
									that.showproduct();
								} catch (e) {
									console.log("JSONerr", e);
									uni.showModal({
										content: "JSON格式有误！请检查应用是否有存储权限！在设置->应用->权限->存储权限",
										showCancel: false
									});
								}
							};
						}, function(e) {
							uni.$showMsg(e.message);
						});



						/*fileEntry.copyTo(fs.root,"main/"+filename+".jpg", function (res) {
							console.log('复制文件成功：',res);
						}, function(e){
							console.log('ee',e);
						});*/
					}, function(e) {
						uni.$showMsg(e.message);
					});
				});
			},
			deletefile(dir) {
				plus.io.resolveLocalFileSystemURL(dir, function(entry) {
					console.log("entry:" + entry.fullPath);
					entry.removeRecursively(function(entry) {
						console.log("目录删除成功");
					}, function(e) {
						uni.$showMsg(e.message);
					});
					// 删除单个文件
					/*entry.remove( function ( entry ) {
						console.log( "entry",entry );
					}, function ( e ) {
						console.log( "e",e );
					} );*/
				});
			},
			choosefile(filename) {
				var soursePath = 'file:///storage/USBDisk0/main/' + filename + '.jpg';
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					fs.root.getFile(soursePath, {
						create: false
					}, function(fileEntry) {
						//console.log('fileEntry',fileEntry);
						/*fileEntry.remove(function (res) {
							console.log('删除文件成功',res);
						}, function(e){
							
						});*/
						fileEntry.copyTo(fs.root, "main/" + filename + ".jpg", function(res) {
							console.log('复制文件成功：', res);
						}, function(e) {
							uni.$showMsg(e.message);
						});
					}, function(e) {
						uni.$showMsg(e.message);
					});
				});


				/*//复制文件,如果文件存在则覆盖
				fs.root.getFile('test4.txt', { create: false }, function (fileEntry) {
					fileEntry.copyTo(fs.root, 'text4_copy.txt', function (fileEntry) {
						console.info(fileEntry);
						console.log('复制文件成功：' + fileEntry.fullPath);
					}, errorHandler);
				}, errorHandler)fs.root.getFile(soursePath, {}, function(fileEntry) {
					console.log("fileEntry",fileEntry);
					/*fileEntry.copyTo(targetPath,"b.jpg",function(file) {  
						console.log(JSON.stringify(file))  
					});
					
					
					
					// copy the directory to a new directory and rename it
					fileEntry.copyTo( "/storage/emulated/0/b/b.jpg", function( bb ){
						console.log("bb",bb);
					}, function( e ){
						console.log( "e",e );
					} );
						
						
				}, function(err) {  
					console.log("err",err);
				}) */
				/*plus.io.resolveLocalFileSystemURL(soursePath, function(entry) {
				
						console.log("entry",entry);
								
						// copy the file to a new directory and rename it
						entry.copyTo(targetPath,"a.jpg", function( res ){
							console.log("Newres: ",res);
						}, function( e ){
							console.log("e",e);
						} );
						
						
						
				
				}, function(err) {
					console.log("读取失败：",err);
				});*/





				//uni.filewrite("product.txt","dddddddddddddddddd");


				setTimeout(function() {
					//uni.fileget("product.txt");
				}, 1000);

				//let bbb = this.getDirList("/");
				setTimeout(function() {
					//console.log(bbb);
				}, 1000);

			},
			showproduct() {
				var that = this;
				let res = uni.getStorageSync("goods");
				let datalist = res.data;

				that.goods = datalist;
				that.buttons = [];
				for (var i = 1; i < 25; i++) {
					var n = "";
					for (var j = 0; j < that.goods.length; j++) {
						if (that.goods[j].doorid == i) {
							n = that.goods[j];
						}
					}
					if (n) {
						that.buttons.push(n);
					} else {
						that.buttons.push({
							doorid: i,
							name: "",
							status: false
						});
					}
				}

				console.log("datalist", datalist);
			},
			getDirList(fileNamePath) {
				return new Promise((resolve, reject) => {
					let arr = [];
					plus.io.resolveLocalFileSystemURL(
						fileNamePath,
						function(entry) {
							var directoryReader = entry.createReader();
							directoryReader.readEntries(
								function(entries) {
									for (var i = 0; i < entries.length; i++) {
										// console.log("文件信息",entries[i].name);
										arr.push(entries[i].name);
									}
									console.log(arr);
									resolve(arr);
									// console.log(JSON.person(entries))
								},
								function(e) {
									console.log('访问目录失败');
									reject(e)
								});
						},
						function(e) {
							console.log('访问指定目录失败');
							reject(e)
						});
				})
			},
			back() {
				uni.reLaunch({
					url:"/pages/AddGoods/AddGoods"
				})
				
				// uni.navigateBack();
			},
			turntoceshi(e) {
				uni.navigateTo({
					url: '/pages/CeShi/CeShi?status=' + e
				})
			},
			allok() {
				var that = this;
				let res = uni.getStorageSync("goods");
				console.log(res);
				var datalist = [];
				if (res.code !== 200) return uni.$showMsg(res.message);
				for (var i = 0; i < res.data.length; i++) {
					res.data[i].status = true;
					datalist.push(res.data[i]);
				}
				res.data = datalist;
				uni.setStorageSync("goods", res);




				that.goods = datalist;
				that.buttons = [];
				for (var i = 1; i < 25; i++) {
					var n = "";
					for (var j = 0; j < that.goods.length; j++) {
						if (that.goods[j].doorid == i) {
							n = that.goods[j];
						}
					}
					if (n) {
						that.buttons.push(n);
					} else {
						that.buttons.push({
							doorid: i,
							name: "",
							status: false
						});
					}
				}


				uni.showModal({
					"content": "全部商品上架成功",
					"showCancel": false
				})
			},

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

<style scoped>
	.Body {
		display: flex;
		flex-direction: column;
		height: 90vh;
		overflow-y: auto;
	}

	.Index {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10vh;
	}

	.ButtonONE {
		width: 90vw;
		height: 10vw;
		font-size: 3vw;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin-top: 5vw;

	}

	.clear {
		clear: both;
	}

	.listbox {
		margin-left: -2vw;
	}

	.list {
		width: 41.5vw;
		float: left;
		margin-left: 7vw;

	}

	.ButtonClass {
		width: 10vw;
		margin-top: -36vw;
		height: 4vw;
		font-size: 1vw;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		float: left;
		background-color: gold;
		color: black;
	}

	.bt_r {
		float: right;
	}
</style>