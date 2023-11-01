import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function BarChartDate({ nbFab3Mois, annee }) {
  const svgRef = useRef();
  const width = 400;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 40, left: 40 };
  const dateString = ['Janvier ', 'Février ', 'Mars '];

  const drawChartDate = (nbFab3Mois, annee) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    if (!svg.empty()) {
      svg.attr('width', width).attr('height', height);

      // Thiết lập scale cho trục x
      const xScale = d3
        .scaleBand()
        .domain(dateString)
        .range([margin.left, width - margin.right])
        .padding(0.1);

      // Thiết lập scale cho trục y
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(nbFab3Mois)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Vẽ các thanh bar
      svg
        .selectAll('rect')
        .data(nbFab3Mois)
        .enter()
        .append('rect')

        .attr('x', (_, i) => xScale(dateString[i]))
        .attr('y', (d) => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - margin.bottom - yScale(d))
        .attr('fill', 'steelblue');

      // Hiển thị giá trị trên mỗi thanh bar
      svg
        .selectAll('text')
        .data(nbFab3Mois)
        .enter()
        .append('text')
        .text((d) => d)
        .attr(
          'x',
          (d) =>
            xScale(dateString[nbFab3Mois.indexOf(d)]) + xScale.bandwidth() / 2
        )
        .attr('y', (d) => yScale(d) - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', 'gray');

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
        .attr('y', height + margin.bottom - 5)
        .text('X Axis');

      svg
        .append('text')
        .attr('x', -height / 2)
        .attr('y', 15)
        .attr('transform', 'rotate(-90)')
        .text('fabricant');
    }
  };

  useEffect(() => {
    drawChartDate(nbFab3Mois, annee);
  }, [nbFab3Mois, annee]);

  return (
    <>
      <div className="box">
        <h3>Nombre de fabricants {annee}</h3>
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}
