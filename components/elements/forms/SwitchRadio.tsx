"use client"

import { SwitchRadioProps } from "@/types/forms"
import { useEffect, useState } from "react"

const SwitchRadio = ({ active, label1, label2, name, id, onFieldChange }: SwitchRadioProps) => {
    const [enabled, setEnabled] = useState<boolean>(false);

    useEffect(() => {
        setEnabled(active)
    }, [active])

    const handleChange = () => {
        setEnabled(!enabled)
        onFieldChange(name, (!enabled).toString())
    }

    return (
        <div className="flex items-center space-x-4">
            <button type="button" onClick={handleChange} className="flex space-x-2 items-center">
                {
                    enabled
                    ? (
                        <span className="h-5 w-5 rounded-full bg-white border-2 flex items-center justify-center border-secondary-800">
                            <span className="h-2.5 w-2.5 bg-secondary-800 rounded-full"></span>
                        </span>
                    )
                    : (
                        <span className="h-5 w-5 rounded-full bg-white border-2" />
                    )
                }
                <span className="text-white text-xs">{label1}</span>
            </button>
            <button type="button" onClick={handleChange} className="flex space-x-2 items-center">
                {
                    !enabled
                    ? (
                        <span className="h-5 w-5 rounded-full bg-white border-2 flex items-center justify-center border-grey-100">
                            <span className="h-2.5 w-2.5 bg-grey-100 rounded-full"></span>
                        </span>
                    )
                    : (
                        <span className="h-5 w-5 rounded-full bg-white border-2" />
                    )
                }
                <span className="text-white text-xs">{label2}</span>
            </button>
            <input type="hidden" name={name} id={id} value={enabled?.toString()} />
        </div>
    )
}

export default SwitchRadio
