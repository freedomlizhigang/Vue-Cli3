<template>
  <div class="position-list">
    <Row>
        <Col :xs="24" :sm="12">
            <Form :model="formItem" ref="formItem" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <Input v-model="formItem.key" placeholder="输入关键词查找..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="renderTable('formItem')">查找</Button>
                </FormItem>
            </Form>
        </Col>
        <Col :xs="24" :sm="12">
            <Button @click="showModel()" type="success" class="f-r">新建职务</Button>
        </Col>
    </Row>
    <Table :columns="list" ref="positionList" :data="tablelist" :loading="dataloading"></Table>
    <!-- 添加的弹出 -->
    <Modal v-model="showModalStatus" title="新建职务" @on-ok="createPosition('positionValidate')" @on-cancel="resetF('positionValidate')" :loading="loading">
        <Form :model="position" ref="positionValidate" :rules="positionValidate" action="javascript:void(0)">
            <FormItem label="昵称" prop="name">
                <Input v-model="position.name" placeholder="输入职务昵称..."></Input>
            </FormItem>
            <FormItem label="是否是负责人">
                <i-switch v-model="position.supervisor">
                    <span slot="on">是</span>
                    <span slot="off">否</span>
                </i-switch>
            </FormItem>
        </Form>
    </Modal>
    <!-- 权限的弹出 -->
    <Modal v-model="showPrivStatus" title="修改权限" @on-ok="updatePriv" :loading="loading">
        <Tree :data="privTree" ref="privSelect" show-checkbox multiple></Tree>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'position-list',
    data () {
        return {
            loading: true,
            dataloading: true,
            position_id:0,
            formItem:{
                'key':'',
            },
            list: [
                {
                    title: 'Id',
                    key: 'id',
                    width:80,
                    fixed: 'left'
                },
                {
                    title: '职务名称',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    value: params.row.name,
                                },
                                on: {
                                    'on-enter': (value) => {
                                        this.editName(params.row.id,value.target.value,params.row.supervisor)
                                    }
                                }
                            }, '排序')
                        ]);
                    }
                },
                {
                    title: '是否是负责人',
                    key: 'supervisor',
                    align:'center',
                    render: (h, params) => {
                        const supervisor = params.row.supervisor == 1 ? true : false;
                        return h('div', [
                            h('i-switch', {
                                props: {
                                    value: supervisor  //控制开关的打开或关闭状态，官网文档属性是value
                                },
                                on: {
                                    'on-change': (value) => {
                                        this.changeStatus(params.row.id,value,params.row.name)
                                    }
                                }
                            }, '开关')
                        ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width:160,
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
                                        this.showPrivModal(params.row.id)
                                    }
                                }
                            }, '权限'),
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
            position:{
                name:'',
                supervisor:false,
            },
            positionEdit:{
                name:'',
                supervisor:false,
            },
            showModalStatus:false,
            showPrivStatus:false,
            positionValidate: {
                name: [
                    { required: true, message: '角色名称必须填写', trigger: 'blur' }
                ]
            },
            privTree:[],
        }
    },
    created: function () {
        // 取数据
        this.getTableList();
    },
    methods:{
        resetF:function(name){
            this.$refs[name].resetFields();
        },
        getTableList:function(){
          this.$api.position.list().then(res=>{
            this.dataloading = false;
            if(res.code == 200)
            {
                this.tablelist = res.data.list;
                this.$Message.success(res.msg);
            }
          });
          return;
        },
        // 展开添加
        showModel(){
            this.resetF('positionValidate');
            this.showModalStatus = !this.showModalStatus;
        },
        showPrivModal(value){
            this.position_id = value;
            this.showPrivStatus = !this.showPrivStatus;
            // 取树形菜单
            this.$api.position.priv({position_id:value}).then(res=>{
                if(res.code == 200)
                {
                    this.privTree = res.data;
                    this.$Message.success(res.msg);
                }
            });
        },
        // 添加
        createPosition(name){
            this.$refs[name].validate((valid) => {
                var sepervisor = this.position.supervisor === true ? 1 : 0;
                if (valid) {
                    this.$api.position.create({name:this.position.name,supervisor:sepervisor}).then(res=>{
                        if(res.code == 200)
                        {
                            this.showModalStatus = !this.showModalStatus;
                            this.position.name = '';
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
        // 修改职务
        editPosition:function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    var supervisor = this.positionEdit.supervisor == true ? 1 : 0;
                    this.$api.position.edit({position_id:this.positionEdit.id,name:this.positionEdit.name,supervisor:supervisor }).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.getTableList();
                        }
                        this.loading = false
                        this.$nextTick(() => {this.loading = true;});
                        this.showEditModalStatus = !this.showEditModalStatus;
                    });
                } else {
                    this.$Message.error('请检查输入的信息是否正确！');
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                }
            });
        },
        // 删除
        remove:function(index,id){
            // 弹出确认框
            this.$Modal.confirm({
                title: '警告',
                content: '<p>此操作不可恢复，三思而后行...</p>',
                onOk: () => {
                    this.$api.position.remove({position_id:id}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.tablelist.splice(index, 1);
                        }
                    });
                }
            });
        },
        // 修改名称
        editName:function(index,value,supervisor){
            this.$api.position.edit({position_id:index,name:value,supervisor:supervisor}).then(res=>{
                if(res.code == 200)
                {
                    this.$Message.success(res.msg);
                }
            });
        },
        // 修改状态
        changeStatus:function(index,value,name){
            const supervisor = value == true ? 1 : 0;
            this.$api.position.edit({position_id:index,supervisor:supervisor,name:name}).then(res=>{
                if(res.code == 200)
                {
                    this.$Message.success(res.msg);
                }
            });
        },
        // 筛选
        renderTable:function(name) {
            this.dataloading = true;
            var ps = {'q':this.formItem.key};
            this.$api.position.list(ps).then(res=>{
                this.dataloading = false;
                if(res.code == 200)
                {
                    this.tablelist = res.data.list;
                    this.$Message.success(res.msg);
                }
            });
          return;
        },
        updatePriv:function(){
            var node = this.$refs['privSelect'].getCheckedAndIndeterminateNodes()
            var menu_id = [];
            node.forEach((item,index) =>{
                menu_id.push(item.menu_id)
            });
            // 提交
            this.$api.position.updatepriv({position_id:this.position_id,menu_id:menu_id}).then(res=>{
                if(res.code == 200)
                {
                    this.showPrivStatus = !this.showPrivStatus;
                    this.position.name = '';
                    this.$Message.success(res.msg);
                }
                this.loading = false
                this.$nextTick(() => {this.loading = true;});
                this.showPrivStatus = !this.showPrivStatus;
            });
        },
        
    },
}
</script>
