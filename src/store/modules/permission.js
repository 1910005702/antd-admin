import { routes } from '@/router'
import Layout from '@/layouts/index.vue'
const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, route) => {
      state.addroutes = route
      state.routes = route.concat(routes)
    },
    RESET_ROUTES(state, route) {
      state.addroutes = []
      state.routes = []
    }
  },
  actions: {
    GenerateRoutes({ commit }, name) {
      return new Promise(resolve => {
        let router_data = [];
        // 向后端请求路由数据
        if (name === 'admin') {
          router_data = [
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": require('../../assets/img/menu/icon1_n.png'),
                  "icon_select": require('../../assets/img/menu/icon1.png'),
                  "menuType": 0,
                  "name": "仓库管理首页",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'warehouse-management-home/index',
                  "path": "/warehouse-management-home",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "",
              "menuType": 0,
              "name": "首页",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/",
              "filePath": '',
              "redirect": '/warehouse-management-home',
              "component": "Layout",
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "托盘入库",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'in-out-warehouse-management/tray-in-warehouse/index',
                  "path": "tray-in-warehouse",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "托盘出库",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'in-out-warehouse-management/tray-out-warehouse/index',
                  "path": "tray-out-warehouse",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "物料绑定",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'in-out-warehouse-management/material-binding/index',
                  "path": "material-binding",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "物料解绑",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'in-out-warehouse-management/material-unbundling/index',
                  "path": "material-unbundling",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": require('../../assets/img/menu/icon2_n.png'),
              "icon_select": require('../../assets/img/menu/icon2.png'),
              "menuType": 0,
              "name": "出入库管理",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/in-out-warehouse-management",
              "component": "Layout"
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "库位全景",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'statistical-analyse/location-panorama/index',
                  "path": "location-panorama",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "库存查询",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'statistical-analyse/inventory-inquire/index',
                  "path": "inventory-inquire",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "出入库记录",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'statistical-analyse/in-out-warehouse-record/index',
                  "path": "in-out-warehouse-record",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": require('../../assets/img/menu/icon3_n.png'),
              "icon_select": require('../../assets/img/menu/icon3.png'),
              "menuType": 0,
              "name": "统计分析",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/statistical-analyse",
              "component": "Layout"
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "物料管理",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'basis-data/material-management/index',
                  "path": "material-management",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "库位管理",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'basis-data/location-management/index',
                  "path": "location-management",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "仓库管理",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'basis-data/warehouse-management/index',
                  "path": "warehouse-management",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "料架管理",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'basis-data/rack-management/index',
                  "path": "rack-management",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "传送线管理",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'basis-data/transmissionLine-management/index',
                  "path": "transmissionLine-management",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "menuType": 0,
                  "name": "托盘管理",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'basis-data/tray-management/index',
                  "path": "tray-management",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": require('../../assets/img/menu/icon4_n.png'),
              "icon_select": require('../../assets/img/menu/icon4.png'),
              "menuType": 0,
              "name": "基础资料",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/basis-data",
              "component": "Layout"
            },
          ];
        } else if (name === 'admin123') {
          router_data = [
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": "mail",
                  "id": 1.1,
                  "menuType": 0,
                  "name": "首页",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'home/index',
                  "path": "/home",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "",
              "id": 1,
              "menuType": 0,
              "name": "首页",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/",
              "filePath": '',
              "redirect": '/home',
              "component": "Layout",
            },
            {
              "children": [
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 3.1,
                  "menuType": 0,
                  "name": "测试4",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index4',
                  "path": "index4",
                  "component": " "
                },
                {
                  "children": [],
                  "createDate": "",
                  "icon": " ",
                  "id": 3.2,
                  "menuType": 0,
                  "name": "测试5",
                  "parentName": "",
                  "permissions": "",
                  "pid": 0,
                  "sort": 0,
                  "type": 0,
                  "filePath": 'cs/index5',
                  "path": "index5",
                  "component": " "
                }
              ],
              "createDate": "",
              "icon": "mail",
              "id": 1,
              "menuType": 0,
              "name": "用户",
              "parentName": "",
              "permissions": "",
              "pid": 0,
              "sort": 0,
              "type": 0,
              "path": "/sub3",
              "component": "Layout"
            },
          ]
        }
        const accessedRoutes = filterAsyncRouter(router_data);
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
};
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  // console.log(asyncRouterMap)
  return asyncRouterMap.filter(route => {
    // console.log(route.component)
    // console.log(Layout)
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === ' ') {
        route.component = loadView(route.filePath)
        // console.log(loadView(route.path))
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  // console.log(view)
  return resolve => require([`@/pages/${view}`], resolve)
}
export default permission;