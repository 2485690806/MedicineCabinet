<template>
	<view class="container" @click="AllClick">
		<uni-nav-bar height="10vh" :border="false" left-icon="left" title="Common problems" @clickLeft="back" />
		<view class="Body">
			<view class="List" v-for="(item,index) in datalist">
				<view class="item">
					<text>{{index+1}}.</text>
					<text>{{item.phone}}</text>
					<!-- <view class="iconBox">
						<uni-icons type='bottom' size="40" class="icon"></uni-icons>						
					</view> -->
				</view>
				<view class="hiddenBox">
					<text>{{item.username}}</text>
				</view>
			</view>
			<view class="ceshi" @click="manage">
				<text>Management backend</text>
			</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 倒计时秒数
				Seconds: 300,
				//定时器
				timer: null,
				showupdate:false,
				datalist:[],
				showCeShi:false,
				errmsg:"",
				timer1:"",
				timer:"",
				waitTime: 800, // 该时间间隔内点击才算连续点击（单位：ms）
				lastTime: new Date().getTime(), // 上次点击时间
				count: 0, // 连续点击次数
			};
		},
		onLoad() {
			this.timeup();
			this.getAllQuestions()
		},
		onShow() {
			this.getAllQuestions()
		},
		onHide(){ 
			clearInterval(this.timer);
		},
		onUnload(){
			clearInterval(this.timer);
		},
		watch: {
			Seconds(newval) {
				let that = this;
				if (newval <= 0) {
					clearInterval(that.timer);
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
			}
		},
		methods: {			
			Logout() {
			
			
				// this.showVideo = false
				// this.resetTimer();
				// let videoContext = uni.createVideoContext('myVideo', this)
				// videoContext.exitFullScreen()
			
			
				var currentTime = new Date().getTime();
				// 计算两次相连的点击时间间隔
				this.count = (currentTime - this.lastTime) < this.waitTime ? this.count + 1 : 1;
				this.lastTime = new Date().getTime();
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					// 处理点击事件
					if (this.count > 3) {
						this.showCeShi = true
					}
				}, this.waitTime + 100)
			},
			manage(){
				
				
				
				let password = uni.getStorageSync("password");
				if (!password) {
					uni.navigateTo({
						url:'/pages/toHelp/toHelp'
					});return;
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
								uni.navigateTo({
									url:'/pages/toHelp/toHelp'
								});
							} else {
								uni.$showMsg("password error");
							}
						}
					}
				});
			},
			
			async getAllQuestions(){
				/*const {
					data: res
				} = await uni.$http.get(`https://duola.yunchuang.store/flowermachine/api/getQuestions.php`);
				if (res.code !== 200) {					
					return 	uni.$showMsg(res.message);
				}*/
				
				var data = {
					"code": 200,
					"data": [
						{
							"id": 17,
							"reqType": "frequently_questions",
							"phone": "Are the flowers exactly the same as the pictures?",
							"username": "Our bouquets of fresh flowers are made from fresh materials by professional florists. During the production process, we will use the original form of the pictures as the main reference, and try to maintain a consistent appearance with the pictures. However, due to the different techniques and styles of each florist, the appearance and degree of openness of each flower vary. The flower arrangement and packaging paper in different regions may have slight changes in specific effects due to geographical limitations, but it will never affect the overall style, Please rest assured of product quality!",
							"question": null,
							"storeName": null
						},
						{
							"id": 18,
							"reqType": "frequently_questions",
							"phone": "Incorrect foot lobe removal",
							"username": "Some flower shop owners are reluctant to remove the foot leaves when they do not know how to do so. If the foot leaves are not removed properly, they may not even pay attention to removing them, allowing the leaves to soak in water and rot, leading to bacterial growth and affecting the water absorption of the flower stem, which can harm the flower material.",
							"question": null,
							"storeName": null
						},
						{
							"id": 19,
							"reqType": "frequently_questions",
							"phone": "Failure to disinfect in a timely manner or inadequate disinfection",
							"username": "In addition to paying attention to cleaning and cutting off the rotten parts of the flower materials, as well as tools such as the operating table, flower barrels, and flower utensils in the store, do not ignore the disinfection of the refrigerated box. Although the temperature is low, this place is relatively closed and the air circulation is not smooth, which can easily breed bacteria.",
							"question": null,
							"storeName": null
						}
					],
					"message": "ok",
					"description": ""
				};
				this.datalist=data.data;
			},
			AllClick(){
				this.Seconds=60;
				this.Logout()
				console.log(this.Seconds);
			},
			// 倒计时回调
			timeup() {
				let that = this;
				that.timer = setInterval(() => {
					that.Seconds -= 1;
				}, 1000)
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
		}
	}
</script>

<style lang="scss">
	
	   .ceshi{
	 width: 80vw;
	 height: 5vh;
	 background-color: #628ed8;
	 font-size: 5vw;	 
	 margin: 3vh auto;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	}
	/deep/.uni-navbar--border{
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

	.Body {
		display: flex;
		// justify-content: center;
		flex-direction: column;
		// align-items: center;
		height: 90vh;
		overflow-y: auto;
		margin-left: 1vw;
	}

	.List {
		margin-top: 2vh;
		width: 90%;
		//height: 10vh;
		// border: 5rpx solid #77b0dd;
		border-radius: 2vw;
		display: flex;
		// justify-content: center;		
		// align-items: center;
		flex-direction: column;
		position: relative;
		.item,
		.hiddenBox {			
			padding: 1.5vw;
			font-size: 2vh;	
			
		}
		.hiddenBox{
			// margin-top: 1vh;
			line-height: 2.5vh;
			// margin-bottom: 1vh;
		
		}
		.item {
			margin-top: 1vh;			
			font-weight: 700;
		}

	}

	page {
		background-color: #f5f6f8;
	}
</style>