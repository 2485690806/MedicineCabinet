<template>
    <!--canvas 2D不支持真机调试，会报U.createEvent is not a function错误，可开发者工具测试或手机运行预览版--> 
    <view class="long-image-box" :style="{transform: 'scale(' + scale + ');'}">
        <!-- #ifdef MP-WEIXIN || MP-TOUTIAO  -->
        <canvas type="2d" :canvas-id="canvasId" :id="canvasId" class="long-img" :style="{width: outWidth + 'px', height: outHeight + 'px'}">
        </canvas>
        <!-- #endif -->
        <!-- #ifndef MP-WEIXIN || MP-TOUTIAO  -->
        <canvas :canvas-id="canvasId" :id="canvasId" class="long-img" :style="{width: outWidth + 'px', height: outHeight + 'px'}"></canvas>
        <!-- #endif -->
    </view>
</template>

<script>
    /**
     * canvas最大高度maxHeight默认4096（微信），如需拼接更多图片到同一张，请降低outWidth
     */
    let canvas, ctx;
    let markMargin = 30;
    export default {
        name:"long-image",
        data() {
            return {
                canvasId: 'long_img',
                isCanvas2D: false, // 除了微信和头条小程序，其他端都需要用canvas普通模式，非2d
                horzAlign: 'left',
                textBaseline: 'alphabetic',
                textPos:{x: markMargin, y: markMargin},
                result: [],
                dpr: 2,
                width_key: 'width',
                height_key: 'height',
                outHeight: 412, // 单位px
                pageWidth: 0,
            };
        },
        props:{
            maxNum: {
                type: Number,
                default: 6
            },
            maxHeight: { // px，微信小程序canvas最大高度4096，如需拼接更多图片到同一张，请降低outWidth
                type: Number,
                default: 4096
            },
            width:{ // rpx，组件显示宽度
                type: Number,
                default: 750
            },
            outWidth: { // px 输出图片宽度，过大会导致无响应。默认864（0表示自动决定，不超过1200）
                type: Number,
                default: 864
            },
            markText:{
                type: String,
                default: null
            },
            markPos: {
                type: String,
                default:'right-bottom'
            },
            markSize: { // px
                type: Number,
                default: 20
            },
            markColor: {
                type: String,
                default: '#d9cc37'
            }
        },
        computed:{
            scale: function(){
                if(this.outWidth > 1){
                    return this.rpx2px(this.width) / this.outWidth;
                }
                return 1;
            }
        },
        created:function(){
            let sysInfo = uni.getSystemInfoSync();
            this.dpr = sysInfo.pixelRatio;
            this.pageWidth = sysInfo.windowWidth;
        },
        methods:{
            initContext: async function({items, path_key='path', width_key='width', height_key='height'}){
                // 获取图片的宽高；计算画布最合适的宽度。
                this.width_key = width_key;
                this.height_key = height_key;
                let widthSum = 0, validNum = 0;
                for(let item of items){
                    let imgPath = item[path_key];
                    if(!imgPath)continue;
                    if(!item[width_key] || !item[height_key]){
                        let [error, imgInfo] = await uni.getImageInfo({src: imgPath});
                        if(error){
                            continue;
                        }
                        item[width_key] = imgInfo.width;
                        item[height_key] = imgInfo.height;
                    }
                    widthSum += item[width_key];
                    validNum += 1;
                }
                if(validNum < 1)return;
                if(this.outWidth < 1){
                    let avgWidth = Math.round(widthSum / validNum);
                    this.outWidth = Math.min(avgWidth, 1200);
                }
                
                // #ifdef MP-WEIXIN || MP-TOUTIAO
                // 初始化画布
                await new Promise((resolve) => {
                    const query = uni.createSelectorQuery().in(this);
                    query.select('#' + this.canvasId).fields({ node: true, size: true })
                    .exec((res) => {
                        let canvasNode = res[0];
                        canvas = canvasNode.node;
                        this.isCanvas2D = Boolean(canvas && canvas.getContext);
                        if(this.isCanvas2D){
                            ctx = canvas.getContext('2d');
                            canvas.width = this.outWidth; // 过大的宽度会导致无响应
                        }
                        else{
                            console.warn('long-img canvas 2d elt not found, use normal canvas', canvasNode, canvas);
                        }
                        resolve();
                    });
                })
                if(this.isCanvas2D && !canvas){
                    throw new Error('merge images to long fail: canvas not init!');
                    return;
                }
                // #endif
                console.log('init long img canvas, width:' + this.width + ', outWidth:'+this.outWidth+', isCanvas2D: '+this.isCanvas2D);
                let [horz, vert] = this.markPos.split('-');
                if(horz == 'right'){
                    // 这里设置textAlign的话后面会被重置
                    this.horzAlign = 'right';
                    this.textPos.x = this.outWidth - markMargin;
                }
                if(vert == 'bottom'){
                    this.textPos.y = 0 - markMargin;
                }
            },
            rpx2px(v) {
                return this.pageWidth * v / 750
            },
            innerJoin: async function({items, path_key='path', width_key='width', height_key='height'}){
                // 遍历图片计算合并后的输出高度
                let totalHeight = 0;
                let batch = [];
                for(let item of items){
                    let imgPath = item[path_key];
                    if(!imgPath)continue;
                    let aspect = item[height_key] / item[width_key];
                    // 计算图片像素高度
                    item.imgHeight = Math.round(this.outWidth * aspect);
                    let overHeight = this.maxHeight > 0 && totalHeight + item.imgHeight > this.maxHeight;
                    if(batch.length > 0 && (batch.length == this.maxNum || overHeight)){
                        await this.asyncDrawItems(batch, path_key, totalHeight);
                        batch = [];
                        totalHeight = 0;
                    }
                    batch.push(item);
                    totalHeight += item.imgHeight;
                }
                if(batch.length > 0){
                    await this.asyncDrawItems(batch, path_key, totalHeight);
                }
            },
            join: async function(args){
                if(!this.isCanvas2D){
                    ctx = uni.createCanvasContext(this.canvasId, this);
                }
                this.result = [];
                await this.initContext(args);
                await this.innerJoin(args);
                return this.result;
            },
            /**
             * 拼接给定的items中的所有图片
             * @param {Array} items: 列表
             * @param {String} path_key: 图片路径的键
             */
            async asyncDrawItems(items, path_key, totalHeight){
                if(items.length == 0)return;
                if(items.length == 1){
                    this.result.push(items[0][path_key]);
                    return;
                }
                // 记录当前批次图片合并后的实际生成高度
                this.outHeight = totalHeight;
                if(this.isCanvas2D){
                    canvas.height = this.outHeight;
                }
                let mRes = await new Promise((resolve, reject) => {
                    this.drawItem({items, path_key, i: 0, offsetY: 0, callback: resolve});
                });
                if(!mRes.tempFilePath){
                    console.error('long img merge err', mRes);
                    return;
                }
                // #ifdef MP-BAIDU
                // 百度小程序页面第一次canvas转图片会变成正方形
                let trueAspect = this.outHeight / this.outWidth;
                let [error, imgInfo] = await uni.getImageInfo({src: mRes.tempFilePath});
                let curAspect = imgInfo.height / imgInfo.width;
                if(trueAspect - curAspect > 0.2){
                    console.log('multi img to long, aspect err, require: ' + trueAspect + ', cur: '+ curAspect + ', retrying...');
                    return this.asyncDrawItems(items, path_key, totalHeight);
                }
                // #endif
                this.result.push(mRes.tempFilePath);
            },
            /**
             * items: 列表
             * i: 索引
             * path_key: 
             * offsetY: 偏移
             * callback: 最终回调函数
             * @param {Object} args
             */
            drawItem(args){
                console.debug('start draw item[' + args.i + ']to long, offsetY: ' + args.offsetY);
                if(args.i >= args.items.length){
                    // 绘制水印
                    if(this.markText){
                        let posY = this.textPos.y;
                        if(posY < 0){
                            posY = posY + this.outHeight;
                        }
                        // 设置字体相关属性
                        let markSize = this.markSize;
                        if(this.isCanvas2D){
                            ctx.font = markSize + 'px/'+markSize+'px arial,"Microsoft YaHei"'
                            ctx.textBaseline = 'alphabetic';
                            ctx.lineWidth = 1;
                            ctx.shadowBlur = 10;
                            ctx.shadowColor = this.markColor;
                            ctx.fillStyle = '#fff';
                            ctx.textAlign = this.horzAlign;
                        }
                        else{
                            ctx.setFontSize(markSize);
                            ctx.setTextBaseline('alphabetic');
                            ctx.setLineWidth(1);
                            ctx.setShadow(0, 0, 10, this.markColor);
                            ctx.setFillStyle('#fff');
                            ctx.setTextAlign(this.horzAlign);
                        }
                        ctx.fillText(this.markText, this.textPos.x, posY);
                    }
                    let outArgs = {x: 0, y: 0, width: this.outWidth, height: this.outHeight, 
                                   destWidth: this.outWidth, destHeight: this.outHeight, 
                                   fileType: 'jpg', complete: args.callback};
                    if(this.isCanvas2D){
                        uni.canvasToTempFilePath({...outArgs, canvas}, this);
                    }
                    else{
                        ctx.draw(false, () => {
                            uni.canvasToTempFilePath({...outArgs, canvasId: this.canvasId}, this);
                        });
                    }
                    return;
                }
                let item = args.items[args.i];
                let imgPath = item[args.path_key];
                if(imgPath){
                    let curHeight = item.imgHeight;
                    let orgWidth = item[this.width_key];
                    let orgHeight = item[this.height_key];
                    console.debug('draw image[' + args.i + ']to long, offsetY: ' + args.offsetY + ', height: '+curHeight + 
                        ', orgWidth: '+ orgWidth + ', orgHeight: '+ orgHeight+', img:'+imgPath);
                    if(this.isCanvas2D){
                        let imgObj = canvas.createImage();
                        imgObj.onload = () =>{
                            ctx.drawImage(imgObj, 0, args.offsetY, this.outWidth, curHeight);
                            args.offsetY += curHeight;
                            args.i += 1;
                            this.drawItem(args);
                        }
                        imgObj.onerror = args.callback;
                        imgObj.src = imgPath;
                    }
                    else{
                        // https://uniapp.dcloud.io/api/canvas/CanvasContext?id=canvascontextdrawimage
                        // sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
                        // 注意：百度小程序端是先dx, dy再sx, sy，官方说后面会改: https://smartprogram.baidu.com/forum/topic/show/70644
                        // 其他端小程序参数均先sx, sy后dx, dy
                        ctx.drawImage(imgPath, 0, args.offsetY, this.outWidth, curHeight);
                        args.offsetY += curHeight;
                        args.i += 1;
                        this.drawItem(args);
                    }
                }
                else{
                    args.i += 1;
                    this.drawItem(args);
                }
            }
        }
    }
</script>

<style>

</style>
