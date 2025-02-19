# 使用说明

# 使用此插件设备必须root

请先试用->选择你的项目->制作自定义基座

云打包：manifest.json -> App 原生插件配置 -> 选择云端插件
(需要离线打包请联系作者，联系方式在底部)

## 引用方式

`const port = uni.requireNativePlugin('hpb-serialport');`

## 插件接口

#### `open(options, callback)`
#### `send(options, callback)`
#### `addListener(callback)`
#### `addListenerAndKeepAlive(callback)`
#### `removeListener(callback)`
#### `getStatus(callback)`
#### `close()`

## 使用说明


### `open(options, callback)`参数说明

| 参数     |   类型   | 参数说明 |
| -------- | :------: | -------: |
| options  |   json   | 参数配置 |
| callback | function | 回调方法 |

#### open->options{object}

| 参数     |  类型  | 是否可空  |                                                    参数说明 |
| -------- | :----: | -------- | ---------------------------------------------------------: |
| path     | string | 否       | 串口地址(比如：/dev/ttyS0, /dev/ttyS1)                      |
| baudRate |  int   | 是       |                      波特率，默认 9600                      |
| parity   |  int   | 是       | 奇偶校验，0 None, 1 Odd, 2 Even 默认 0                      |
| dataBits |  int   | 是       |                   数据位，5 - 8 默认 8                      |
| stopBit  |  int   | 是       |                  停止位，1 或 2 默认 1                      |
| flowCon  |  int   | 是       | 1.0.9新增 串口流控定义，1硬件流控 或 2软件流控 默认 0不使用流控 |


#### open->callback

| 参数   |  类型   | 参数说明 |
| ------ | :-----: | -------: |
| status | Boolean | 是否打开 |
| msg    | String  |     提示 |

### `send(options, callback)`参数说明

| 参数     |   类型   | 参数说明 |
| -------- | :------: | -------: |
| options  |   json   | 指令数组 |
| callback | function | 回调方法 |

#### send->options{object} 试用send方法之前必须先设置监听回调 addListener

| 参数     |     类型       | 是否可空 |     参数说明                                                                                 |
| -------- | :------------:| -------- | ------------------------------------------------------------------------------------------: |
| sends    | array<string> | 否       | 向串口发送的指令(16 进制字符串,比如：['FF0F0C010203']), 发送的是 16 进制字符串 不发送指令则留空[] |

#### send->callback

| 参数   |  类型   | 参数说明 |
| ------ | :-----: | -------: |
| status | Boolean | 是否成功 |
| msg    | String  |     提示 |

### `addListener(callback)`参数说明 ps: 改方法只监听一次回调，需要持续回调请使用下面的`addListenerAndKeepAlive`

| 参数     |   类型   | 参数说明 |
| -------- | :------: | -------: |
| callback | function | 回调方法 |

#### addListener->callback

| 参数  |  类型     |           参数说明 |
| ----- | :-------:| -----------------: |
| status | Boolean | 是否成功           |
| bytes | byte[]   |     串口返回的数据 |
| size  |  int     | 串口返回的数据大小 |

### `addListenerAndKeepAlive(callback)`参数说明 ps:持续监听回调

| 参数     |   类型   | 参数说明 |
| -------- | :------: | -------: |
| callback | function | 回调方法 |

#### addListenerAndKeepAlive->callback 当send发送指令(sends:[...])为一个以上时，addListenerAndKeepAlive会发送剩余的指令，不需要再次调用send

| 参数  |  类型     |           参数说明 |
| ----- | :-------:| -----------------: |
| status | Boolean | 是否成功           |
| bytes | byte[]   |     串口返回的数据 |
| size  |  int     | 串口返回的数据大小 |

### `removeListener(callback)`参数说明

| 参数     |   类型   | 参数说明 |
| -------- | :------: | -------: |
| callback | function | 回调方法 |

#### removeListener->callback

| 参数   |  类型    |   参数说明  |
| ------ | :-----: | ----------: |
| status | Boolean | 是否移除成功 |
| msg    | String  |     提示    |

### `getStatus(callback)`参数说明

| 参数     |   类型   | 参数说明 |
| -------- | :------: | -------: |
| callback | function | 回调方法 |

#### getStatus->callback

| 参数   |  类型   | 参数说明 |
| ------ | :-----: | -------: |
| status | Boolean | 是否打开 |
| msg    | String  |     提示 |

### `close()`参数说明

关闭串口

### 使用方法

    const port = uni.requireNativePlugin('hpb-serialport');
    export default {
    	data() {
    		return {
    			title: 'Hello'
    		}
    	},
    	onLoad() {
    		port.open({
    			path: "/dev/ttyS0",
    			baudRate: 9600, //可空，默认9600
    			parity: 0, //可空，默认0
    			dataBits: 8 ,//可空，默认8
    			stopBit: 1 //可空，默认1
    		}, res=>{
    			console.log(res);
    			console.log("status->"+res.status);
    			if(res.status){
    				console.log(res.msg)
					//串口开启之后设置数据监听回调
					this.addListenerAndKeepAlive();
    			}else{
    				console.log(res.msg)
    			}
    		})
    	},
    	methods: {
			//串口开启之后设置数据监听回调
			addListenerAndKeepAlive(){
				port.addListenerAndKeepAlive(async result=>{
					if(result.status){
						let hex = await this.bytesToHexString(result.bytes, result.size);
						console.log(hex);
						uni.showToast({
							icon: 'none',
							title: hex
						});
					}else{
						uni.showToast({
							icon: 'none',
							title: result.msg
						});
					}
					
				})
			},
    		send(){
    			port.send({
    				sends: ["FF0A01A20B010B3B48FE", "FF0A01A20B010B3B48FE"] //不发送，留[]
    			}, async res=>{
    				if(res.status){
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					}else{
						uni.showToast({
							icon: 'none',
							title: res.msg
						});
					}
    			})
    		},
			status(){
    			port.getStatus(res=>{
    				console.log(res);
    				console.log("status->"+res.status);
    				if(res.status){
    					console.log(res.msg)
    				}else{
    					console.log(res.msg)
    				}
    			})
    		},
    		close(){
    			port.close();
    		},
    		bytesToHexString(inarray, size) {
    			return new Promise(res => {
    				let i, j, x;
    				let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A",
    					"B", "C", "D", "E", "F"
    				];
    				let out = "";
    				for (j = 0; j < size; ++j) {
    					x = parseInt(inarray[j]) & 0xff;
    					i = (x >> 4) & 0x0f;
    					out += hex[i];
    					i = x & 0x0f;
    					out += hex[i];
    				}
    				res(out)
    			})
    		},
    	}
    }

## 定制

有不懂使用方法，或者需要定制的可联系 QQ1679583090 备注串口
