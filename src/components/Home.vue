<template>
    <div id="home" class="header-padding">
        <!-- 头部导航 -->
        <header class="topnav">
            <router-link to="/setting" class="toset"></router-link>
        </header>
        <!-- 主体 -->
        <section class="all-container pr">
            <!-- 左边部分 -->
            <div class="a-c-left ps">
                <!-- 桌号 -->
                <div class="a-c-l-tablenumber">
                    <p class="tablenumber-item">
                        <span class="t-item-left">桌号：</span>局002
                    </p>
                    <p class="tablenumber-item">
                        <span class="t-item-left">开台时间：</span>2019-05018 20:20:20
                    </p>
                </div>
                <!-- 已点菜品 -->
                <div class="a-c-l-dishs">
                    <ul class="a-c-l-dishs-list">
                        <li class="a-c-l-dishs-list-title">
                            <span class="dishs-l-left">品名</span>
                            <span class="dishs-l-num">数量</span>
                            <span class="dishs-l-price">金额</span>
                        </li>
                        <li class="a-c-l-dishs-list-item">
                            <span class="dishs-l-left">花生米</span>
                            <span class="dishs-l-num">1</span>
                            <span class="dishs-l-price">12.00</span>
                        </li>
                        <li class="a-c-l-dishs-list-item">
                            <span class="dishs-l-left">花生米</span>
                            <span class="dishs-l-num">1</span>
                            <span class="dishs-l-price">12.00</span>
                        </li>
                        <li class="a-c-l-dishs-list-item">
                            <span class="dishs-l-left">花生米</span>
                            <span class="dishs-l-num">1</span>
                            <span class="dishs-l-price">12.00</span>
                        </li>
                        <li class="a-c-l-dishs-list-item">
                            <span class="dishs-l-left">花生米</span>
                            <span class="dishs-l-num">1</span>
                            <span class="dishs-l-price">12.00</span>
                        </li>
                        <li class="a-c-l-dishs-list-item">
                            <span class="dishs-l-left">花生米</span>
                            <span class="dishs-l-num">1</span>
                            <span class="dishs-l-price">12.00</span>
                        </li>
                    </ul>
                </div>
                <!-- 操作按钮们 -->
                <div class="a-c-l-btns clearfix">
                    <span class="btn-home btn-home-active btn-home-open" @click="showOpen()">开台并点餐</span>
                    <span class="btn-home btn-home-active btn-home-edit">编辑开台</span>
                    <span class="btn-home btn-home-active btn-home-add">加菜</span>
                    <span class="btn-home btn-home-active btn-home-return">退菜</span>
                    <span class="btn-home btn-home-active btn-home-over">结账</span>
                    <span class="btn-home btn-home-active btn-home-clear">清台</span>
                </div>
            </div>
            <!-- 右边部分 -->
            <div class="a-c-right ps">
                <!-- tabs -->
                <div class="a-c-right-top pr">
                    <div class="a-c-r-t-tab1 ps">
                        <span class="active">全部</span>
                        <span>中厅</span><span>外卖</span>
                    </div>
                    <div class="a-c-r-t-tab2 ps">
                        <span class="active">全部</span>
                        <span>空闲</span><span>就餐</span>
                    </div>
                </div>
                <!-- 所有桌号 -->
                <div class="a-c-right-tables">
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr selected">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr selected">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr selected">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                    <div class="table-item pr active">
                        <span class="icon ps"></span>
                        <p class="table-num">局3</p>
                        <p class="table-info">号桌</p>
                        <p class="table-person">可供4人</p>
                        <span class="icon-select"></span>
                    </div>
                </div>
            </div>
        </section>
        <!-- 添加的弹出 -->
        <Modal v-model="showOpenStatus" title="编辑开台" @on-ok="openTable()" :loading="loading">
            <Form ref="openForm" action="javascript:void(0)">
                <FormItem label="用餐人数">
                    <Input placeholder="输入用餐人数..." :value="device"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import router from '.././router'
    import { DEVICE,REMOVE } from '.././vuex/mutation_types'
    export default {
        name: 'Home',
        data () {
            return {
                loading:false,
                showOpenStatus:false,
                device:null,
            };
        },
        computed: {
        },
        created:function(){
        },
        mounted:function(){
            this.getArea();
        },
        methods:{
            showOpen(){
                this.device = device.uuid;
                this.showOpenStatus = !this.showOpenStatus;
            },
            openTable(value){
                router.push('/member');
            },
            // 查询消费区域
            getArea:function(){
                let that = this;
                that.$client.mo().then((res) => {
                    let resData = res.data;
                    console.log(resData)
                    // if (resData.errorCode == 200) {

                    // }
                });
            }
        }
  }
</script>