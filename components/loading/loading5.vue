<template>
	<div class="template">
		<view class="loader">
			<div class="loader6 loader">
				<div class="cube">加</div>
				<div class="cube">载</div>
				<div class="cube">中</div>
				<div class="cube">.</div>
				<div class="cube">.</div>
				<div class="cube">.</div>
			</div>
		</view>
	</div>
</template>

<style lang="scss" scoped>
	.loader6 {
		display: flex;
		justify-content: center;
		.cube {
			width: 25px;
			height: 25px;
			background: #333;
			border-radius: 3px;
			font-size: 14px;
			margin: 0 3px;
			color: #fff;
			animation: cube 1.5s infinite ease-in-out;
		}
	
		.cube:nth-child(2) {
			animation-delay: -1.1s;
		}
	
		.cube:nth-child(3) {
			animation-delay: -0.9s;
		}
	
		.cube:nth-child(4) {
			animation-delay: -0.7s;
		}
		
		.cube:nth-child(5) {
			animation-delay: -0.5s;
		}
		
		.cube:nth-child(6) {
			animation-delay: -0.3s;
		}
	
		@keyframes cube {
	
			0%,
			70%,
			100% {
				transform: scale(1);
			}
	
			35% {
				transform: scale(0);
			}
		}
	}
	.template {
		padding: 20px;
		text-align: center;
		.loader {
			margin: 25px;
			color: #999;
			line-height: 50rpx;
		}
	}

</style>