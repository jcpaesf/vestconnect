import React, { TextareaHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    title?: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const TextArea: React.FC<TextAreaProps> = ({ name, title, icon: Icon, ...rest }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleTextAreaFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleTextAreaBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!textAreaRef.current?.value);
    }, []);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: textAreaRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    return (
        <>
            {title && <label>{title}</label>}
            <Container
                isErrored={!!error}
                isFilled={isFilled}
                isFocused={isFocused}
                isTitled={!!title}>
                {Icon && <Icon size={20} />}
                <textarea
                    onFocusCapture={handleTextAreaFocus}
                    onBlur={handleTextAreaBlur}
                    defaultValue={defaultValue}
                    ref={textAreaRef}
                    {...rest} />

                {error && <Error title={error}><FiAlertCircle color="#c53030" size={20} /></Error>}
            </Container>
        </>
    )
};

export default TextArea;