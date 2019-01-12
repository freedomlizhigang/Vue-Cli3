<template>
  <div class="order-list">
    <Row>
        <Col :xs="24" :sm="24">
            <Form :model="formItem" ref="formItem" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <Select v-model="formItem.store_id" :style="{'width':'180px'}">
                        <Option v-for="item in storeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <DatePicker v-model="formItem.datetime" @on-change="changeDate" type="daterange" format="yyyy-MM-dd" style="width: 260px" placeholder="开始时间 - 结束时间"></DatePicker>
                </FormItem>
                <FormItem>
                    <Input v-model="formItem.q" placeholder="输入订单号查找..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="renderTable(0)">筛选</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
    <Table :columns="columns" ref="tableList" :data="tablelist" :loading="dataloading" class="mt10"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page ref="listPage" :total="pages.total" :current="pages.current" :page-size="pages.size" show-elevator show-total @on-change="changePage()"></Page>
        </div>
    </div>
    <!-- 查看详细 -->
    <Modal v-model="showOrderStatus" title="订单详细" :loading="loading">
        <ul class="list-dish">
            <li v-for="i in dishes">
                {{ i.title }} - ￥ {{ i.price }}
            </li>
        </ul>
    </Modal>
  </div>
</template>

<style>
    .list-dish {
        list-style: none; margin: 0; padding: 0;
    }
    .list-dish li {
        line-height: 2.4;
    }
</style>

<script>
export default {
  name: 'order-list',
  data () {
    return {
        dataloading: true,
        loading: true,
        showOrderStatus: false,
        formItem:{
            store_id:0,
            q:'',
            datetime:[],
        },
        pages:{
            current:1,
            total:0,
            size:10
        },
        columns: [
          {
              title: '订单号',
              width:180,
              key: 'order_id',
          },
          {
              title: '类型',
              width:80,
              key: 'type',
          },
          {
            title: '门店',
            width:220,
            key: 'store',
          },
          {
            title: '桌号',
            width:150,
            key: 'table',
          },
          {
            title: '总价',
            width:150,
            key: 'total_price',
          },
          {
            title: '实收',
            width:150,
            key: 'real_price',
          },
          {
            title: '下单时间',
            minWidth:200,
            key: 'created_at',
          },
          {
            title: '操作',
            width:80,
            render: (h, params) => {
                return h('div', [
                    h('Button', {
                        style:{
                            marginRight:'8px'
                        },
                        props: {
                            type: 'success',
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                this.showOrder(params.row.dishes)
                            }
                        }
                    }, '详细'),
                ]);
            }
          }
        ],
        tablelist: [],
        storeList: [],
        dishes:[],
    }
  },
  created: function () {
    // 取数据
    this.getTableList();
    // 管理员信息
    var params = {size:100000};
    this.$api.store.list(params).then(res=>{
        if(res.code == 200)
        {
            this.storeList = res.data.list;
        }
    });
  },
  methods:{
    getTableList:function(){
        var params = {page:this.pages.current,size:this.pages.size};
        this.$api.order.list(params).then(res=>{
            this.dataloading = false;
            if(res.code == 200)
            {
                this.tablelist = res.data.list;
                this.pages.total = res.data.total
                this.$Message.success(res.msg);
            }
        });
    },
    // 翻页
    changePage() {
        this.pages.current = this.$refs['listPage'].currentPage;
        this.renderTable(1);
    },
    // 查看详细
    showOrder(data){
        this.dishes = data;
        this.showOrderStatus = !this.showOrderStatus;
    },
    // 改变时间
    changeDate(daterange){
        this.formItem.datetime = daterange;
    },
    // 筛选
    renderTable(isChange){
        var cpage = isChange ? this.pages.current : 1;
        var starttime = this.formItem.datetime[0] != '' ? this.formItem.datetime[0] : '';
        var endtime = this.formItem.datetime[1] != '' ? this.formItem.datetime[1] : '';
        var params = {page:cpage,size:this.pages.size,store_id:this.formItem.store_id,q:this.formItem.q,starttime:starttime,endtime:endtime};
        console.log(params)
        this.$api.order.list(params).then(res=>{
            this.dataloading = false;
            if(res.code == 200)
            {
                this.tablelist = res.data.list;
                this.pages.total = res.data.total
                if(!isChange){ this.pages.current = 1;}
                this.$Message.success(res.msg);
            }
        });
    },
  },
}
</script>
