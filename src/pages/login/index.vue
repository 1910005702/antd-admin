<template>
  <div class="login-container">
    <h2 class="login-title">Vue+AntDesign实现登陆页面</h2>
    <a-form ref="form" :model="form" class="login-form">
      <h2 class="title">用户登录 LOGIN</h2>
      <a-form-item>
        <a-input class="inputBox" v-model="form.username">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password class="inputBox" v-model="form.password">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button
          class="submit"
          type="primary"
          @click="onSubmit"
          :loading="loading"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { setItem } from "../../utils/storage";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    async onSubmit() {
      // console.log("登陆成功！");
      if (this.form.username == "") {
        this.$message.error("用户名不能为空");
        return;
      }
      setItem("name", this.form.username);
      setItem("token", 1);
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style scoped>
.login-form {
  width: 565px;
  height: 372px;
  margin: 0 auto;
  background: #ffffff;
  padding: 40px 110px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: slategray;
}

/* Log */
.login-title {
  color: #000;
  text-align: center;
  margin: 150px 0;
  font-size: 48px;
  font-family: Microsoft Yahei;
}
/* 登陆按钮 */
.submit {
  width: 100%;
  height: 45px;
  font-size: 16px;
}
/* 用户登陆标题 */
.title {
  margin-bottom: 50px;
  color: #000;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}
/* 输入框 */
.inputBox {
  height: 32px;
}
/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
</style>