<template>
  <div class='d3-chart'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import * as d3 from 'd3';

@Component
export default class Pie extends Vue {

  private mounted() {
    this.renderChart();
  }

  private renderChart(): void {
    const width = + 960;
    const height = + 500;

    const radius = (Math.min(width, height) / 2) - 50;
    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    const listData = [
      { age: '<5', population: 2704659 },
      { age: '5-13', population: 4499890 },
      { age: '14-17', population: 2159981 },
      { age: '18-24', population: 3853788 },
      { age: '25-44', population: 14106543 },
      { age: '45-64', population: 8819342 },
      { age: '≥65', population: 612463 } ];

    const svg = d3.select('.d3-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    const g = svg.append('g')
    .attr('transform', `translate(${width / 2} ${ (height / 2) + 50})`);

    g.attr('class', 'headerText')
      .append('text')
      .attr('transform', 'translate(0,' + (-radius - 30) + ')')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 600)
      .text('Simple pie Chart');

    const pie = d3.pie()
    // .sort(null)
    .value( (d: any) => d.population );

    const path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

    const label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    const arc = g.selectAll('.arc')
    .data(pie(listData as any))
    .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
    .attr('d', path as any)
    .attr('fill', (d: any) => {
      const data = d.data;
      return color(data.age);
    });

    const text = arc.append('text')
    .attr('transform', (d) => `translate(${label.centroid(d as any)})`)
    .attr('dy', '0.35em')
    .text( (d: any) => {
      const data = d.data;
      return color(data.age);
    });
  }
}
</script>
<style lang='scss'>
.arc text {
  font: 10px sans-serif;
  text-anchor: middle;
}

.arc path:hover {
  fill: red;
}
.arc path {
  stroke: #fff;
}
</style>

