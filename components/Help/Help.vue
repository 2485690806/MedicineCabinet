<template>
	<view class="container">
		<view class="Title">
			<text>常见问题</text>
		</view>
		<view class="Body">
			<view class="List">
				<view class="item" @click="Changeshown(1)">
					<text>为什么我的优惠券用不了?</text>
					<view class="iconBox">
						<uni-icons type='bottom' size="40" class="icon" v-if="shown1"></uni-icons>
						<uni-icons type='top' size="40" class="icon" v-if="!shown1"></uni-icons>
					</view>
				</view>
				<view class="hiddenBox" v-if="shown1">
					<text>联系客服</text>
				</view>
			</view>
			<view class="List">
				<view class="item"  @click="Changeshown(2)">
					<text>怎么使用设备?</text>
					<view class="iconBox">
						<uni-icons type='bottom' size="40" class="icon" v-if="shown2"></uni-icons>
						<uni-icons type='top' size="40" class="icon" v-if="!shown2"></uni-icons>
					</view>
				</view>
				<view class="hiddenBox" v-if="shown2">
					<text>请看如何使用</text>
				</view>
			</view>
			<view class="List">
				<view class="item"  @click="Changeshown(3)">
					<text>加液怎么计算?</text>
					<view class="iconBox">
						<uni-icons type='bottom' size="40" class="icon" v-if="shown3"></uni-icons>
						<uni-icons type='top' size="40" class="icon" v-if="!shown3"></uni-icons>
					</view>
				</view>
				<view class="hiddenBox" v-if="shown3">
					<text>看加液规则</text>
				</view>
			</view>
			<view class="List">
				<view class="item"  @click="Changeshown(4)">
					<text>设备不出货怎么办?</text>
					<view class="iconBox">
						<uni-icons type='bottom' size="40" class="icon" v-if="shown4"></uni-icons>
						<uni-icons type='top' size="40" class="icon" v-if="!shown4"></uni-icons>
					</view>
				</view>
				<view class="hiddenBox" v-if="shown4">
					<text>请联系管理员</text>
				</view>
			</view>
			<view class="List">
				<view class="item"  @click="Changeshown(5)">
					<text>订单使用中，怎么暂停加液?</text>
					<view class="iconBox">
						<uni-icons type='bottom' size="40" class="icon" v-if="shown5"></uni-icons>
						<uni-icons type='top' size="40" class="icon" v-if="!shown5"></uni-icons>
					</view>
				</view>
				<view class="hiddenBox" v-if="shown5">
					<text>按下设备绿色实体按钮</text>
				</view>
			</view>
			<view class="List">
				<view class="item">
					<text>有问题请联系客服处理</text>
					<text class="phone">123123123</text>					
				</view>				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"MyHelp",
		data() {
			return {
				shown1:true,
				shown2:true,
				shown3:true,
				shown4:true,
				shown5:true,
			}
		},
		methods: { 
			Changeshown(num){
				if(num==1){
					this.shown1=!this.shown1
				}else if(num==2){
					this.shown2=!this.shown2
				}else if(num==3){
					this.shown3=!this.shown3
				}else if(num==4){
					this.shown4=!this.shown4
				}else{
					this.shown5=!this.shown5
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.Title{
			margin-top: 5vh;
			font-size: 3vh;
			font-weight: 700;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.Body{
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		
	}
	.List{		
		margin-top: 4vh;		
		width: 90%;
		height: 9vh;
		// margin-top: 40rpx;
		.item,.hiddenBox{
			background-color: #fff;
			padding: 2vh;
			border-radius: 10rpx;
			font-size: 2vh;
		}
		.item{
			position: relative;
			// border-bottom: 1rpx solid #f5f5f5;
			
			.icon{
				position: absolute;
				top: 35rpx;
				right:35rpx;				
			}
			.phone{
				margin-left: 150rpx;
			}
		
		}
		
	}
</style> 