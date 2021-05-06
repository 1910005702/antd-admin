<template>
  <div class="put-out">
    <div class="put-out-title" v-if="typeValue == 'put'">
      入库中：<span>1</span> 入库等待：<span>1</span>
    </div>
    <div class="put-out-title" v-if="typeValue == 'out'">
      出库中：<span>2</span> 出库等待：<span>2</span>
    </div>
    <div class="put-out-content">
      <div v-for="(item, index) in list" :key="index">
        <span
          class="put-out-content-label"
          v-if="item.warehousingStatus == 0"
          style="background: #15e45a"
        ></span>
        <span
          class="put-out-content-label"
          v-if="item.warehousingStatus == 1"
          style="background: #c2c2c2"
        ></span>
        <span
          class="put-out-content-label"
          v-if="item.warehousingStatus == 2"
          style="background: #385cef"
        ></span>
        <div>
          <span v-if="item.warehousingStatus == 0">入库中</span>
          <span v-if="item.warehousingStatus == 1">入库等待</span>
          <span v-if="item.warehousingStatus == 2">入库完成</span>
          <span>{{ item.name }}</span>
          <span>{{ item.content }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeValue: String,
  },
  data() {
    return {
      list: [
        {
          warehousingStatus: 0,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 1,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 2,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 0,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 1,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 2,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 0,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 1,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 2,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 0,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 1,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 2,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 0,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 1,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
        {
          warehousingStatus: 2,
          name: "TP202012030002(托盘2)",
          content: "2号线-2号料架-3行2列",
        },
      ],
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.put-out {
  margin-top: 30px;
  padding-bottom: 20px;
  padding-right: 38px;
  height: calc(100% - 30px);
  .put-out-title {
    height: 15px;
    font-size: 15px;
    font-weight: 500;
    color: #000000;
  }
  .put-out-content {
    margin-top: 21px;
    height: calc(100% - 36px);
    overflow: auto;
    & > div {
      position: relative;
      height: 26px;
      line-height: 26px;
      background: #f7f6fa;
      border-radius: 3px;
      margin-bottom: 3px;
      .put-out-content-label {
        position: absolute;
        width: 10px;
        height: 26px;
        border-radius: 3px;
      }
      & > div {
        padding-left: 21px;
        padding-right: 67px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-child(1) {
          font-size: 15px;
          font-weight: 500;
          color: #6d6d6d;
          opacity: 0.95;
        }
        span:nth-child(2) {
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          opacity: 0.5;
        }
        span:nth-child(3) {
          font-size: 15px;
          font-weight: 500;
          color: #000000;
        }
      }
    }
  }
}
</style>
