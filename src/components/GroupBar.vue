<template>
  <div class='group-bar' id='group-bar'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import { DistrictList, DistrictColumns } from '@/data/exampleData';
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
    .attr('width', 960);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;
    const g = svg.append('g').attr('transform', `translate(${margin.left} ${margin.top })`);

    // x主轴
    const x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    // X轴上每一组序列
    const x1 = d3.scaleBand()
        // .rangeRound([0, x0.bandwidth()])
        .padding(0.05);
    // y轴
    const y = d3.scaleLinear()
        .rangeRound([height, 0]);

    // 颜色序列
    const z = d3.scaleOrdinal()
        .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    // 每一组数据Key值；
    const keys = DistrictColumns.slice(1);

    // 添加X主轴
    x0.domain(DistrictList.map((d) => d.District));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(DistrictList, (d: any) => d3.max(keys, (key) => d[key])) as number]);

    g.append('g')
      .selectAll('g')
      .data(DistrictList)
      .enter().append('g')
      .attr('transform', (d) => `translate(${x0(d.District)}, 0)`)
      .selectAll('rect')
      .data((d) => keys.map((key) => {
        return {
          key,
          value: d[key],
        };
      }))
      .enter()
      .append('rect')
        .attr('x', (d) => x1(d.key) as number)
        .attr('y', (d) => y(d.value))
        .attr('width', x1.bandwidth())
        .attr('height', (d) => (height - y(d.value)))
        .attr('fill', (d) => z(d.key) as any);

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0) as any);

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's') as any);

    g.append('text')
      .attr('x', width / 2)
      .attr('y', y(y.ticks().pop() as number) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'middle')
      .text('Group Bar Chart');

    const legend = g.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice().reverse())// slice()复制，reverse()排序
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0,${i * 20})`);

    legend.append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', (d) => z(d) as any);

    legend.append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text((d) => d);

  }
}
</script>
<style lang='scss' scoped>
// .axis .domain {
//   display: none;
// }
</style>
