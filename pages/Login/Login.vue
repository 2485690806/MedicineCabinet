<template>
	<view class="container">
		<view class="logoTop">
			<image src="/static/loginLogo.png" alt="" class="img" mode="aspectFit">
		</view>
		<view class="box">
			<view class="logoCenter">
				<image src="/static/loginlogo2.jpg" alt="" class="img" mode="aspectFill">
			</view>
		</view>
		<view v-if="false" class="inputbox">
			<input type="number" placeholder="Please enter the number" v-model="num" @input="inputClick"
				placeholder-style="font-size:4vw;line-height:6vh;margin-left: 2vw;">
		</view>
		<view class="loginbox" v-if="false">
			<view class="login" @click="checkdev">
				<text>Automatic interface detection</text>
			</view>
		</view>

		<uni-section title="24 interface board" type="line">
			<uni-data-select :localdata="range" @change="change0"></uni-data-select>
		</uni-section>

		<uni-section title="Paper currency interface board" type="line">
			<uni-data-select :localdata="range" @change="change1"></uni-data-select>
		</uni-section>
		<uni-section v-if="false" title="POS machine interface board" type="line">
			<uni-data-select :localdata="range" @change="change2"></uni-data-select>
		</uni-section>

		<uni-section title="Coin dispenser interface board" type="line">
			<uni-data-select :localdata="range" @change="change3"></uni-data-select>
		</uni-section>

		<view class="list" v-for="(item,index) in list1" :key="index" style="margin-bottom: 10px;">
			<view style="margin-left: 10px;clear: both;"><text style="float: left;">coin pulse {{index+1}}: ￥</text>
				<input :value="item.price" @input="uplist" :id="'coinpuls'+(index+1)" style="margin-left: 10px;float: left;"
					class="uni-input" placeholder="Please enter a price" />
			</view>
		</view>

		<view class="loginbox">
			<view class="login" @click="devconnect">
				<text>Connected Device</text>
			</view>
		</view>
		
		<view class="loginbox">
			<view class="login" @click="Logout">
				<text>exit app</text>
			</view>
		</view>
		
		<view style="height: 40px;"></view>
	</view>
</template>

<script>
	// const restartApp = uni.requireNativePlugin('dodo-uniplugin-restart')


	export default {
		data() {
			return {
				num: '',
				list1:[],
				range: [{
						value: "",
						text: "Please choose, optional"
					},
					{
						value: 0,
						text: "/dev/ttyZC0"
					},
					{
						value: 1,
						text: "/dev/ttyZC1"
					},
					{
						value: 2,
						text: "/dev/ttyZC2"
					},
					{
						value: 3,
						text: "/dev/HUSB14"
					}
				],
				value0: "",
				value1: "",
				value2: "",
				value3: "",
				deviceId: "",
				sysinfo: ""
			};
		},
		onLoad() {
			uni.setStorageSync("GETmoney",0)
			
			let product_id = 1;
			for (var i = 0; i <= 7; i++) {
				let a = {
					doorid: i + "1",
					img: "../../static/PingZi.png",
					name: "Product" + product_id,
					
					num: 0,
					channel: 1
				};
				
				if (uni.getStorageSync("coinpuls"+(i+1)) == '' || uni.getStorageSync("coinpuls"+(i+1)) == null || uni.getStorageSync(
						"coinpuls"+(i+1)) == undefined) {
					
					uni.setStorageSync("coinpuls"+(i+1), "999");
					a.price= 999;
				}
				else
					a.price = uni.getStorageSync("coinpuls"+(i+1));
				
				product_id += 1;
				this.list1.push(a);
			}

			let that = this;
			let sysinfo = uni.getSystemInfoSync();
			that.deviceId = sysinfo.deviceId;
			that.sysinfo = sysinfo;
			
			
			// that.value0 = uni.getStorageSync('dev24');
			// that.value1 = uni.getStorageSync('devcash');
			// that.value2 = uni.getStorageSync('devpay');
			// this.value3 = uni.getStorageSync('devcoin');
		},
		onShow() {
			
			
			// uni.setStorageSync('ShouHuo', '/dev/ttyS4')
			// uni.setStorageSync('ShouYe', '/dev/ttyS0')
		},
		methods: {
			uplist(e){
				if (e.target.id && e.target.value) {
					
					uni.setStorageSync(e.target.id, e.target.value);
					
				}
			},
			
			Logout() {


				let main = plus.android.runtimeMainActivity();
				//为了防止快速点按返回键导致程序退出重写quit方法改为隐藏至后台  
				// plus.runtime.quit = function() {
				main.moveTaskToBack(false);
				
				try{
					this.stopServiceIntent()
				}catch(e){
					//TODO handle the exception
				}

			},
			checkdev() {
				//this.value0 = 0;
				//this.value1 = 1;
				//this.value2 = 2;
				//this.value3 = 3;
				console.log('checkdev');


				// 输入待校验的字节流（作为数组）
				//var buffer = [0x01, 0x02, 0x03, 0x04, 0x05];

				// 调用函数计算CRC校验值
				//var crc = uni.crc(buffer);

				// 输出校验值（低字节和高字节）
				//console.log("CRC Low: " + crc[0]);
				//console.log("CRC High: " + crc[1]);


			},
			devconnect() {
				if (this.value0.indexOf("/dev/") < 0) {
					uni.showModal({
						title: 'Tips',
						content: 'Please select the 24 interface board interface',
						showCancel: false
					});
					return;
				}

				if (this.value1.indexOf("/dev/") > -1 || this.value2.indexOf("/dev/") > -1 || this.value3.indexOf(
					"/dev/") > -1) {

				} else {
					uni.showModal({
						title: 'Tips',
						content: 'At least one payment method',
						showCancel: false
					});
					return;
				}

				console.log(this.value0);
				console.log(this.value1);
				console.log(this.value2);
				console.log(this.value3);

				uni.setStorageSync('dev24', this.value0);
				uni.setStorageSync('devcash', this.value1);
				uni.setStorageSync('devpay', this.value2);
				uni.setStorageSync('devcoin', this.value3);
				//uni.setStorageSync('storeId', 111);//强行给他一个商号

				/*uni.showToast({
					title:'设备连接成功！'
				})*/


				uni.request({
					url: "https://duola.yunchuang.store/vending/register.php?dev=" + this.deviceId,
					method: 'GET',
					dataType: 'json',
					success: function(res) {
						console.log("register", res);
					}
				});
				uni.setStorageSync('storeId', 1);
				uni.$showMsg('login was successful!');
				plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
					uni.setStorageSync("DOCPATH", fs.root
					.fullPath); ///storage/emulated/0/Android/data/uni.UNI40A4911/apps/__UNI__40A4911/doc/
				});

				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					});
				}, 1000);
			},
			change0(e) {
				console.log("change0", e);
				let that = this;
				that.range.forEach(item => {
					if (item.value == e) {
						that.value0 = item.text;
					}
				});
			},
			change1(e) {
				console.log("change1:", e);
				let that = this;
				that.range.forEach(item => {
					if (item.value == e) {
						that.value1 = item.text;
					}

				})
			},
			change2(e) {
				console.log("change2", e);
				let that = this;
				that.range.forEach(item => {
					if (item.value == e) {
						that.value2 = item.text;
					}

				})
			},
			change3(e) {
				console.log("change3", e);
				let that = this;
				that.range.forEach(item => {
					if (item.value == e) {
						that.value3 = item.text;
					}

				})
			},
			inputClick(e) {
				// console.log(e.target.value);
				// this.num=e.target.value;
				console.log(this.num);
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.login:active {
		background-color: rgba(148, 188, 230, 0.9);
	}

	.inputbox {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 2.3vh;

		input {
			width: 54vw;
			height: 7vh;
			border-radius: 5vw;
			border: 5px solid #e3e3e3;
			font-size: 5vw;
			padding-left: 2vw;
		}
	}

	.loginbox {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
	}

	.login {
		width: 56vw;
		height: 7vh;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3.7vh;
		background-color: #2a82e4;
		color: #fff;
		font-size: 20px;
		border-radius: 5vw;
	}

	.logoTop {
		width: 100%;
		height: 31.6vh;

		.img {
			width: 100%;
			height: 100%;
		}
	}

	.box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.logoCenter {
		// display: flex;
		// justify-content: center;
		// align-items: center;
		margin-top: 6vh;
		width: 67.2vw;
		height: 12vh;

		.img {
			width: 100%;
			height: 100%;
		}
	}
</style>