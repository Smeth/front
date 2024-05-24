export type SwitcherProps = {
    id: string,
    name: string,
    checked: boolean,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export type CheckBoxProps = {
    id: string,
    name: string,
    checked: boolean,
    label?: string,
    onChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}


export type FilterBoxProps = {
    id: string,
    name: string,
    label: string,
    value: null | {  
        label: string, 
        value: string
    },
    isMulti?:boolean,
    customClasses: string,
    options: {  
        label: string, 
        value: string
    }[]
}

export type SelectSearchProps = {
    id: string,
    name: string,
    label: string,
    defaultValue: number[] | null,
    isMulti?: boolean,
    options: {  
        label: string, 
        value: string | number
    }[],
    onChange: (newValue: any, actionMeta: any) => void
}

export type SwitchRadioProps = {
    active: boolean, 
    label1: string, 
    label2: string,
    name: string,
    id: string,
    onFieldChange: (name: string, value: string) => void
}