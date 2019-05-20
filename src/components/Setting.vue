<template>
  <div id="setting" class="header-padding">
    <!-- 头部导航 -->
    <header class="topnav">
        <router-link to="/" class="backhome"></router-link>
    </header>
    <!-- 背景色 -->
    <section class="set-container">
        <div class="s-c-content">
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">资源更新：</span>
                <a href="#" class="btn-m">更新资源包</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">设备号：</span>
                <span class="s-c-deviceid">654anaj687-445554523-544584-54656</span>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">设备授权：</span>
                <span class="s-c-auth">此pad已授权</span>
                <a href="#" class="btn-m">申请授权</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">门店地址:</span>
                <input type="text" value="http://124.207.20566:0011" class="s-c-input clienturl">
                <a href="#" class="btn-m">修改</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">总部地址：</span>
                <input type="text" value="http://124.207.20566:0011" class="s-c-input serverurl">
                <a href="#" class="btn-m">修改</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">授权码：</span>
                <input type="text" value="1521" class="s-c-input sqcode">
                <a href="#" class="btn-m">修改</a>
            </div>
        </div>
        <div class="softcode">版本号：2.0.0</div>
    </section>
  </div>
</template>


<script>
import router from '.././router'
import { LOGOUT,LOGIN } from '.././vuex/mutation_types'
export default {
    name: 'Setting',
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
    }
}
</script>