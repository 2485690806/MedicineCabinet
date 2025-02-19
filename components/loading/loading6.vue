<template>
	<div class="template">
<!-- 		<view class="loader">
			<div class=" loader7">
				<div></div>
				<div></div>
			</div>
		</view> -->
		<view class=""  style="margin-top: 30px;">
			<uni-icons type="checkbox" size="130" color="white"></uni-icons>
		</view>

		<view class="ball">
			出货完成
		</view>
	</div>
</template>

<style lang="scss" scoped>
	.ball{
		margin-top: 53px;
		color: #fff;
		    font-size: 4vw;
	}
	
	.loader7 {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	
		div {
			position: absolute;
			border: 4px solid #333;
			opacity: 1;
			border-radius: 50%;
			animation: loader 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
		}
	
		div:nth-child(2) {
			animation-delay: -1s;
		}
	
		@keyframes loader {
			0% {
				top: 36px;
				left: 36px;
				width: 0;
				height: 0;
				opacity: 1;
			}
	
			100% {
				top: 0px;
				left: 0px;
				width: 72px;
				height: 72px;
				opacity: 0;
			}
		}
	}
	
	
	.template {
		padding: 50px;
		text-align: center;
		color: #999;
	}

</style>