<template>
  <div class="tabs-head">
    <a-tabs
      class="tabs-container"
      type="editable-card"
      :active-key="active"
      :hide-add="true"
    >
      <a-tab-pane v-for="(tab, index) in pageList" :key="tab.path">
        <div slot="tab" class="tab">
          <a-icon
            v-if="tab.path == $route.path"
            class="icon-sync"
            type="sync"
            @click="refresh"
          />
          <div class="title" @click="onTabClick(tab.path)">
            {{ tab.name }}
          </div>
          <my-icon
            v-if="pageList.length > 1"
            type="iconcha1"
            :style="{ color: tab.path == $route.path ? '#fff' : '#999' }"
            @click="delRoute(index)"
          ></my-icon>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageList: [],
      active: "",
    };
  },
  props: {
    addroutes: Array,
  },
  created() {
    /**判断是否有标签路由 有的话从缓存里取 */
    let pageList = window.sessionStorage.getItem("pageList");
    if (pageList) {
      this.pageList = JSON.parse(pageList);
      /**选中当前的路由 */
      this.active = this.$route.path;
    } else {
      this.createTabs(this.$route.path);
    }
  },
  methods: {
    refresh() {
      console.log("刷新");
    },
    /**获取当前的标签页数据 */
    getNowTabData(route) {
      let _route = {
        name: route.name,
        path: "/" + route.filePath.split("/index")[0],
      };
      this.active = _route.path;
      if (this.pageList.length == 0) {
        this.pageList.push(_route);
      } else {
        let flag = false;
        for (let i = 0; i < this.pageList.length; i++) {
          if (this.pageList[i].path == _route.path) {
            flag = true;
          }
        }
        if (!flag) {
          this.pageList.push(_route);
        }
      }
      // 把标签路由存在缓存中
      window.sessionStorage.setItem("pageList", JSON.stringify(this.pageList));
    },
    /**处理数据,转换成标签页需要的数据 */
    createTabs(val) {
      let path = val.split("/")[1];
      let children_path = val.split("/")[2];
      for (let i = 0; i < this.addroutes.length; i++) {
        if (typeof children_path == "undefined") {
          this.getNowTabData(this.addroutes[i].children[0]);
          return;
        }
        if ("/" + path == this.addroutes[i].path) {
          for (let j = 0; j < this.addroutes[i].children.length; j++) {
            if (children_path == this.addroutes[i].children[j].path) {
              this.getNowTabData(this.addroutes[i].children[j]);
              return;
            }
          }
        }
      }
    },
    /**点击标签页跳转 */
    onTabClick(path) {
      /**跳转时处理菜单路由的展示 格式必须一致 防止出错 */
      let openKeys = ["/" + path.split("/")[1]];
      window.sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
      window.sessionStorage.setItem("selectedKeys", JSON.stringify([path]));
      this.$router.push({
        path: path,
      });
    },
    /**删除路由 */
    delRoute(index) {
      // console.log(index);
      if (this.pageList[index].path == this.$route.path) {
        let openKeys = "";
        let selectedKeys = "";
        if (index + 1 < this.pageList.length) {
          this.$router.push({
            path: this.pageList[index + 1].path,
          });
          this.active = this.pageList[index + 1].path;
          openKeys = ["/" + this.pageList[index + 1].path.split("/")[1]];
          selectedKeys = this.pageList[index + 1].path;
        } else if (index + 1 == this.pageList.length) {
          this.$router.push({
            path: this.pageList[index].path,
          });
          this.active = this.pageList[index].path;
          openKeys = ["/" + this.pageList[index].path.split("/")[1]];
          selectedKeys = this.pageList[index].path;
        } else {
          this.$router.push({
            path: this.pageList[index - 1].path,
          });
          this.active = this.pageList[index - 1].path;
          openKeys = ["/" + this.pageList[index - 1].path.split("/")[1]];
          selectedKeys = this.pageList[index - 1].path;
        }
        /**跳转时处理菜单路由的展示 格式必须一致 防止出错 */
        window.sessionStorage.setItem("openKeys", JSON.stringify(openKeys));
        window.sessionStorage.setItem(
          "selectedKeys",
          JSON.stringify([selectedKeys])
        );
      }
      this.pageList.splice(index, 1);
      // 把标签路由存在缓存中
      window.sessionStorage.setItem("pageList", JSON.stringify(this.pageList));
    },
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        // console.log(newVal, oldVal);
        if (newVal) {
          this.createTabs(newVal.path);
        }
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "index";
</style>