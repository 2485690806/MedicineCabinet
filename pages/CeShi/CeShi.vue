<template>
	<view class="container">
		<uni-nav-bar height="10vh" shadow left-icon="left" :title="title" @clickLeft="back" />
		<view class="SendText2" style="color: black;">
			<view style="    line-height: 100%;
    margin: 2vw 0;">
				售液机编号: {{storeID}}
			</view>
			<view class="">
				<uni-section :title="ChuanKouTitle" type="line">
					<uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
				</uni-section>
			</view>
		</view>
		<view class="Xian"></view>
		<view class="SendText">
			发送指令: {{sendText}}
		</view>
		<view class="Xian"></view>
		<view class="RecoudTextIndex">
			收到指令:
			<view class="RecoudText">
				<view v-for="(item,index) in RecoudText" :key="index">
					{{item}}
				</view>
			</view>
			<view class="box2">
				<button type="primary" @click="QingKongMsg">清空消息</button>
			</view>
		</view>

		<view class="Xian"></view>


		<view class="CenShiIndex" v-if="status==2" style="flex-direction: column;">
			<view class="SendText">
				出液执行设置：
			</view>

			<view class="SendText2 SendText3" style="color: black;">
				<view class="">
					货道序号：
				</view>
				<input class="uni-input" @input="replaceInput" v-model="XuHao" placeholder="货道序号" type="number"
					style="font-size: 3vw;" />
			</view>

			<view class="SendText2 SendText3">
				<view class="">
					1升液体=
				</view>
				<input class="uni-input" @input="replaceInput" v-model="MaiChon" placeholder="货道超时时间设定" type="number"
					style="font-size: 3vw;" />
				个脉冲
			</view>
			<view class="SendText2 SendText3" style="color: black;">
				<view class="">
					出液升数：
				</view>
				<input class="uni-input" @input="replaceInput" v-model="Shen" placeholder="出液升数" type="number"
					style="font-size: 3vw;" />
			</view>

			<view class="box2">
				<button type="primary" @click="SendShouYe">发送消息</button>
			</view>
		</view>

		<view class="Xian"></view>


		<view class="SendText">
			响应帧格式：
		</view>


		<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
			@selection-change="selectionChange">

			<uni-tr v-for="(item, index) in ChuHuo" :key="index" v-if="status==1">
				<uni-td>{{ item }}</uni-td>
			</uni-tr>
			<uni-tr v-for="(item, index) in ChuYe" :key="index" v-if="status==2">
				<uni-td>{{ item }}</uni-td>
			</uni-tr>
		</uni-table>

		<view class="Xian"></view>


		<view class="box1">
			<button type="warn" @click="open" v-if="status==2||status==3">打开串口售液</button>
			<button type="warn" @click="changepath2" v-if="status==1">打开串口售货</button>
		</view>

		<view class="box1" v-if="status==1" style="display: flex;align-items: center;">
			<view class="SendText">
				货道超时时间设定：
			</view>
			<input class="uni-input" @input="replaceInput" v-model="changeValue" placeholder="货道超时时间设定" type="number"
				style="font-size: 3vw;" />
		</view>



		<view class="CenShiIndex" v-if="status==1">
			<button class="ShouYeButton" type="primary" v-for="item of 46" @click="sendShouHuo(item)">
				货道{{item}}
			</button>
		</view>





		<view class="box1" v-if="status==3">
			<button type="warn" @click="autoTest">自动测试</button>
		</view>



		<view class="box1" v-if="status==2" v-for="item in 4">
			<button type="warn" @click="stopYe(item-1)">停止通道{{item}}</button>
		</view>

		<view class="box1" v-if="status==2">
			<button type="warn" @click="stopYe(4)">停止所有通道</button>
		</view>
		
		

		<view class="box1">
			<button type="warn" @click="close">关闭串口</button>
		</view>
		<view class="box1">
			<button type="warn" @click="testall">同时测试</button>
		</view>

		<view class="box1">
			<button type="primary" @click="getDevices">获取所有设备列表</button>
			<view class="text" v-for="item in Text1">
				{{ item }}
			</view>
			<!-- <view class="">
				{{ceshi}}
			</view> -->
		</view>
		<view class="box1">
			<button type="primary" @click="getDevicesPath">获取所有设备路径</button>
			<text>{{device}}</text>
		</view>


		<view class="box1">
			<button type="primary" @click="isOpen">查看是否打开</button>
		</view>
		<!-- 		<view class="box1">
			<button type="primary" @click="onMessage">监听消息</button>
			<view class="text">rec:
				<view class="text" v-for="item in Text1">
					{{ item }}
				</view>
			</view>
			<view class="text">send:
				<view class="text" v-for="item in Text3">
					{{item}}
				</view>
			</view>
		</view> -->
		<!-- 		<view class="box1">
			<button type="primary" @click="send">发送请求</button>
			<button type="primary" @click="send2">发送请求2</button>
			<text></text>
		</view> -->
	</view>
</template>

<script>
	const serialPort = uni.requireNativePlugin('Fvv-UniSerialPort'); // 固体
	// const serialPort = uni.requireNativePlugin('Fvv-UniSerialPort'); // 液体
	export default {
		data() {
			return {

				
				Shen: 1,
				XuHao: 1,
				MaiChon: 2.5,

				changeValue: 3,
				RecoudText: [],
				value: 0,
				range: [{
						value: 0,
						text: "/dev/ttyS7"
					},
					{
						value: 1,
						text: "/dev/ttyS4"
					},
					{
						value: 6,
						text: "/dev/ttyS5"
					},
					{
						value: 2,
						text: "/dev/ttyS3"
					},
					{
						value: 3,
						text: "/dev/ttyS2"
					},
					{
						value: 4,
						text: "/dev/ttyS0"
					},
					{
						value: 7,
						text: "/dev/ttyS1"
					},
					{
						value: 5,
						text: "/dev/ttyFIQ0"
					},
				],
				storeID: "",
				ChuHuo: ["出货正确响应帧:   aa0b0102  +	(2位货道号) +	(2位 光眼监测到掉货1，光眼没监测到掉货0) +  0000bb",
					"出货错误响应帧:   aa0B0103  +	(2位货道号) +	(2位 光眼监测到掉货1，光眼没监测到掉货0) +  0000bb",
					"心跳响应帧:   aa060302  +	(1字节) +  bb"
				],
				ChuYe: ["获取设备状态响应帧:   aa0102  +	(4个光电传感器状态，总8位) +	(6个按键输入状态，总12位) +  bb",
					"执行器控制响应帧:   aa0202  +	(序号1-2状态，总16位) +  bb",
					"出液响应帧:   aa0302  +	(货道序号) +	(8位脉冲数) +  bb",
					"停止出液响应帧:   aa0402  +	(货道序号) +	(8位脉冲数) +  bb",
				],
				shouhuoList: [],
				title: "售液测试",
				ChuanKouTitle: "售液板串口",
				status: 1,
				shujuwei: 8,
				stopwei: 1,
				baudRate: 9600,
				jianyanwei: 0,
				device: [],
				select: {
					device: 0,
					recType: "Hex",
					sendType: "Hex",
				},
				recText: "",
				sendText: '',
				Text1: [],
				Text2: [],
				Text3: '',
				Text4: '',
				Text5: '',
				devpath1: '/dev/ttyS7',
				devpath2: '/dev/ttyS4',
				devpath3: '/dev/ttyFIQ0',
				devpath4: '/dev/ttyS3',
				devpath5: '/dev/ttyS0',
				devpath6: '/dev/ttyS2',
				// ceshi:''
				defaultPath: '/dev/ttyS7',
				DoorStatus: true,
				DenStatus: true,
				
				
				
				stopYeList:[
					"AA040101BB",
					"AA040102BB",
					"AA040103BB",
					"AA040104BB",
				],
			};
		},
		onShow() {
			this.storeID = uni.getStorageSync("storeId")


		},
		onLoad(options) {
			let a;
			if (options.status == "1" || options.status == "3") {
				this.title = '售货测试'
				this.ChuanKouTitle = '售货板串口'
				a = uni.getStorageSync("ShouHuo")
				this.defaultPath =  "/dev/ttyS3"
				try {
					this.changepath2()
					this.onMessage();
				} catch (e) {
					//TODO handle the exception
				}

			} else if (options.status == "4") {
				this.title = '售货测试'
				this.ChuanKouTitle = '售货板串口'
				a = uni.getStorageSync("ShouHuo")
				this.defaultPath = a
				try {
					this.changepath2()
					this.onMessage();
				} catch (e) {
					//TODO handle the exception
				}
				try {
					this.open()
					this.onMessage2();
				} catch (e) {
					//TODO handle the exception
				}

			}else {
				this.title = '售液测试'
				this.ChuanKouTitle = '售液板串口'
				a = uni.getStorageSync("ShouYe")
				this.defaultPath = "/dev/ttyS1"
				try {
					this.open()
					
					this.onMessage2();
				} catch (e) {
					//TODO handle the exception
				}
			}
			this.range.forEach(item => {
				if (item.text == a) {
					this.value = item.value
				}
			})
			this.status = options.status

			this.getDevicesPath()
		},
		onHide() {
			
		},
		methods: {
			
			stopYe(index){
				if(index !=4){
					setTimeout[,]