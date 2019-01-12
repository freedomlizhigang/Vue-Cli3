import Nofound from '.././components/console/Nofound.vue'
import Login from '.././components/console/Login.vue'
import Logout from '.././components/console/Logout.vue'
import Iframe from '.././components/console/Iframe.vue'
import Main from '.././components/console/main/Main.vue'
import ArticleList from '.././components/console/main/ArticleList.vue'
import ArticleAdd from '.././components/console/main/ArticleAdd.vue'
import CateList from '.././components/console/main/CateList.vue'
import MenuTree from '.././components/console/main/MenuTree.vue'
import SectionList from '.././components/console/main/SectionList.vue'
import RoleList from '.././components/console/main/RoleList.vue'
import AdminList from '.././components/console/main/AdminList.vue'
import AdminEditInfo from '.././components/console/main/AdminEditInfo.vue'
import AdminEditPwd from '.././components/console/main/AdminEditPwd.vue'
import Config from '.././components/console/main/Config.vue'
import TypeList from '.././components/console/main/TypeList.vue'
import LogList from '.././components/console/main/LogList.vue'
// 客情部分
import PositionList from '.././components/console/kq/PositionList.vue'
import DepartmentList from '.././components/console/kq/DepartmentList.vue'
import PermissionTree from '.././components/console/kq/PermissionTree.vue'
import StoreList from '.././components/console/kq/StoreList.vue'
import StaffList from '.././components/console/kq/StaffList.vue'
import TableList from '.././components/console/kq/TableList.vue'
import DishList from '.././components/console/kq/DishList.vue'
import OrderList from '.././components/console/kq/OrderList.vue'
import FuwuTags from '.././components/console/kq/FuwuTags.vue'
import ChupinTags from '.././components/console/kq/ChupinTags.vue'
import HuanjingTags from '.././components/console/kq/HuanjingTags.vue'
import FuwuSolution from '.././components/console/kq/FuwuSolution.vue'
import HuanjingSolution from '.././components/console/kq/HuanjingSolution.vue'
import ChupinSolution from '.././components/console/kq/ChupinSolution.vue'
import AllSolution from '.././components/console/kq/AllSolution.vue'
import OtherProblem from '.././components/console/kq/OtherProblem.vue'
import AnswerList from '.././components/console/kq/AnswerList.vue'
// 统计图表
import Yye1001 from '.././components/console/echarts/Yye1001.vue'
import Yye1002 from '.././components/console/echarts/Yye1002.vue'
import Dish1003 from '.././components/console/echarts/Dish1003.vue'
import Customer1004 from '.././components/console/echarts/Customer1004.vue'
import Problem1005 from '.././components/console/echarts/Problem1005.vue'
import Problem1006 from '.././components/console/echarts/Problem1006.vue'
import Solution1007 from '.././components/console/echarts/Solution1007.vue'
import Dish1008 from '.././components/console/echarts/Dish1008.vue'
import Dish1009 from '.././components/console/echarts/Dish1009.vue'


export default [
    // 登录
    {
      path: '/console/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    // 内容的模板
    {
        path: '/console/',
        component: Iframe,
        meta: { requiresAuth: true },
        children: [
            // 菜品标签排行
            {
              path: 'echart/dish1009',
              name: 'echart-dish1009',
              component: Dish1009,
              meta: { requiresAuth: true }
            },
            // 菜品评价排行
            {
              path: 'echart/dish1008',
              name: 'echart-dish1008',
              component: Dish1008,
              meta: { requiresAuth: true }
            },
            // 总体解决方案及占比
            {
              path: 'echart/solution1007',
              name: 'echart-solution1007',
              component: Solution1007,
              meta: { requiresAuth: true }
            },
            // 环境标签、占比/解决方案
            {
              path: 'echart/problem1006',
              name: 'echart-problem1006',
              component: Problem1006,
              meta: { requiresAuth: true }
            },
            // 服务标签、占比/解决方案
            {
              path: 'echart/problem1005',
              name: 'echart-problem1005',
              component: Problem1005,
              meta: { requiresAuth: true }
            },
            // 顾客属性
            {
              path: 'echart/customer1004',
              name: 'echart-customer1004',
              component: Customer1004,
              meta: { requiresAuth: true }
            },
            // 菜品分类排行
            {
              path: 'echart/dish1003',
              name: 'echart-dish1003',
              component: Dish1003,
              meta: { requiresAuth: true }
            },
            // 各门店营业额趋势
            {
              path: 'echart/yye1002',
              name: 'echart-yye1002',
              component: Yye1002,
              meta: { requiresAuth: true }
            },
            // 各门店营业额情况
            {
              path: 'echart/yye1001',
              name: 'echart-yye1001',
              component: Yye1001,
              meta: { requiresAuth: true }
            },
            // 其它问题答案
            {
              path: 'answer/list/:id',
              name: 'answer-list',
              component: AnswerList,
              meta: { requiresAuth: true }
            },
            // 其它问题
            {
              path: 'other/question',
              name: 'other-question',
              component: OtherProblem,
              meta: { requiresAuth: true }
            },
            // 总体解决方案
            {
              path: 'all/solution',
              name: 'all-solution',
              component: AllSolution,
              meta: { requiresAuth: true }
            },
            // 出品解决方案
            {
              path: 'chupin/solution',
              name: 'chupin-solution',
              component: ChupinSolution,
              meta: { requiresAuth: true }
            },
            // 环境解决方案
            {
              path: 'huanjing/solution',
              name: 'huanjing-solution',
              component: HuanjingSolution,
              meta: { requiresAuth: true }
            },
            // 服务解决方案
            {
              path: 'fuwu/solution',
              name: 'fuwu-solution',
              component: FuwuSolution,
              meta: { requiresAuth: true }
            },
            // 环境标签
            {
              path: 'huanjing/tags',
              name: 'huanjing-tags',
              component: HuanjingTags,
              meta: { requiresAuth: true }
            },
            // 出口标签
            {
              path: 'chupin/tags',
              name: 'chupin-tags',
              component: ChupinTags,
              meta: { requiresAuth: true }
            },
            // 服务标签
            {
              path: 'fuwu/tags',
              name: 'fuwu-tags',
              component: FuwuTags,
              meta: { requiresAuth: true }
            },
            // 订单
            {
              path: 'order/list',
              name: 'order-list',
              component: OrderList,
              meta: { requiresAuth: true }
            },
            // 菜品
            {
              path: 'dish/list',
              name: 'dish-list',
              component: DishList,
              meta: { requiresAuth: true }
            },
            // 桌台
            {
              path: 'table/list',
              name: 'table-list',
              component: TableList,
              meta: { requiresAuth: true }
            },
            // 职务
            {
              path: 'position/list',
              name: 'position-list',
              component: PositionList,
              meta: { requiresAuth: true }
            },
            // 部门
            {
              path: 'department/list',
              name: 'department-list',
              component: DepartmentList,
              meta: { requiresAuth: true }
            },
            // 权限
            {
              path: 'permission/tree',
              name: 'permission-tree',
              component: PermissionTree,
              meta: { requiresAuth: true }
            },
            // 门店人员管理
            {
                path: 'staff/list',
                name: 'staff-list',
                meta: { requiresAuth: true },
                component: StaffList
            },
            // 门店管理
            {
                path: 'store/list',
                name: 'store-list',
                meta: { requiresAuth: true },
                component: StoreList
            },
            // 首页
            {
                path: 'index/index',
                name: 'index-index',
                meta: { requiresAuth: true },
                component: Main
            },
            // 栏目页面
            {
              path: 'cate/index',
              name: 'cate-index',
              component: CateList,
              meta: { requiresAuth: true }
            },
            // 文章列表
            {
              path: 'art/index',
              name: 'art-index',
              component: ArticleList,
              meta: { requiresAuth: true }
            },
            // 添加文章
            {
              path: 'art/add',
              name: 'art-add',
              component: ArticleAdd,
              meta: { requiresAuth: true }
            },
            // 操作日志
            {
              path: 'log/list',
              name: 'log-list',
              component: LogList,
              meta: { requiresAuth: true }
            },
            // 分类管理
            {
              path: 'type/list',
              name: 'type-list',
              component: TypeList,
              meta: { requiresAuth: true }
            },
            // 系统设置
            {
              path: 'config/index',
              name: 'config-index',
              component: Config,
              meta: { requiresAuth: true }
            },
            // 用户
            {
              path: 'admin/list',
              name: 'admin-list',
              component: AdminList,
              meta: { requiresAuth: true }
            },
            {
              path: 'admin/editinfo',
              name: 'admin-editinfo',
              component: AdminEditInfo,
              meta: { requiresAuth: true }
            },
            {
              path: 'admin/editpwd',
              name: 'admin-editpwd',
              component: AdminEditPwd,
              meta: { requiresAuth: true }
            },
            // 角色
            {
              path: 'role/list',
              name: 'role-list',
              component: RoleList,
              meta: { requiresAuth: true }
            },
            // 部门
            {
              path: 'section/list',
              name: 'section-list',
              component: SectionList,
              meta: { requiresAuth: true }
            },
            // 权限菜单
            {
              path: 'menu/tree',
              name: 'menu-tree',
              component: MenuTree,
              meta: { requiresAuth: true }
            },
            // 其它404
            {
                path: '*',
                name: 'noaccess',
                meta: { requiresAuth: true },
                component: Nofound
            }
        ]
    },
]