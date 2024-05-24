import { useState } from "react"
import CheckBox from "./CheckBox"

const CheckBoxLabel = ({ label, checked }: { label: string, checked: boolean }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked) 
    
    return (
        <div className="flex items-center space-x-2">
            <CheckBox
                id=""
                name=""
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
            />
            <span className="text-sm text-white cursor-default" onClick={() => setIsChecked(!isChecked)}>{label}</span>
        </div>
    )
}

export default CheckBoxLabel