<template>
	<view class="template">
  <div class="loader">
    <div v-for="i in 8" :key="i" class="dot"></div>
  </div>
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
	}
.dot {
  width: 60px;
  height: 5px;
  animation: dot 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite, colorChange 2s linear infinite;
}

.dot:nth-child(1) {
  left: 0;
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.2s;
}

.dot:nth-child(4) {
  animation-delay: 0.3s;
}

.dot:nth-child(5) {
  animation-delay: 0.4s;
}

.dot:nth-child(6) {
  animation-delay: 0.5s;
}

.dot:nth-child(7) {
  animation-delay: 0.6s;
}

.dot:nth-child(8) {
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

@keyframes rotation {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes colorChange {
  0% {
    background-color: #f50808;
  }
  25% {
    background-color: #ffc404;
  }
  50% {
    background-color: #09fc1d;
  }
  75% {
    background-color: #0752f4;
  }
  100% {
    background-color: #f909f9;
  }
}
</style>