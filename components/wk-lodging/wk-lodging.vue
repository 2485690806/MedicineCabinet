<template>
	<view>
		 <view v-if="lodging_box_display" :class="closed_before?'lodging_box_colose':''">
		 		<view v-if="mask_open" class="lodging-outside-mask"></view>
		 		<view class="lodging-outside">
		 			<view class="lodging-background"></view>
		 			<view class="mask-1"></view>
		 			<view class="mask-2"></view>
		 			<view class="mask-3"></view>
		 			<image src="./search.svg"></image>
		 			<div>
		 				<span v-for="(item,index) in title" v-key="index">{{item}}</span>
		 			</div>
		 		</view>
		 	</view>
	</view>
</template>

<script>
	const SHOW_TIP = "wk-lodging"
	import { mapState } from 'vuex' 
	export default {
		props: {
			title: { // 
				type: String,
				default: ''
			}, 
			lodging_box_display: { //
				type: Boolean,
				default: false
			}, 
			mask_open: { //
				type: Boolean,
				default: true
			}, 
		},
		data() {
			return {
				// lodging_box_display:true,
				// closed_before:false,
				// mask_open:true,
				//title:''
			}
		},
		methods: {
			lodging_box_close(e) {
				let that = this
				that.closed_before = false
				setTimeout(()=>{
					that.lodging_box_display=false
				},500)
			},
			 
		},
	}
</script>
	
<style lang="scss" scoped>
	.lodging-outside-mask{
			position: absolute;
			width: 100%;
			height: 100%;
			top:0;
			z-index: 10000;
			background-color: #272727;
			animation:outside_mask_appear 2s forwards;
		
		}
		
		@keyframes outside_mask_appear{
			from{
				opacity: 0;
			}
			to{
				opacity: 0.5;
			}
		}
		
		.mask-1 {
			width: 300px;
			height: 300px;
			position: absolute;
			top: -220%;
			left: 50%;
			background-color: #10959c;
			border-radius: 42%;
			opacity: 0.7;
			transform: translateX(-50%);
			animation: mask_rotate 3s linear infinite;
	
		}
	
		.mask-2 {
			width: 320px;
			height: 320px;
			position: absolute;
			top: -250%;
			left: 50%;
			background-color: #16bfc8;
			border-radius: 43%;
			transform: translateX(-50%);
			animation: mask_rotate 5s linear infinite;
			opacity: 0.7;
		}
	
		.mask-3 {
			width: 330px;
			height: 330px;
			position: absolute;
			top: -280%;
			left: 50%;
			background-color: #0ae5f0;
			border-radius: 35%;
			transform: translateX(-50%);
			animation: mask_rotate 5s linear infinite;
			opacity: 0.6;
		}
	
		.lodging-background {
			position: absolute;
			width: 100%;
			height: 100%;
			background: linear-gradient(-45deg, #0b8187, #ffffff, #05585d);
			background-size: 400% 100%;
			animation: block_hold 10s infinite;
		}
		
		.lodging_box_colose{
			animation: waitting_box_colose_anim 0.5s linear forwards;
		}
		
		@keyframes waitting_box_colose_anim{
			0%{
				position: absolute;
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 0px;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
			}
			50%{
				position: absolute;
				width: 400rpx;
				height: 400rpx;
				overflow: hidden;
			border-radius: 50%;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			}
			100%{
				position: absolute;
					width: 0%;
					height: 0%;
					overflow: hidden;
				border-radius: 50%;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
			}
		}
	
		.lodging-outside {
			position: absolute;
			width: 500rpx;
			height: 200rpx;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 20rpx;
			overflow: hidden;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			z-index: 10001;
			animation: block_appear 2s forwards;
	
			image {
				width: 150rpx;
				height: 150rpx;
			}
	
			span {
				margin-right: 3px;
				position: relative;
				top: 5px;
				font-size: 23px;
				color: black;
				animation: change 0.5s ease infinite alternate;
				text-shadow: 1px 1px 0 #ccc,
					2px 2px 0 #ccc,
					3px 3px 0 #ccc,
	
					10px 10px 10px rgba(0, 0, 0, 0.5);
			}
		}
	
		@keyframes mask_rotate {
			from {
				transform: translateX(-50%) rotate(360deg);
			}
	
		}
	
		@keyframes change {
			100% {
				top: -7px;
				text-shadow: 1px 1px 0 #ccc,
					2px 2px 0 #ccc,
					3px 3px 0 #ccc,
					4px 4px 0 #ccc,
					5px 5px 0 #ccc,
	
					10px 50px 25px rgba(0, 0, 0, 0.3);
			}
		}
	
		@keyframes block_hold {
			0% {
				background-position: 100% 50%;
	
			}
	
			25% {
				background-position: 60% 50%;
	
			}
	
			50% {
				background-position: 0% 50%;
	
			}
	
			75% {
				background-position: 60% 50%;
	
			}
	
			100% {
				background-position: 100% 50%;
	
			}
		}
	
		@keyframes block_appear {
			0% {
				width: 0rpx;
				height: 0rpx;
				top: 30%;
				filter: blur(24px);
				transform: translate(-50%, -50%);
				border-radius: 50%;
	
			}
	
			20% {
				width: 500rpx;
				height: 200rpx;
				top: 50%;
				filter: blur(0px);
				transform: translate(-50%, -50%);
				border-radius: 20rpx;
	
			}
	
			100% {
				width: 500rpx;
				height: 200rpx;
				top: 50%;
				filter: blur(0px);
				transform: translate(-50%, -50%);
				border-radius: 20rpx;
	
			}
	
		}
		div{
			position: absolute;
			left: 40%;
			top: 50%;
			transform: translate(-20%,-50%);
			// position: absolute;
			// left: 50%;
			// top: 50%;
			// transform: translate(-50%,-50%);
		}
	
		div span:nth-child(2) {
			animation-delay: 0.1s;
		}
	
		div span:nth-child(3) {
			animation-delay: 0.3s;
		}
	
		div span:nth-child(4) {
			animation-delay: 0.5s;
		}
	
		div span:nth-child(5) {
			animation-delay: 0.7s;
		}
	
		div span:nth-child(6) {
			animation-delay: 0.9s;
		}
</style>