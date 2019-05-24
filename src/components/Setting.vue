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
                <a href="#" class="btn-m" @click="authCode()">修改</a>
            </div>
        </div>
        <div class="softcode">版本号：2.0.0</div>
    </section>
  </div>
</template>


<script>
import router from '.././router'
import { MENUS } from '.././vuex/mutation_types'
export default {
    name: 'Setting',
    data() {
        return {
            clienturl:"http://121.69.101.22:9011",
            serveurl:"http://121.69.101.22:9010",
            authcode:'0000',
            res:null,
            entries:null,
            downloadNums:0,
            endnum:0,
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
                let resData = res.data;
                if (resData.errorCode == 200) {
                    let data = {'corpCode':resData.cCorpCode,'devicecode':resData.DevCode};
                    this.$store.commit(DEVICE,data)
                }
            });
        },
        // 授权码授权
        authCode:function(){
            let that = this;
            const msg = that.$Message.loading({
                            content: '正在登录...',
                            duration: 0
                        });
            // 登录平板
            let params = {
                            "DevID": this.$store.getters.devicecode,     
                            "DevVersion": "1.0.0.1",
                            "DevNote": "平板点餐",
                            "UserCode": this.authcode,
                            "PWD": "0"
                        };
            this.$client.sjdl(params).then(res=>{
                let resData = res.data;
                if (resData.errorCode == 200) {
                    let data = {'usercode':resData.UserCode};
                    that.$store.commit(DEVICE,data)
                    // 取员工信息
                    let params2 = {
                                    "authorizationCode": this.authcode
                                };
                    that.$dish.getauthinfo(params2).then(res=>{
                        let resData = res.data;
                        if (resData.code == 200) {
                            console.log('获取员工信息成功')
                        }
                        else
                        {
                            setTimeout(msg,200);
                            that.$Message.error('获取员工信息失败');
                        }
                    });
                }
                else
                {
                    setTimeout(msg,200);
                    that.$Message.error('平板登录失败');
                }
            });
        },
        // 更新资源包
        updateImg:function(){
            let that = this;
            that.downloadStatus = !that.downloadStatus;
            that.endnum = 0;
            const msg = that.$Message.loading({
                            content: '正在下载图片...',
                            duration: 0
                        });
            // 缓存菜谱
            let params = {'corpCode':'8888'};
            that.$dish.menus(params).then((res)=>{
                let resData = res.data;
                // 成功
                if (resData.success) {
                    let data = {'menus':JSON.stringify(resData.data.menuItemColumnList)};
                    this.$store.commit(MENUS,data)
                }
                else
                {
                    alert('请求菜谱失败');
                }
            });
            //获取系统，指定文件夹内容
            let wwwpath = cordova.file.documentsDirectory + "imgresource";
            var entries = [];
            //显示根目录内容
            window.resolveLocalFileSystemURL(wwwpath, function (dirEntry) {
                console.log(dirEntry)
                //显示根目录下的内容
                var dirReader = dirEntry.createReader();
                var readEntries = function () {
                    //返回FileEntry数组
                    dirReader.readEntries(function (results) {
                        console.log('hav img:' + results)
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
            },(error) => {
                console.log('makedir')
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                    fs.root.getDirectory('imgresource', { create: true }, function (dirEntry) {
                        console.log('目录创建成功！')
                        showEntries(entries);
                    }, (makeerror) => {
                        console.log('makedir error:' + makeerror)
                    });
                }, (loaderror) => {
                    console.log('loaddir error:' + loaderror)
                });

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
                    // 成功
                    if (resData.success) {
                        let newArr = resData.data.dishNames;
                        let url = resData.data.imgUrl;
                        let oldArr = [];
                        that.entries.forEach((item) => {
                            if (item.isFile) {
                                oldArr.push(item.name);
                            }
                        });
                        // 开始对比
                        let delArr = oldArr.filter(item=>!newArr.includes(item));
                        let downloadArr = newArr.filter(item=>!oldArr.includes(item));
                        console.log('delArr:' + delArr.length)
                        console.log('downloadArr:' + downloadArr.length)
                        that.downloadNums = downloadArr.length;
                        if (!that.downloadNums) {
                            setTimeout(msg,200);
                        }
                        // 开始删除与下载
                        delArr.forEach((item) => {
                            let file = wwwpath + '/' + item;
                            that.removefile(file);
                        });
                        downloadArr.forEach((item) => {
                            let file = item;
                            console.log('filename :' + file)
                            that.downfile(file,url,msg);
                        });
                    }
                    else
                    {
                        alert('请求失败');
                    }
                });
            }
            
        },
        // remove file
        removefile:function(file){
            window.resolveLocalFileSystemURL(file, function (fileEntry) {
                fileEntry.remove(function () {
                    console.log('delete success');
                }, function (err) {
                    console.error(err);
                }, function () {
                    console.log('file not exist');
                });
            },(error) => {
                console.log('removefile error:' + error)
            })
        },
        // 下载图片
        downfile:function(file,url,msg){
            let that = this;
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
                //创建文件
                fs.root.getFile('imgresource/' + file, { create: true }, function (fileEntry) {
                    download(fileEntry, url + file);
                }, (error) => {
                    console.log('getFile error:' + error)
                });
            }, (error) => {
                console.log('download error:' + error)
            });
            function download(fileEntry, url) {
                var ft = new FileTransfer();
                var fileURL = fileEntry.toURL();
                //监听下载进度
                ft.onprogress = function (e) {
                    console.info(e);
                    if (e.lengthComputable) {
                        console.log('当前进度：' + e.loaded / e.total);
                    }
                }
                ft.download(url, fileURL, function (entry) {
                    console.log('下载成功');
                    that.endnum = that.endnum + 1;
                    if (that.endnum == that.downloadNums) {
                        setTimeout(msg, 300);
                    }
                }, function (err) {
                    that.endnum = that.endnum + 1;
                    if (that.endnum == that.downloadNums) {
                        setTimeout(msg, 300);
                    }
                    console.log("下载失败！");
                    console.info(err);
                }, null, {});
            }
        }
    }
}
</script>