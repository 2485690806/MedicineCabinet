<template>
  <div class="template">
    <div class="text-ripple">拼命加载中...</div>
  </div>
</template>

<style scoped>
.template {
  padding: 50px;
  text-align: center;
  color: #999;
}

.text-ripple {
  position: relative;
  color: #3f51b5;
  display: inline-block;
  animation: textRippleAnimation 1.5s linear infinite;
}

.text-ripple::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3f51b5;
  animation: rippleAnimation 1.5s linear infinite;
}

@keyframes textRippleAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes rippleAnimation {
  0% {
    width: 0%;
  }
  50% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
</style>