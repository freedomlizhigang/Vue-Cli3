/**
* api接口统一管理
*/
import axios from './http.js'
import common from './console/common.js'
import login from './console/login.js'
import cate from './console/cate.js'
import article from './console/article.js'
import menu from './console/menu.js'
import section from './console/section.js'
import role from './console/role.js'
import admin from './console/admin.js'
import config from './console/config.js'
import type from './console/type.js'
import log from './console/log.js'
// 客情部分
import position from './kq/position.js'
import department from './kq/department.js'
import permission from './kq/permission.js'
import store from './kq/store.js'
import staff from './kq/staff.js'
import table from './kq/table.js'
import dish from './kq/dish.js'
import order from './kq/order.js'
import problem from './kq/problem.js'
// 数据图表
import yye from './echart/yye.js'


const api = {
    // 数据图表
    yye,
    // 客情
    problem,
    order,
    dish,
    table,
    staff,
    position,
    department,
    permission,
    store,
    // 管理中心
    common,
    login,
    cate,
    article,
    menu,
    section,
    role,
    admin,
    config,
    type,
    log,
}

export default api