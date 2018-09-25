<template>
  <div class='d3-chart' id='chart'></div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import RadarChart from '@/plugins/RadarChart';
import * as d3 from 'd3';

const listData = [
  [{
    area: 'Central ',
    value: 80,
  }, {
    area: 'Kirkdale',
    value: 42,
  }, {
    area: 'Kensington ',
    value: 40,
  }, {
    area: 'Everton ',
    value: 90,
  }, {
    area: 'Picton ',
    value: 60,
  }, {
    area: 'Riverside ',
    value: 80,
  }],
];

@Component
export default class Radar extends Vue {

  private mounted() {
    this.renderChart();
  }

  private renderChart(): void {
    const width = 300;
    const height = 300;

    // Config for the Radar chart
    const config = {
      w: width,
      h: height,
      maxValue: 100,
      levels: 5,
      ExtraWidthX: 300,
    };

    //  Call function to draw the Radar chart
    new RadarChart().draw('#chart', listData, config);

    const svg = d3.select('body')
      .selectAll('svg')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
      }
    }
</script>
<style lang='scss'>
.axis {
	font: 15px sans-serif;
}
.axis path,
.axis line {
  fill: none;
  stroke: #D4D8DA;
  stroke-width: 2px;
  shape-rendering: crispEdges;
}
#chart {
	position: absolute;
	top: 50px;
	left: 100px;
}

.toolTip {
  pointer-events: none;
	position: absolute;
  display: none;
  min-width: 50px;
  height: auto;
  background: none repeat scroll 0 0 #ffffff;
  padding: 9px 14px 6px 14px;
  border-radius: 2px;
  text-align: center;
  line-height: 1.3;
  color: #5B6770;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, .15);
}
.toolTip:after {
  content: '';
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 12px solid white;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -12px;
}
.toolTip span {
	font-weight: 500;
  color: #081F2C;
}
</style>

