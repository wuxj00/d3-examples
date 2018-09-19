<template>
  <div class='d3-chart'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

const capitals: string[] = 'abcdefghijklmnopqrst'.toUpperCase().split('');
const years: string[] = ['2017', '2018'];
let listData: any[] = capitals.map((key) => {
  const value = Math.floor(1000 * Math.random());
  return {
    key,
    value,
    year: '2017'
  };
});
listData = listData.concat(capitals.map((key) => {
  const value = Math.floor(1000 * Math.random());
  return {
    key,
    value,
    year: '2018'
  };
}));

@Component
export default class GroupLine extends Vue {

  private mounted() {
    this.renderChart();
  }

  private renderChart(): void {
    const svg = d3.select('.d3-chart')
    .append('svg')
    .attr('width', 960)
    .attr('height', 500);

    const margin = {top: 50, right: 30, bottom: 30, left: 40};
    const width = 960 - margin.top - margin.bottom;
    const height = 500 - margin.left - margin.right;

    const g = svg.append('g')
    .attr('transform', `translate(${margin.left} ${margin.top})`);

    // 创建序数点比例尺
    const x = d3.scalePoint()
    .rangeRound([0, width])
    .padding(0.1);

    const y = d3.scaleLinear()
    .rangeRound([height, 0]);

    // 创建二十种演示序列比例尺
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const xAxis = x.domain(capitals);
    const yAxis = y.domain([0, d3.max(listData.map((d) => d.value))]);


    g.attr('class', 'headerText')
      .append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (-margin.top / 2) + ')')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 600)
      .text('Group Line Chart');

    g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x) as any)
      .attr('font-weight', 'bold');

    g.append('g')
    .call(d3.axisLeft(y) as any)
    .attr('class', 'axisY');

    const dots = g.selectAll('.dots')
      .data(listData)
      .enter().append('circle')
      .attr('class', 'dots')
      .attr('r', 5)
      .attr('cx', (d: any) => x(d.key) as number)
      .attr('cy', (d: any) => y(d.value) as number)
      .style('fill', (d) => color(d.year))

    const nestedData = d3.nest()
      .key((d: any) => d.year)
      .entries(listData);

    const line = d3.line()
      .x((d: any) => x(d.key) as number )
      .y((d: any) =>y(d.value))

    // nestData 是讲原来的数据包裹了一层[{key: '', values: []}]
    g.selectAll('.lines')
      .data(nestedData)
      .enter()
      .append('path')
      .attr('class', 'lines')
      .attr('fill', 'none')
      .style('stroke', (d: any) => color(d.key))
      .attr('d', (d: any) => line(d.values))
    }
  }
</script>
<style lang='scss'>
</style>

