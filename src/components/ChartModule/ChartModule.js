import React, { useRef, useEffect } from 'react'
import { Typography } from 'antd'
import { select, scaleBand, scaleLinear, axisBottom, stack, max, axisLeft } from 'd3'
import data from '../../utils/data.json'
import getValidTimeFormat from '../../utils/getValidTimeFormat'

import s from './ChartModule.module.scss'


const { Text } = Typography

const ChartModule = (props) => {

    const { selectedDate } = props

    const chartContainer = useRef()

    const getNewObjects = (item) => {
        return {
            'time': Number(item.timeInMilliseconds),
            'intensity': item.intensity,
            'lifting': item.lifting,
            'twisting': item.twisting,
            'repetition': item.repetition,
            'pb_static': item.pb_static,
        }
    }

    const hazardsData = []

    const getHazardsByHourList = (selectedDate) => {
        let hazardsByHourList

        if(selectedDate) {
            hazardsByHourList = data.filter(function(val) {
                return val.timeStart === selectedDate
            })[0].hazardsByHourList

            return hazardsByHourList.map((el) => {
                hazardsData.push(getNewObjects(el))
            })
        }
    }


    useEffect(() => {
        getHazardsByHourList(selectedDate)

        const svg = select(chartContainer.current)
        const width = 500,
            height = 300

        const stackGenerator = stack().keys(['intensity', 'lifting', 'twisting', 'repetition', 'pb_static'])
        const layers = stackGenerator(hazardsData)

        const extent = [
            0,
            max(layers, layer => max(layer, sequence => sequence[1]))
        ]

        const colors = {
            'intensity': '#F94957',
            'lifting': '#A25ABD',
            'twisting': '#46AFFB',
            'repetition': '#34D59E',
            'pb_static': '#FFD786'
        }

        const xScale = scaleBand()
            .domain(hazardsData.map(d => d.time))
            .range([0, width])
            .padding(0.5)

        const yScale = scaleLinear()
            .domain(extent)
            .range([height, 0])

        const yGrid = (g) => g
            .attr('class', 'grid-lines')
            .selectAll('line')
            .data(yScale.ticks())
            .join('line')
            .attr('x1', 0)
            .attr('x2', width + 20)
            .attr('y1', d => yScale(d) + 10)
            .attr('y2', d => yScale(d) + 10)

        if (svg.select('.grid-lines')) {
            svg.selectAll(".grid-lines").remove()
        }
        svg.append('g').call(yGrid).lower()

        const xAxis = axisBottom(xScale).tickFormat(tick => getValidTimeFormat(tick))
        svg.select('.x-axis')
            .attr('transform', `translate(20, ${height + 10})`)
            .call(xAxis)

        const yAxis = axisLeft(yScale).ticks((extent[1] / 2))
        svg.select('.y-axis')
            .attr('transform', 'translate(20, 3)')
            .call(yAxis)


        svg.selectAll('.layer')
            .data(layers)
            .join('g')
            .attr('class', 'layer')
            .attr('transform', 'translate(20, 10)')
            .attr('fill', layer => colors[layer.key])
            .selectAll('rect')
            .data(layer => layer)
            .join('rect')
            .attr('x', sequence => xScale(sequence.data.time))
            .attr('width', xScale.bandwidth())
            .attr('y', sequence => yScale(sequence[1]))
            .attr('height', sequence => yScale(sequence[0]) - yScale(sequence[1]))

    }, [selectedDate])

    return (
        <div className={s.container}>
            <Text className={s.text}>hazards per hour</Text>
            <div style={{ margin: '30px 0 5px 0', height: 330 }}>
                <svg ref={chartContainer} style={{ width: '100%', height: '100%' }}>
                    <g className='x-axis' />
                    <g className='y-axis' />
                </svg>
            </div>
        </div>
    )
}

export default ChartModule
