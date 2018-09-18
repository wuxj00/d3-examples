<template>
    <div class="cmcc-header header">
      <label class="cmcc-header-title"></label>
      <user-info></user-info>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserInfo from '@/components/UserInfo.vue';

@Component({
  components: {
    UserInfo,
  },
})
export default class HeaderComp extends Vue {

}
</script>
<style lang="scss" scoped>
.cmcc{
  &-header{
    height: 60px;
    line-height: 60px;
    text-align: left;
    background:linear-gradient(90deg,rgba(2,162,175,1),rgba(0,123,134,1));
    &-title {
       display: inline-block;
       background: url(../assets/images/head_common_logo.png) 20px no-repeat;
       font-weight: 700;
       font-style: normal;
       font-size: 20px;
       color: #FFFFFF;
       height: 100%;
       width: 300px;
    }
  }
}
</style>
