<template>
    <div id="pay" class="header-padding">
        <!-- 头部导航 -->
        <header class="topnav">
            <router-link to="/" class="backhome"></router-link>
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
                <div class="a-c-l-dishs a-c-l-pay">
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
            </div>
            <!-- 右边部分 -->
            <div class="a-c-right ps">
                
            </div>
        </section>
        <!-- 添加的弹出 -->
        <Modal v-model="showOpenStatus" title="编辑开台" @on-ok="openTable()" :loading="loading">
            <Form ref="openForm" action="javascript:void(0)">
                <FormItem label="用餐人数">
                    <Input placeholder="输入用餐人数..."></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    import router from '.././router'
    import { LOGOUT,LOGIN } from '.././vuex/mutation_types'
    export default {
        name: 'Pay',
        data () {
            return {
                showOpenStatus:false,
            };
        },
        computed: {
        },
        created:function(){
            
        },
        methods:{
            showOpen(){
                this.showOpenStatus = !this.showOpenStatus;
            },
            openTable(value){
                router.push('/member');
            },
        }
  }
</script>