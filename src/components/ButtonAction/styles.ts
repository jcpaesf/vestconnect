import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.button`
    background: #FFF;
    border: 1px solid #0e0e0e;
    height: 25px;
    min-height: 30px;
    max-width: 70px;
    padding: 0px 10px;
    color: #0e0e0e;
    font-weight: 400;
    transition: color 0.2s;
    font-size: 13px;

    &:hover {
        color: ${shade(0.2, '#0e0e0e')};
    }
`;