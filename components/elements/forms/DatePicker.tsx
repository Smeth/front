import { useEffect, useState } from 'react';
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePickerComponent = ({ onFieldChange, defaultValue, name, id }: { onFieldChange: (name: string, value: string) => void, defaultValue: string | null, name: string, id: string }) => {
    // const [value, onChange] = useState<Value>(new Date())
    
    // useEffect(() => {
    //     if(defaultValue) {
    //         onChange(new Date(defaultValue))
    //     }
    // }, [defaultValue])
    
    const [value, setValue] = useState<string|null>(null)
    useEffect(() => {
        if(defaultValue) {
            const date = new Date(defaultValue);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            setValue(`${year}-${month}-${day}`)
        }
    }, [defaultValue])
    
    return (
        <div>
            <input 
                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                type="date"
                name={name} 
                id={id} 
                required
                onChange={e => onFieldChange(e.target.name, e.target.value)}
                value={value?.toString()} 
            />
            {/* <DatePicker 
                onChange={onChange} 
                value={value} 
                className="w-full px-4 py-2.5 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                calendarClassName="bg-white text-xs rounded w-60 text-center p-2 text-dark-900 shadow-lg"
                tileClassName="h-7 text-sm font-medium hover:bg-gray-200 text-dark-900"
                clearIcon={<></>}
            />
            <input type="hidden" name={name} id={id} value={value ? value.toString() : ""} /> */}
        </div>
    )
}

export default DatePickerComponent