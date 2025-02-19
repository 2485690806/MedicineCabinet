<template>
	<view>
		
		<uni-nav-bar height="30px" :border="false" left-icon="back" title="测试页面" @clickLeft="back" />
		
		<canvas canvas-id="canid" id="canid" :style="{width:canvas_style.width,height:canvas_style.height}"></canvas>


		<view class="result" v-if="ani&&!imgs.length" :class="{redult_width:mode == 'height'}" v-show="!imgs.length"
			@click='uploadImg'>
			<view class="e-i e-1"></view>
			<view class="e-i e-2"></view>
			<view class="e-i e-3"></view>
		</view>

		<view class="result" v-show="img">
			<view class="flexc w-t">👉生成结果💯</view>
			<image :src="img" @click="showimg(img)" mode="widthFix"></image>
		</view>


		<view class="flexc w-t" v-show="imgs.length">👉效果</view>
		<view class="imgs" :class="{'scroll':mode == 'height'}">
			<image v-for="(d,i) in imgs" @click="delimg(i)" :key="i" :src="d.path"
				:style="{height:(d.height+'rpx'),width:(d.width+'rpx')}" mode="widthFix"></image>
		</view>

		<view style="height: 600rpx;"></view>
		<view class='btns-box'>
			<view class="flex tip-abs">
				<view class="tab flexc">
					<view class="t-i flexc" :class="{'t-a':current == i}" v-for="(d,i) in tab" :key="i"
						@click="taptab(i)">{{d.name}}</view>
				</view>
			</view>
			<view class="tip">
				<view class="flexc "><text style="transform: rotate(30deg);">👆</text>拼接模式 🤪上传图片 👉 “生成”拼接</view>
				<view class="flexc desc">{{openmax?'限制基础图宽高1000px（生成较快，文件较小）':'关闭限制（生成较慢，文件较大）'}}
					<switch color="#007aff" :checked="openmax" @change="switchchange" class="switch"></switch>
				</view>
			</view>
			<button @click='uploadImg' class='btn flexc btn-cut'>选择图片</button>
			<button v-show="imgs.length" class='btn flexc btn-cut' @click="create">{{img?'重新生成':'生成'}}</button>
			<button v-show="img" @click='saveimg(img)' class='btn flexc btn-save'>保存</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				ani: true,
				tab: [{
					name: '横向'
				}, {
					name: '纵向'
				}],
				current: 0,

				img: '',
				base: '',
				imgs: [],
				source_imgs: [],
				canvas_style: {
					width: '200px',
					height: '200px'
				},

				mode: 'height',
				max: 1000, //最大宽高 太大生成慢
				openmax: true,

				debug: false,
			}
		},
		onLoad() {

		},
		methods: {
			back() {
				// clearInterval(this.timer);
				uni.navigateTo({
					url: "/pages/admin_send_cmd/admin_send_cmd",
					animationType: "slide-in-left",
				})
			},
			toast(t) {
				uni.showToast({
					title: t,
					icon: 'none'
				})
			},
			uploadImg() {
				let imgs = []
				this.source_imgs = []
				let that = this
				uni.chooseImage({
					count: 9,
					success(e) {
						for (let d of e.tempFilePaths) {
							uni.getImageInfo({
								src: d,
								success(e) {
									imgs.push({
										width: e.width,
										height: e.height,
										path: e.path
									})
									that.source_imgs = JSON.parse(JSON.stringify(imgs))
									that.with_height(imgs)
								}
							})
						}
					}
				})
			},
			saveimg(url, tip = true) {
				let platform = uni.getSystemInfoSync().uniPlatform
				const date = new Date();
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2,
					'0'); // 月份从0开始，需要+1
				const day = String(date.getDate()).padStart(2, '0');
				const hours = String(date.getHours()).padStart(2, '0');
				const minutes = String(date.getMinutes()).padStart(2, '0');
				const seconds = String(date.getSeconds()).padStart(2, '0');
				
				const formattedDate =
					`${year}${month}${day}${hours}${minutes}${seconds}`;
				console.log(formattedDate); // 输出：2023-10-05 14:30:45
				let fileName = "left"
				
				const newFileName = formattedDate + "/" + fileName + ".jpg"; // 新的文件名
				
				// 替换文件名
				const newPath = url.replace(/[^/]+$/,
					newFileName);
					
				uni.saveFile({
					tempFilePath: url, //临时路径
					filePath: newFileName, // fileName 需要保存的文件名称 （文件后缀根据需要修改）
					success: function(res) {
						console.log('打印res',res)
				
				
					},
				})
				// //保存到本地
				// uni.saveFile({
				// 	tempFilePath: url, //文件的临时路径
				// 	success: function(res) {
				// 		// const savedFilePath = res.savedFilePath;
				// 		// // 打开文件
				// 		// uni.openDocument({
				// 		// 	filePath: savedFilePath,
				// 		// 	success: function(res) {
				// 		// 		uni.hideLoading()
				// 		// 	},
				// 		// 	fail: function(res) {},
				// 		// 	complete: function(res) {
				// 		// 		setTimeout(uni.hideLoading(), 4000)
				// 		// 	},
				// 		// });
				// 	},
				// 	fail: function(err) {}
				// });
				
				
				// if (platform == 'web') {
				// 	function downloadH5(base64) {
				// 		var arr = base64.split(",");
				// 		var bytes = atob(arr[1]);
				// 		var ab = new ArrayBuffer(bytes.length);
				// 		var ia = new Uint8Array(ab);
				// 		for (var i = 0; i < bytes.length; i++) {
				// 			ia[i] = bytes.charCodeAt(i);
				// 		}
				// 		var blob = new Blob([ab], {
				// 			type: "application/octet-stream"
				// 		});
				// 		var url = URL.createObjectURL(blob);
				// 		var a = document.createElement("a");
				// 		a.href = url;
				// 		a.download = new Date().valueOf() + ".png";
				// 		var e = document.createEvent("MouseEvents");
				// 		e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				// 		a.dispatchEvent(e);
				// 		URL.revokeObjectURL(url);
				// 		if (tip) {
				// 			uni.showToast({
				// 				title: "下载完成",
				// 				icon: "none"
				// 			});
				// 		}

				// 	}
				// 	return downloadH5(url)
				// }

				if (platform == 'mp-weixin') {
					uni.saveImageToPhotosAlbum({
						filePath: url,
						success() {
							if (tip) {
								uni.showToast({
									title: "已保存 请至相册查看",
									icon: "none"
								});
								uni.vibrateShort({});
							}

						},
						fail(res) {
							if (res.errMsg.indexOf("fail") && res.errMsg.indexOf("cancel") == -1) {
								uni.showModal({
									title: "您需要授权相册才可以保存~",
									success(res) {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							}
						}
					});
				}
				
				
			},
			switchchange(e) {
				this.openmax = e.detail.value
				if (this.openmax) {
					this.toast('生成速度😃 文件大小🤣')
				} else {
					this.toast('生成速度😞 文件大小😓')
				}
			},
			taptab(i) {
				this.current = i
				if (i == 0) this.mode = 'height'
				if (i == 1) this.mode = 'width'

				this.with_height(this.imgs)

				if (!this.imgs.length) {
					this.ani = false
					this.$nextTick(() => {
						this.ani = true
					})
				}
			},
			changemode() {
				if (this.mode === 'width') {
					this.mode = 'height'
				} else {
					this.mode = 'width'
				}
				this.toast(this.mode)
			},
			delimg(i) {
				let that = this
				uni.showModal({
					title: '是否移除该图片',
					success(e) {
						if (e.confirm) {
							that.imgs.splice(i, 1)
							that.source_imgs.splice(i, 1)
						}
					}
				})
			},
			showimg(img) {
				uni.previewImage({
					urls: [img]
				})
			},
			create() {
				if (!this.imgs || !this.imgs.length) {
					this.toast('请选择图片')
					return
				}
				let new_image_sizes = JSON.parse(JSON.stringify(this.source_imgs))
				let image_sizes = this.with_height(new_image_sizes)
				this.create_canvas(image_sizes)
			},
			with_height(imgs) {
				if (!imgs.length) return
				let scale = 1
				if (this.mode == 'width') {
					let width = imgs[0].width
					let height_sum = imgs[0].height

					if (width > this.max && this.openmax) {
						scale = this.max / width
						width = this.max
						imgs[0].width = width
						height_sum = scale * imgs[0].height
						imgs[0].height = height_sum
					}

					for (let i in imgs) {
						if (i == 0) continue;
						scale = width / imgs[i].width
						let _h = scale * imgs[i].height
						imgs[i].width = scale * imgs[i].width
						imgs[i].height = _h
						height_sum += _h
					}
					this.imgs = imgs
					return {
						data: imgs,
						sum: height_sum,
						width: width
					}
				}

				//height
				let height = imgs[0].height
				let width_sum = imgs[0].width

				if (height > this.max && this.openmax) {
					scale = this.max / height
					height = this.max
					imgs[0].height = height
					width_sum = scale * imgs[0].width
					imgs[0].width = width_sum
				}

				for (let i in imgs) {
					if (i == 0) continue;
					let scale = height / imgs[i].height
					let _w = scale * imgs[i].width
					imgs[i].height = scale * imgs[i].height
					imgs[i].width = _w
					width_sum += _w
				}
				this.imgs = imgs
				return {
					data: imgs,
					sum: width_sum,
					height: height
				}
			},
			create_canvas(image_sizes) {
				let that = this
				//width 竖向排列
				if (this.mode == 'width') {
					this.canvas_style = {
						width: image_sizes.width + 'px',
						height: image_sizes.sum + 'px'
					}
				}
				//height 横向
				if (this.mode == 'height') {
					this.canvas_style = {
						width: image_sizes.sum + 'px',
						height: image_sizes.height + 'px'
					}
				}
				uni.showLoading({
					title: '生成中..',
					mask: true
				})
				this.$nextTick(() => {
					setTimeout(() => {
						let ctx = uni.createCanvasContext('canid')

						if (this.mode == 'width') {
							let y = 0
							for (let i in image_sizes.data) {
								if (i > 0) {
									y += image_sizes.data[i - 1].height
								}
								ctx.drawImage(image_sizes.data[i].path, 0, y, image_sizes.data[i].width,
									image_sizes.data[i].height)
							}
						}
						if (this.mode == 'height') {
							let x = 0
							for (let i in image_sizes.data) {
								if (i > 0) {
									x += image_sizes.data[i - 1].width
								}
								ctx.drawImage(image_sizes.data[i].path, x, 0, image_sizes.data[i].width,
									image_sizes.data[i].height)
							}
						}

						ctx.draw(false, (e) => {
							uni.canvasToTempFilePath({
								canvasId: 'canid',
								success(e) {
									uni.hideLoading()
									that.toast('生成成功')
									that.img = e.tempFilePath
								},
								fail(e) {
									uni.hideLoading()
									uni.showModal({
										title: '生成失败',
										content: JSON.stringify(e)
									})
								}
							})
						})
					}, 90)


				})


			}

		},
		onShareAppMessage() {
			return {
				title: '图片拼接小工具'
			}
		},
		onShareTimeline() {
			return {
				title: '图片拼接小工具'
			}
		},
	}
</script>

<style scoped>
	.flexc {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.flex {
		display: flex;
		align-items: center;
	}

	.flexw {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.flexe {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.flexs {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.btn {
		background-color: #007aff;
		width: 100%;
		height: 90rpx;
		font-size: 28rpx;
		border-radius: 10rpx;
		color: #fff;
		font-weight: bold;
	}

	.btn:active {
		transform: scale(.98);
	}

	.switch {
		transform: scale(.6);
	}

	image {
		animation: all .3s;
	}

	image:active {
		transform: scale(.98);
	}

	.e-1 {
		animation: topIn 2s;
	}

	@keyframes topIn {
		30% {
			transform: translateY(30rpx);
		}

		60% {
			transform: translateY(-30rpx);
		}

		100% {
			transform: translateY(0);
		}
	}

	.e-2 {
		animation: topIn1 2s;
	}

	@keyframes topIn1 {
		30% {
			transform: translateY(-30rpx);
		}

		60% {
			transform: translateY(30rpx);
		}

		100% {
			transform: translateY(-90rpx);
		}
	}

	.e-3 {
		animation: topIn2 2.2s;
	}

	@keyframes topIn2 {
		30% {
			transform: translateY(-40rpx);
		}

		60% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-120rpx);
		}
	}

	.e-i {
		margin: auto;
		width: 400rpx;
		height: 230rpx;
		border-radius: 16rpx;
		background-color: #f1f3f7;
		animation-fill-mode: forwards;
		/* animation: topIn 1s; */
	}

	@keyframes topIn {
		30% {
			transform: translateY(-60rpx);
		}

		60% {
			transform: translateY(30rpx);
		}

		100% {
			transform: translateY(0);
		}
	}

	.w-t {
		font-weight: bold;
		line-height: 3;
	}

	.result {
		margin: 0 auto 50rpx auto;
		width: 650rpx;
		text-align: center;
		line-height: 0;
		overflow: scroll;
	}

	.redult_width {
		transform: rotate(-90deg) translateY(9%);
	}

	.imgs {
		margin: auto;
		width: 600rpx;
		text-align: center;
		line-height: 0;
		overflow: scroll;
	}

	.imgs image {
		display: block;
		margin: auto;
	}

	.scroll {
		white-space: nowrap;
		overflow: scroll;
	}

	.scroll image {
		display: inline-block;
	}

	.tip-abs {
		z-index: 2;
		position: absolute;
		top: 22rpx;
		left: 210rpx;
	}

	.t-i {
		color: #333;
		width: 150rpx;
		height: 60rpx;
		transition: all .25s;
	}

	.t-a {
		background-color: #fff;
		font-weight: bold;
		color: #000;
		border-radius: 10rpx;
		font-size: 28rpx;
	}

	.tab {
		font-size: 26rpx;
		background-color: #eff1f2;
		padding: 6rpx;
		border-radius: 12rpx;
	}

	.tip {
		width: 83%;
		position: relative;
		margin: 70rpx auto 20rpx auto;
		font-size: 26rpx;
		padding: 30rpx;
		line-height: 2;
		font-weight: bold;
		border: 1rpx dashed #e1e1e1;
		border-radius: 20rpx;
	}

	.tip .desc {
		font-size: 24rpx;
		color: #999;
		font-weight: 400;
	}

	.body {
		width: 100%;
		min-height: 100vh;
	}

	.btns-box {
		position: fixed;
		z-index: 3;
		bottom: 0;
		width: 100%;
		background-color: rgba(255, 255, 255, .9);
		backdrop-filter: blur(20rpx);
		padding-bottom: var(--status-bar-height);
		border-radius: 30rpx 30rpx 0 0;
	}

	.btn {
		width: 70%;
		margin: 20rpx auto;
	}

	.btn-save {
		background: linear-gradient(97.71deg, #ffa462, #ff4d42 88.36%);
	}

	#canid {
		position: fixed;
		opacity: 0;
		z-index: -10;
		left: -99999px;
	}
</style>