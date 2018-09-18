<template>
  <div class="layout">
    <div class="layout-body">
      <div class="grid">
        <div class="grid-item"
          v-for="item in listData"
             v-on:mouseover="item.selected = true"
             v-on:mouseleave="item.selected = false"
          :key="item.id">
          <transition name="fade">
            <div class="grid-item-content"
            v-show="item.selected" @click="delProject(item.id)">
            <i class="grid-item-icon">
            </i>
            <h3 class="grid-item-title">
              {{item.name}}
            </h3>
            <div class="grid-item-descr">
              {{item.descr}}
            </div>
          </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import MyMixin from '@/mixins/MyMixin';

  @Component({
    components: {
    },
  })
  export default class Layout extends mixins(MyMixin) {

    // computed
    private get listData(): any[] {
      return this.$store.state.projects;
    }

    private created(): void {
      // empty-block
    }

    private delProject(id: string): void {

      this.$store.commit('delPro', id);
    }
  }
</script>

<style lang="scss">
  .layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    &-header{
      width: 100%;
      height: 60px;
    }
    &-body{
      width: 100%;
      height: calc(100vh - 60px);
    }
  }
  .grid{
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    padding: 20px;
    overflow-x:hidden;
    overflow-y:auto;
    &-item{
      flex: 0 0 400px;
      height: 300px;
      margin: 20px;
      background: url(../assets/images/timg.jpg) center center no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      border-radius: 5px;
      transition: all 1.5s;
      &-title{
        color: white;
      }
      &-content{
        width: 100%;
        height: 100%;
        background: rgba(6,26,50,.7);
        border-radius: 5px;
        text-align: center;
        color: white;
      }
      &-descr{
        text-align: left;
        text-indent: 30px;
        line-height: 25px;
        padding: 0 20px;
      }
      &-icon{
        display: inline-block;
        margin-top: 20px;
        width: 64px;
        height: 64px;
        background:url(../assets/images/icon.png) no-repeat;
      }
      &-active{
        display: block;
      }
    }
  }
</style>
