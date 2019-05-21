<template>
  <div id="createorder" class="header-padding">
    <!-- 头部导航 -->
    <header class="topnav">
        <router-link to="/menus" class="backhome"></router-link>
    </header>
    <!-- 桌台信息 -->
    <div class="tableinfo">餐台：局2</div>
    <!-- 主内容 -->
    <div class="order-container pr">
		<div class="o-c-top">
			<span class="sort">序号</span>
			<span class="dish">菜品</span>
			<span class="num">数量</span>
			<span class="price">单价</span>
			<span class="total">金额</span>
			<span class="remark">备注</span>
			<span class="status">状态</span>
            <span class="btn-groups">移除</span>
		</div>
    	<div class="o-c-dishlist clearfix" v-for="(item, index) in carts">
            <span class="sort">{{ index }}</span>
		  	<span class="dish clearfix">
				<img src="img/no_pic@2x.png" class="dishimg" alt="">
		  		{{ item.name }}
		  	</span>
			<span class="num">
                <InputNumber :max="10" :min="1" v-model="item.nums"></InputNumber>
            </span>
			<span class="price">¥{{ item.price }}</span>
			<span class="total">¥{{ item.price * item.nums }}</span>
			<span class="remark" @click="showMark()">新增</span>
			<span class="status">未下单</span>
            <span class="btn-groups">
                <Button type="default" size="small" icon="ios-trash-outline"></Button>
            </span>
		</div>
		<!-- 餐具 -->
		<div class="o-c-canju clearfix">
		 	<span class="sort">餐具：</span>
			<span class="num">
                <InputNumber :max="10" :min="1" v-model="canju.nums"></InputNumber>
            </span>
			<span class="price">¥{{ canju.price }}</span>
			<span class="total">¥{{ canju.price * canju.nums }}</span>
			<span class="status">
                未下单
            </span>
		</div>
		<!-- 整单备注 -->
		<div class="o-c-remark clearfix">
		 	<span class="titles">整单备注：</span>
			<span class="remark" @click="showMark()">新增</span>
			<span class="status">未下单</span>
		</div>
		<!-- 推荐菜品 -->
		<div class="o-c-tj clearfix">
		 	<span class="titles">推荐菜品</span>
		</div>
		<div class="o-c-dishlist clearfix" v-for="(item, index) in tuijian">
            <span class="sort">{{ index }}</span>
		  	<span class="dish clearfix">
				<img src="img/no_pic@2x.png" class="dishimg" alt="">
		  		{{ item.name }}
		  	</span>
			<span class="num">
                <InputNumber :max="10" :min="1" v-model="item.nums"></InputNumber>
            </span>
			<span class="price">¥{{ item.price }}</span>
			<span class="total">¥{{ item.price * item.nums }}</span>
			<span class="remark"></span>
			<span class="status">未下单</span>
            <span class="btn-groups">
                <Button type="primary" size="small" icon="ios-add"></Button>
            </span>
		</div>
		<!-- 底部 -->
		<div class="o-c-footer">
            <div class="total-order" ref="total-order" @click="showTotal()">
                {{ totalprices }}
            </div>
			<router-link to="/menus" class="c-menu">继续点菜</router-link>
			<div class="btn-create">立即下单</div>
		</div>
    </div>
    <!-- 添加的弹出 -->
    <Modal v-model="showMarkStatus" title="备注" @on-ok="addMark()">
        <Form ref="openForm" action="javascript:void(0)">
            <Input placeholder="输入备注信息..."></Input>
        </Form>
        <Tag v-for="item in count" :key="item" :name="item" checked checkable>标签{{ item + 1 }}</Tag>
        <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
    </Modal>
  </div>
</template>


<script>
import $ from 'jquery';
import router from '.././router'
import { LOGOUT,LOGIN } from '.././vuex/mutation_types'
export default {
	name: 'CreateOrder',
    data() {
        return {
            carts:{
            	"893" : {
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 19,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 1,
                    "remark":""
            	},
            	"894" : {
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 19,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 2,
                    "remark":""
            	},
            	"895" : {
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 29,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 1,
                    "remark":""
            	}
            },
            canju:{
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 19,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 8,
                    "remark":""
            	},
            tuijian:[
            	{
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 19,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 1,
                    "remark":""
            	},
				{
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 19,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 2,
                    "remark":""
            	},
            	{
            		"id": 893,
                    "itemId": "00000000001536",
                    "name": "儿童套餐",
                    "code": "103054",
                    "keyWord": "ETTC",
                    "unitName": "套",
                    "itemClassId": "00000000000085",
                    "tempItemFlg": 0,
                    "setMealFlg": 0,
                    "price": 29,
                    "vipPrice": null,
                    "minAddCnt": 0,
                    "barCode": "",
                    "needMakeWay": 0,
                    "status": 1,
                    "isUserRecommend": 0,
                    "isOnSale": true,
                    "isNotify": 0,
                    "nums": 1,
                    "remark":""
            	}
            ],
            showMarkStatus:false,
            count:[1,2,3],
            totalprices:0
        }
    },
    components: {
    },
    computed: {
    },
    mounted() {
    	this.total();
    },
    methods: {
        // 算总价
        total(){
            this.totalprices = 1000;
        },
        showTotal(){
            $('.total-order').css('opacity',1);
            console.log('dd')
            setTimeout(()=>{
                $('.total-order').css('opacity',0);
                console.log('ss')
            },2000);
        },
        showMark() {
            this.showMarkStatus = !this.showMarkStatus;
        },
        // 添加备注
        handleAdd () {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        addMark(){
            console.log('addMark');
        }
    }
}
</script>