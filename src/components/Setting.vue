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
                <a href="#" class="btn-m" @click="updateImg()">更新资源包</a>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">设备号：</span>
                <span class="s-c-deviceid">{{ uuid }}</span>
            </div>
            <div class="s-c-item clearfix">
                <span class="s-c-text f-l">设备授权：</span>
                <span class="s-c-auth">{{ authstatus }}</span>
                <a href="#" class="btn-m" @click="getAuth()">申请授权</a>
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
            authcode:'0000',
            res:null,
            entries:null,
        }
    },
    components: {
    },
    computed: {
        // 设备号
        uuid() {
            let uuid = null;
            if (this.$store.getters.uuid == "undefined" || this.$store.getters.uuid == null) {
                // uuid = device.uuid;
                uuid = 'TCSL0001';
                console.log(uuid)
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
            let authstatus =  (this.$store.getters.cropcode == "undefined" || this.$store.getters.cropcode == '0000') ? "未授权" : "此设备已授权";
            return  authstatus;
        },
    },
    mounted() {
    },
    methods: {
        // 修改总店地址
        setServeUrl:function(){
            let data = {'serveurl':this.serveurl};
            this.$store.commit(DEVICE,data)
        },
        // 修改门店地址
        setClientUrl:function(){
            let data = {'clienturl':this.clienturl};
            this.$store.commit(DEVICE,data)
        },
        // 获取授权
        getAuth:function(){
            var params = {"DevID":this.uuid};
            var that = this;
            this.$client.link(params).then(res=>{
                    console.log(res)
                    that.res = res;
                // if (res.code == 200) {
                // }
            });
        },
        // 更新资源包
        updateImg:function(){
            let that = this;
            //获取系统，指定文件夹内容
            let wwwpath = cordova.file.applicationDirectory + "www/img/resource";
            console.info(wwwpath);
            //显示根目录内容
            window.resolveLocalFileSystemURL(wwwpath, function (dirEntry) {
                //显示根目录下的内容
                var dirReader = dirEntry.createReader();
                var entries = [];
                var readEntries = function () {
                    //返回FileEntry数组
                    dirReader.readEntries(function (results) {
                        // 没有更多了跳出
                        if (!results.length) {
                            showEntries(entries.sort());
                        } else {
                            entries = entries.concat(toArray(results));
                            readEntries();
                        }
                    }, (err) => {
                        console.info(err);
                    });
                }
                readEntries();
            });
            function toArray(list) {  
                return Array.prototype.slice.call(list || [], 0);  
            } 
            //显示读取结果，对比并删除与下载
            function showEntries(entries) {
                that.entries = entries;
                let params = {'corpCode':'8888'};
                that.$dish.resource(params).then((res)=>{
                    let resData = res.data;
                    console.log(resData);
                    // 成功
                    if (resData.success) {
                        let newArr = resData.data;
                        let oldArr = [];
                        that.entries.forEach((item) => {
                            if (item.isFile) {
                                oldArr.push(item.name);
                            }
                        });
                        // 开始对比
                        let delArr = oldArr.filter(item=>!newArr.includes(item));
                        let downloadArr = newArr.filter(item=>!oldArr.includes(item));
                        // 开始删除与下载
                    }
                    else
                    {
                        alert('请求失败');
                    }
                });
            }
            
        },
    }
}
</script>