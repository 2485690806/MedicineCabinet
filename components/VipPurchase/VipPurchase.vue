<template>
	<view class="container">
		<view class="containerTop">
			<view class="CommodityOne">
				<view class="pic">
					<img src="/static/BlueMoon.jpeg" alt="" class="pic">
				</view>
				<view class="right">
					<text class="name">蓝月亮洗衣液</text>
					<view class="price">
						<text>￥0.01</text>
						<text>原价:￥10.00</text>
					</view>
					<view class="vip">
						<text>会员</text>
						<text>￥0.00</text>
					</view>
				</view>
			</view>
		</view>
		<view class="CommodityBox">
			<view class="CommodityList">
				<view class="info">
					<view class="img">
						<img src="/static/coco.jpeg" alt="" class="pic">
					</view>
					<view class="text">
						<text>可口可乐</text>
					</view>
					<view class="price">
						<text>￥0.01</text>
						<view class="orlprice">原价:￥10.00</view>
					</view>
					<view class="vip">
						<text>会员</text>
						<text>￥0.00</text>
					</view>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"VipPurchase",
		data() {
			return {
				
			}
		},
		methods: { 
			
		}
	}
</script>

<style lang="scss" scoped>
	.containerTop{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}
	.container{
		
	}
	.CommodityList{		
		padding: 10rpx;		
		width: 90%;
		display: flex;		
		flex-wrap: wrap;
		.info{
			width: 380rpx;
			height: 480rpx;
			box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(200, 200, 199, 1.0);
			border-radius: 20rpx;
			margin-left: 80rpx;
			margin-top: 20rpx;
			.img{
				background:-webkit-linear-gradient(left,#74cbe5,#b1c3eb);
				height: 180rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 20rpx;
				img{
					height: 170rpx;
					width: 220rpx;
				}
			}
			.text{
				font-size:53rpx;
				margin-left: 20rpx;	
				margin-top: 20rpx;
			}
			.price{
				margin-top: 20rpx;
				text:nth-child(1){
					color: #ff0000;
					font-size:50rpx
				}
				text:nth-child(2){
					margin-left: 20rpx;
					color: #9ba3aa;
					font-size:50rpx
				}
				.orlprice{
					color: #9ba3aa;
					font-size:50rpx
				}
			}
			.vip{
				margin-top: 30rpx;
				margin-left: 20rpx;
				text:nth-child(1){				
					background-color: #000;
					color: #ffd68f;
					padding: 6rpx;					
					border-radius: 5rpx;
					font-size: 50rpx;
				}
				text:nth-child(2){
					background-color: #ffd68f;
					padding: 6rpx;
					font-size: 50rpx;
					border-radius: 5rpx;
				}
			}
			
		}
	}
	.CommodityOne{		
		padding: 10rpx;
		height: 270rpx;
		width: 90%;
		border-radius: 20rpx;
		background:-webkit-linear-gradient(left,#74cbe5,#b1c3eb);
		box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(200, 200, 199, 1.0);
		display: flex;
		.pic{
			height: 260rpx;
			width: 360rpx;
			margin-left: 10rpx;
			border-radius: 20rpx;
		}
		.right{
			margin-left: 40rpx;
			margin-top: 20rpx;
			.name{
				font-size: 55rpx;
			}
			.price{
				margin-top: 30rpx;
				text:nth-child(1){
					color: #ff0000;
					font-size: 55rpx;
				}
				text:nth-child(2){
					margin-left: 30rpx;
					color: #9ba3aa;
					font-size: 55rpx;
				}
			}
			.vip{
				margin-top: 30rpx;										
				text:nth-child(1){				
					background-color: #000;
					color: #ffd68f;
					padding: 10rpx;					
					border-radius: 5rpx;
					font-size: 54rpx;
				}
				text:nth-child(2){
					background-color: #ffd68f;
					padding: 8rpx;
					font-size: 54rpx;
					border-radius: 5rpx;
				}
			}
		}
	}
</style>