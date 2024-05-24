import { FilterBoxProps } from "@/types/forms"
import { useEffect, useRef, useState } from "react"
import Select, { SelectInstance, StylesConfig } from 'react-select'

const colourStyles: StylesConfig<any> = {
    control: (styles) => (
        { ...styles, backgroundColor: 'white' }
    ),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => (
        {
            ...styles,
            backgroundColor: isDisabled
              ? ""
              : isSelected
                ? "#ff0015"
                : isFocused
                  ? "#ff0015"
                  : "#ffffff",
            color: isDisabled
                ? ""
                : isSelected
                ? "#ffffff"
                : isFocused
                    ? "#ffffff"
                    : "",
            cursor: isDisabled ? "not-allowed" : "default",
        }
    ),
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles }),
    singleValue: (styles, { data }) => ({ ...styles }),
}

const FilterBox = ({ id, name, options, label, value, customClasses }: FilterBoxProps) => {
    const ref = useRef<any>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<any>(value)

    const formatGroupLabel = () => (
        <div className="flex items-center pb-2">
            <span>{label}</span>
        </div>
    )

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const groupedOptions = [
        {
            label: label,
            options: options
        }
    ]
    return (
        <div className="relative">
            <button 
                type="button" 
                onClick={() => setIsOpen(!isOpen)} 
                className={(customClasses || "") + " relative w-80 px-3.5 py-3 bg-dark-700 rounded text-sm font-medium text-gray-100 text-left angle-down-after after:right-2"}
            >
                {selectedValue ? selectedValue.label : label}
            </button>
            {isOpen && (<div className="absolute w-full z-10 px-1" ref={ref}>
                <Select
                    menuIsOpen={true}
                    name={name}
                    autoFocus
                    placeholder=""
                    className="text-dark-900"
                    formatGroupLabel={formatGroupLabel}
                    options={groupedOptions}
                    styles={colourStyles}
                    onChange={(newValue) => {
                        setSelectedValue(newValue);
                        setIsOpen(false);
                    }}
                />
            </div>)}
        </div>
    )
}

export default FilterBox