import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';

const BarChart = ({ topMagasinByFab, topMagasinByProd }) => {
  const svgFabRef = useRef();
  const svgProdRef = useRef();

  console.log(topMagasinByFab);
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const drawChartFab = (topMagasinByFab) => {
    const svg = d3.select(svgFabRef.current);
    svg.selectAll('*').remove(); // Xóa nội dung SVG cũ
    if (!svg.empty()) {
      svg.attr('width', width).attr('height', height);

      // Thiết lập scale cho trục x
      const xScale = d3
        .scaleBand()
        .domain(topMagasinByFab.map((d) => Object.keys(d)[0]))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      // Thiết lập scale cho trục y
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(topMagasinByFab, (d) => Object.values(d)[0])])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .selectAll('rect')
        .data(topMagasinByFab)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(Object.keys(d)[0]))
        .attr('y', (d) => yScale(Object.values(d)[0]))
        .attr('width', xScale.bandwidth())
        .attr(
          'height',
          (d) => height - margin.bottom - yScale(Object.values(d)[0])
        )
        .attr('fill', 'steelblue');

      // Thêm nhãn giá trị bên trong mỗi thanh
      svg
        .selectAll('text')
        .data(topMagasinByFab)
        .enter()
        .append('text')
        .text((d) => Object.values(d)[0])
        .attr('x', (d, i) => xScale(Object.keys(d)[0]) + xScale.bandwidth() / 2) // Sử dụng chỉ số i để xác định vị trí trên trục x
        .attr('y', (d) => yScale(Object.values(d)[0]) - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', 'gray ');

      // Dựng trục x
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      // Dựng trục y
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(5));

      // Đặt tên trục và tiêu đề
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height)
        .text('Magasin');

      svg
        .append('text')
        .attr('x', -height / 2)
        .attr('y', 10)
        .attr('transform', 'rotate(-90)')
        .text('fabricants');
    }
  };

  useEffect(() => {
    drawChartFab(topMagasinByFab);
  }, [topMagasinByFab]);

  const drawChartProb = (topMagasinByProd) => {
    const svg = d3.select(svgProdRef.current);
    svg.selectAll('*').remove();
    if (!svg.empty()) {
      svg.attr('width', width).attr('height', height);

      // Thiết lập scale cho trục x
      const xScale = d3
        .scaleBand()
        .domain(topMagasinByProd.map((d) => Object.keys(d)[0]))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      // Thiết lập scale cho trục y
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(topMagasinByProd, (d) => Object.values(d)[0])])
        .nice()
        .range([height - margin.bottom, margin.top]);

      svg
        .selectAll('rect')
        .data(topMagasinByProd)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(Object.keys(d)[0]))
        .attr('y', (d) => yScale(Object.values(d)[0]))
        .attr('width', xScale.bandwidth())
        .attr(
          'height',
          (d) => height - margin.bottom - yScale(Object.values(d)[0])
        )
        .attr('fill', 'steelblue');

      // Thêm nhãn giá trị bên trong mỗi thanh
      svg
        .selectAll('text')
        .data(topMagasinByProd)
        .enter()
        .append('text')
        .text((d) => Object.values(d)[0])
        .attr('x', (d, i) => xScale(Object.keys(d)[0]) + xScale.bandwidth() / 2) // Sử dụng chỉ số i để xác định vị trí trên trục x
        .attr('y', (d) => yScale(Object.values(d)[0]) - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', 'gray ');

      // Dựng trục x
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale));

      // Dựng trục y
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(5));

      // Đặt tên trục và tiêu đề
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height)
        .text('Magasin');

      svg
        .append('text')
        .attr('x', -height / 2)
        .attr('y', 10)
        .attr('transform', 'rotate(-90)')
        .text('Produit');
    }
  };
  useEffect(() => {
    drawChartProb(topMagasinByProd);
  }, [topMagasinByProd]);
  return (
    <>
      <div className="box">
        <h4>Top Magasin a la plus des fabricants avec lesquels coopérer</h4>
        <svg ref={svgFabRef}></svg>
      </div>
      <div className="box">
        <h4>Top Magasin a la plus des produits à vendre</h4>

        <svg ref={svgProdRef}></svg>
      </div>
    </>
  );
};

export default BarChart;
