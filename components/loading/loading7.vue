<template>
	<view class="template">
  <div class="loader">
    <div v-for="i in 8" :key="i" class="dot"></div>
  </div>
  <view class="ball">
  	正在出货
  </view>
  </view>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
	.template {
		padding: 50px;
		text-align: center;
		color: #999;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
	}
.loader {
  position: relative;
  width: 60px;
  height: 60px;
}
.ball{
	margin-top: 53px;
	color: #fff;
	 font-size: 4vw;
}

.dot {
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: #3f51b5;
  border-radius: 50%;
  animation: dot 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.dot:nth-child(1) {
  top: 50%;
  left: 0;
  animation-delay: 0s;
}

.dot:nth-child(2) {
  top: 18.3%;
  left: 18.3%;
  animation-delay: 0.1s;
}

.dot:nth-child(3) {
  top: 0;
  left: 50%;
  animation-delay: 0.2s;
}

.dot:nth-child(4) {
  top: 18.3%;
  left: 81.7%;
  animation-delay: 0.3s;
}

.dot:nth-child(5) {
  top: 50%;
  left: 100%;
  animation-delay: 0.4s;
}

.dot:nth-child(6) {
  top: 81.7%;
  left: 81.7%;
  animation-delay: 0.5s;
}

.dot:nth-child(7) {
  top: 100%;
  left: 50%;
  animation-delay: 0.6s;
}

.dot:nth-child(8) {
  top: 81.7%;
  left: 18.3%;
  animation-delay: 0.7s;
}

@keyframes dot {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>