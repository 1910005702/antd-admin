<template>
  <div id="myheader">
    <div>
      <a-badge :count="9" style="color: #353535">
        <a-icon type="bell" style="padding: 4px; vertical-align: middle" />
      </a-badge>
    </div>

    <a-dropdown>
      <span>
        <a-icon type="smile" theme="twoTone" style="font-size: 18px" />
        <span> 小明 </span>
      </span>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;"><a-icon type="user" />个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;"><a-icon type="setting" />个人设置</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;"><a-icon type="poweroff" />退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
export default {
  name: "myheader",
};
</script>
<style scoped>
#myheader {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#myheader > * {
  padding: 0 16px;
}
#myheader > *:not(i):hover {
  background: rgba(0, 0, 0, 0.025);
}
</style>
