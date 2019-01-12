<template>
  <div class="table-list">
    <Row>
        <Col :xs="24" :sm="12">
            <Form :model="formItem" ref="formItem" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <Select v-model="formItem.store_id" :style="{'width':'180px'}">
                        <Option v-for="item in storeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
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
  </div>
</template>

<script>
export default {
  name: 'table-list',
  data () {
    return {
        dataloading: true,
        formItem:{
            store_id:0
        },
        pages:{
            current:1,
            total:0,
            size:10
        },
        columns: [
          {
              title: 'Id',
              key: 'id',
              width:80,
          },
          {
            title: '门店',
            width:220,
            key: 'store',
          },
          {
            title: '桌号',
            width:150,
            key: 'name',
          },
          {
            title: '类型',
            width:150,
            key: 'type',
          },
          {
            title: '人数',
            minWidth:200,
            key: 'chair_num',
          }
        ],
        tablelist: [],
        storeList: [],
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
        this.$api.table.list(params).then(res=>{
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
    // 筛选
    renderTable(isChange){
        var cpage = isChange ? this.pages.current : 1;
        var params = {page:cpage,size:this.pages.size,store_id:this.formItem.store_id};
        this.$api.table.list(params).then(res=>{
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
