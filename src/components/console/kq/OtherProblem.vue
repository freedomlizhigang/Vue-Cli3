
<template>
  <div class="other-problem">
    <Row>
        <Col :xs="24" :sm="24">
            <Button @click="showModel()" type="success" class="f-r">添加问题</Button>
        </Col>
    </Row>
    <Table :columns="list" :data="tablelist" :loading="dataloading" class="mt10"></Table>
    <!-- 添加的弹出 -->
    <Modal v-model="showModalStatus" title="添加问题" @on-ok="createProblem('problemValidate')" :loading="loading">
        <Form :model="problem" ref="problemValidate" :rules="problemValidate" action="javascript:void(0)">
            <FormItem label="问题名称" prop="title">
                <Input v-model="problem.title" placeholder="输入问题名称..."></Input>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'other-problem',
    data () {
        return {
            loading: true,
            dataloading: true,
            list: [
                {
                    title: 'Id',
                    key: 'id',
                    width:80,
                    fixed: 'left'
                },
                {
                    title: '问题',
                    minWidth:300,
                    key: 'title',
                },
                {
                    title: '操作',
                    key: 'action',
                    width:180,
                    align: 'left',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                style:{
                                    marginRight:'8px'
                                },
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.showAnswer(params.row.id)
                                    }
                                }
                            }, '答案'),
                            h('Button', {
                                style:{
                                    marginRight:'8px'
                                },
                                props: {
                                    type: 'primary',
                                    size: 'small'
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
            problem:{
                id:0,
                title:'',
            },
            showModalStatus:false,
            problemValidate: {
                title: [
                    { required: true, message: '问题必须填写', trigger: 'blur' }
                ]
            },
        }
    },
    created: function () {
        // 取数据
        this.getTableList();
    },
    methods:{
        getTableList:function(){
          this.$api.problem.otherlist().then(res=>{
            this.dataloading = false;
            if(res.code == 200)
            {
                this.tablelist = res.data;
                this.$Message.success(res.msg);
            }
          });
          return;
        },
        // 展开添加
        showModel(){
            this.showModalStatus = !this.showModalStatus;
            this.problem = {id:0,title:''};
        },
        // 添加
        createProblem(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.problem.id != 0) {
                        this.$api.problem.otheredit(this.problem).then(res=>{
                            if(res.code == 200)
                            {
                                this.getTableList();
                            }
                            this.loading = false;
                            this.$nextTick(()=>{this.loading = true;});
                            this.showModalStatus = !this.showModalStatus;
                        });
                    }
                    else
                    {
                        this.$api.problem.othercreate({title:this.problem.title}).then(res=>{
                            if(res.code == 200)
                            {
                                this.getTableList();
                            }
                            this.loading = false;
                            this.$nextTick(()=>{this.loading = true;});
                            this.showModalStatus = !this.showModalStatus;
                        });
                    }
                } else {
                    this.$Message.error('请检查输入的信息是否正确！');
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                }
            })
        },
        // 修改
        showEdit(id){
            this.showModalStatus = !this.showModalStatus;
            this.$api.problem.otherdetail({problem_id:id}).then(res=>{
                if(res.code == 200)
                {
                    this.problem = res.data
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
                    this.$api.problem.otherremove({problem_id:id}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.tablelist.splice(index, 1);
                        }
                    });
                }
            });
        },
        // 问题列表
        showAnswer(id){
            this.$router.push('/console/answer/list/' + id);
        },
    },
}
</script>
