<template>
  <div id="menutmpb1">
    <img :data-src="'img/220345b9143f4175a7f3d8abb2c630b9/' + tempdata.templetImgUrl" class="swiper-lazy menuImg" width="100%" height="auto" alt="">
    <div v-for="item in tempdata.dishInfo"></div>
  </div>
</template>


<script>
export default {
	name: 'MenuTmpB1',
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
    mounted() {
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>