<template>
  <div class='d3-chart'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

const parseTime = d3.timeParse('%Y-%m-%e');
const dates: string[] = ['2018-04-1', '2018-05-2', '2018-06-3', '2018-07-4', '2018-08-13', '2018-09-30'];
const listData: any[] = dates.map((date) => {
  const value = Math.floor(1000 * Math.random());
  return {
    date: parseTime(date),
    value,
  };
});

@Component
export default class BarChart extends Vue {

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

    const x = d3.scaleTime()
    .rangeRound([0, width]);

    const y = d3.scaleLinear()
    .rangeRound([height, 0]);

    const area = d3.area()
      .x((d: any) => x(d.date))
      .y0(height)
      .y1((d: any) => y(d.value));

    const line = d3.line()
      .x((d: any) => x(d.date))
      .y((d: any) => y(d.value));

    const extent = d3.extent(listData, (d: any) => d.date);
    const xAxis = x.domain(extent as number[]);
    const yAxis = y.domain([0, d3.max(listData.map((d) => d.value))]);

    // set the gradient
    g.append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', y(0))
      .attr('x2', 0)
      .attr('y2', y(1000))
      .selectAll('stop')
    .data([
      { offset: '0%', color: 'red' },
      { offset: '100%', color: 'lawngreen' },
    ]).enter().append('stop')
    .attr('offset', (d) => d.offset)
    .attr('stop-color', (d) =>  d.color);

    g.attr('class', 'headerText')
      .append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (-margin.top / 2) + ')')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 600)
      .text('Simple Line Chart');

    // Appending X axis and formatting the text
    g.append('g')
        .attr('class', 'axisX')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x) as any)
        .attr('font-weight', 'bold');

    // Appending Y axis
    g.append('g')
      .attr('class', 'axisY')
      .call(d3.axisLeft(y).ticks(10) as any);

    g.append('path')
      .data([listData])
      .attr('class', 'area')
      .attr('d', area);

    g.append('path')
    .data([listData])
    .attr('class', 'line')
    .attr('fill', 'none')
    .attr('stroke', '#f00')
    .attr('stroke-width', 2)
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', line);
  }
}
</script>
<style lang='scss'>
.area {
  fill: url(#area-gradient);
  stroke-width: 0px;
}
</style>

