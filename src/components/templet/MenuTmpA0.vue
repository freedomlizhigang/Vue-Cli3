<template>
  <div id="menutmpa1">
    <img :data-src="imgPath + tempdata.templetImgUrl" class="swiper-lazy menuImg" width="100%" height="auto" alt="">
  </div>
</template>


<script>
export default {
	name: 'MenuTmpA0',
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
        console.log('A0 image:' + this.imgPath + this.tempdata.templetImgUrl)
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>