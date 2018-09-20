import * as d3 from 'd3';

export default class RadarChart {

  public draw(id: string, d: any, options: any) {
    const cfg: any = {
      radius: 5,
      w: 600,
      h: 600,
      factor: 1,
      factorLegend: .85,
      levels: 3,
      maxValue: 0,
      radians: 2 * Math.PI,
      opacityArea: 0.5,
      ToRight: 5,
      TranslateX: 80,
      TranslateY: 30,
      ExtraWidthX: 100,
      ExtraWidthY: 100,
      color: d3.scaleOrdinal().range(['#6F257F', '#CA0D59']),
    };
    if ('undefined' !== typeof options) {
      Object.keys(options).forEach((key) => {
        if ('undefined' !== typeof options[key]) {
          cfg[key] = options[key];
        }
      });
    }
    cfg.maxValue = 100;
    const allAxis = (d[0].map((i: any) => {
      return i.area;
    }));
    const total = allAxis.length;
    const radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
    const Format = d3.format('%');
    d3.select(id).select('svg').remove();
    const g = d3.select(id)
    .append('svg')
    .attr('width', cfg.w + cfg.ExtraWidthX)
    .attr('height', cfg.h + cfg.ExtraWidthY)
    .append('g')
    .attr('transform', `translate(${cfg.TranslateX} , ${cfg.TranslateY})`);
    //  Circular segments
    for (let j = 0; j < cfg.levels; j++) {
      const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll('.levels')
      .data(allAxis)
      .enter()
      .append('svg:line')
      .attr('x1', (d: any, i) => {
        return levelFactor * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
      })
      .attr('y1', (d, i) => {
        return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
      })
      .attr('x2', (d, i) => {
        return levelFactor * (1 - cfg.factor * Math.sin((i + 1) * cfg.radians / total));
      })
      .attr('y2', (d, i) => {
        return levelFactor * (1 - cfg.factor * Math.cos((i + 1) * cfg.radians / total));
      })
      .attr('class', 'line')
      .style('stroke', 'grey')
      .style('stroke-opacity', '0.75')
      .style('stroke-width', '0.3px')
      .attr('transform', `translate(${cfg.w / 2 - levelFactor} ,${cfg.h / 2 - levelFactor})`);
    }
    //  Text indicating at what % each level is
    for (let j = 0; j < cfg.levels; j++) {
      const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
      g.selectAll('.levels')
      .data([1]) //  dummy data
      .enter()
      .append('svg:text')
      .attr('x', () => {
        return levelFactor * (1 - cfg.factor * Math.sin(0));
      }).attr('y', () => {
        return levelFactor * (1 - cfg.factor * Math.cos(0));
      })
      .attr('class', 'legend')
      .style('font-family', 'sans-serif')
      .style('font-size', '10px')
      .attr('transform', `translate(${cfg.w / 2 - levelFactor + cfg.ToRight}, ${cfg.h / 2 - levelFactor})`)
      .attr('fill', '#737373')
      .text((j + 1) * 100 / cfg.levels);
    }
    const axis = g.selectAll('.axis')
    .data(allAxis)
    .enter()
    .append('g')
    .attr('class', 'axis');
    axis.append('line')
    .attr('x1', cfg.w / 2)
    .attr('y1', cfg.h / 2)
    .attr('x2', (d, i) => {
      return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians / total));
    }).attr('y2', (d, i) => {
      return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians / total));
    })
    .attr('class', 'line')
    .style('stroke', 'grey')
    .style('stroke-width', '1px');
    axis.append('text')
    .attr('class', 'legend')
    .text((d: any) => d)
    .style('font-family', 'sans-serif')
    .style('font-size', '11px')
    .attr('text-anchor', 'middle')
    .attr('dy', '1.5em')
    .attr('transform', (d, i) => {
          return 'translate(0, -10)';
    })
    .attr('x', (d, i) => {
          return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians / total))
          - 60 * Math.sin(i * cfg.radians / total);
      })
      .attr('y', (d, i) => {
          return cfg.h / 2 * (1 - Math.cos(i * cfg.radians / total)) - 20 * Math.cos(i * cfg.radians / total);
      });
    let series: number = 0;
    const dataValues: any[] = [];
    d.forEach((y: any, x: any) => {
      g.selectAll('.nodes').data(y, (j: any, i: any): any => {
        dataValues.push([
          cfg.w / 2 * (1 - (parseFloat(Math.max((j.value), 0).toString()) / cfg.maxValue)
            * cfg.factor * Math.sin(i * cfg.radians / total)),
            cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue)
            * cfg.factor * Math.cos(i * cfg.radians / total)),
          ]);
        });
      dataValues.push(dataValues[0]);
      g.selectAll('.area')
      .data([dataValues])
      .enter()
      .append('polygon')
      .attr('class', 'radar-chart-serie' + series)
      .style('stroke-width', '2px')
      .style('stroke', cfg.color(series))
      .attr('points', (d: any) => {
        let str = '';
        const len = d.length;
        for (let pti = 0; pti < len; pti++) {
            str = str + d[pti][0] + ',' + d[pti][1] + ' ';
        }
        return str;
      }).style('fill', (j, i) => {
          return cfg.color(series);
      }).style('fill-opacity', cfg.opacityArea);
      series = series + 1;
    });
    series = 0;
    const tooltip = d3.select('body')
    .append('div')
    .attr('class', 'toolTip');
    d.forEach((y: any, x: any) => {
      g.selectAll('.nodes')
      .data(y)
      .enter()
      .append('svg:circle')
      .attr('class', 'radar-chart-serie' + series)
      .attr('r', cfg.radius)
      .attr('alt', (j: any) => {
        return Math.max(j.value, 0);
      })
      .attr('cx', (j: any, i) => {
        dataValues.push([
        cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue)
        * cfg.factor * Math.sin(i * cfg.radians / total)),
                  cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue)
                  * cfg.factor * Math.cos(i * cfg.radians / total)),
              ]);
        return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue)
          * cfg.factor * Math.sin(i * cfg.radians / total));
        }).attr('cy', (j: any, i) => {
          return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue)
          * cfg.factor * Math.cos(i * cfg.radians / total));
        })
        .attr('data-id', (j: any) => {
          return j.area;
      })
      .style('fill', '#fff')
      .style('stroke-width', '2px')
      .style('stroke', cfg.color(series))
      .style('fill-opacity', .9);
      series++;
    });
  }
}
