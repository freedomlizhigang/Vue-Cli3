<template>
  <div id="menus" class="header-padding">
    <!-- 头部导航 -->
    <header class="topnav pr">
        <router-link to="/member" class="tomember">会员登录享受更多优惠</router-link>
        <span class="nav-titles">菜单</span>
        <input type="text" value="搜索菜品" class="searchdish" @click="toSearch()">
        <router-link to="/createorder" class="createorder"></router-link>
        <router-link to="/" class="nav-backhome"></router-link>
    </header>
    <!-- 循环出图片来 -->
    <swiper :options="swiperOption" ref="mySwiper" v-if="show">
        <swiper-slide v-for="(item, index) in swiperSlides">
          <menu-item-list :templetList="item" :findex="index" :pindex="findex" :toindex="sindex"></menu-item-list>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" ref="pagination"></div>
    </swiper>
    <!-- 购物车 -->
    <div class="cartdish">
        <img src="img/list_unopen.png" class="list-unopen" @click="slideOpen()" alt="">
        <div class="list-open">
            
        </div>
    </div>
  </div>
</template>


<script>
import $ from 'jquery'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MenuItemList from './templet/MenuItemList.vue'
import router from '.././router'
export default {
    name: "Menus",
    data() {
        return {
            show:false,
            swiperSlides:[],
            swiperOption: {
                useCapture:false,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"><img src="img/menu-1.png" class="navimg' + index + '" /></span>';
                    },
                },
            },
            findex:0,
            sindex:0,
        }
    },
    components: {
        swiper,
        swiperSlide,
        MenuItemList,
    },
    created: function(){
        if (this.$route.params.findex != "undefined") {
            this.findex = this.$route.params.findex
        }
        if (this.$route.params.sindex != "undefined") {
            this.sindex = this.$route.params.sindex
        }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      imgPath(){
        return cordova.file.documentsDirectory + "imgresource/";
      }
    },
    mounted() {
        var that = this;
        let params = {'corpCode':'8888'};
        that.$dish.menus(params).then((res)=>{
            let resData = res.data;
            // 成功
            if (resData.success) {
                let newArr = resData.data.menuItemColumnList;
                let url = resData.data.resUrl;
                console.log(newArr);
                // 取到数组开始初始化
                that.swiperSlides = newArr;
                that.swiperOption = {
                  pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        renderBullet: function (index, className) {
                            console.log('iconUrl :' + newArr[index].iconUrl)
                            return '<span class="' + className + '"><img src="' + newArr[index].iconUrl + '" /></span>';
                        },
                  },
                };
                that.show = true;
                if (that.findex != 0) {
                    setTimeout(()=>{
                        that.$refs.mySwiper.swiper.slideTo(that.findex, 1000, true); 
                    },1000);
                }
            }
            else
            {
                alert('请求失败');
            }
        });
    },
    methods: {
        toSearch: function(){
            router.push('/search')
        },
        slideOpen(){
            $(".list-open").slideToggle("fast");
        }
    }
}
</script>