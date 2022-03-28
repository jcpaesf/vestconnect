import styled from 'styled-components';
import { Link } from 'react-router-dom';
interface ContainerProps {
    background: string;
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    min-height: 50px;
    background: ${props => `url(${props.background}) no-repeat center center`};
    background-size: cover;
    background-position: center;
    padding: 0 20px;
`;

export const ContainerPropsItem = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;

    span {
        font-size: 15px;
    }
`;

export const LinkContent = styled(Link)`
    text-decoration: none;
    color: #FFF;
`;