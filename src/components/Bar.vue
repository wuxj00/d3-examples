<template>
  <div class='d3-chart'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

const capitals: string[] = 'abcdefghijklmnopqrst'.toUpperCase().split('');
const listData: any[] = capitals.map((key) => {
  const value = Math.floor(1000 * Math.random());
  return {
    key,
    value,
  };
});

@Component({
  components: {

  },
})
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

    const x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1);

    const y = d3.scaleLinear()
    .rangeRound([height, 0]);

    const xAxis = x.domain(capitals);
    const yAxis = y.domain([0, d3.max(listData.map((d) => d.value))]);

    g.attr('class', 'headerText')
      .append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (-margin.top / 2) + ')')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 600)
      .text('Simple Bar Chart');

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

    // Creating chart
    const chart = g.selectAll('.bar')
      .data(listData)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.key) as number)
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value));
    }
  }
</script>
<style lang='scss'>
  .bar { fill: steelblue; }
  .bar:hover {
    fill: red;
  }
</style>

