<template>
  <a-layout id="components-layout-demo-custom-trigger" style="height: 100%">
    <a-layout-sider
      theme="dark"
      v-model="collapsed"
      :trigger="null"
      collapsible
      @collapse="onCollapse"
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo">
        <img v-if="!collapsed" src="../assets/img/logo.png" alt="" />
        <img
          class="logo-text"
          v-else
          src="../assets/img/logo_text.png"
          alt=""
        />
      </div>
      <!-- 左侧菜单 -->
      <div>
        <a-menu
          mode="inline"
          theme="dark"
          :selectedKeys="selectedKeys"
          :openKeys="openKeys"
          :inline-collapsed="collapsed"
          @openChange="onOpenChange"
          @click="menuClick"
        >
          <!-- 菜单遍历的开始 -->
          <template v-for="item in routes">
            <template v-if="!item.hidden">
              <!-- 如果当前遍历项没有children，视为子菜单项，注意所有的key都是path用于路由跳转，以及当前选中记录 -->
              <a-menu-item v-if="item.redirect" :key="item.children[0].path">
                <div>
                  <span
                    class="menu-icon anticon"
                    :style="{
                      width: !collapsed ? '15px' : '19px',
                      height: !collapsed ? '15px' : '19px',
                    }"
                  >
                    <img
                      class="anticon"
                      v-if="item.children[0].path == $route.path"
                      :src="item.children[0].icon_select"
                      alt=""
                    />
                    <img
                      class="anticon"
                      v-else
                      :src="item.children[0].icon"
                      alt=""
                    />
                  </span>
                  <span style="margin-left: 3px">{{
                    item.children[0].name
                  }}</span>
                </div>
              </a-menu-item>
              <!-- 否则视为子菜单，传入菜单信息并且运用下面定义的函数式组件 -->
              <sub-menu v-else :key="item.path" :menu-info="item" />
            </template>
          </template>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout
      :style="{
        marginLeft: marginLeft,
        transition: 'all 0.2s',
        height: '100vh',
      }"
    >
      <!-- 顶部栏 -->
      <a-layout-header
        :style="{
          position: 'fixed',
          top: 0,
          right: 0,
          padding: 0,
          background: '#fff',
          height: '88px',
          'line-height': '88px',
          width: `calc(100% - ${marginLeft})`,
          zIndex: 10,
          transition: 'width 0.2s',
          boxShadow: '0px 1px 6px 0px rgba(115, 115, 115, 0.43);',
        }"
      >
        <div class="trigger">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggleCollapsed"
          />
          <span>{{ $route.name }}</span>
        </div>
        <my-header />
      </a-layout-header>
      <!-- 内容区 -->
      <a-layout-content
        :style="{
          padding: '108px 20px 20px 20px',
          minHeight: 'calc(100vh - 128px)',
          background: '#fff',
        }"
      >
        <tag-view :addroutes="addroutes" />
        <div class="tabs-view-content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { Menu } from "ant-design-vue";
import { mapGetters } from "vuex";
import { myHeader, tagView } from "./components";

// 定义函数式组件
const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.path" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <div>
            <span class="menu-icon anticon" style="width:15px;height:15px;">
              <img class="anticon" :src="menuInfo.icon" alt="" />
            </span>
            <span>{{ menuInfo.name }}</span>
          </div>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children.length" :key="menuInfo.path+'/'+item.path">
            <span>{{ item.name }}</span>
          </a-menu-item>
          <sub-menu v-else :key="item.path" :menu-info="item" />
        </template>
      </a-sub-menu>
    `,
  name: "SubMenu",
  // must add isSubMenu: true 此项必须被定义
  isSubMenu: true,
  props: {
    // 解构a-sub-menu的属性
    ...Menu.SubMenu.props,
    // 接收父级传递过来的菜单信息
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
};
export default {
  data() {
    return {
      marginLeft: "200px",
      // 默认不折叠
      collapsed: false,
      selectedKeys: ["/warehouse-management-home"],
      openKeys: [],
      // 全部顶级父节点,用来控制所有父级菜单只展开其中的一项，可用遍历菜单信息进行赋值
      rootSubmenuKeys: [
        "/in-out-warehouse-management",
        "/statistical-analyse",
        "/basis-data",
      ],
    };
  },
  computed: {
    ...mapGetters(["routes", "addroutes"]),
  },
  created() {
    /**获取菜单的状态 */
    this.getMenuState();
  },
  methods: {
    getMenuState() {
      // 将从缓存中取出openKeys
      const openKeys = window.sessionStorage.getItem("openKeys");
      if (openKeys) {
        // 存在即赋值
        this.openKeys = JSON.parse(openKeys);
      }
      // 从缓存中取出selectedkeys
      const selectedKeys = window.sessionStorage.getItem("selectedKeys");
      if (selectedKeys) {
        // 存在即赋值
        this.selectedKeys = JSON.parse(selectedKeys);
      }
    },
    /**当菜单收缩时 */
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
      this.collapsed ? (this.marginLeft = "80px") : (this.marginLeft = "200px");
      this.collapsed
        ? (this.openKeys = [])
        : (this.openKeys = JSON.parse(
            window.sessionStorage.getItem("openKeys")
          ));
    },
    onCollapse() {
      this.collapsed ? (this.openKeys = ["80px"]) : (this.marginLeft = "200px");
    },
    // 点击菜单，路由跳转,注意的是当点击MenuItem才会触发此函数
    menuClick({ item, key, keyPath }) {
      // console.log(item, key, keyPath);
      this.selectedKeys = [key];
      window.sessionStorage.setItem(
        "selectedKeys",
        JSON.stringify(this.selectedKeys)
      );
      // 获取到当前的key,并且跳转
      this.$router.push({
        path: key,
      });
    },
    onOpenChange(openKeys) {
      // //  控制只打开一个
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      // 将当前打开的父级菜单存入缓存中
      window.sessionStorage.setItem("openKeys", JSON.stringify(this.openKeys));
    },
  },
  // 注册局部组件
  components: {
    myHeader,
    tagView,
    "sub-menu": SubMenu,
  },
  watch: {
    $route: {
      handler(newVal) {
        if (newVal) {
          this.getMenuState();
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "index";
</style>