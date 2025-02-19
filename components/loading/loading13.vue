<template>
  <div class="template">
    <div class="text cartoon">
		<span class="char">拼</span>
		<span class="char">命</span>
		<span class="char">加</span>
		<span class="char">载</span>
		<span class="char">中</span>
		<span class="char">.</span>
		<span class="char">.</span>
		<span class="char">.</span>
	</div>
  </div>
</template>

<style lang="scss" scoped>
.text-wave-loader {
  padding: 50px;
  text-align: center;
  color: #999;
}

.text {
  position: relative;
  font-size: 16px;
  text-align: center;
}

.text::after {
  content: "";
  position: absolute;
  bottom: -5px; /* 控制水波纹距离文字的距离 */
  left: 0;
  width: 100%;
  height: 2px; /* 控制水波纹的高度 */
  background: linear-gradient(to right, #007bff, #00a8ff); /* 水波纹的渐变颜色，可以根据需要进行调整 */
  opacity: 0.5; /* 水波纹的透明度，可以根据需要进行调整 */
  animation: waveAnimation 2s linear infinite,bounce 0.5s infinite alternate;;
}
.cartoon{
	.char {
		  display: inline-block;
		   width: 20px;
		   height: 20px;
		   padding: 3px;
		   border-radius: 3px;
		   animation: bounce 0.5s infinite alternate;
		}
		.char:nth-child(2) {
		  animation-delay: 0.1s;
		}
		
		.char:nth-child(3) {
		  animation-delay: 0.2s;
		}
		
		.char:nth-child(4) {
		  animation-delay: 0.3s;
		}
		
		.char:nth-child(5) {
		  animation-delay: 0.4s;
		}
		
		.char:nth-child(6) {
		  animation-delay: 0.5s;
		}
		
		.char:nth-child(7) {
		  animation-delay: 0.6s;
		}
		
		.char:nth-child(8) {
		  animation-delay: 0.7s;
		}
		
		@keyframes bounce {
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
	}
	
	
@keyframes waveAnimation {
  0% {
    transform: scaleX(0);
	 background: linear-gradient(to right, #007bff, #00a8ff)
  }
  50% {
    transform: scaleX(1);
	 background: linear-gradient(to right, #ff5500, #ffb49b)
  }
  100% {
    transform: scaleX(0);
	 background: linear-gradient(to right, #007bff, #00a8ff)
  }
}
</style>

<script>
export default {
  data() {
    return {
      loadingText: "Loading..." // 加载中的文本
    };
  }
};
</script>