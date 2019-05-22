<template>
  <div id="search" class="header-padding">
    <!-- 头部导航 -->
    <header class="topnav pr">
    	<input type="text" value="搜索菜品" class="searchdish searchdish-search">
        <div class="cancel" @click="cancel()">取消</div>
    </header>
    <div class="hotsearch">
    	<h3 class="clearfix"><img src="img/icon_hot@2x.png" class="iconhot" alt="">热门搜索</h3>
    	<div class="hotsearch-list clearfix">
    		<span class="hs-l-item">局气豆腐</span>
    		<span class="hs-l-item">局气豆腐</span>
    		<span class="hs-l-item">局气豆腐</span>
    		<span class="hs-l-item">局气豆腐</span>
    		<span class="hs-l-item">局气豆腐</span>
    	</div>
    </div>
    <!-- search-result -->
    <div class="search-result clearfix">
    	<div class="s-r-item">
    		<div class="s-r-item-footer clearfix ps">
    			<span class="s-r-item-name">局气烤鸭</span>
    			<span class="s-r-item-price">¥120.00</span>
    		</div>
    	</div>
    	<div class="s-r-item" @click="toMenu(2,3)">
    		<img src="img/no_pic@2x.png" class="s-r-item-img" alt="">
    		<div class="s-r-item-footer clearfix ps">
    			<span class="s-r-item-name">局气烤鸭</span>
    			<span class="s-r-item-price">¥120.00</span>
    		</div>
    	</div>
    	<div class="s-r-item">
    		<div class="s-r-item-footer clearfix ps">
    			<span class="s-r-item-name">局气烤鸭</span>
    			<span class="s-r-item-price">¥120.00</span>
    		</div>
    	</div>
    	<div class="s-r-item">
    		<div class="s-r-item-footer clearfix ps">
    			<span class="s-r-item-name">局气烤鸭</span>
    			<span class="s-r-item-price">¥120.00</span>
    		</div>
    	</div>
    </div>
  </div>
</template>


<script>
import router from '.././router'
export default {
	name: 'Search',
    data() {
        return {
            
        }
    },
    components: {
    },
    computed: {
    },
    mounted() {
    	
    },
    methods: {
        toMenu:function(findex,sindex){
        	router.push('/menus/' + findex + '/' + sindex);
        },
        cancel(){
            router.go(-1);
        }
    }
}
</script>