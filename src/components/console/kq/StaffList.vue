<template>
  <div class="staff-list">
    <Row>
        <Col :xs="24" :sm="12">
            <Form :model="formItem" ref="formItem" :inline="true" action="javascript:void(0)">
                <FormItem>
                    <Select v-model="formItem.department_id" :style="{'width':'180px'}">
                        <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Input v-model="formItem.key" placeholder="输入关键词查找..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="renderTable(0)">查找</Button>
                </FormItem>
            </Form>
        </Col>
        <Col :xs="24" :sm="12">
            <Button @click="showCreate()" type="success" class="f-r">添加人员</Button>
        </Col>
    </Row>
    <Table :columns="list" ref="staffList" :data="tablelist" :loading="dataloading"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page ref="listPage" :total="pages.total" :current="pages.current" :page-size="pages.size" show-elevator show-total @on-change="changePage()"></Page>
        </div>
    </div>
    <!-- 添加的弹出 -->
    <Modal v-model="showCreateStatus" title="添加管理员" @on-ok="createAdmin('staffCreateValidate')" :loading="loading">
        <Form :model="staffInfo" ref="staffCreateValidate" :rules="staffCreateValidate" action="javascript:void(0)">
            <FormItem label="部门" prop="department_id">
                <Select v-model="staffInfo.department_id">
                    <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="职务">
                <CheckboxGroup v-model="staffInfo.position_ids" @on-change="positionCheck">
                    <Checkbox v-for="item in positionList" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="姓名" prop="fullname">
                <Input v-model="staffInfo.fullname" placeholder="输入姓名..."></Input>
            </FormItem>
            <FormItem label="手机号" prop="phone">
                <Input v-model="staffInfo.phone" placeholder="输入手机号..."></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="staffInfo.password" type="password" placeholder="输入密码..."></Input>
            </FormItem>
            <FormItem label="确认密码">
                <Input v-model="staffInfo.password_confirmation" type="password" placeholder="确认密码..."></Input>
            </FormItem>
        </Form>
    </Modal>
    <!-- 修改资料 -->
    <Modal v-model="showEditInfoStatus" title="修改资料" @on-ok="updateStaff('staffEditValidate')" :loading="loading">
        <Form :model="staffInfo" ref="staffEditValidate" :rules="staffEditValidate" action="javascript:void(0)">
            <FormItem label="部门" prop="department_id">
                <Select v-model="staffInfo.department_id">
                    <Option v-for="item in departmentList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </FormItem>
            <FormItem label="职务">
                <CheckboxGroup v-model="staffInfo.position_ids" @on-change="positionCheck">
                    <Checkbox v-for="item in positionList" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="姓名" prop="fullname">
                <Input v-model="staffInfo.fullname" placeholder="输入姓名..."></Input>
            </FormItem>
            <FormItem label="手机号">
                <Input v-model="staffInfo.phone" placeholder="输入手机号..."></Input>
            </FormItem>
        </Form>
    </Modal>
    <!-- 修改密码 -->
    <Modal v-model="showEditPwdStatus" title="修改密码" @on-ok="updatePassword('staffPasswordValidate')" :loading="loading">
        <Form :model="staffPwd" ref="staffPasswordValidate" :rules="staffPasswordValidate" action="javascript:void(0)">
            <FormItem label="密码" prop="password">
                <Input v-model="staffPwd.password" type="password" placeholder="输入密码..."></Input>
            </FormItem>
            <FormItem label="确认密码">
                <Input v-model="staffPwd.password_confirmation" type="password" placeholder="确认密码..."></Input>
            </FormItem>
        </Form>
    </Modal>
    <!-- 更新绑定门店 -->
    <Modal v-model="showStoreStatus" title="更新绑定门店" @on-ok="updateStore()" :loading="loading">
        <Form ref="updateStoreForm" action="javascript:void(0)">
            <FormItem>
                <CheckboxGroup v-model="store_ids" @on-change="storeCheck">
                    <Checkbox v-for="item in storeList" :key="item.id" :label="item.id">{{ item.name }}</Checkbox>
                </CheckboxGroup>
            </FormItem>
        </Form>
    </Modal>
  </div>
</template>

<script>
export default {
    name: 'staff-list',
    data () {
        return {
            loading: true,
            dataloading: true,
            staff_id:0,
            formItem:{
                'key':'',
                'department_id':0,
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
                    title: '部门',
                    width:100,
                    key: 'department_name'
                },
                {
                    title: '姓名',
                    width:100,
                    key: 'fullname'
                },
                {
                    title: '电话',
                    minWidth:120,
                    key: 'phone'
                },
                {
                    title: '状态',
                    key: 'status',
                    width:100,
                    render: (h, params) => {
                      return h('div', [
                          h('i-switch', {
                              props: {
                                value: params.row.status  //控制开关的打开或关闭状态，官网文档属性是value
                              },
                              on: {
                                'on-change': (value) => {
                                    this.changeStatus(params.row.id,value)
                                }
                              }
                          }, '开关')
                      ]);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width:220,
                    align: 'left',
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
                                        this.showStore(params.row.id)
                                    }
                                }
                            }, '门店'),
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
                                        this.showEditInfo(params.row.id)
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                style:{
                                    marginRight:'8px'
                                },
                                props: {
                                    type: 'warning',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.showEditPwd(params.row.id)
                                    }
                                }
                            }, '改密'),
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
            storeList:[],
            positionList:[],
            departmentList:[],
            staffInfo:{
                department_id:0,
                position_ids:[],
                fullname:'',
                phone:'',
                password:'',
                password_confirmation:'',
            },
            staffPwd:{
                password:'',
                password_confirmation:'',
            },
            showCreateStatus:false,
            showEditInfoStatus:false,
            showEditPwdStatus:false,
            showStoreStatus:false,
            staffCreateValidate: {
                department_id: [
                    { required: true, message: '部门必须选择', trigger: 'change', type:'number'},
                ],
                fullname: [
                    { required: true, message: '用户名必须填写', trigger: 'blur' },
                    { type: 'string', min: 2, max:15, message: '用户名 2 - 15 位长度', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号必须填写', trigger: 'blur', type:'string'},
                    { type: 'string', min: 11, max:11, message: '手机号长度11位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码必须填写', trigger: 'blur' },
                    { type: 'string', min: 6, max:15, message: '密码 6 - 15 位长度', trigger: 'blur' }
                ],
            },
            staffEditValidate: {
                department_id: [
                    { required: true, message: '部门必须选择', trigger: 'change', type:'number'},
                ],
                fullname: [
                    { required: true, message: '用户名必须填写', trigger: 'blur' },
                    { type: 'string', min: 2, max:15, message: '用户名 2 - 15 位长度', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号必须填写', trigger: 'blur', type:'string'},
                    { type: 'string', min: 11, max:11, message: '手机号长度11位', trigger: 'blur' }
                ],
            },
            staffPasswordValidate: {
                password: [
                    { required: true, message: '密码必须填写', trigger: 'blur' },
                    { type: 'string', min: 6, max:15, message: '密码 6 - 15 位长度', trigger: 'blur' }
                ]
            },
            position_ids:[],
            store_ids:[],
        }
    },
    created: function () {
        // 取数据
        this.getTableList();
        this.getSectionRole();
    },
    methods:{
        getTableList:function(){
            var params = {page:this.pages.current,size:this.pages.size};
            this.$api.staff.list(params).then(res=>{
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
        // 获取部门及角色列表
        getSectionRole(){
            this.$api.store.list({size:100000}).then(res=>{
                if(res.code == 200)
                {
                    this.storeList = res.data.list;
                }
            });
            this.$api.position.list({size:100000}).then(res=>{
                if(res.code == 200)
                {
                    this.positionList = res.data.list;
                }
            });
            this.$api.department.list({size:100000}).then(res=>{
                if(res.code == 200)
                {
                    this.departmentList = res.data.list;
                }
            });
        },
        // 展开添加
        showCreate(){
            this.showCreateStatus = !this.showCreateStatus;
            this.staff_id = 0;
            this.staffInfo = {
                department_id:0,
                position_ids:[],
                fullname:'',
                phone:'',
                password:'',
                password_confirmation:'',
            };
        },
        // 选中角色时
        positionCheck(data){
            this.position_ids = data;
        },
        // 添加
        createAdmin(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.staff.create({department_id:this.staffInfo.department_id,position_ids:this.position_ids,fullname:this.staffInfo.fullname,phone:this.staffInfo.phone,password:this.staffInfo.password,password_confirmation:this.staffInfo.password_confirmation}).then(res=>{
                        if(res.code == 200)
                        {
                            this.staffInfo.fullname = '';
                            this.staffInfo.department_id = 0;
                            this.getTableList();
                        }
                        this.loading = false;
                        this.$nextTick(() => {this.loading = true;});
                        this.showCreateStatus = !this.showCreateStatus;
                    });
                } else {
                    this.$Message.error('请检查输入的信息是否正确！');
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                }
            })
        },
        // 展开修改
        showEditInfo(value){
            this.staff_id = value;
            this.showEditInfoStatus = !this.showEditInfoStatus;
            // 取信息
            this.$api.staff.detail({staff_id:value}).then(res=>{
                if(res.code == 200)
                {
                    this.staffInfo = res.data;
                    this.$Message.success(res.msg);
                }
                this.loading = false;
                this.$nextTick(() => {this.loading = true;});
            });
        },
        // 展开修改密码
        showEditPwd(value){
            this.staff_id = value;
            this.showEditPwdStatus = !this.showEditPwdStatus;
            this.staffPwd = {password:'',password_confirmation:''};
        },
        // 修改名称
        updateStaff:function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.staff.editinfo({staff_id:this.staff_id,department_id:this.staffInfo.department_id,position_ids:this.position_ids,fullname:this.staffInfo.fullname,phone:this.staffInfo.phone}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.showEditInfoStatus = !this.showEditInfoStatus;
                        }
                        this.loading = false;
                        this.$nextTick(() => {this.loading = true;});
                    });
                } else {
                    this.$Message.error('请检查输入的信息是否正确！');
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                }
            })
        },
        // 修改密码
        updatePassword:function(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$api.staff.editpassword({staff_id:this.staff_id,password:this.staffPwd.password,password_confirmation:this.staffPwd.password_confirmation}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.showEditPwdStatus = !this.showEditPwdStatus;
                        }
                        this.loading = false;
                        this.$nextTick(() => {this.loading = true;});
                    });
                } else {
                    this.$Message.error('请检查输入的信息是否正确！');
                    this.loading = false
                    this.$nextTick(() => {this.loading = true;});
                }
            })
        },
        // 更新门店
        showStore(value){
            this.staff_id = value;
            this.showStoreStatus = !this.showStoreStatus;
            // 取信息
            this.$api.staff.stores({staff_id:value}).then(res=>{
                if(res.code == 200)
                {
                    this.store_ids = res.data;
                    this.$Message.success(res.msg);
                }
                this.loading = false;
                this.$nextTick(() => {this.loading = true;});
            });
        },
        // 选中门店
        storeCheck(data){
            this.store_id = data;
        },
        // 提交门店更新
        updateStore:function(name){
            this.$api.staff.updatestore({staff_id:this.staff_id,store_ids:this.store_ids}).then(res=>{
                if(res.code == 200)
                {
                    this.$Message.success(res.msg);
                    this.showStoreStatus = !this.showStoreStatus;
                }
                this.loading = false;
                this.$nextTick(() => {this.loading = true;});
            });
        },
        // 删除
        remove:function(index,id){
            // 弹出确认框
            this.$Modal.confirm({
                title: '警告',
                content: '<p>此操作不可恢复，三思而后行...</p>',
                onOk: () => {
                    this.$api.staff.remove({staff_id:id}).then(res=>{
                        if(res.code == 200)
                        {
                            this.$Message.success(res.msg);
                            this.tablelist.splice(index, 1);
                        }
                    });
                }
            });
        },
        // 修改状态
        changeStatus:function(index,value){
            this.$api.staff.status({staff_id:index,status:value}).then(res=>{
                if(res.code == 200)
                {
                    this.$Message.success(res.msg);
                }
            });
        },
        // 筛选
        renderTable:function(isChange) {
            this.dataloading = true;
            var cpage = isChange ? this.pages.current : 1;
            var params = {'q':this.formItem.key,'department_id':this.formItem.department_id,page:cpage,size:this.pages.size};
            this.$api.staff.list(params).then(res=>{
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
