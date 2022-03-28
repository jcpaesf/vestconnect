import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface AvatarProps {
    background: string;
}

interface TextProps {
    active: boolean;
}

export const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 50px;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px 0px 10px 0px;
    justify-content: space-between;
`;

export const ContainerProduct = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.div<AvatarProps>`
    height: 50px;
    margin-right: 5px;
    width: 50px;
    border-radius: 15px;
    background: ${props => `url(${props.background}) no-repeat`};
    background-size: cover;
    background-position: center;
`;

export const Text = styled.span<TextProps>`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;

    ${(props) =>
        !props.active &&
        css`
            color: red;
        `
    }
`;

export const ContainerButton = styled.div`
    display: flex;
    align-items: center;
`;

export const Button = styled(Link)`
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
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    &:hover {
        color: ${shade(0.2, '#0e0e0e')};
    }
`;

export const UsersLink = styled(Link)`
    text-decoration: none;
    color: #FFF;
`