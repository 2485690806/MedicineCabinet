<template>
	<view class="container" @click="Logout">
		<uni-nav-bar height="10vh"  left-icon="left" :border="false" title="其他信息" @clickLeft="back" />
		<view class="PartnerBox">			
			<view class="logobox">
				<image src="/static/TanPuHuiLogo.png" alt="" class="image" mode="aspectFit">
			</view>
			<view class="text">
				<view class="textone">碳普惠</view>
				<view class="texttwo">扫码注册，领取100碳币</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer1:"",
				timer:"",
				waitTime: 800, // 该时间间隔内点击才算连续点击（单位：ms）
				lastTime: new Date().getTime(), // 上次点击时间
				count: 0, // 连续点击次数
			};
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
					if (this.count > 5) {
						// 连续点击五次或者五次以上的点击事件
						// console.log('点击超过4次了')
						uni.clearStorageSync()
						uni.navigateTo({
							url: "/pages/Login/Login"
						})
					}
				}, this.waitTime + 20)
			},
			
			back() {
				uni.reLaunch({
					url: "/pages/index/index",
					animationType: "slide-in-left",
				})
			},
		},
		onShow() {
			this.timer1 = setTimeout(()=>{
				uni.reLaunch({
					url: "/pages/index/index",
					animationType: "slide-in-left",
				})
			},30000)
		},
		onHide() {
			clearTimeout(this.timer1)
		}
	}
</script>

<style lang="scss">
	.container{
		height:100vh
	}
	.PartnerBox {
		margin-top: 3vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 4vh;
		}

		.textone {
			font-size: 5vw;
			font-weight: 700;
		}

		.texttwo {
			font-size: 4vw;
			// font-weight: 700;
			margin-top: 3vh;
		}

		.logobox {
			width: 31vw;
			height: 31vw;
			margin-top: 2vh;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
	// /deep/.uni-navbar--border{
	// 	border-bottom-width: 0;		    
	// }
	// /deep/ .uni-navbar__header {
	// 	height: 7vh !important;
	// 	background-color: #7dbbea !important;
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
</style>