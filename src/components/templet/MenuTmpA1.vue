<template>
  <div id="menutmpa1" class="pr">
    <img :data-src="imgPath + tempdata.templetImgUrl" class="swiper-lazy menuImg" width="100%" height="auto" alt="">
    <div class="btn-addcart b-a-1"></div>
  </div>
</template>

<style>
    .b-a-1 {
        left:500px; top:100px;
    }
</style>

<script>
export default {
	name: 'MenuTmpA1',
    data() {
        return {
            // 进来的数据
            tempdata: [],
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
    computed:{
      imgPath(){
        return cordova.file.documentsDirectory + "imgresource/";
      }
    },
    mounted() {
        console.log('A1 image:' + this.imgPath + this.tempdata.templetImgUrl)
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>