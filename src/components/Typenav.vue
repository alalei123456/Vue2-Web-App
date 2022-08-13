<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- `Vue`封装的过度与动画---transition完成 -->
        <transition name="sort">
          <div class="sort" v-show="typeShow">
            <!-- 事件委派，绑定在这些值得父元素上，实现路由跳转传参-search页面 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                @mouseenter="changeIndex(index)"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle"; //按需引入,优化项目
import { mapState } from "vuex";
export default {
  name: "Typenav",
  data() {
    return {
      currentIndex: -1,
      typeShow: false,
    };
  },
  methods: {
    //一直在触发，加节流函数
    // changeIndex: function (index) {
    //   this.currentIndex = index;
    //   console.log(this.currentIndex);
    //   // alert(this.currentIndex);
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
      // alert(this.currentIndex);
    }, 50),
    //不改变的话，鼠标移出这个区域，一直是蓝色的背景，currentIndex还是那个最后鼠标经过的索引值，
    leaveIndex: function () {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.typeShow = false;
      }
    },
    // 事件委派 goSearch

    goSearch(event) {
      //e.target拿到元素
      let element = event.target;
      // console.log(element.dataset);
      //element.dataset拿到参数
      //解构赋值
      //注意 element.dataset里面的属性名变成了小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //整理query参数（这个参数用query）,params参数是keyword，
      if (categoryname) {
        let location = { name: "sousuo" };
        let query = {
          categoryName: categoryname,
        };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        location.query = query;

        //如果有params参数，也加进去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // console.log(location);
        this.$router.push(location);
        // console.log("路由跳转");
        // if (this.$route.path != "/home") {
        //   this.$router.replace(location);
        // } else {
        //   this.$router.push(location);
        // }
      }
    },
    // 鼠标进入才显示
    enterShow() {
      this.typeShow = true;
    },
  },
  computed: {
    // categoryList() {
    //   return this.$store.state.home.categoryList;
    // },
    // ...mapState("home", ["categoryList"]),
    ...mapState({ categoryList: (state) => state.home.categoryList }),
  },
  mounted() {
    //dispath派发请求可以放在App里面，优化性能，
    // 路由在跳转home-serach之间，组件会被销毁，放在app组件只需要请求一次数据
    //要先在挂载时派发请求，才能mapState拿数据
    // this.$store.dispatch("home/categoryList");
    //测试一下接口回来的数据
    // console.log(this.categoryList);
    if (this.$route.path == "/home") {
      this.typeShow = true;
    }
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background: skyblue;
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        // .item:hover {
        //   background: skyblue;
        // }
      }
    }
    // 过渡动画的样式
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>

