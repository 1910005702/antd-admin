<template>
  <div class="warehouse-management-home">
    <a-row :gutter="30">
      <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="24" :xl="10">
        <div class="warehouse-usage">
          <Title :title="'仓库使用率'"></Title>
          <div class="echarts" ref="warehouse-usage-echarts"></div>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="24" :xl="8">
        <div class="failure-warning">
          <Title :title="'故障报警'"></Title>
          <div class="failure-warning-empty">
            <img src="../../assets/img/empty.png" alt="" />
            <span>暂无故障</span>
          </div>
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="0" :sm="0" :md="0" :lg="0" :xl="6">
        <div class="gutter-box">
          <div class="placeholder-img">
            <img src="../../assets/img/placeholder.png" alt="" />
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="24">
        <div class="movements-figure">
          <Title :title="'出入库走势图'"></Title>
          <div class="echarts" ref="movements-figure-echarts"></div>
        </div>
      </a-col>
    </a-row>
    <a-row class="row-put-out" :gutter="30">
      <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <div class="put-queue">
          <Title :title="'入库队列'"></Title>
          <Index :typeValue="'put'" />
        </div>
      </a-col>
      <a-col class="gutter-row" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <div class="out-queue">
          <Title :title="'出库队列'"></Title>
          <Index :typeValue="'out'" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Title from "../../components/title";
import Index from "./components/index";
export default {
  name: "warehouse-management-home",
  data() {
    return {
      movements_figure: null,
      warehouse_usage: null,
    };
  },
  components: {
    Title,
    Index,
  },
  created() {},
  mounted() {
    this.get_echarts();
    window.addEventListener("resize", this.resize, true);
  },
  methods: {
    fun(warehouse_usage) {
      let index = 0;
      var timer = setInterval(function () {
        console.log(index);
        console.log(warehouse_usage);
        warehouse_usage.dispatchAction({
          type: "hideTip",
          seriesIndex: 0,
          dataIndex: index,
        });
        // 显示提示框
        warehouse_usage.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: index,
        });
        // 取消高亮指定的数据图形
        warehouse_usage.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: index == 0 ? 2 : index - 1,
        });
        warehouse_usage.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: index,
        });
        index++;
        if (index > 2) {
          index = 0;
        }
      }, 3000);
    },
    resize() {
      this.warehouse_usage.resize();
      this.movements_figure.resize();
    },
    /**获取echarts图的数据 然后画出*/
    get_echarts() {
      /**饼图 */
      this.warehouse_usage = this.$echarts.init(
        this.$refs["warehouse-usage-echarts"]
      );
      var colorList = ["#D4374A", "#D2D2D2", "#82E054"];
      var warehouse_usage_option = {
        title: {
          text: "仓库使用率",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 14,
          },
        },
        legend: {
          icon: "circle",
          itemWidth: 10,
          data: ["满载", "无托盘", "有空余"],
          orient: "vertical",
          right: 20,
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["30%", "60%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 30,
            emphasis: {
              itemStyle: {
                borderColor: "#f3f3f3",
                borderWidth: 10,
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: "outside",
              formatter: "{a|{b}：{d}%}\n{hr|}",
              rich: {
                hr: {
                  backgroundColor: "t",
                  borderRadius: 3,
                  width: 3,
                  height: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  padding: [-30, 15, -20, 15],
                },
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: [
              {
                name: "满载",
                value: 5600,
              },
              {
                name: "无托盘",
                value: 3600,
              },
              {
                name: "有空余",
                value: 1500,
              },
            ],
          },
        ],
      };
      this.warehouse_usage.setOption(warehouse_usage_option);
      /**折线图 */
      this.movements_figure = this.$echarts.init(
        this.$refs["movements-figure-echarts"]
      );
      var option = {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["出库", "入库"],
          left: "right",
        },
        grid: {
          top: "middle",
          left: "3%",
          right: "4%",
          bottom: "5%",
          top: "15%",
          height: "80%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: [
            "2012-01",
            "2012-02",
            "2012-03",
            "2012-04",
            "2012-05",
            "2012-06",
            "2012-07",
            "2012-08",
            "2012-09",
            "2012-10",
            "2012-11",
            "2012-12",
            "2012-13",
            "2012-14",
            "2012-15",
          ],
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999",
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#DDD",
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#333",
            },
          },
          nameTextStyle: {
            color: "#999",
          },
          splitArea: {
            show: false,
          },
        },
        series: [
          {
            name: "出库",
            type: "line",
            data: [
              156,
              310,
              220,
              130,
              220,
              89,
              156,
              310,
              220,
              130,
              220,
              89,
              177,
              160,
              59,
            ],
            color: "#F58080",
            lineStyle: {
              normal: {
                width: 2,
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#FFCAD4", // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#F58080", // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#F58080", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(245,128,128, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7,
              },
            },
            itemStyle: {
              normal: {
                color: "#F58080",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#F58080",
              },
            },
            smooth: true,
          },
          {
            name: "入库",
            type: "line",
            data: [
              189,
              310,
              111,
              222,
              123,
              156,
              143,
              128,
              98,
              189,
              310,
              111,
              222,
              123,
              156,
            ],
            lineStyle: {
              normal: {
                width: 2,
                color: {
                  type: "linear",
                  colorStops: [
                    {
                      offset: 0,
                      color: "#AAF487", // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: "#47D8BE", // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#47D8BE", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
                shadowColor: "rgba(71,216,190, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 7,
              },
            },
            itemStyle: {
              normal: {
                color: "#AAF487",
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: "#AAF487",
              },
            },
            smooth: true,
          },
        ],
      };
      this.movements_figure.setOption(option);
      this.$nextTick(function () {
        this.fun(this.warehouse_usage);
      });
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize, true);
  },
};
</script>

<style scoped lang="less">
.warehouse-management-home {
  padding: 2px;
  padding-left: 3px;
  padding-right: 3px;
  height: calc(100% - 2px);
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  /deep/.ant-row > div {
    background: transparent;
    border: 0;
  }

  .gutter-row {
    margin-bottom: 20px;
  }

  .warehouse-usage,
  .failure-warning,
  .movements-figure,
  .put-queue,
  .out-queue {
    position: relative;
    padding-top: 20px;
    padding-left: 30px;
    background: #ffffff;
    box-shadow: 0px 1px 6px 0px rgba(115, 115, 115, 0.43);
    border-radius: 5px;
  }
  .warehouse-usage {
    height: 342px;
    .echarts {
      height: 100%;
    }
  }
  .failure-warning {
    height: 342px;
    .failure-warning-empty {
      margin: 64px auto 78px;
      width: 177px;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img {
        width: 177px;
        height: 128px;
      }
      span {
        display: inline-block;
        height: 21px;
        font-size: 22px;
        font-weight: 500;
        color: #c8c8c8;
      }
    }
  }
  .placeholder-img {
    height: 342px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 320px;
      height: 297px;
    }
  }
  .movements-figure {
    height: 280px;
    .echarts {
      height: 100%;
    }
  }
  .row-put-out {
    min-height: 240px;
    height: calc(100% - 662px);
    .ant-col {
      height: 100%;
      .put-queue,
      .out-queue {
        height: calc(100% - 3px);
      }
    }
  }
}
</style>
