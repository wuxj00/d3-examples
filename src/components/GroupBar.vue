<template>
  <div class='group-bar' id='group-bar'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component({
  components: {
  },
})
export default class GroupBar extends Vue {

  private mounted() {
    this.renderChart();
  }

  private renderChart(): void {

    const svg = d3.select('#group-bar')
    .append('svg')
    .attr('height', 500)
    .attr('width', 960)
    .select('svg');
    const margin = {top: 20, right: 20, bottom: 30, left: 40};
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left} ${margin.top })`);

    const x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    const x1 = d3.scaleBand()
        .padding(0.05);

    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    const z = d3.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);


  }
}
</script>
<style lang='scss' scoped>
  .group-bar{
    width: 960px;
    height: 500px;
    border: 1px solid #ccc;
    margin: 50px;
  }
</style>
