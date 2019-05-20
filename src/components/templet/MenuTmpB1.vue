<template>
  <div id="menutmpb1">
    <img :data-src="'img/220345b9143f4175a7f3d8abb2c630b9/' + tempdata.templetImgUrl" class="swiper-lazy menuImg" width="100%" height="auto" alt="">
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
    mounted() {
        this.dishItems = this.tempdata.dishInfo[0].dishItems
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>