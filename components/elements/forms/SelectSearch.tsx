"use client"

import { SelectSearchProps } from "@/types/forms"
import { colourStyles } from "@utils/utilities"
import { useEffect, useState } from "react"
import Select, { IndicatorSeparatorProps } from 'react-select'

const SelectSearch = ({ id, name, options, label, defaultValue, isMulti, onChange }: SelectSearchProps) => {
    const [value, setValue] = useState<any[] | null>([])

    useEffect(() => {
        if(defaultValue && defaultValue.length > 0) {
            const defaultItems = defaultValue.map((itemValue: any) => {
                const foundItem = options.find((option: any) => option.value === itemValue?.value)
                return foundItem ? {value: foundItem.value, label: foundItem.label} : null
            }).filter((item: any) => item !== null)
            setValue(defaultItems)
        }
    }, [defaultValue, options])

    const formatGroupLabel = () => (
        <div className="flex items-center pb-2">
            <span className="text-xs">{label}</span>
        </div>
    )

    const IndicatorSeparator = ({
        innerProps,
      }: IndicatorSeparatorProps<any, boolean>) => {
        return <span className="w-[1px]" {...innerProps} />
    }

    return (
        <div className="relative w-full">
            <Select
                id={id}
                name={name}
                value={value}
                placeholder={label}
                isMulti={isMulti}
                className="text-dark-900"
                formatGroupLabel={formatGroupLabel}
                components={{ IndicatorSeparator }}
                options={[
                    {
                        label: label,
                        options: options
                    }
                ]}
                styles={colourStyles}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary: '#ff0015',
                    },
                })}
                onChange={(newValue, actionMeta) => {onChange(newValue, actionMeta), setValue(newValue)}}
            />
        </div>
    )
}

export default SelectSearch