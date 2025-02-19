<template>
	<view class="background">

		<view class="codeBox">

			<text class="detail">收到消息：{{test}}</text>

		</view>
	</view>
</template>

<script>
	import WebSocket from './stomprabbitmq-stomprabbitmq.js';
	// import WebSocketClient from '@/common/socket.js'

	export default {
		data() {
			return {
				test: '',
				
			};
		},
		onLaunch: function() {
			console.log('App Launch')
			let that = this;
			uni.addInterceptor('navigateTo', { //监听跳转
				success(e) {
					that.watchRouter(e);
				}
			})
			uni.addInterceptor('redirectTo', { //监听关闭本页面跳转
				success(e) {
					that.watchRouter(e);
				}
			})
			uni.addInterceptor('switchTab', { //监听tabBar跳转
				success(e) {
					that.watchRouter(e);
				}
			})
			uni.addInterceptor('navigateBack', { //监听返回
				success(e) {
					that.watchRouter(e);
				}
			})
		},
		onLoad() {
			
			uni.$on('sendMessage', res => {
				console.log("接收到的消息：", res);
				this.test = JSON.parse(res.body)
			})
			
			this.rabbit()
			uni.$on('socketError' , res=>{
				console.log('失去连接res')
				setTimeout(()=>{
					this.rabbit()
				},5000)
			})
		},
		updated() {},
		onShow: function() {
			// let data = JSON.parse(res.body)

			// 连WebSocket

				


			// this.getWebsocketData()

			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			rabbit(){
				let that = this;
				WebSocket.init("xxx","xxx") // 可自行修改
			}
		},


	}
</script>

<style>
	/*每个页面公共css */
</style>