import React, { useState } from 'react'
import SelectModule from '../SelectModule/SelectModule'
import ChartModule from '../ChartModule/ChartModule'
import data from '../../utils/data.json'

import s from './MainLayout.module.scss'


const MainLayout = () => {

    const [ selectedDate, setSelectedDate ] = useState(data[0].timeStart)

    return (
        <div className={s.layout}>
            <SelectModule setSelectedDate={setSelectedDate} defaultValue={data[0].timeStart} />
            <ChartModule selectedDate={selectedDate} />
        </div>
    )
}

export default MainLayout
