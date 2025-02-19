<template>
	<div class="template">
		<view class="loader">
			<view class="loaders">
				<div class="loader2"></div>
			</view>
			加载中
		</view>
	</div>
</template>

<style lang="scss" scoped>
	.loaders{
		display: flex;
		justify-content: center;
	}
	.loader2 {
		border: 6px solid #f3f3f3;
		border-radius: 50%;
		border-top: 6px solid #00d165;
		width: 40px;
		height: 40px;
		animation: spin2 1s linear infinite;
	}
	
	@keyframes spin2 {
		0% {
			transform: rotate(0deg);
		}
	
		100% {
			transform: rotate(360deg);
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