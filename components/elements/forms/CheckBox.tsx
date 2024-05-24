"use client"

import { CheckBoxProps } from "@/types/forms"
import { useState } from "react"

const CheckBox = ({ name, id, checked, label, onChange }: CheckBoxProps) => {
    return (
        <div className="flex items-center space-x-2">
            <button 
                onClick={onChange}
                type="button"
                className={(checked ?"bg-secondary-800 border-secondary-800" : "bg-white") + " cursor-pointer h-5 w-5  shadow-primary rounded-sm border flex items-center justify-center"}
            >
                {checked && 
                    (<svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>)
                }
                <input type="hidden" name={name} id={id} />
            </button>
            {label &&(<span className="text-sm text-white cursor-default" onClick={onChange}>{label}</span>)}
        </div>
    )
}

export default CheckBox