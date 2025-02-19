<template>
	<div class="template">
		<view class="loader">
			<div class="loader1 ">
				<div class="dot">加</div>
				<div class="dot">载</div>
				<div class="dot">中</div>
			</div>
		</view>
	</div>
</template>

<style lang="scss" scoped>
	.loader1 {
		display: flex;
		justify-content: center;
	
		.dot {
			width: 25px;
			height: 25px;
			background: #333;
			border-radius: 50%;
			color: #fff;
			text-align: center;
			line-height: 25px;
			font-size: 16px;
			animation: bounce 1.4s infinite ease-in-out both;
		}
	
		.dot:nth-child(2) {
			animation-delay: -0.7s;
		}
	
		.dot:nth-child(3) {
			animation-delay: -0.35s;
		}
	
		@keyframes bounce {
	
			0%,
			80%,
			100% {
				transform: scale(0);
			}
	
			40% {
				transform: scale(1.0);
			}
		}
	}
	
	
	.template {
		padding: 20px;
		text-align: center;

		.loader {
			margin: 25px;
		}
	}

</style>