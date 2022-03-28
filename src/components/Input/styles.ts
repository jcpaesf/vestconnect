import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
    isTitled: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #0E0E0E;
    padding: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 20px;

    color: #FFFFFF;
    border: 1px solid #fff;

    ${(props) =>
        props.isTitled &&
        css`
            margin-top: 5px;
            margin-bottom: 10px;
        `
    }

    ${(props) =>
        props.isErrored &&
        css`
            border-color: #c53030;
        `
    }

    ${(props) =>
        props.isFocused &&
        css`
            color: green;
            border-color: green;
        `
    }

    ${(props) =>
        props.isFilled &&
        css`
            color: green;
        `
    }

    input {
        background: transparent;
        background-color: transparent;
        color: #f4ede8;
        flex: 1;
        border: 0;

        &::placeholder {
            color: #666360;
        }
    }

    & + div {
        margin-top: 8px;
    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    margin-left: 16px;
    height: 20px;

    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #FFF;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;