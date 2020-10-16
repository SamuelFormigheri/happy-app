import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface IContainerProps{
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<IContainerProps>`
    background: #F5F8FA;
    border-radius: 10px;
    border: 2px solid #D3E2E5;
    padding: 16px;
    width: 100%;
    color: #3a3a3a;
    display:flex;
    align-items:center;

    ${props => props.isErrored && css`
        color: #C53030;
        border-color: #C53030;
    `}

    ${props => props.isFocused && css`
        color: #5C8599;
        border-color: #5C8599;
    `}

    ${props => props.isFilled && css`
        color: #5C8599;
        border-color: #5C8599;
    `}


    textarea{
        background: transparent;
        flex: 1;
        border: 0;
        color: #3a3a3a;
        height: 120px;
        max-height: 240px;
        &::placeholder{
            color: #8FA7B3;
        }
    }

    & + div{
            margin-top: 8px;
    }
    
    svg{
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg{
        margin: 0;
    }
    span{
        background: #C53030;

        &::before{
            border-color: #C53030 transparent;   
        }
    }
`;