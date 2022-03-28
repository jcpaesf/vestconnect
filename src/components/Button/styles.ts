import styled from 'styled-components';

import {shade} from 'polished';

export const Container = styled.button`
    background: transparent;
    border: 1px solid #FFFFFF;
    height: 45px;
    padding: 0px 10px;
    color: #FFFFFF;
    font-weight: 400;
    margin-top: 30px;
    transition: color 0.2s;
    font-size: 13px;

    &:hover {
        color: ${shade(0.2, '#FFFFFF')};
    }
`;