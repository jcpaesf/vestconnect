import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled(Link)`
    background: transparent;
    border: 1px solid #FFFFFF;
    min-height: 45px;
    width: 100%;
    padding: 0px 10px;
    color: #FFFFFF;
    font-weight: 400;
    transition: color 0.2s;
    font-size: 13px;
    margin-bottom: 15px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: ${shade(0.2, '#FFFFFF')};
    }
`;