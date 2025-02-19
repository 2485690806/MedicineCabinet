<template>
	<view class="container">
		
		<view class="list">
			<view class="info">
                 <view class="icon">
                 	<image src="../../static/vipBtn.png" mode="" class="img"></image>
                 </view>				
				<text>肥皂,沐浴露1L</text>
				<text>10.00元</text>
				<!-- <text>赠30.00元会员余额</text> -->
			</view>
			<view class="info">
				<view class="icon">
					<image src="../../static/vipBtn.png" mode="" class="img"></image>
				</view>	
				<text>肥皂,沐浴露1L</text>
				<text>58.00元</text>
				<!-- <text>赠50.00元会员余额</text> -->
			</view>
			<view class="info">
				<view class="icon">
					<image src="../../static/vipBtn.png" mode="" class="img"></image>
				</view>	
				<text>肥皂,沐浴露1L</text>
				<text>68.00元</text>
				<!-- <text>赠50.00元会员余额</text> -->
			</view>
			<view class="info">
				<view class="icon">
					<image src="../../static/vipBtn.png" mode="" class="img"></image>
				</view>	
				<text>肥皂,沐浴露1L</text>
				<text>30.00元</text>
				<!-- <text>赠60.00元会员余额</text> -->
			</view>
			<view class="info">
				<view class="icon">
					<image src="../../static/vipBtn.png" mode="" class="img"></image>
				</view>	
				<text>洗发水，洗洁精2L</text>
				<text>11.00元/月</text>
				<!-- <text>赠200.00元会员余额</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"VipPackage",
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		
		.list{
			margin-top: 40rpx;
			padding: 10rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.info{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background:-webkit-linear-gradient(left top,#94b9c7,#ebe4be);
				border-radius: 10rpx;
				padding: 10rpx;
				margin: 20rpx;
				height: 300rpx;
				width: 28%;
				.icon{					
					.img{
						width: 100rpx;
						height: 100rpx;
					}
				}
				text:nth-child(2){
					color: #2e629b;
					font-size: 55rpx;					
				}
				text:nth-child(3){
					color: #2e629b;
					font-size: 51rpx;
					margin-top: 10rpx;
				}
				text:nth-child(4){
					color: #cb2d01;
					font-size: 50rpx;
					margin-top: 20rpx;
				}
			}
			.info:active{
				background-color: rgba(222, 225, 230, 0.9);
			}
			
		}
	}
</style>