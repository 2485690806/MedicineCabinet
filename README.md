## 使用说明
第一张图为有遮罩，第二张图为无遮罩
#### 组件使用方式

导入方式

js:

```
<script  >
	import wkLodging from '@/components/wk-lodging/wk-lodging.vue'
	export default {
		components: { 
			wkLodging
		},
		data() {
			return {
				lodging_box_display:false,
				//mask_open:false, // 默认为显示背景遮罩  可以手动关闭
			}
		}
	}
</script>
```

 

html导入组件:

```
<Waitting-Block ref="waittingblock"></Waitting-Block>
```

#### 组件开启和关闭函数
开启:

```
<!-- 蓝牙连接动态 lodging    :mask_open="mask_open"  增加即可关闭背景遮罩   -->  
	<wk-lodging  title="蓝牙连接中.."   :lodging_box_display="lodging_box_display" />
```

关闭:

```
this.lodging_box_display = false
```
 