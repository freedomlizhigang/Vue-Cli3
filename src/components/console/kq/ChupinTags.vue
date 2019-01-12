
<template>
  <div class="chupin-tags">
    <Row>
        <Col :xs="24" :sm="24">
            <Button @click="showModel()" type="success" class="f-r">添加标签</Button>
        </Col>
    </Row>
    <Table :columns="list" :data="tablelist" :loading="dataloading" class="mt10"></Table>
    <!-- 添加的弹出 -->
    <Modal v-model="showModalStatus" title="添加标签" @on-ok="createTag('tagValidate')" :loading="loading">
        <Form :model="tag" ref="tagValidate" :rules="tagValidate" action="javascript:void(0)">
            <FormItem label="标签名称" prop="title">
                <Input v-model="tag.title" placeholder="输入标签名称..."></Input>
            </FormItem>
            <FormItem label="答案">
                <RadioGroup v-model="tag.answer_id">
                    <Radio label='5'>满意</Radio>
                    <Radio label='6'>不满意</Radio>
                </RadioGroup>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'chupin-tags',
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
                    title: '标签',
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
            tag:{
                id:0,
                problem_id:3,
                title:'',
                answer_id:'5',
            },
            showModalStatus:false,
            tagValidate: {
                title: [
                    { required: true, message: '标签名称必须填写', trigger: 'blur' }
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
          this.$api.problem.taglist({problem_id:3}).then(res=>{
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
            this.tag = {id:0,problem_id:3,title:'',answer_id:'5'};
        },
        // 添加
        createTag(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if (this.tag.id != 0) {
                        this.$api.problem.tagedit(this.tag).then(res=>{
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
                        this.$api.problem.tagcreate({problem_id:this.tag.problem_id,title:this.tag.title,answer_id:this.tag.answer_id}).then(res=>{
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
            this.$api.problem.tagdetail({tag_id:id}).then(res=>{
                if(res.code == 200)
                {
                    this.tag = res.data
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
                    this.$api.problem.tagremove({tag_id:id}).then(res=>{
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
