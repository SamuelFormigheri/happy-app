import React, { useEffect, useRef, InputHTMLAttributes, useState, useCallback, useMemo } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    containerstyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<IInputProps> = ({name, containerstyle, icon: Icon,...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const isDisabled = useMemo(() =>{
    return rest.disabled || false;
  },[rest.disabled]);
  
  const inputRef = useRef<HTMLInputElement>(null);
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
    <Container style={containerstyle} isFocused={isFocused} isFilled={isFilled} isDisabled={isDisabled} isErrored={Boolean(error)}>
        { Icon &&  <Icon />} 
        <input ref={inputRef} defaultValue={defaultValue} 
          onFocus={()=>{handleInputFocus()}} 
          onBlur={()=>{handleInputBlur()}}
          {...rest}
        ></input>
        {error && <Error title={error}><FiAlertCircle color="#C53030" size={20}/></Error>}
    </Container>
  );
}

export default Input;