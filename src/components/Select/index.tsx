import React, { SelectHTMLAttributes } from 'react';
import { SelectItem } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    text?: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({ text, label, name, options, ...rest }) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <SelectItem value="" id={name} {...rest}>
                <option value="" disabled hidden>{text ? text : 'Selecione uma opção'}</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </SelectItem>
        </>
    )
}

export default Select;