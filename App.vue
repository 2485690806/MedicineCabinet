<script>
	// const hgService = uni.requireNativePlugin("HG-Background");
	// const servicerouse = uni.requireNativePlugin("hdy-servicerouse");

	export default {
		onLaunch: function() {
			/*if (uni.getStorageSync('storeId') == '' || uni.getStorageSync('storeId') == null || uni.getStorageSync(
					'storeId') == undefined) {
				uni.navigateTo({
					url: "/pages/Login/Login"
				})
			};*/
			uni.setStorageSync('onmessage1', false);
			uni.setStorageSync('onmessage', false);
			uni.setStorageSync('onmessage2', false);
			
			uni.preloadPage({
				url: "/pages/Login/Login"
			});
			uni.preloadPage({
				url: "/pages/index/index"
			});
			uni.preloadPage({
				url: "/pages/AddGoods/AddGoods"
			});
			uni.preloadPage({
				url: "/pages/AddLiquid/AddLiquid"
			});
			uni.preloadPage({
				url: "/pages/SetMeal/SetMeal"
			});
			uni.preloadPage({
				url: "/pages/PaySuccess/PaySuccess"
			});
			uni.preloadPage({
				url: "/pages/Help/Help"
			});


			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					//console.log('运行Android上') 
					//plus.navigator.closeSplashscreen();
					break;
				case 'ios':
					//console.log('运行iOS上') 
					//plus.navigator.closeSplashscreen();
					break;
				default:
					//console.log('运行在开发者工具上') 
					break;
			};



			// hgService.config({
			// 	title: "",
			// 	content: "",
			// 	mode: 0, //0省电模式 1流氓模式
			// });

			// var rsult = hgService.checkIfLimited();

			// hgService.requestIgnoreLimit();

			// hgService.startService();

			// var globalEvent = uni.requireNativePlugin('globalEvent');
			// globalEvent.addEventListener('doJob', function() {
			// 	// counts += 1;
			// 	// modal.toast({
			// 	// 	message: "任务执行次数：" + counts,
			// 	// 	duration: 1
			// 	// });
			// });

		},
		onShow: function() {


		},
		onHide: function() {


		},
		onLoad() {
			let systeminfo = uni.getSystemInfoSync();
			console.log(systeminfo);
		},
		mounted() {

		},
		beforeCreate() {
			switch (uni.getSystemInfoSync().platform) {
				case 'android':
					//console.log('运行Android上') 
					try {
						//plus.navigator.closeSplashscreen();
					} catch {

					}
					break;
				case 'ios':
					//console.log('运行iOS上') 
					//plus.navigator.closeSplashscreen();
					break;
				default:
					//console.log('运行在开发者工具上') 
					break;
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	/* uni.scss */
	@import '@/uni_modules/uview-ui/theme.scss';

	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	// @import '@/static/customicons.css';
	
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	// /deep/ .uni-navbar__header {
	// 	height: 7vh !important;
	// 	background-color: #7dbbea !important;
	// 	line-height: 100px;
	// }


	// /deep/ .uni-nav-bar-text {
	// 	font-size: 5vw !important;
	// 	color: white !important;
	// 	font-weight: 900;
	// }

	// /deep/ .uni-navbar-btn-text uni-text {
	// 	font-size: 3vw !important;
	// 	font-weight: 900;
	// 	color: white !important;
	// }

	// /deep/ .uni-navbar__header-btns-left {
	// 	width: auto !important;
	// }

	// /deep/ .uni-navbar__content_view uni-text {
	// 	font-size: 6vw !important;
	// 	color: white !important;
	// 	font-weight: 900;
	// }

	// /deep/ .uni-navbar__header-btns-right {
	// 	width: 0 !important;
	// }
</style>