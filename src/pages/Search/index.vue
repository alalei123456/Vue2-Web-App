<template>
  <div>
    <Typenav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级联动的参数的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 平台售卖的属性的面包屑 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}
              <i @click="removeProps(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 子传父，自定义事件 -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsInfo="attrsInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': isAsc,
                        'icon-arrowBottom-fill': !isAsc,
                      }"
                    ></span>
                  </a>
                </li>
                <li :class="{ active: !isOne }" @click="changeOrder('2')">
                  <a href="#"
                    >价格<span
                      v-show="!isOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowTop': isAsc,
                        'icon-arrowBottom-fill': !isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a> -->
                    <router-link
                      :to="{ name: 'detail', params: { skuId: goods.id } }"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <!-- 点击商品的标题去详情页 -->
                    <!-- <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    > -->
                    <router-link
                      :to="{ name: 'detail', params: { skuId: goods.id } }"
                      >{{ goods.title }}</router-link
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination
            @updatePage="updatePage"
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="searchParams.continues"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  props: ["keyword"],
  name: "sousuo",
  data() {
    return {
      searchParams: {
        category1Id: "",
        categor2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        // 平台售卖属性参数
        props: [],
        trademark: "",
        // 当前页码数
        pageNo: 1,
        //每页展示商品数量
        pageSize: 10,
        // 连续页码数
        continues: 5,
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    isOne() {
      return this.searchParams.order.split(":")[0] == "1" ? true : false;
    },
    isAsc() {
      return this.searchParams.order.split(":")[1] == "asc" ? true : false;
    },
    //获取商品总数，传给分页器计算总页数
    ...mapState({ total: (state) => state.search.searchInfo.total }),
  },
  methods: {
    changeOrder(flag) {
      // 用户点击后，改变原来的排序方式flag+!originSort
      let originOrder = this.searchParams.order;
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      // 整理order参数，重新获取数据searchInfo
      this.searchParams.order = newOrder;
      this.getData();
    },
    getData() {
      this.$store.dispatch("search/getSearchInfo", this.searchParams);
    },
    // 绑定的自定义事件的回调函数
    // 传递品牌
    trademarkInfo(trademark) {
      // console.log("trademark接收中", trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 传递哪一个属性，和哪一个属性值
    attrsInfo(attrs, attrValue) {
      // console.log("attrs,attrValue接收中", attrs, attrValue);
      let prop = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }
      this.getData();
    },
    // 删除三级联动的那个面包屑
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也要修改，修改路由信息，所以进行路由的跳转

      this.$router.push({
        name: "sousuo",
        params: this.$route.params,
        query: {},
      });
    },
    // 删除关键字的面包屑
    removeKeyword() {
      this.searchParams.keyword = "";
      // 修改后searchParams变了，所以再次发起请求
      this.getData();
      //地址栏也要修改，所以进行路由的跳转 关键字是params参数
      this.$router.push({ name: "sousuo", query: this.$route.query });
    },
    // 删除品牌的面包屑
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getData();
    },
    // 删除平台售卖属性的面包屑
    removeProps(index) {
      // 用splice删除 index处的这个属性
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 子传父的回调,更新当前页面重新渲染页面
    updatePage(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  // 在发起请求之前先合并路由传来的参数
  beforeMount() {
    //对象类型的合并，并且这个参数至少为一个空对象，
    // 所以先定义一个参数searchParams={}
    Object.assign(this.searchParams, this.$route.params, this.$route.query);
  },
  mounted() {
    this.getData();
  },
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    // 否则在同一个页面,点击三级联动的数据/搜索栏keyword,路由信息地址栏改变了,页面数据没有渲染出新的
    $route() {
      this.searchParams.category1ID = undefined;
      this.searchParams.category2ID = undefined;
      this.searchParams.category3ID = undefined;
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // console.log("监听路由信息变化", this.searchParams);
      //每一次请求完毕，应该把相应的1,2,3级分类的id置空，让他接受下一次的相应1,2,3id
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>