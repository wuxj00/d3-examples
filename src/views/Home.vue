<template>
  <div class="cmcc">
    <HeaderComp></HeaderComp>
    <div class="cmcc-main">
      <router-view/>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderComp from '@/components/HeaderComp.vue';
import { menus } from '@/data/navData';


@Component({
  components: {
    HeaderComp,
  },
})
export default class Home extends Vue {

  private get treeViewList(): any[] {
    return menus;
  }
}
</script>
<style lang="scss" scoped>
.cmcc{
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  &-main{
    width: 100vw;
    height: calc(100vh - 60px);
  }
}
</style>
