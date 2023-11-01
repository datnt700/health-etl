import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';

const BarChartMoyenne = ({
  moyenneProdTop1,
  moyenneProdTop2,
  chartProd,
  chartFab,
  currentFab,
}) => {
  const dateString = [
    'Janvier ',
    'Février ',
    'Mars ',
    'Avril ',
    'Mai ',
    'Juin ',
    'Juillet ',
    'Août ',
    'Septembre ',
    'Octobre ',
    'Novembre ',
    'Decembre ',
  ];

  const svgFabRef = useRef(null);
  const svgFabCircleRef = useRef(null);
  const svgProdRef = useRef(null);
  const svgProdCircleRef = useRef(null);
  // Kích thước biểu đồ
  const width = 700;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 40, left: 20 };

  const drawBarChartFab = (chartFab) => {
    const svg = d3.select(svgFabRef.current);
    svg.selectAll('*').remove();
    if (!svg.empty()) {
      svg.attr('width', width).attr('height', height);

      // Scale cho trục x và trục y
      const xScale = d3
        .scaleBand()
        .domain(dateString)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartFab)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Vẽ các thanh bar
      svg
        .selectAll('rect')
        .data(chartFab)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(dateString[i]))
        .attr('y', (d) => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - margin.bottom - yScale(d))
        .attr('fill', 'steelblue');

      // Hiển thị giá trị trên mỗi thanh bar
      svg
        .selectAll('text')
        .data(chartFab)
        .enter()
        .append('text')
        .attr(
          'x',
          (d) =>
            xScale(dateString[chartFab.indexOf(d)]) + xScale.bandwidth() / 2
        )
        .attr('y', (d) => yScale(d) - 5) // Điều chỉnh vị trí của giá trị
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', 'black')
        .text((d) => d);

      // Vẽ trục x và trục y
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));
    }
  };

  useEffect(() => {
    drawBarChartFab(chartFab);
  }, [chartFab]);

  useEffect(() => {
    if (svgFabCircleRef.current) {
      d3.select(svgFabCircleRef.current).select('svg').remove();
    }
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select(svgFabCircleRef.current)
      .attr('width', width)
      .attr('height', height);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const data = [moyenneProdTop1, 100 - moyenneProdTop1]; // 10% giá trị và 90% giá trị còn lại
    const pie = d3.pie()(data);
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6) // Đặt bán kính trong (inner radius) thành 60% của bán kính
      .outerRadius(radius);

    const arcs = svg
      .selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    arcs
      .append('path')
      .attr('fill', (d, i) => (i === 0 ? 'steelblue' : 'lightgray'))
      .attr('d', arc);
    arcs
      .append('text') // Tạo phần tử văn bản
      .attr('transform', (d) => {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`; // Đặt vị trí của văn bản ở trung tâm của mỗi phần
      })
      .attr('dy', '0.35em') // Điều chỉnh vị trí dọc
      .style('text-anchor', 'middle') // Đặt vị trí văn bản theo chiều ngang
      .style('font-size', '12px')
      .style('fill', 'white')
      .text((d, i) =>
        i === 0 ? `${moyenneProdTop1}%` : `${100 - moyenneProdTop1}%`
      );
  }, [moyenneProdTop1]);

  const drawBarChartProd = (chartProd) => {
    const width = 700;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 20 };
    const svg = d3.select(svgProdRef.current);
    svg.selectAll('*').remove();
    if (!svg.empty()) {
      // Tạo biểu đồ
      svg.attr('width', width).attr('height', height);

      // Scale cho trục x và trục y
      const xScale = d3
        .scaleBand()
        .domain(dateString)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartProd)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Vẽ các thanh bar
      svg
        .selectAll('rect')
        .data(chartProd)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(dateString[i]))
        .attr('y', (d) => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - margin.bottom - yScale(d))
        .attr('fill', 'steelblue');

      // Hiển thị giá trị trên mỗi thanh bar
      svg
        .selectAll('text')
        .data(chartProd)
        .enter()
        .append('text')
        .attr(
          'x',
          (d) =>
            xScale(dateString[chartProd.indexOf(d)]) + xScale.bandwidth() / 2
        )
        .attr('y', (d) => yScale(d) - 5) // Điều chỉnh vị trí của giá trị
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('fill', 'black')
        .text((d) => d);

      // Vẽ trục x và trục y
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));
    }
  };

  useEffect(() => {
    drawBarChartProd(chartProd);
  }, [chartProd]);

  useEffect(() => {
    if (svgProdCircleRef) {
      d3.select(svgProdCircleRef.current).select('svg').remove();
    }
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    const svg = d3
      .select(svgProdCircleRef.current)
      .attr('width', width)
      .attr('height', height);
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const data = [moyenneProdTop2, 100 - moyenneProdTop2]; // 10% giá trị và 90% giá trị còn lại
    const pie = d3.pie()(data);
    const arc = d3
      .arc()
      .innerRadius(radius * 0.6) // Đặt bán kính trong (inner radius) thành 60% của bán kính
      .outerRadius(radius);

    const arcs = svg
      .selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    arcs
      .append('path')
      .attr('fill', (d, i) => (i === 0 ? 'steelblue' : 'lightgray'))
      .attr('d', arc);
    arcs
      .append('text') // Tạo phần tử văn bản
      .attr('transform', (d) => {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`; // Đặt vị trí của văn bản ở trung tâm của mỗi phần
      })
      .attr('dy', '0.35em') // Điều chỉnh vị trí dọc
      .style('text-anchor', 'middle') // Đặt vị trí văn bản theo chiều ngang
      .style('font-size', '12px')
      .style('fill', 'white')
      .text((d, i) =>
        i === 0 ? `${moyenneProdTop2}%` : `${100 - moyenneProdTop2}%`
      );
  }, [moyenneProdTop2]);
  return (
    <>
      <div className="box">
        <h3>Dans la top 10 magasins qui a le plus fabricants</h3>
        <div className="boxes">
          <svg ref={svgFabRef}></svg>
          <svg ref={svgFabCircleRef}></svg>
        </div>
      </div>
      <div className="box">
        <h3>Dans la top 10 magasins qui a le plus produits</h3>
        <div className="boxes">
          <svg ref={svgProdRef}></svg>
          <svg ref={svgProdCircleRef}></svg>
        </div>
      </div>
    </>
  );
};

export default BarChartMoyenne;
