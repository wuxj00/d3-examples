<template>
    <div class="cmcc-tree">
        <ul class="cmcc-tree-wrapper">
            <li class="cmcc-tree-item"
                v-for="item in menus"
                :key="item.name">
                <div class="cmcc-tree-item-text"
                v-bind:class="{'cmcc-tree-item-expanded': item.expanded}"
                @click="() => item.list && (item.expanded = !item.expanded)">
                {{item.name}}</div>
                <i v-if="item.list" class="cmcc-tree-item-icon"
                    v-bind:class="{'el-icon-plus': !item.expanded,'el-icon-minus': item.expanded}"/>
                <ul class="cmcc-tree-wrapper" v-show="item.expanded" v-if="item.list" style="margin-left: 20px">
                    <li class="cmcc-tree-item"
                        v-for="subItem in item.list"
                        :key="subItem.name">
                        <span class="cmcc-tree-item-text" @click="clickMenu(subItem)">{{subItem.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class TreeView extends Vue {
  @Prop({ default: () => [] })
  private menus?: any[];

  private clickMenu(inst: any) {
    if (inst.path) {
      this.$router.push({
        path: inst.path,
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.cmcc {
  .tree {
    width: 280px;
    transition: all 0.5s;
    max-height: 100%;
    overflow-y: auto;
    color: rgb(102, 102, 102);
    font-size: 14px;
    &-item {
      line-height: 35px;
      &-icon {
        vertical-align: middle;
        margin-right: 10px;
        font-weight: bold;
        font-size: 10px;
      }
      &-text {
        vertical-align: middle;
        display: inline-block;
        width: 170px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        border-radius: 5px;
        cursor: pointer;
        padding: 0 10px;
        &:hover {
          color: white;
          background-color: rgb(59, 167, 255);
        }
      }
    }
  }
}
</style>
