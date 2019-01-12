
<template>
  <div class="fuwu-solution">
    <Row>
        <Col :xs="24" :sm="24">
            <Button @click="showModel()" type="success" class="f-r">添加解决方案</Button>
        </Col>
    </Row>
    <Table :columns="list" :data="tablelist" :loading="dataloading" class="mt10"></Table>
    <!-- 添加的弹出 -->
    <Modal v-model="showModalStatus" title="添加解决方案" @on-ok="createSolution('solutionValidate')" :loading="loading">
        <Form :model="solution" ref="solutionValidate" :rules="solutionValidate" action="javascript:void(0)">
            <FormItem label="解决方案名称" prop="title">
                <Input v-model="solution.title" placeholder="输入解决方案名称..."></Input>
            </FormItem>
            <FormItem label="答案">
                <RadioGroup v-model="solution.answer_id">
                    <Radio label='1'>满意</Radio>
                    <Radio label='2'>不满意</Radio>
                </RadioGroup>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'fuwu-solution',
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
                    width:150,
                    key: 'answer',
                },
                {
                    title: '解决方案',
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
            tablelist: [],
            solution:{
                id:0,
                problem_id:1,
                title:'',
                answer_id:'1',
            },
            showModalStatus:false,
            solutionValidate: {
                title: [
                    { required: true, message: '解决方案名称必须填写', trigger: 'blur' }
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
          this.$api.problem.solutionlist({problem_id:1}).then(res=>{
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
            this.solution = {id:0,problem_id:1,title:'',answer_id:'1'};
        },
        // 添加
        createSolution(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.solution.id != 0) {
                        this.$api.problem.solutionedit(this.solution).then(res=>{
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
                        this.$api.problem.solutioncreate({problem_id:this.solution.problem_id,title:this.solution.title,answer_id:this.solution.answer_id}).then(res=>{
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
            this.$api.problem.solutiondetail({solution_id:id}).then(res=>{
                if(res.code == 200)
                {
                    this.solution = res.data
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
                    this.$api.problem.solutionremove({solution_id:id}).then(res=>{
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
