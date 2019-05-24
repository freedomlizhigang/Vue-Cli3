<template>
  <div id="menutmpb1">
    <img :data-src="imgPath + tempdata.templetImgUrl" class="swiper-lazy menuImg" width="100%" height="auto" alt="">
    <!-- 输出按钮 -->
    <btn-addcart v-for="(item, index) in dishItems" :dishitem="item" :dishindex="index"></btn-addcart>
  </div>
</template>

<style>
    .b-a-0 {
        left:500px; top:300px;
    }
    .b-a-1 {
        left:500px; top:100px;
    }
    .b-a-2 {
        left:200px; top:100px;
    }
</style>

<script>
import BtnAddcart from './BtnAddcart.vue'
export default {
	name: 'MenuTmpB1',
    data() {
        return {
            // 进来的数据
            tempdata: [],
            // 循环的
            dishItems:[],
        }
    },
    props: {
        tempdata:{
            type: Object,
            default: function () {
                return [];
            }
        }
    },
    components:{
        BtnAddcart,
    },
    computed:{
      imgPath(){
        return cordova.file.documentsDirectory + "imgresource/";
      }
    },
    mounted() {
        // console.log('B1 image:' + this.imgPath + this.tempdata.templetImgUrl)
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>