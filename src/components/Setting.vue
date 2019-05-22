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
                <span class="s-c-deviceid">{{ uuid }}</span>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">设备授权：</span>
                <span class="s-c-auth">{{ authstatus }}</span>
                <a href="#" class="btn-m">申请授权</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">门店地址:</span>
                <input type="text" v-model="clienturl" class="s-c-input clienturl">
                <a href="#" class="btn-m" @click="setClientUrl()">修改</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">总部地址：</span>
                <input type="text" v-model="serveurl" class="s-c-input serverurl">
                <a href="#" class="btn-m" @click="setServeUrl()">修改</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">授权码：</span>
                <input type="text" v-model="authcode" class="s-c-input sqcode">
                <a href="#" class="btn-m">修改</a>
            </div>
        </div>
        <div class="softcode">版本号：2.0.0</div>
    </section>
  </div>
</template>


<script>
import router from '.././router'
import { DEVICE,REMOVE } from '.././vuex/mutation_types'
export default {
    name: 'Setting',
    data() {
        return {
            clienturl:"http://121.69.101.22:9011",
            serveurl:"http://121.69.101.22:9010",
            authcode:'0000'
        }
    },
    components: {
    },
    computed: {
        // 设备号
        uuid() {
            let uuid = null;
            if (this.$store.getters.uuid == null) {
                // uuid = device.uuid;
                uuid = 'sssssssssssssssss';
            }
            else
            {
                uuid = this.$store.getters.uuid;
                let data = {'uuid':uuid};
                this.$store.commit(DEVICE,data)
            }
            return  uuid;
        },
        // 授权状态
        authstatus() {
            let authstatus =  this.$store.getters.cropcode == '0000' ? "未授权" : "此设备已授权";
            return  authstatus;
        },
    },
    mounted() {
    },
    methods: {
        setServeUrl:function(){
            let data = {'serveurl':this.serveurl};
            this.$store.commit(DEVICE,data)
        },
        setClientUrl:function(){
            let data = {'clienturl':this.clienturl};
            this.$store.commit(DEVICE,data)
        }
    }
}
</script>