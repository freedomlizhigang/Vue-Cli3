
<template>
  <div class="answer-list">
    <Row>
        <Col :xs="24" :sm="24">
            <Button @click="showModel()" type="success" class="f-r">添加答案</Button>
        </Col>
    </Row>
    <Table :columns="list" :data="tablelist" :loading="dataloading" class="mt10"></Table>
    <!-- 添加的弹出 -->
    <Modal v-model="showModalStatus" title="添加答案" @on-ok="createAnswer('answerValidate')" :loading="loading">
        <Form :model="answer" ref="answerValidate" :rules="answerValidate" action="javascript:void(0)">
            <FormItem label="答案名称" prop="title">
                <Input v-model="answer.title" placeholder="输入答案名称..."></Input>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'answer-list',
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
                    title: '答案',
                    minWidth:300,
                    key: 'title',
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
            problem_id:0,
            tablelist: [],
            answer:{
                id:0,
                title:'',
            },
            showModalStatus:false,
            answerValidate: {
                title: [
                    { required: true, message: '答案必须填写', trigger: 'blur' }
                ]
            },
        }
    },
    created: function () {
        this.problem_id = this.$route.params.id;
        // 取数据
        this.getTableList();
    },
    methods:{
        getTableList:function(){
          this.$api.problem.answerlist({problem_id:this.problem_id}).then(res=>{
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
            this.answer = {id:0,title:''};
        },
        // 添加
        createAnswer(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.answer.id != 0) {
                        this.$api.problem.answeredit(this.answer).then(res=>{
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
                        this.$api.problem.answercreate({problem_id:this.problem_id,title:this.answer.title}).then(res=>{
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
            this.$api.problem.answerdetail({answer_id:id}).then(res=>{
                if(res.code == 200)
                {
                    this.answer = res.data
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
                    this.$api.problem.answerremove({answer_id:id}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.tablelist.splice(index, 1);
                        }
                    });
                }
            });
        },
    },
}
</script>
