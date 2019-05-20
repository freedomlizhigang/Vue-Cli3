<template>
  <div id="menuitemlist">
    <swiper :options="swiperOption1">
          <swiper-slide class="swiper-slide" v-for="item in templetList.menuItemTempletList" style="background:#ccc;">
            <!-- 开始对应模版 -->
            <menu-tmp-a0 v-if="item.templetType == '1'" :tempdata="item"></menu-tmp-a0>
            <menu-tmp-b1 v-if="item.templetType != '1'" :tempdata="item"></menu-tmp-b1>
          </swiper-slide>
    </swiper>

  </div>
</template>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MenuTmpA0 from './MenuTmpA0.vue'
import MenuTmpB1 from './MenuTmpB1.vue'
export default {
	name: 'MenuItemList',
    data() {
        return {
            swiperOption1: {
                useCapture:false,
                nested:true,
                loadPrevNext: true,
                lazy: {
                    loadPrevNext: true,
                    loadPrevNextAmount: 1,
                },
            },
            // 进来的数据
            templetList: [],
        }
    },
    props: {
        templetList:{
            type: Object,
            default: function () {
                return [];
            }
        }
    },
    mounted() {
    },
    components: {
        swiper,
        swiperSlide,
        MenuTmpA0,
        MenuTmpB1,
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>