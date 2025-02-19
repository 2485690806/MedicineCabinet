let socketOpen = false;
let socketMsgQueue = [];
let cashierInfo = uni.getStorageSync('cashierInfo')

export default {
	client: null,
	baseURL: 'ws://124.221.232.51:15674/ws',
	header: {
		login: 'admin2',
		passcode: '2485690806@qq.comA'
	},
	
	storeId:'',
	cashierId:'',
	init(storeId,cashierId) {
		this.storeId = storeId
		this.cashierId = cashierId
		if (this.client) {
			return Promise.resolve(this.client);
		}

		return new Promise((resolve, reject) => {
			const ws = {
				send: this.sendMessage,
				onopen: null,
				onmessage: null,
				close: this.closeSocket,
			};

			uni.connectSocket({
				url: this.baseURL,
				header: this.header,
			});

			uni.onSocketOpen(function(res) {
				console.log('WebSocket连接已打开！', res);

				socketOpen = true;
				for (let i = 0; i < socketMsgQueue.length; i++) {
					ws.send(socketMsgQueue[i]);
				}
				socketMsgQueue = [];

				ws.onopen && ws.onopen();
			});

			uni.onSocketMessage(function(res) {
				ws.onmessage && ws.onmessage(res);
			});

			uni.onSocketError(function(res) {
				console.log('WebSocket 错误！', res);

				this.client?.disconnect();
				this.client = null;
				socketOpen = false;
				uni.$emit('socketError');
				reject(res);

			});

			uni.onSocketClose((res) => {
				this.client.disconnect();
				this.client = null;
				socketOpen = false;
				console.log('WebSocket 已关闭！', res);
				this.init(this.storeId,this.cashierId)

			});

			const Stomp = require('./stomp.js').Stomp;
			Stomp.setInterval = function(interval, f) {
				return setInterval(f, interval);
			};
			Stomp.clearInterval = function(id) {
				return clearInterval(id);
			};

			const client = this.client = Stomp.over(ws);
			client.connect(this.header, ()=>{
				
				console.log('stomp connected');

				client.subscribe("/exchange/cashir_status_exchange", (res) => {
					// resolve(res);
					uni.$emit('sendMessage',res);
					
				}, {
					'x-queue-name': 'StoreId:' + this.storeId + 'CashierId:' +
						this.cashierId,
						
					'durable': true,
					'auto-delete': true,
					'exclusive': false
				});


			});
		});
	},
	disconnect() {
		uni.closeSocket();
	},
	sendMessage(message) {
		if (socketOpen) {
			uni.sendSocketMessage({
				data: message,
			});
		} else {
			socketMsgQueue.push(message);
		}
	},
	closeSocket() {
		console.log('closeSocket');
	},
};