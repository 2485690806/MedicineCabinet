<template>
  <div class="template">
    <div class="bounce">
		<div class="ball"></div>
	</div>
  </div>
</template>

<style scoped>
	.template {
		padding: 50px;
		text-align: center;
		color: #999;
	}

.bounce{
	border-bottom: 1px solid #999;
}

.ball {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #007bff; /* 小球的颜色，可以根据需要进行调整 */
  animation: bounceAnimation 1.5s ease-in-out infinite;
}

@keyframes bounceAnimation {
  0%,
  100% {
	  width: 32px;
	  height: 28px;
	   border-radius: 50%;
    transform: translateY(0);
  }
  50% {
	width: 30px;
	height: 30px;
	border-radius: 50%;
    transform: translateY(-50px); /* 小球跳动的高度，可以根据需要进行调整 */
  }
}
</style>