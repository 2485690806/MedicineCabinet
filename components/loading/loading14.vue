<template>
	<div class="template">
		<view class="loader">
			<div class=" loader7">
				<div></div>
				<div></div>
			</div>
		</view>
	<view class="text">加载中</view>
	</div>
</template>

<style lang="scss" scoped>
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
			animation: loader 2s cubic-bezier(0, 0.2, 0.8, 1) infinite,bounce 2s infinite alternate;
		}
	
		div:nth-child(2) {
			animation-delay: -1s;
		}
		.text{
			animation: bounce 2s infinite alternate;
		}
		
		@keyframes bounce {
		  0% {
		    border: 4px solid #f50808;
			color: #f50808;
		  }
		  25% {
		    border: 4px solid #ffc404;
			color: #ffc404;
		  }
		  50% {
		    border: 4px solid #09fc1d;
			color: #09fc1d;
		  }
		  75% {
		    border: 4px solid #0752f4;
			color: #0752f4;
		  }
		  100% {
		    border: 4px solid #f909f9;
			color: #f909f9;
		  }
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
	.text{
		animation: bounce2 2s infinite alternate;
	}
	
	@keyframes bounce2 {
	  0% {
		color: #f50808;
	  }
	  25% {
		color: #ffc404;
	  }
	  50% {
		color: #09fc1d;
	  }
	  75% {
		color: #0752f4;
	  }
	  100% {
		color: #f909f9;
	  }
	}
	
	.template {
		padding: 50px;
		text-align: center;
		color: #999;
	}

</style>