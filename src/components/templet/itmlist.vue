<template>
  <div id="menuitemlist">
    <swiper :options="swiperOption1">
          <swiper-slide class="swiper-slide" v-for="item in tempdata.menuItemTempletList" style="background:#ccc;">
            <!-- 开始对应模版 -->
            <menu-tmp-a1 v-if="item.templetType == '1'" :tempdata="item"></menu-tmp-a1>
            <menu-tmp-b1 v-if="item.templetType != '1'" :tempdata="item"></menu-tmp-b1>
          </swiper-slide>
    </swiper>

  </div>
</template>


<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MenuTmpA1 from './MenuTmpA1.vue'
import MenuTmpB1 from './MenuTmpB1.vue'
export default {
	name: 'MenuItemList',
    data() {
        return {
            swiperOption1: {
            },
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
    components: {
        swiper,
        swiperSlide,
        MenuTmpA1,
        MenuTmpB1,
    },
    watch:{
    	
    },
    methods: {
        
    }
}
</script>