import React from 'react'
import { Select, Typography } from 'antd'

import data from '../../utils/data.json'
import getValidDateFormat from '../../utils/getValidDateFormat'

import s from './SelectModule.module.scss'


const { Option } = Select
const { Text } = Typography

const SelectModule = (props) => {

    const { setSelectedDate, defaultValue } = props

    return (
        <div className={s.container}>
            <Text className={s.text}>choosen day</Text>
            <Select
                style={{ width: 200 }}
                defaultValue={defaultValue}
                onChange={(value) => setSelectedDate(value)}
            >
                {data.map((item, index) =>
                        <Option
                            key={index}
                            value={item.timeStart}
                        >
                            {getValidDateFormat(item.timeStart)}
                        </Option>
                    )
                })}
            </Select>
        </div>
    )
}

export default SelectModule
