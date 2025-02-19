<template>
	<view class="page">
		<uni-nav-bar title="登录自助收银系统" />

		<block>
			<view class="empty">
				<image src="/static/People.png" mode="scaleToFill" class="People"></image>
				<view class="login_box">
					<!-- <h1 class="title">欢迎登录</h1> -->
					<input class="input_box" type="text" v-model="storeId" placeholder="请输入门店编号">
					<!-- <input class="input_box" type="password" placeholder="密码"> -->
					<button class="button_box" @click="Login">登录</button>
					<button class="button_box" @click="Logout">退出app</button>
					
				</view>

			</view>
		</block>


	</view>

</template>

<script>
	export default {
		data() {
			return {
				storeId: ''
			}
		},
		beforeCreate() {
		},

		methods: {
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
			async Login() {

				const {
					data: res
				} = await uni.$http.get(`/cashier/cashierLoginByNum`+ '?storeNum=' + this.storeId, null);
				
				if (res.code == '200') {
					uni.setStorageSync('storeId', res.data.storeId)
					uni.setStorageSync('cashierId', res.data.cashierId)
					uni.setStorageSync('password', this.storeId)
					uni.navigateTo({
						url: "/pages/GKGoods/GKGoods"
					})
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
				}
				
				// let url = this.$api.cashierLoginByNum + '?storeNum=' + this.storeId
				// this.$request(url, null, "GET", false).then(res => {
				// 	console.log(res)
				// 	if (res.code == '200') {
				// 		uni.setStorageSync('storeId', res.data.storeId)
				// 		uni.setStorageSync('cashierId', res.data.cashierId)
				// 		uni.navigateTo({
				// 			url: "/pages/index/index"
				// 		})
				// 	} else {
				// 		uni.showToast({
				// 			title: res.message,
				// 			icon: 'none'
				// 		});
				// 	}
				// })
			},

		}
	}
</script>

<style scoped>
	/deep/ .input-placeholder {
		font-size: 3vw;
		text-align: left;
		padding-left: 10px;
		line-height: 100% !important;
	}

	/deep/ .input_box {
		border-bottom: 1px solid #acacac;
		color: black;
	}

	/deep/ .uni-input-input {
		font-size: 3vw;
	}

	.login_box {
		font-size: 3vw;
		width: 93vw;
		height: 40vh;
		background-color: #fff;
		margin: auto;
		border-radius: 5px;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		/* position: absolute; */
	}

	.title {
		text-align: center;
		font-size: 28px;
		color: #000;
		margin-bottom: 10px;
		letter-spacing: 3px;
		font-family: sans-serif;
	}

	.input_box {
		width: 80vw;
		height: 5vh;
		overflow: inherit;
		margin-top: 20px;
	}

	.button_box {
		font-size: 3vw;
		width: 80vw;
		height: 6vh;
		margin-top: 5vh;
		border-radius: 5px;
		background-color: #64a9d9;
		cursor: pointer;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo_box {
		position: absolute;
		background-color: #fff;
		width: 100px;
		height: 100px;
		border-radius: 100px;
		top: 100px;
		left: 46%;
		border: solid 5px #A68364;
		text-align: center;
	}

	.logo_img {
		margin-top: 20px;
	}

	.first {
		margin-bottom: 1vw;
	}

	.empty {
		margin-top: 6vh;
		display: flex;
		    flex-direction: column;
		    align-items: center;
	}

	.People {
		width: 59vw;
		height: 35vh;
		opacity: 0.7;
	}

	/deep/ .uni-navbar__header {
		background-color: white !important;
	}

	/deep/ .uni-nav-bar-text {
		color: black !important;
	}

	/deep/ .uni-navbar--border {
		border: 0 !important;
	}
</style>
