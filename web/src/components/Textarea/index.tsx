import React, { useEffect, useRef, useState, useCallback, TextareaHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface IInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Textarea: React.FC<IInputProps> = ({name, icon: Icon,...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(Boolean(inputRef.current?.value));
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  },[]);

  useEffect(()=>{
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  },[fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={Boolean(error)}>
        { Icon &&  <Icon />} 
        <textarea ref={inputRef} defaultValue={defaultValue} 
          onFocus={()=>{handleInputFocus()}} 
          onBlur={()=>{handleInputBlur()}}
          {...rest}
        ></textarea>
        {error && <Error title={error}><FiAlertCircle color="#C53030" size={20}/></Error>}
    </Container>
  );
}

export default Textarea;