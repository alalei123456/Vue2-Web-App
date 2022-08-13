<template>
  <div>
    <Typenav />
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :floor="floor"
    ></Floor>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Floor from "@/pages/Home/Floor";
export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Rank, Floor },
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
  },
};
</script>

<style lang="">
</style>