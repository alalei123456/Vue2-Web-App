<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="changeCarkcheck(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              v-model="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuNum * cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cartInfo.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllchecked && cartInfoList.length > 0"
          @change="changeAllcheck"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllcart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  methods: {
    // 派发请求，存储购物车数据到store
    getDate() {
      this.$store.dispatch("shopcart/getCartList");
    },
    // 一直点击按钮，要节流
    handler: _.throttle(async function (type, disNum, cartInfo) {
      // type表示是 点击了 + - 还是输入框
      //disNum是变化量
      // cartInfo是当前这个产品
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = cartInfo.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 1;
          } else {
            disNum = parseInt(disNum) - cartInfo.skuNum;
          }
          break;
      }
      try {
        // 通知服务器，购物车列表产品数量变化
        await this.$store.dispatch("detail/addToShopcart", {
          skuId: cartInfo.skuId,
          skuNum: disNum,
        });
        this.getDate();
      } catch (error) {
        // 修改失败就弹出错误信息
        alert(error.message);
      }
    }, 50),
    //  删除某个产品产品
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("shopcart/reqdeleteCart", skuId);
      } catch (error) {
        alert(error.message);
      }
      this.getDate();
    },
    // 删除全部选中的产品
    async deleteAllcart() {
      try {
        await this.$store.dispatch("shopcart/reqdeleteAllchecked");
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    // 商品选中按钮状态改变的回调
    async changeCarkcheck(cart, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("shopcart/reqUpdateCartchecked", {
          skuId: cart.skuId,
          isChecked,
        });
      } catch (error) {
        alert(error.message);
      }
      this.getDate();
    },
    // 全部选中按钮改变所有商品的状态,没有接口，去遍历这个商品列表
    async changeAllcheck(event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("shopcart/reqUpdateAllcart", isChecked);
        this.getDate();
      } catch (error) {
        alert(error.message);
      }
    },
    // 跳转到结算页面
    goTrade() {
      this.$router.push({ name: "trade" });
    },
  },

  computed: {
    // 购物车列表信息
    ...mapGetters("shopcart", ["cartList"]),
    //购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 全选按钮的状态
    isAllchecked() {
      return this.cartInfoList.every((cart) => cart.isChecked == 1);
    },
    // 计算选中的产品的总价格
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    },
    totalNum() {
      let total = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          total++;
        }
      });
      return total;
    },
  },
  mounted() {
    this.getDate();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>