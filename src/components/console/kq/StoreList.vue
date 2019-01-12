<template>
  <div class="store-list">
    <Row>
        <Col :xs="24" :sm="12">
            <Form :model="formItem" ref="formItem" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <Input v-model="formItem.key" placeholder="输入关键词查找..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="renderTable(0)">查找</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
    <Table :columns="list" ref="storeList" :data="tablelist" :loading="dataloading"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page ref="listPage" :total="pages.total" :current="pages.current" :page-size="pages.size" show-elevator show-total @on-change="changePage()"></Page>
        </div>
    </div>
    <!-- 添加的弹出 -->
    <Modal v-model="showModalStatus" title="修改门店" @on-ok="editStore('storeValidate')" :loading="loading">
        <Form :model="store" ref="storeValidate" :rules="storeValidate" action="javascript:void(0)">
            <FormItem label="门店名称" prop="name">
                <Input v-model="store.name" placeholder="输入名称..."></Input>
            </FormItem>
            <FormItem label="门店地址" prop="address">
                <Input v-model="store.address" placeholder="输入地址..."></Input>
            </FormItem>
            <FormItem label="门店电话" prop="tel">
                <Input v-model="store.tel" placeholder="输入电话..."></Input>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'store-list',
    data () {
        return {
            loading: true,
            dataloading: true,
            store_id:0,
            formItem:{
                'key':'',
            },
            pages:{
                current:1,
                total:0,
                size:10
            },
            list: [
                {
                    title: 'Id',
                    key: 'id',
                    width:80,
                    fixed: 'left'
                },
                {
                    title: '名称',
                    minWidth:100,
                    key: 'name',
                },
                {
                    title: '地址',
                    width:400,
                    key: 'address',
                },
                {
                    title: '电话',
                    width:150,
                    key: 'tel',
                },
                {
                    title: '操作',
                    key: 'action',
                    width:130,
                    align: 'left',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                style:{
                                    marginRight:'8px'
                                },
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.showEdit(params.row.id)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index,params.row.id)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            tablelist: [],
            store:{
                name:'',
                address:'',
                tel:'',
            },
            showModalStatus:false,
            storeValidate: {
                name: [
                    { required: true, message: '名称必须填写', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '地址必须填写', trigger: 'blur' }
                ],
                tel: [
                    { required: true, message: '电话必须填写', trigger: 'blur' }
                ],
            },
        }
    },
    created: function () {
        // 取数据
        this.getTableList();
    },
    methods:{
        getTableList:function(){
            var params = {page:this.pages.current,size:this.pages.size};
            this.$api.store.list(params).then(res=>{
                this.dataloading = false;
                if(res.code == 200)
                {
                    this.tablelist = res.data.list;
                    this.pages.total = res.data.total
                    this.$Message.success(res.msg);
                }
            });
            return;
        },
        changePage(){
            this.pages.current = this.$refs['listPage'].currentPage;
            this.renderTable(1);
        },
        // 展开添加
        showEdit(value){
            this.store_id = value;
            this.showModalStatus = !this.showModalStatus;
            this.$api.store.detail({store_id:this.store_id}).then(res=>{
                if(res.code == 200)
                {
                    this.store = res.data;
                }
            });
        },
        // 添加
        editStore(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var params = this.store;
                    params.id = this.store_id;
                    this.$api.store.edit(params).then(res=>{
                        if(res.code == 200)
                        {
                            this.showModalStatus = !this.showModalStatus;
                            this.getTableList();
                        }
                    });
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                } else {
                    this.$Message.error('请检查输入的信息是否正确！');
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                }
            })
        },
        // 删除
        remove:function(index,id){
            // 弹出确认框
            this.$Modal.confirm({
                title: '警告',
                content: '<p>此操作不可恢复，三思而后行...</p>',
                onOk: () => {
                    this.$api.store.remove({store_id:id}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.tablelist.splice(index, 1);
                        }
                    });
                }
            });
        },
        // 筛选
        renderTable:function(isChange) {
            this.dataloading = true;
            var cpage = isChange ? this.pages.current : 1;
            var ps = {'key':this.formItem.key,page:cpage,size:this.pages.size};
            this.$api.store.list(ps).then(res=>{
                this.dataloading = false;
                if(res.code == 200)
                {
                    this.tablelist = res.data.list;
                    this.pages.total = res.data.total
                    if(!isChange){ this.pages.current = 1;}
                    this.$Message.success(res.msg);
                }
            });
          return;
        },
    },
}
</script>
