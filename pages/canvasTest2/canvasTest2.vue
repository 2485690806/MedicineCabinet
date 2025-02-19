<template>
    <view>
        <long-image ref="longImg" markText="来自: 微信小程序" style="position: absolute;top: -3000rpx;left: -3000rpx;" 
            :maxNum="9" :width="450" markPos="right-bottom"></long-image>

        <button @click="exportLongImg">生成长图</button>
        <view class="img-list" v-for="(item,index) in show_imgs" :key="index">
            <image mode="aspectFill" :src="item.path" :style="{height: (item.ratio * 750) + 'rpx'}"></image>
            <view>-------- next ----------</view>
        </view>

    </view>
</template>

<script>
    import longImage from "@/components/long-image/long-image.vue";
    export default {
        components:{
            longImage,
        },
        data() {
            return {
                show_imgs: []
            } 
        },
        methods: {
            exportLongImg: async function(){
                this.show_imgs.splice(0, this.show_imgs.length);
                var [err, res] = await uni.chooseMedia({mediaType: ['image'], sourceType: ['album']});
                if(err && err.errMsg){
                    console.error('error:', err);
                    if(err.errMsg.indexOf('cancel') >= 0)return;
                    uni.showToast({
                        title: '错误，检测控制台',
                        icon:"error"
                    });
                    return;
                }
                if(!res || !res.tempFiles)return;
                console.log('select imgs:', res, err);
                for(let item of res.tempFiles){
                    item.path = item.tempFilePath;
                }
                if(!res.tempFiles.length)return;
                await uni.showLoading({title:'正在拼接'});
                let merge_list = await this.$refs.longImg.join({
                    items: res.tempFiles, 
                    path_key: 'path'
                });
                console.log('result', merge_list);
                if(!merge_list || merge_list.length == 0){
                    uni.showToast({
                        title:'拼接错误',
                        icon:'none'
                    });
                    await uni.hideLoading();
                    return;
                }
                // 逐个保存长图
                for(let path of merge_list){
                    let [error, imgInfo] = await uni.getImageInfo({src: path});
                    let curAspect = imgInfo.height / imgInfo.width;
                    this.show_imgs.push({path, ratio: curAspect});
                }
                await uni.hideLoading();
            }
        }
    }
</script>

<style>
.img-list{
    width: 100%;
    background: red;
    padding-bottom: 10rpx;
}
.img-list image{
    width: 750rpx;
    left: 0;
}
</style>